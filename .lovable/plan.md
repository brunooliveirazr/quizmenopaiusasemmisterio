# TELA 22 — Ajustes finais sobre a versão atual

Único arquivo: `src/routes/quiz.$step.tsx` (apenas `CONSULTIVE_PLANS`, `CONSULTIVE_FAQ`, seção de comparação, social proof e CTA final).

## Card Premium
- Ribbon: `⭐ RECOMENDADO` (era `⭐ MAIS POPULAR`).
- Descrição: "Tudo que você precisa para transformar sua vida."
- Features (8 itens, último em destaque rosa):
  1. Acesso completo ao app
  2. Rotina diária personalizada
  3. Check-ins e acompanhamento
  4. Conteúdo de leitura completo
  5. Módulos Premium desbloqueados
  6. Protocolos avançados & aprofundamento
  7. Acesso vitalício
  8. ⭐ Escolhido por 67% das mulheres *(bold `#E85D8C`)*
- CTA: `SIM! QUERO O PREMIUM`.
- Sub-CTA: "Transformação em 21-30 dias. 30 dias de garantia."

## Card VIP
- Descrição: "Premium + comunidade + consultora dedicada + acompanhamento."
- Features (7 itens, últimos 2 em destaque roxo):
  1. Tudo do Premium +
  2. Comunidade 24h (WhatsApp privado)
  3. Consultora VIP (orientação personalizada)
  4. Relatório para levar ao médico
  5. Plano VIP 30 dias guiado
  6. Acompanhamento mensal *(bold `#9333EA`)*
  7. 👑 SUPORTE MÁXIMO *(bold `#9333EA`)*
- Sub-CTA: "Você merece suporte máximo. 30 dias de garantia."
- (Preço, ancoragem, comparison e ribbon já corretos.)

## Comparação rápida
- Título: `O que você recebe:` (era `Diferenças rápidas:`).
- Linhas:
  - Acesso app completo — ✓ / ✓
  - Rotina personalizada — ✓ / ✓
  - Módulos premium — ✓ / ✓
  - Comunidade 24h — — / ✓
  - Consultora VIP — — / ✓
  - Acompanhamento mensal — — / ✓

## FAQ (6 perguntas)
1. **Qual a diferença entre Premium e VIP?** — "Premium é o plano completo com tudo que você precisa para transformar. VIP é Premium + comunidade + consultora dedicada + acompanhamento mensal. Escolha Premium se prefere autonomia. Escolha VIP se quer máximo suporte."
2. **Quanto tempo até ver resultado?** — "7-14 dias você sente diferença nos sintomas. 21-30 dias transformação visível."
3. **E se não gostar?** — "Garantia incondicional de 30 dias. Seu dinheiro volta, sem perguntas. Menos de 2% das mulheres usam essa garantia."
4. **Por que não tem plano mais barato?** — "Oferecemos apenas 2 planos porque queremos qualidade, não quantidade. Ambos têm acesso completo ao app e método. A diferença é suporte: Premium é autonomia, VIP é comunidade + consultora."
5. **Posso fazer upgrade depois?** — "Sim. Comece com Premium, depois expanda para VIP. Seus dados ficam salvos."
6. **Como funciona o pagamento?** — "Um pagamento único. Sem mensalidade. Acesso vitalício."

## Social Proof
Acrescentar 2 stats abaixo do "8.247 mulheres já começaram":
- "82% veem alívio em 7 dias" (bold `#4CAF50`)
- "67% escolhem Premium" (bold `#E85D8C`)

## CTA Final
Expandir mensagem:
"Você pode continuar como está. Acordando cansada. Sem reconhecer a si mesma.
Ou começar SUA transformação AGORA.
Os primeiros passos são os mais importantes."
(Botão e sub-mensagem permanecem.)

## Fora de escopo
- Header, contexto consultivo, bloco de garantia 30 dias e footer já estão corretos — sem alterações.
- Sem mexer em outras telas, rotas ou checkouts.

## Como testar
1. Ir até `/quiz/23`.
2. Conferir ribbons, copy dos botões, 8 features no Premium, 7 no VIP, comparação 2 colunas com 6 linhas, FAQ com 6 perguntas, 3 stats no social proof e nova mensagem no CTA final.
