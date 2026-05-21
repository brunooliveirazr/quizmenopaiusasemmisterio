# Refatoração TELA 22 (step 23 — SalesPage)

Único arquivo alterado: `src/routes/quiz.$step.tsx`, função `SalesPage`.

## Estrutura final

1. **Header** (manter): gradient `#FFFFFF → #FFE5ED`, título "Escolha a opção que faz mais sentido para você", subtítulo "Cada plano é personalizado para sua jornada".
2. **Contexto consultivo (novo)**: parágrafo 14px `#2C2C2C` — "Com base em seu diagnóstico, recomendamos o plano Premium. Mas cada mulher é diferente. Escolha no seu ritmo."
3. **2 Pricing cards** (Básico **removido**) — grid 1 col mobile, 2 cols ≥lg, gap 16px.
4. **Garantia 30 dias** (padronizada, era 7).
5. **Comparação rápida** (tabela simples Premium × VIP).
6. **FAQ** atualizado.
7. **Social proof** (4.8/5 + 8.247 mulheres).
8. **CTA final** suave.
9. **Footer legal** (manter).

## Card PREMIUM (destaque)

- Border `4px solid #E85D8C`, shadow rosa, badge "⭐ MAIS POPULAR".
- Ancoragem:
  - `~~de R$ 67,00~~` (14px, `#999`, line-through)
  - **R$ 19,90** (36px bold `#E85D8C`)
  - "Economiza R$ 47,10 (70% off)" — 13px bold `#4CAF50`
- Descrição: "Plano completo. Tudo que você precisa para transformar."
- Features:
  - ✓ Acesso vitalício ao app
  - ✓ Módulos Premium desbloqueados
  - ✓ Protocolos avançados & aprofundamento
  - ✓ ⭐ Mais escolhido por 67% das mulheres *(bold `#E85D8C`)*
- Botão gradient `#E85D8C → #FF8FB3`, altura 56, "SIM! QUERO COMEÇAR HOJE", hover `#D64B7A` + translateY(-2px).
- Sub: "Sua primeira experiência é garantida por 30 dias." (12px italic `#666`).

## Card VIP

- Background gradient `#FFFFFF → #F3E8FF`, border `3px solid #9333EA`, badge "👑 TRANSFORMAÇÃO TOTAL".
- Ancoragem:
  - `~~de R$ 147,00~~`
  - **R$ 47,00** (36px bold `#9333EA`)
  - "Economiza R$ 100,00 (68% off)" (verde)
  - "= 1 consulta com especialista (normalmente R$ 497)" (12px italic `#666`)
- Descrição: "Tudo do Premium + comunidade + consultora dedicada."
- Features:
  - ✓ Tudo do Premium +
  - ✓ Comunidade 24h (WhatsApp privado)
  - ✓ Consultora VIP (orientação personalizada)
  - ✓ Relatório para levar ao médico
  - ✓ Plano VIP 30 dias guiado
  - ✓ 👑 SUPORTE MÁXIMO *(bold `#9333EA`)*
- Botão `#9333EA`, "QUERO A TRANSFORMAÇÃO TOTAL", hover `#7E22CE` + translateY(-2px).
- Sub: "Você merece suporte máximo. Sua transformação é prioridade."

## Garantia 30 dias

Caixa `#E3F2FD` com `border-left: 4px solid #2196F3`:
- 🛡️ "30 DIAS DE GARANTIA INCONDICIONAL" (bold `#2196F3`)
- ✅ Devolvemos 100% do seu dinheiro
- ✅ Sem perguntas
- ✅ Sem burocracia
- ✅ Sem ressentimento
- "O risco é TODO nosso. Você tem nada a perder e tudo a ganhar."
- "Esse é nosso compromisso com você." (italic)

## Comparação rápida (Premium × VIP)

Tabela 2 colunas (sem coluna Básico):

```
Recurso              Premium   VIP
Acesso app              ✓       ✓
Rotina diária           ✓       ✓
Módulos Premium         ✓       ✓
Comunidade 24h          —       ✓
Consultora VIP          —       ✓
Relatório médico        —       ✓
```

Checks `#4CAF50`, traços `#E0E0E0`, 12px center.

## FAQ (Accordion existente, reescrito)

- "Qual a diferença entre Premium e VIP?" → Premium tem tudo p/ transformar; VIP adiciona comunidade + consultora + acompanhamento. 67% escolhem Premium.
- "Quanto tempo até ver resultado?" → 7-14 dias diferença, 21-30 dias transformação visível.
- "E se não gostar?" → Garantia 30 dias, dinheiro de volta sem perguntas.
- "Por que ficou mais caro?" → Não é mais caro, é mais justo. Antes estava abaixo do valor real; agora a ancoragem mostra a economia.
- "Posso fazer upgrade depois?" → Sim, compre Premium e expanda para VIP depois, dados ficam.

## Social proof + CTA final + Footer

- Caixa `#FFF5F8` border `#E85D8C`: ⭐⭐⭐⭐⭐ "4.8/5 baseado em 2.400+ avaliações reais" + "8.247 mulheres já começaram este mês" (bold `#E85D8C`).
- CTA final: gradient `#FFE5ED → #FFFFFF`, mensagem "Qual é a sua escolha? ..." + botão `#E85D8C` "ESCOLHA SEU PLANO AGORA" (rola para os cards / dispara seleção Premium).
- Footer legal `#F5F5F5`: copyright + disclaimer médico + links Termos | Privacidade | Contato.

## Implementação técnica

- Localizar `function SalesPage()` em `src/routes/quiz.$step.tsx`.
- Remover JSX do card Básico e qualquer state/handler exclusivo (`selected === "basic"` etc.).
- Reescrever cards Premium e VIP com a nova ancoragem (preço antigo, preço novo, savings, comparação).
- Atualizar bloco de garantia: trocar "7 dias" por "30 DIAS" em todos os textos.
- Atualizar FAQ accordion com os 5 Q&As acima (mantém componente, troca conteúdo).
- Grid responsivo: `grid-cols-1 lg:grid-cols-2` para os cards.
- Manter design tokens: usar cores hex inline conforme o brief (já é o padrão atual da SalesPage).
- Sem mudanças em outros steps, sem mudanças de rota, sem novos arquivos.

## Fora de escopo
- Integração de pagamento real / Stripe.
- A/B test de preços.
- Mudanças em telas 1–22.

## Como testar
1. Ir até `/quiz/23`.
2. Verificar: 2 cards (sem Básico), ancoragem visível (riscado + preço novo + savings verde), badges, garantia "30 DIAS", FAQ com 5 perguntas, social proof e CTA final.
3. Verificar responsivo mobile (cards empilhados) e desktop (2 colunas).
4. Botões Premium/VIP continuam disparando o fluxo de checkout existente.
