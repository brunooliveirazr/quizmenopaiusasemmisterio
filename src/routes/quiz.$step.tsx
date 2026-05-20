import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuizHeader } from "@/components/QuizHeader";

export const Route = createFileRoute("/quiz/$step")({
  component: QuizStep,
});

const TOTAL = 20;

type Popup = {
  icon: string;
  title: string;
  body: string;
};

type ScaleRangePopup = {
  min: number;
  max: number;
  popup: Popup;
};

type Question = {
  title: string;
  subtitle?: string;
  options: string[];
  multiSelect?: boolean;
  toastMessage?: string;
  gradientBg?: boolean;
  popups?: Record<string, Popup>;
  defaultPopup?: Popup;
  type?: 'scale';
  scalePopupRanges?: ScaleRangePopup[];
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
  "2": {
    title: "Em qual estágio você está?",
    subtitle: "(Isso é essencial para seu plano)",
    options: [
      "Pré-menopausa (ainda menstruo)",
      "Perimenopausa (irregular)",
      "Menopausa (parou há 1 ano)",
      "Pós-menopausa (parou há +1 ano)",
      "Não tenho certeza",
    ],
    toastMessage: "✓ Excelente! Já estamos identificando as soluções certas para você...",
  },
  "3": {
    title: "Selecione seus principais sintomas:",
    subtitle: "(Quanto mais você selecionar, melhor será a personalização)",
    multiSelect: true,
    options: [
      "Fogachos/Ondas de calor",
      "Insônia/Sono ruim",
      "Irritabilidade/Mudanças de humor",
      "Ganho de peso",
      "Confusão mental/Falta de foco",
      "Ressecamento vaginal",
      "Fadiga/Cansaço extremo",
      "Dores nas articulações",
    ],
  },
  "4": {

    title: "Você já tentou resolver isso antes?",
    gradientBg: true,
    options: [
      "Nunca tentei nada",
      "Tentei chás/vitaminas soltas",
      "Tentei academia/dieta",
      "Tentei medicação (HRT)",
      "Tentei TUDO. Nada funcionou.",
      "Testo coisas, mas desisto rápido",
    ],
    defaultPopup: {
      icon: "💡",
      title: "Anotado!",
      body: "Cada tentativa anterior nos ajuda a entender o que NÃO funciona para você — e a montar o plano certo a partir daqui.\n\nVamos continuar?",
    },
    popups: {
      "Nunca tentei nada": {
        icon: "✨",
        title: "Ótimo!",
        body: "Você ainda está no ponto zero.\nIsso significa que quando você implementar a solução certa, os resultados vão aparecer RÁPIDO.\n\nA maioria das mulheres que começa aqui vê mudanças em 7-14 dias. Você pode ser a próxima.\n\nVamos lá?",
      },
      "Tentei chás/vitaminas soltas": {
        icon: "🌿",
        title: "Faz sentido tentar...",
        body: "Chás e vitaminas isoladas até ajudam, mas raramente atacam a raiz hormonal.\n\nQuando a gente combina os elementos certos NA ORDEM CERTA, o efeito muda completamente.\n\nVamos descobrir sua combinação?",
      },
      "Tentei academia/dieta": {
        icon: "💪",
        title: "Academia e dieta são ótimos... MAS",
        body: "...quando a culpa é hormonal, nenhum agachamento do mundo resolve.\n\nA boa notícia? Quando você ALINHA os hormônios, tudo o mais fica fácil.\n\nVamos descobrir como fazer isso para VOCÊ especificamente. Continua?",
      },
      "Tentei medicação (HRT)": {
        icon: "💊",
        title: "Você já deu um passo grande.",
        body: "HRT funciona para muitas mulheres — mas precisa estar acompanhada de rotina, alimentação e suporte específico para você.\n\nVamos descobrir o que está faltando no seu plano.",
      },
      "Tentei TUDO. Nada funcionou.": {
        icon: "💔",
        title: "Eu entendo.",
        body: "Você já investiu tempo, dinheiro e esperança.\nE mesmo assim... nada colou.\n\nMas sabe o que descobri? O problema não é VOCÊ.\nÉ que você estava tentando soluções genéricas.\nVocê precisa de algo PERSONALIZADO.\n\nÉ exatamente isso que estamos montando agora. Vamos continuar?",
      },
      "Testo coisas, mas desisto rápido": {
        icon: "🌀",
        title: "Você não é \"sem força de vontade\".",
        body: "Você só nunca teve um plano simples o bastante para seguir.\n\nO que vamos montar aqui cabe na sua rotina — sem dietas malucas, sem 2h de academia, sem culpa.\n\nVamos continuar?",
      },
    },
  },
  "5": {
    title: "O que MAIS te frustra nos sintomas?",
    subtitle: "(Escolha o que mais impacta sua vida)",
    options: [
      "A exaustão. Acordar cansada.",
      "A irritabilidade. Estar de mau humor constante.",
      "A insegurança. Ganho de peso.",
      "A falta de foco. Confusão mental.",
      "O impacto no relacionamento. Libido em queda.",
      "Tudo junto. É um caos.",
    ],
    defaultPopup: {
      icon: "💡",
      title: "Anotado!",
      body: "Entendemos o que mais te frustra. Vamos construir o plano certo para isso.",
    },
    popups: {
      "A exaustão. Acordar cansada.": {
        icon: "😴",
        title: "Acordar cansada é um sinal...",
        body: "...de que seus hormônios estão pedindo ajuda.\nO pior? Você tenta descansar mais e AINDA assim acorda morta.\n\nQuando você alinha a rotina certa com seu corpo, essa exaustão some em dias.\n\nVocê merece acordar DISPOSTA. Vamos fazer isso acontecer?",
      },
      "A irritabilidade. Estar de mau humor constante.": {
        icon: "😤",
        title: "A irritabilidade destroi relacionamentos.",
        body: "Você sabe disso. E o pior é que você NÃO CONSEGUE CONTROLAR.\n\nNão é fraqueza sua. É química. Seus hormônios estão gritando.\n\nQuando você reequilibra, sua paciência volta.\nSeus relacionamentos melhoram. Você volta a ser VOCÊ.\n\nPronto para isso?",
      },
      "A insegurança. Ganho de peso.": {
        icon: "🪞",
        title: "Você não reconhece seu próprio corpo.",
        body: "Dietas extremas funcionam um tempo, aí volta tudo.\nA culpa é hormonal, não sua.\n\nQuando você alinha os hormônios, seu peso normaliza naturalmente. Sem loucura. Sem fome.\n\nVocê merece se sentir confiante de novo.",
      },
      "A falta de foco. Confusão mental.": {
        icon: "🧠",
        title: "A confusão mental é aterradora.",
        body: "Perder o fio da conversa, esquecer palavras simples, falta de concentração...\n\nVocê pensa que está enlouquecendo. MAS isso é neurohormonal.\nQuando você estabiliza os hormônios, a clareza volta rápido.\n\nSua mente ainda está lá. Apenas esperando você ativar.",
      },
      "O impacto no relacionamento. Libido em queda.": {
        icon: "💕",
        title: "A queda de libido afeta o casal.",
        body: "Você se sente desejável? Sente desejo?\n\nQuando os hormônios estão alinhados, tudo muda.\nVolta a diversão. Volta a conexão.\n\nVocê merece uma vida sexual plena também.\nVamos recuperar isso?",
      },
      "Tudo junto. É um caos.": {
        icon: "🌪️",
        title: "Você está em um caos hormonal total.",
        body: "Múltiplos sintomas atacando de uma vez.\nIsso é exaustivo.\n\nMAS sabe qual é a notícia BOA? Uma solução bem estruturada resolve MÚLTIPLOS sintomas de uma vez.\n\nVocê não precisa resolver um por um.\nUm reequilíbrio hormonal bem feito tira você do caos.",
      },
    },
  },
  "6": {
    title: "De 1 a 10: Quanto os sintomas",
    subtitle: "impactam seu dia a dia?",
    type: 'scale',
    gradientBg: true,
    options: [],
    scalePopupRanges: [
      {
        min: 1,
        max: 3,
        popup: {
          icon: "✨",
          title: "Ainda está leve, MAS...",
          body: "Você está aqui porque sabe que pode piorar.\nMelhor agir AGORA antes que fique insuportável.\n\nVocê está sendo inteligente. Vamos prevenir o pior.",
        },
      },
      {
        min: 4,
        max: 6,
        popup: {
          icon: "📈",
          title: "Isso está impactando sua qualidade de vida.",
          body: "Você merece estar melhor.\n\nA boa notícia? No seu nível, as soluções funcionam RÁPIDO.\nEm 2-3 semanas você já nota diferença.",
        },
      },
      {
        min: 7,
        max: 10,
        popup: {
          icon: "🆘",
          title: "Você está sofrendo.",
          body: "E isso HÁ QUANTO TEMPO?\n\nIsso acaba agora.\n\nAs mulheres que estavam no seu patamar reportam alívio significativo em 7-14 dias depois de começar.\n\nVocê TEM solução. E está bem aqui.",
        },
      },
    ],
  },
};

