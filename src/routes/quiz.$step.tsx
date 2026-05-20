import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuizHeader } from "@/components/QuizHeader";

export const Route = createFileRoute("/quiz/$step")({
  component: QuizStep,
});

const TOTAL = 20;

type Question = {
  title: string;
  subtitle?: string;
  options: string[];
};

const QUESTIONS: Record<string, Question> = {
  "1": {
    title: "Qual é a sua faixa etária?",
    subtitle: "(Vamos calibrar o plano para você)",
    options: [
      "Até 40 anos",
      "41-45 anos",
      "46-50 anos",
      "51-55 anos",
      "Acima de 55 anos",
    ],
  },
};

function QuizStep() {
  const { step } = useParams({ from: "/quiz/$step" });
  const navigate = useNavigate();
  const stepNum = parseInt(step, 10) || 1;
  const q = QUESTIONS[step] ?? QUESTIONS["1"];
  const progress = (stepNum / TOTAL) * 100;

  const [selected, setSelected] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowToast(false);
  }, [step]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2000);
    window.setTimeout(() => {
      const next = stepNum + 1;
      if (next <= TOTAL) {
        navigate({ to: "/quiz/$step", params: { step: String(next) } });
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col px-4 py-6">
        {/* Sticky progress */}
        <div className="sticky top-0 z-10 bg-white pb-2 -mx-4 px-4">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E85D8C] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[12px] text-[#999] tabular-nums">
              {stepNum} / {TOTAL}
            </span>
          </div>
        </div>

        <QuizHeader />

        <h2 className="font-bold text-[20px] text-[#2C2C2C] mt-8 mb-2 text-center">
          {q.title}
        </h2>
        {q.subtitle && (
          <p className="text-[14px] text-[#999] text-center mb-8">
            {q.subtitle}
          </p>
        )}

        {/* Options */}
        <div className="flex flex-col gap-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full h-14 px-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between text-[16px] text-[#2C2C2C] ${
                  isSelected
                    ? "border-[#E85D8C] bg-[#FFE5ED] font-bold"
                    : "border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"
                }`}
              >
                <span>{opt}</span>
                {isSelected && (
                  <span className="text-[#E85D8C] text-lg font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Toast */}
        {showToast && (
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#4CAF50] text-white px-4 py-4 rounded-lg text-[14px] shadow-lg animate-fade-in"
            style={{ opacity: 0.95 }}
          >
            ✓ Perfeito! Estamos montando seu diagnóstico...
          </div>
        )}
      </div>
    </div>
  );
}
