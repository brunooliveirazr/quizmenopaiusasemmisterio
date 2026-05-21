# Nova Tela 21: Diagnóstico Personalizado + Prova Social + Garantia

## Posicionamento no fluxo

Insere uma tela nova **entre o TimelinePage e a página educacional**. O fluxo final fica:

| Step | Tela | Status |
|---|---|---|
| 19 | ProcessingPage (loading) | inalterada |
| 20 | TimelinePage (gráfico animado) | inalterada — apenas o destino do timer muda |
| **21** | **NOVA: Diagnóstico + Prova Social + Garantia** | criada |
| 22 | ResultsPage (educacional com vídeos) | renumerada (era 21) |
| 23 | SalesPage (ofertas) | renumerada (era 22) |

## O que entra na nova Tela 21

### Seção 1 — Header
- Ícone 🎉, título "Seu Diagnóstico Personalizado está Pronto!", subtítulo "Baseado em suas respostas específicas".

### Seção 2 — Recap dinâmico (lê `localStorage.quizAnswers`)
Card rosa claro (`#FFF5F8`, borda `#E85D8C`, radius 12, padding 20). Bullets com fallback **"Não informado"** quando faltar dado:
- ✓ Sintoma principal — de `quizAnswers["1"].single`
- ✓ Faixa etária — de `quizAnswers["2"].single`
- ✓ Outros sintomas — de `quizAnswers["3"].multi` (até 3, com "+N" se houver mais)
- ✓ Nível de impacto — de `quizAnswers["6"].scale` → "X/10"
- ✓ Tipo de plano ideal — derivado (se impacto ≥7 → "Plano intensivo"; 4-6 → "Plano completo"; ≤3 → "Plano de manutenção")

### Seção 3 — Recomendação personalizada
Bullets derivados das respostas:
- ✓ Tempo disponível — de `quizAnswers["11"].single` (ou "Rotina flexível")
- ✓ Foco específico — usa o sintoma principal (Tela 1)
- ✓ Abordagem — de `quizAnswers["12"].single` (ou "Método guiado")
- ✓ Suporte estruturado — de `quizAnswers["17"].single` (ou "Acompanhamento contínuo")

Mensagem de transição: "Você descobriu como funcionava! Agora vem a solução..."

### Seção 4 — Prova social massiva
- **4A — 3 boxes em grid** (1 col mobile, 3 col ≥sm): 8.247 mulheres / 82% alívio em 7 dias / 21 dias de transformação média.
- **4B — 3 cards de depoimento** (Marina 52, Beatriz 48, Carla 51), com aspas itálicas, nome, ⭐⭐⭐⭐⭐. Background `#FFF5F8`, borda `#E0E0E0`, radius 8, padding 16.
- **4C — Rating geral**: ⭐⭐⭐⭐⭐ centralizadas + "4.8/5 baseado em 2.400+ avaliações".

### Seção 5 — Garantia incondicional
Caixa azul (`#E3F2FD`, `border-left: 4px solid #2196F3`, radius 8, padding 20):
- 🛡️ "30 DIAS DE GARANTIA INCONDICIONAL" (bold `#2196F3`)
- Checklist: Devolvemos 100%, Sem perguntas, Sem burocracia, Sem ressentimento.
- Frase itálica: "Isso é nosso compromisso com você."

### Seção 6 — CTA
- Botão `#E85D8C`, altura 56, full-width, radius 8: **"VER MINHA OFERTA PERSONALIZADA →"**
- Hover: `#D64B7A`, shadow mais forte.
- Sub-msg: "Sem compromisso. Escolha no seu ritmo."
- Navega para **`/quiz/22`** (página educacional, agora step 22).

### Seção 7 — Footer secundário
- Link sublinhado `#E85D8C`: "Voltar e refazer" → `/quiz/1`.

## Mudanças nos arquivos

**Único arquivo alterado:** `src/routes/quiz.$step.tsx`

1. Criar `function DiagnosticPage()` com toda a estrutura acima. Renderiza header com progress bar 100% e botão de voltar para `/quiz/20`.
2. No dispatcher `QuizStep`, atualizar:
   ```ts
   if (step === "20") return <TimelinePage />;
   if (step === "21") return <DiagnosticPage />;   // NOVO
   if (step === "22") return <ResultsPage />;       // era "21"
   if (step === "23") return <SalesPage />;         // era "22"
   ```
3. Em `TimelinePage`, manter o redirect para `step: "21"` (agora aponta para o DiagnosticPage — comportamento desejado).
4. Em `ResultsPage`:
   - Botão "Voltar" passa de `step: "20"` → `step: "21"` (volta para o diagnóstico).
   - `goToOptions` passa de `step: "22"` → `step: "23"` (vai para sales).
5. Em `SalesPage` e em qualquer outro lugar do arquivo que faça `navigate({ to: "/quiz/$step", params: { step: "22" } })` para a página de ofertas, trocar para `"23"`. Mesma coisa para "21" referente à página educacional (vira "22"). Vou auditar com `rg` antes de editar para pegar todas as ocorrências.

## Fora de escopo (mencionado, mas para depois)
- Refatoração de preços e âncoras de desconto na SalesPage.
- Renomear "R$ 1,99" para "Teste 7 dias".

## Como testar
1. Completar quiz até step 19 (processing) → 20 (timeline).
2. Após o timer, deve abrir a **nova Tela 21** com recap dinâmico.
3. Verificar que dados que faltam aparecem como "Não informado".
4. Clicar CTA → deve ir para `/quiz/22` (educacional com vídeos).
5. Clicar "VER OPÇÕES" na educacional → deve ir para `/quiz/23` (ofertas).
6. Botões "voltar" funcionam em cada tela.
