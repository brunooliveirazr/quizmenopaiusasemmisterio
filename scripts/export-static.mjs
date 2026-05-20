#!/usr/bin/env node
/**
 * Gera um export 100% estático do quiz a partir do site publicado.
 * Saída: ./export-static/
 *   - index.html
 *   - quiz/1.html ... quiz/22.html
 *   - assets/* (JS, CSS, imagens)
 *   - videos/*, robots.txt, llms.txt (se existirem em dist/client)
 *
 * Funciona em Apache/Hostinger sem .htaccess: basta subir o conteúdo
 * de export-static/ para public_html/.
 */

import { mkdir, writeFile, readFile, cp, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const SITE = process.env.STATIC_EXPORT_SITE
  || "https://quizmenopaiusasemmisterio.lovable.app";
const OUT = resolve("export-static");
const DIST = resolve("dist/client");

const PAGES = [
  { url: "/", file: "index.html" },
  ...Array.from({ length: 22 }, (_, i) => ({
    url: `/quiz/${i + 1}`,
    file: `quiz/${i + 1}.html`,
  })),
];

// Inserido em todo HTML antes do <body>: reescreve a URL "/quiz/2.html" → "/quiz/2"
// para o roteador React reconhecer a rota e hidratar a página corretamente.
const HISTORY_SHIM = `<script>(function(){try{var p=location.pathname;var clean=p.replace(/index\\.html$/,'').replace(/\\.html$/,'');if(clean!==p){history.replaceState(null,'',clean+location.search+location.hash);}}catch(e){}})();</script>`;

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return await res.text();
}

async function fetchBin(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Extrai TODAS as referências a /assets/* dentro de um texto (HTML ou JS).
 * Captura caminhos com letras/dígitos/._-/ até a primeira aspa/parêntese/espaço.
 */
function extractAssetPaths(text) {
  const set = new Set();
  const re = /\/assets\/[A-Za-z0-9._\-\/]+/g;
  let m;
  while ((m = re.exec(text)) !== null) set.add(m[0]);
  return [...set];
}

async function downloadAsset(path, downloaded) {
  if (downloaded.has(path)) return;
  downloaded.add(path);

  const localPath = join(OUT, path.replace(/^\//, ""));
  await ensureDir(dirname(localPath));

  // Preferir cópia local de dist/client se existir (mais rápido e exato)
  const fromDist = join(DIST, path.replace(/^\//, ""));
  let buf;
  if (existsSync(fromDist)) {
    buf = await readFile(fromDist);
  } else {
    buf = await fetchBin(SITE + path);
  }
  await writeFile(localPath, buf);

  // Se for JS/CSS, varrer recursivamente por outros assets
  if (/\.(js|css|map)$/.test(path)) {
    const text = buf.toString("utf8");
    for (const p of extractAssetPaths(text)) {
      await downloadAsset(p, downloaded);
    }
  }
}

function rewriteHtml(html, page) {
  // 1. Remover script de analytics da Lovable (depende de proxy /~api)
  html = html.replace(/<script[^>]*src="\/~[^"]*"[^>]*>\s*<\/script>/g, "");

  // 2. Reescrever <a href="/quiz/N"> para caminho relativo com .html
  //    (mantém asset hrefs como /assets/... que funcionam por serem absolutos no domínio)
  if (page.file === "index.html") {
    html = html.replace(/href="\/quiz\/(\d+)"/g, 'href="quiz/$1.html"');
    html = html.replace(/href="\/"(?!\/)/g, 'href="index.html"');
  } else {
    html = html.replace(/href="\/quiz\/(\d+)"/g, 'href="$1.html"');
    html = html.replace(/href="\/"(?!\/)/g, 'href="../index.html"');
  }

  // 3. Injetar shim de histórico antes do </head>
  if (!html.includes("STATIC_HISTORY_SHIM")) {
    html = html.replace(
      /<\/head>/i,
      `<!--STATIC_HISTORY_SHIM-->${HISTORY_SHIM}</head>`,
    );
  }

  return html;
}

async function main() {
  console.log(`→ Baixando páginas de ${SITE}`);
  await ensureDir(OUT);

  const downloaded = new Set();

  for (const page of PAGES) {
    process.stdout.write(`  ${page.url} → ${page.file} ... `);
    const raw = await fetchText(SITE + page.url);
    const html = rewriteHtml(raw, page);

    const outPath = join(OUT, page.file);
    await ensureDir(dirname(outPath));
    await writeFile(outPath, html);

    for (const p of extractAssetPaths(raw)) {
      await downloadAsset(p, downloaded);
    }
    console.log("ok");
  }

  // Copiar arquivos extra do dist/client (videos, robots, llms, favicon...)
  if (existsSync(DIST)) {
    for (const name of ["videos", "robots.txt", "llms.txt", "favicon.ico"]) {
      const src = join(DIST, name);
      if (existsSync(src)) {
        const dst = join(OUT, name);
        await cp(src, dst, { recursive: true });
        console.log(`  copiado ${name}`);
      }
    }
  }

  // QA: verificar que todo /assets/X referenciado existe localmente
  console.log("→ Verificando integridade dos assets…");
  const missing = [];
  for (const page of PAGES) {
    const html = await readFile(join(OUT, page.file), "utf8");
    for (const p of extractAssetPaths(html)) {
      const local = join(OUT, p.replace(/^\//, ""));
      if (!existsSync(local)) missing.push(`${page.file} → ${p}`);
    }
  }
  if (missing.length) {
    console.error("✗ Assets faltando:");
    for (const m of missing) console.error("  " + m);
    process.exit(1);
  }
  console.log(`✓ ${downloaded.size} assets baixados, todas as referências OK`);
  console.log(`✓ Export pronto em ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
