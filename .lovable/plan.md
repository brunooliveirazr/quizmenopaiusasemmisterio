# Refatoração da Tela 1 do Quiz

## Objetivo

A primeira pergunta deixa de ser fria ("faixa etária") e passa a validar a dor da lead com identificação imediata por sintoma. Idade vai para a Tela 2 e a antiga Tela 3 (multi-sintomas) passa a coletar apenas sintomas adicionais.

## Mudanças no `src/routes/quiz.$step.tsx`

### Tela 1 — NOVA: sintoma principal (single-select)

- Título: **"Qual desses sintomas está te incomodando mais AGORA?"**
- Subtítulo: "Sua resposta é importante para entender seu corpo"
- 6 opções single-select, cada uma com emoji + subtítulo:
  1. 🔥 Fogachos e suores noturnos — *Acordar encharcada, calor intenso*
  2. 😴 Insônia e cansaço crônico — *Dormir mal, acordar sem energia*
  3. 😰 Humor, ansiedade e irritabilidade — *Sentir emoções intensas sem razão*
  4. ⚖️ Ganho de peso e barriga — *Corpo mudando mesmo sem comer diferente*
  5. 💇 Queda de cabelo, pele seca — *Cabelo caindo, pele ressecada*
  6. 🆘 Todos esses sintomas ao mesmo tempo — *Vários sintomas juntos me incomodam*
- Usa os campos já existentes do tipo `Question`: `optionIcons`, `optionSubtitles`.
- Sem popup (entrada rápida; popups seguem nas telas estratégicas já configuradas).

### Tela 2 — agora "faixa etária"

- Move o conteúdo atual da Tela 1 (faixa etária, 5 opções) para a chave `"2"`.
- Mantém o `toastMessage` motivacional que estava na Tela 2 atual ("✓ Excelente! Já estamos identificando...") — pode reaproveitar nessa nova Tela 2 de idade para manter o ritmo emocional. *Decisão final pode ficar a critério do conteúdo.*
- O estágio (pré/peri/menopausa) que era a Tela 2 atual passa para Tela 3.

### Tela 3 — "outros sintomas" (multi)

- Título atual ("Selecione seus principais sintomas") vira:
**"Além desse, quais outros sintomas você sente?"**
- Subtítulo: "(Selecione todos que se aplicam — quanto mais, melhor a personalização)"
- Filtra a opção já escolhida na Tela 1, exibindo as 8 opções restantes (mapeamento entre sintoma "principal" → opção equivalente da lista multi).
- Continua `multiSelect: true`.

### Demais telas

- Telas 4–20: **sem alteração** de conteúdo.
- `POPUP_STEPS` permanece `{4,6,7,8,10,12,15,17}` (alinhado com a nova numeração, já que apenas as Telas 1–3 mudam de papel, não de posição).
- `TOTAL = 20` permanece.

## Detalhes técnicos

- O componente `QuizStep` já lê `optionIcons` e `optionSubtitles` para renderizar botões com emoji + subtítulo. Confirmar o estilo visual existente — se já estiver alinhado ao design system (#E85D8C, gradiente rosa, border-radius 12, hover/selected states), nenhuma mudança de CSS é necessária.
- Persistência: as respostas já são salvas em `localStorage` por step. Renomear chaves não é necessário.
- Para filtrar a Tela 3 com base na Tela 1, ler `localStorage.getItem("quiz-1")` dentro do `QuizStep` quando `step === "3"` e remover a opção correspondente.

## Mapeamento Tela 1 → opção da Tela 3 a remover


| Tela 1 (sintoma principal)             | Remover da Tela 3                              |
| -------------------------------------- | ---------------------------------------------- |
| 🔥 Fogachos e suores noturnos          | "Fogachos/Ondas de calor"                      |
| 😴 Insônia e cansaço crônico           | "Insônia/Sono ruim" + "Fadiga/Cansaço extremo" |
| 😰 Humor, ansiedade e irritabilidade   | "Irritabilidade/Mudanças de humor"             |
| ⚖️ Ganho de peso e barriga             | "Ganho de peso"                                |
| 💇 Queda de cabelo, pele seca          | (nenhuma equivalente — não filtra)             |
| 🆘 Todos esses sintomas ao mesmo tempo | (nenhuma — mostra a lista completa)            |


## Arquivos alterados

- `src/routes/quiz.$step.tsx` (única alteração necessária — apenas o objeto `QUESTIONS` e um pequeno filtro condicional para a Tela 3).

## Fora de escopo

- Export estático (`scripts/export-static.mjs`) — será regerado quando você rodar `npm run export:static:zip` após a mudança.
- Mudanças nas Telas 4–20.  
  
Seu plano está **95% CORRETO**, apenas **3 ajustes pequenos**:

  | #     | Ajuste                  | Seu plano                     | Recomendação                   |
  | ----- | ----------------------- | ----------------------------- | ------------------------------ |
  | **1** | Toast Tela 2 (idade)    | Reutilizar "identificando..." | Usar toast simples ou nenhum   |
  | **2** | Filtro Tela 3 (insônia) | Remove só "insônia/sono"      | Remove AMBAS: insônia + fadiga |
  | **3** | Progress bar            | Não menciona formato          | Confirmar "Pergunta X de 20"   |
