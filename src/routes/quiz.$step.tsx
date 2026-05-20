import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";

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
    subtitle: "Isso nos ajuda a personalizar seu plano.",
    options: [
      "Menos de 40 anos",
      "40 a 44 anos",
      "45 a 49 anos",
      "50 a 54 anos",
      "55 anos ou mais",
    ],
  },
};

function QuizStep() {
  const { step } = useParams({ from: "/quiz/$step" });
  const navigate = useNavigate();
  const stepNum = parseInt(step, 10) || 1;
  const q = QUESTIONS[step] ?? QUESTIONS["1"];
  const progress = (stepNum / TOTAL) * 100;

  const handleSelect = () => {
    const next = stepNum + 1;
    if (next > TOTAL) return;
    navigate({ to: "/quiz/$step", params: { step: String(next) } });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#FFE5ED] flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col px-4 pt-3 pb-10">
        {/* Progress */}
        <div>
          <div className="h-1 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E85D8C] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[12px] text-[#999] mt-1">
            {stepNum} / {TOTAL}
          </p>
        </div>

        {/* Question */}
        <div className="mt-10">
          <h1
            className="font-bold text-[24px] text-[#2C2C2C] text-center"
            style={{ lineHeight: 1.3 }}
          >
            {q.title}
          </h1>
          {q.subtitle && (
            <p className="text-[16px] text-[#666] mt-3 text-center">
              {q.subtitle}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="mt-8 flex flex-col gap-3">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={handleSelect}
              className="w-full text-left px-5 py-4 rounded-xl bg-white border-2 border-[#F0D5DD] hover:border-[#E85D8C] hover:bg-[#FFF0F5] transition-all text-[16px] text-[#2C2C2C] font-medium shadow-sm"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
