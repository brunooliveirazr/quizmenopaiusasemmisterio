## Objetivo

Substituir a foto da mulher (`hero-woman.jpg`) na capa inicial do quiz (rota `/`) pelo mockup do iPhone que você enviou.

## Passos

1. Copiar a imagem enviada para `src/assets/hero-mockup.jpg`.
2. Em `src/routes/index.tsx`:
   - Trocar o import `heroWoman from "@/assets/hero-woman.jpg"` por `heroMockup from "@/assets/hero-mockup.jpg"`.
   - Atualizar o `<img>` para usar a nova imagem e ajustar o `alt` para algo como "App Menopausa Sem Mistério".
   - Trocar `object-cover` por `object-contain` (o mockup é um celular vertical sobre fundo — `object-cover` cortaria as bordas), e remover o `rounded-b-3xl` que não combina com a foto de produto.
   - Ajustar a altura de `h-[60vh]` para algo proporcional ao mockup (provavelmente `h-[55vh]` com `bg-[#f5f3ee]` ao fundo para harmonizar com o tom da foto).
3. Deixar `hero-woman.jpg` no projeto (não deletar) caso você queira voltar atrás depois.

## Detalhes técnicos

- Arquivo afetado: `src/routes/index.tsx` (única alteração de código).
- Novo asset: `src/assets/hero-mockup.jpg`.
- Sem mudanças em lógica, rotas, quiz ou sales page.
