import { createFileRoute, Link } from "@tanstack/react-router";
import heroWoman from "@/assets/hero-woman.jpg";
import { QuizHeader } from "@/components/QuizHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Menopausa Sem Mistério — Quiz" },
      {
        name: "description",
        content:
          "Descubra qual é o plano de menopausa ideal para o seu corpo em 3 minutos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#FFE5ED] flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col pb-32 relative">
        <QuizHeader />
        {/* Progress bar */}
        <div className="px-4 pt-1">
          <div className="h-1 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
            <div className="h-full bg-[#E85D8C] w-0" />
          </div>
        </div>

        {/* Hero image */}
        <img
          src={heroWoman}
          alt="Mulher confiante sorrindo"
          width={1024}
          height={1024}
          className="w-full h-[60vh] object-cover rounded-b-3xl mt-2"
        />

        {/* Content */}
        <div className="px-6 text-center">
          <h1
            className="font-bold text-[24px] text-[#2C2C2C] mt-6"
            style={{ lineHeight: 1.3 }}
          >
            Você não está "ficando louca".
            <br />
            O problema não é a sua idade.
            <br />
            São os seus hormônios.
          </h1>

          <p
            className="text-[16px] text-[#666] mt-3"
            style={{ lineHeight: 1.5 }}
          >
            Descubra qual é o plano de menopausa ideal para o SEU corpo em
            apenas 3 minutos.
          </p>

          <ul className="mt-5 space-y-2 text-left inline-block">
            {[
              "Diagnóstico personalizado",
              "Rotina guiada para seus sintomas",
              "Solução pronta em 3 minutos",
            ].map((b) => (
              <li
                key={b}
                className="text-[14px] text-[#2C2C2C] flex items-center gap-2"
              >
                <span className="text-[#4CAF50] font-bold">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none">
          <div className="w-full max-w-[480px] px-4 py-6 pointer-events-auto bg-gradient-to-t from-[#FFE5ED] via-[#FFE5ED]/90 to-transparent">
            <Link
              to="/quiz/1"
              className="flex items-center justify-center h-14 w-full rounded-xl bg-[#E85D8C] hover:bg-[#D64B7A] transition-colors text-white font-bold text-[16px]"
            >
              Começar o Quiz Agora →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
