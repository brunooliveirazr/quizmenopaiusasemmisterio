# Export estático — Quiz Menopausa Sem Mistério

Gera um pacote 100% estático do quiz para hospedar em Apache/Hostinger
sem Node, sem SSR e sem `.htaccess`.

## Gerar o pacote

```bash
npm install
npm run export:static       # gera ./export-static/
npm run export:static:zip   # gera ./export-static/ + ./quiz-menopausa-static.zip
```

## O que tem dentro

```
export-static/
├── index.html            # home
├── quiz/
│   ├── 1.html ... 22.html
├── assets/               # todos os JS/CSS/imagens (hash do build)
├── videos/               # depoimentos
├── robots.txt
└── llms.txt
```

- Todas as referências a `/assets/...` nos HTMLs apontam para arquivos
  que existem em `assets/` (verificado automaticamente pelo script).
- Links internos foram reescritos: `<a href="/quiz/2">` → `quiz/2.html`
  (ou `2.html` se já estiver dentro de `/quiz/`).
- Um pequeno script no `<head>` reescreve `/quiz/2.html` para `/quiz/2`
  na URL antes do React hidratar, para o roteador reconhecer a rota.

## Deploy no Hostinger

1. Baixe `quiz-menopausa-static.zip`.
2. No File Manager do Hostinger, entre em `public_html/`.
3. Faça upload do ZIP e extraia ali. O conteúdo (`index.html`, `quiz/`,
   `assets/`, etc.) deve ficar direto em `public_html/`, **não** dentro
   de uma subpasta.
4. Pronto: `https://seudominio.com.br/` e `https://seudominio.com.br/quiz/1.html`.

## Regerar quando publicar mudanças

Sempre que você atualizar o app no Lovable e republicar, rode novamente:

```bash
npm run export:static:zip
```

O script lê o site publicado em
`https://quizmenopaiusasemmisterio.lovable.app` (mude com a variável
`STATIC_EXPORT_SITE` se necessário) e regenera tudo.