function QuizStep() {
  const { step } = useParams({ from: "/quiz/$step" });
  const navigate = useNavigate();
  const stepNum = parseInt(step, 10) || 1;
  const q = QUESTIONS[step] ?? QUESTIONS["1"];
  const progress = (stepNum / TOTAL) * 100;
  const isMulti = !!q.multiSelect;

  // single: string | null; multi: string[]
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activePopup, setActivePopup] = useState<Popup | null>(null);

  const [scaleValue, setScaleValue] = useState(5);

  useEffect(() => {
    setSelectedSingle(null);
    setSelectedMulti([]);
    setScaleValue(5);
    setShowToast(false);
    setShowError(false);
    setActivePopup(null);
  }, [step]);

  const goNext = () => {
    const next = stepNum + 1;
    if (next <= TOTAL) {
      navigate({ to: "/quiz/$step", params: { step: String(next) } });
    }
  };

  // Single-select handler (no auto-advance — user clicks PRÓXIMO)
  const handleSelectSingle = (opt: string) => {
    setSelectedSingle(opt);
    if (!q.popups && !q.defaultPopup) {
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 1800);
    }
  };

  // Multi-select handlers
  const toggleMulti = (opt: string) => {
    setShowError(false);
    setSelectedMulti((prev) =>
      prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]
    );
  };

  const handleContinue = () => {
    if (!hasSelection) {
      setShowError(true);
      window.setTimeout(() => setShowError(false), 2500);
      return;
    }
    // If this question has popups, show the contextual popup instead of advancing
    if (!isMulti && selectedSingle && (q.popups || q.defaultPopup)) {
      const popup = q.popups?.[selectedSingle] ?? q.defaultPopup;
      if (popup) {
        setActivePopup(popup);
        return;
      }
    }
    goNext();
  };

  const closePopupAndAdvance = () => {
    setActivePopup(null);
    goNext();
  };

  const goBack = () => {
    if (stepNum > 1) {
      navigate({ to: "/quiz/$step", params: { step: String(stepNum - 1) } });
    } else {
      navigate({ to: "/" });
    }
  };

  const hasSelection = isMulti ? selectedMulti.length > 0 : !!selectedSingle;

  return (
    <div
      className={`min-h-screen w-full flex justify-center ${
        q.gradientBg ? "bg-gradient-to-b from-white to-[#FFE5ED]" : "bg-white"
      }`}
    >
      <div className="w-full max-w-[480px] min-h-screen flex flex-col px-4 pt-6 pb-4">
        {/* Sticky progress + back */}
        <div className="sticky top-0 z-10 bg-white pb-2 -mx-4 px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              aria-label="Voltar"
              className="text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center"
            >
              ←
            </button>
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
        <div className="flex flex-col gap-3 flex-1">
          {q.options.map((opt) => {
            if (isMulti) {
              const checked = selectedMulti.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleMulti(opt)}
                  className={`w-full h-14 px-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-[16px] text-[#2C2C2C] ${
                    checked
                      ? "border-[#E85D8C] bg-[#FFE5ED] font-bold"
                      : "border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"
                  }`}
                >
                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      checked
                        ? "bg-[#E85D8C] border-[#E85D8C]"
                        : "bg-white border-[#E0E0E0]"
                    }`}
                  >
                    {checked && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            }

            const isSelected = selectedSingle === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelectSingle(opt)}
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

        {/* Sticky Continue button (always visible) */}
        <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-4 px-4">
          <button
            onClick={handleContinue}
            disabled={!hasSelection}
            className={`w-full h-14 rounded-xl font-bold text-[16px] text-white transition-all ${
              hasSelection
                ? "bg-[#E85D8C] hover:bg-[#D64B7A]"
                : "bg-[#E85D8C] opacity-50 cursor-not-allowed"
            }`}
          >
            {isMulti ? "CONTINUAR →" : "PRÓXIMO →"}
          </button>
        </div>

        {/* Toast (single select) */}
        {showToast && !isMulti && (
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#4CAF50] text-white px-4 py-4 rounded-lg text-[14px] shadow-lg animate-fade-in"
            style={{ opacity: 0.95 }}
          >
            {q.toastMessage ?? "✓ Perfeito! Estamos montando seu diagnóstico..."}
          </div>
        )}

        {/* Error tooltip */}
        {showError && (
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FF5252] text-white px-5 py-4 rounded-lg text-[14px] shadow-lg animate-fade-in"
            style={{ opacity: 0.95 }}
          >
            {isMulti ? "Selecione pelo menos um sintoma" : "Selecione uma opção para continuar"}
          </div>
        )}

        {/* Contextual popup modal */}
        {activePopup && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
            <div
              role="dialog"
              aria-modal="true"
              className="bg-white border-2 border-[#E85D8C] rounded-xl p-5 max-w-[320px] w-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center animate-fade-in"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              <div className="text-4xl mb-2">{activePopup.icon}</div>
              <h3 className="font-bold text-[18px] text-[#2C2C2C] mb-3">
                {activePopup.title}
              </h3>
              <p
                className="text-[14px] text-[#2C2C2C] whitespace-pre-line mb-5"
                style={{ lineHeight: 1.6 }}
              >
                {activePopup.body}
              </p>
              <button
                onClick={closePopupAndAdvance}
                className="w-full h-12 rounded-lg bg-[#E85D8C] hover:bg-[#D64B7A] text-white font-bold text-[15px] transition-colors"
              >
                OK, Continuar →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
