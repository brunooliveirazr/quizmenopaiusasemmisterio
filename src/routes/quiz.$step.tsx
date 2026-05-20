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

type CountRangePopup = {
  min: number;
  max: number;
  popup: (count: number) => Popup;
};

type TextQuestionConfig = {
  placeholder: string;
  min?: number;
  max?: number;
  errorMessage?: string;
  allowDecimal?: boolean;
};

type Question = {
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  titleEnd?: string;
  options: string[];
  multiSelect?: boolean;
  multiSelectOptional?: boolean;
  toastMessage?: string;
  gradientBg?: boolean;
  popups?: Record<string, Popup>;
  defaultPopup?: Popup;
  type?: 'scale' | 'text';
  scalePopupRanges?: ScaleRangePopup[];
  countPopupRanges?: CountRangePopup[];
  optionIcons?: Record<string, string>;
  titleColor?: string;
  optionSubtitles?: Record<string, string>;
  textConfig?: TextQuestionConfig;
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
        title: 'Você não é "sem força de vontade".',
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
  "7": {
    title: "Quantas noites por semana você dorme MAL?",
    options: [
      "Quase toda noite (5-7 noites)",
      "Maioria das noites (3-4 noites)",
      "Algumas noites (1-2 noites)",
      "Durmo bem, mas acordar é uma luta (letargia)",
      "Meu sono é ok",
    ],
    popups: {
      "Quase toda noite (5-7 noites)": {
        icon: "🚨",
        title: "Você está perdendo 35-49 horas de sono por semana.",
        body: "Sabe o que isso significa? Você está operando como um zumbi.\nSeu corpo está pedindo SOCORRO.\n\nMas aqui está a boa notícia: sono ruim é UM dos sintomas mais RÁPIDOS de resolver quando você alinha os hormônios.\n\nAlgumas mulheres dormem BEM na primeira noite.\n\nVocê pode ser uma delas.",
      },
      "Maioria das noites (3-4 noites)": {
        icon: "😪",
        title: "Você está perdendo 15-28 horas de sono por mês.",
        body: "Isso acumula. Seu corpo está exausto.\n\nMas a recuperação também é rápida.\nQuando você implementa o protocolo certo,\no sono melhora DRASTICAMENTE em dias.",
      },
      "Algumas noites (1-2 noites)": {
        icon: "🌙",
        title: "Pelo menos não é toda noite.",
        body: "Mas essas 1-2 noites ruins por semana acumulam cansaço.\n\nA boa notícia? Com alguns ajustes simples nos hormônios,\nvocê dorme perfeitamente toda noite.",
      },
      "Durmo bem, mas acordar é uma luta (letargia)": {
        icon: "😴",
        title: "Você tem letargia (dormência excessiva).",
        body: "Consegue dormir, mas acordar é um inferno.\nPeso nos membros, confusão ao acordar...\n\nIsso é hormonal. Quando você estabiliza, o despertar\nfica fácil e você acorda CHEIA DE ENERGIA.",
      },
      "Meu sono é ok": {
        icon: "✅",
        title: "Ótimo! Você tem esse aspecto controlado.",
        body: "Mas se os outros sintomas estão te afetando,\neles podem começar a afetar o sono em breve.\n\nMelhor reequilibrar agora e manter o sono bom.",
      },
    },
  },
  "8": {
    title: "Qual é seu maior MEDO em relação à menopausa?",
    gradientBg: true,
    titleColor: "#E85D8C",
    options: [
      "Que nunca vai passar",
      "Que vou ficar gorda/desatraente",
      "Que perdi meu 'auge'",
      "Que vou ficar louca/deprimida",
      "Que vou precisar de medicação",
      "Que nunca mais serei a mesma",
    ],
    optionIcons: {
      "Que nunca vai passar": "⏰",
      "Que vou ficar gorda/desatraente": "🪞",
      "Que perdi meu 'auge'": "👑",
      "Que vou ficar louca/deprimida": "🧠",
      "Que vou precisar de medicação": "💊",
      "Que nunca mais serei a mesma": "😔",
    },
    popups: {
      "Que nunca vai passar": {
        icon: "💫",
        title: "Medo de ser PERMANENTE.",
        body: "Mas aqui está a verdade: menopausa é uma TRANSIÇÃO.\nNão é uma prisão.\n\nQuando você ALINHA seu corpo com um método estruturado,\nvocê atravessa essa transição com alívio, não com sofrimento.\n\nMulheres saem desse estado em semanas, não em anos.\nVocê também pode.",
      },
      "Que vou ficar gorda/desatraente": {
        icon: "💗",
        title: "Medo de perder sua sexualidade e atratividade.",
        body: "Aqui está a realidade: mulheres na menopausa são LINDAS.\nO problema não é a idade. É o DESEQUILÍBRIO hormonal.\n\nQuando você reequilibra, você volta a se sentir\nsexy, confiante e DESEJÁVEL.\n\nSeu corpo continua seu. Você apenas volta a ter controle.",
      },
      "Que perdi meu 'auge'": {
        icon: "✨",
        title: "O mito de que mulheres 'viram velhas' é FALSO.",
        body: "Você não perdeu seu auge. Você está entrando em um NOVO capítulo.\n\nMulheres depois de 45-50 anos dizem que se sentem mais\nCONFIANTES, mais CERTAS DE SI MESMAS e mais VIVAS.\n\nEsse é o auge REAL.\n\nVamos te levar até lá?",
      },
      "Que vou ficar louca/deprimida": {
        icon: "🌈",
        title: "O medo de perder o controle emocional é real.",
        body: "Mas é justamente porque é hormonal que EXISTE solução.\n\nQuando você reequilibra, a estabilidade emocional volta.\nSeu humor volta. Você volta a se reconhecer.\n\nEsse não é um caminho sem volta. É um caminho com saída.",
      },
      "Que vou precisar de medicação": {
        icon: "🌿",
        title: "Medo de virar dependente de hormônios sintéticos.",
        body: "Entendo o medo. MAS existem muitas outras formas\nde reequilibrar sem medicação pesada.\n\nMétodo estruturado, rotina, nutrição, sono, estresse...\nTudo isso muda os hormônios NATURALMENTE.\n\nMedicação é uma opção. Existem outras. Você escolhe.",
      },
      "Que nunca mais serei a mesma": {
        icon: "🦋",
        title: "Você está certa. Nunca mais será a mesma.",
        body: "Porque você vai ser MELHOR.\n\nVocê vai ser mais sábia, mais confiante, mais você mesma.\nA menopausa não é morte de identidade. É transformação.\n\nE transformação, quando bem guiada, é libertadora.\n\nVamos transformar você em algo melhor?",
      },
    },
  },
  "9": {
    title: "Se você tivesse um método que se",
    subtitle: "adaptasse EXATAMENTE ao seu perfil,",
    titleEnd: "você seguiria?",
    gradientBg: true,
    options: [
      "Sim, com certeza",
      "Depende, como funciona?",
      "Talvez, se fosse fácil",
      "Não acredito que funcione para mim",
    ],
    popups: {
      "Sim, com certeza": {
        icon: "🎯",
        title: "PERFEITO!",
        body: "Você é exatamente o tipo de pessoa que tem sucesso.\n\nPessoas que sabem que precisam de algo personalizado\n(não genérico) são as que MAIS conseguem resultados.\n\nVocê está no caminho certo. Vamos continuar?",
      },
      "Talvez, se fosse fácil": {
        icon: "💡",
        title: "Você quer algo que FUNCIONE mas que NÃO EXIJA MUITO.",
        body: "Ótima notícia: o método que estamos montando para você\né feito para ser executável em 10-15 minutos por dia.\n\nSimples. Eficaz. Sustentável.\n\nVamos?",
      },
      "Depende, como funciona?": {
        icon: "🤔",
        title: "Pergunta inteligente.",
        body: "Você quer saber COMO funciona antes de comprometer.\n\nExcelente. Suas respostas estão nos ajudando a construir\nexatamente o método que faz sentido para você.\n\nContinue respondendo. Logo te mostramos tudo.",
      },
      "Não acredito que funcione para mim": {
        icon: "🤝",
        title: "Você foi decepcionada antes. EU ENTENDO.",
        body: "Mas pense comigo: você já viu alguém com sucesso\nusando uma estratégia GENÉRICA que não foi feita para eles?\n\nClaro que não. Sucesso sempre vem de personalização.\n\nVocê merece tentar algo que foi FEITO para você, não para\n'todo mundo'.\n\nVamos ver se dessa vez é diferente?",
      },
    },
  },
  "10": {
    title: "Imagina acordar e você:",
    subtitle: "(Selecione as vitórias que você quer)",
    subtitleColor: "#E85D8C",
    multiSelect: true,
    multiSelectOptional: true,
    options: [
      "💤 Dormiu a noite INTEIRA, acordou descansada",
      "🔥 Não teve fogacho",
      "⚡ Tem ENERGIA para o dia",
      "🪞 Se sente linda no espelho",
      "❤️ Quer seu parceiro / sente desejo",
      "🧠 Consegue se focar no trabalho",
      "😊 Está de bom humor",
      "🎮 Sente controle sobre seu corpo",
    ],
    countPopupRanges: [
      {
        min: 0,
        max: 1,
        popup: () => ({
          icon: "💭",
          title: "Você quer algo específico.",
          body: "Perfeito. Sua solução será altamente focada.\n\nVamos continuar montando seu método personalizado.",
        }),
      },
      {
        min: 2,
        max: 4,
        popup: (count) => ({
          icon: "🎯",
          title: `Essas ${count} vitórias são poderosas.`,
          body: "São EXATAMENTE o que mulheres que seguem o método conseguem em 21-30 dias.\n\nNão é promessa mágica. São resultados REAIS de mulheres como você que já passaram por aqui.\n\nVocê quer estar nessa lista em 30 dias?",
        }),
      },
      {
        min: 5,
        max: 8,
        popup: (count) => ({
          icon: "🌟",
          title: "Você quer TUDO. E merece tudo.",
          body: `${count} vitórias. Isso é ambicioso, mas REALIZÁVEL.\n\nMulheres que chegam aqui com essa determinação conseguem a maioria (senão todas) essas vitórias em 60 dias.\n\nVocê vai ser uma delas. Vamos lá?`,
        }),
      },
    ],
  },
  "11": {
    title: "Quanto tempo você consegue dedicar por dia a uma rotina?",
    gradientBg: true,
    options: [
      "5 minutos (só o essencial)",
      "10-15 minutos (rotina rápida)",
      "20-30 minutos (posso investir bem)",
      "1 hora (sou dedicada)",
      "Múltiplas vezes ao dia",
    ],
    optionIcons: {
      "5 minutos (só o essencial)": "⏱️",
      "10-15 minutos (rotina rápida)": "⏱️",
      "20-30 minutos (posso investir bem)": "⏱️",
      "1 hora (sou dedicada)": "⏱️",
      "Múltiplas vezes ao dia": "⏱️",
    },
    popups: {
      "5 minutos (só o essencial)": {
        icon: "⚡",
        title: "Perfeito. Ultra-rápido.",
        body: "O método tem uma versão ULTRA-RÁPIDA.\n5 minutos é o suficiente quando é bem estruturado.\n\nQualidade > Quantidade.\n\nVamos montar sua versão de 5 minutos.",
      },
      "10-15 minutos (rotina rápida)": {
        icon: "🎯",
        title: "Esse é o SWEET SPOT.",
        body: "10-15 minutos é o tempo ideal para rotina consistente\nque FUNCIONA.\n\nNem tão pouco que fica ineficaz.\nNem tanto que você cansa e desiste.\n\nVamos estruturar exatamente para isso.",
      },
      "20-30 minutos (posso investir bem)": {
        icon: "📈",
        title: "Você está investindo DIREITO.",
        body: "20-30 minutos permite aprofundamento real.\n\nCom esse tempo, você consegue combinar meditação,\nexercício, nutrição e mindfulness.\n\nSeu resultado vai ser MULTIPLICADO.",
      },
      "1 hora (sou dedicada)": {
        icon: "💪",
        title: "Você é DEDICADA.",
        body: "Com 1 hora por dia, você pode ter um método\npraticamente completo, variado e sustentável.\n\nSuas chances de sucesso são altíssimas.",
      },
      "Múltiplas vezes ao dia": {
        icon: "🔥",
        title: "Você quer MÁXIMA transformação.",
        body: "Perfeito. Vamos estruturar um método que você\nexecuta em pequenas doses ao longo do dia.\n\nMais frequência = Mais neuroplasticidade = Mais rápido\nvocê muda.",
      },
    },
  },
  "12": {
    title: "Você prefere:",
    options: [
      "Um plano RÁPIDO/AÇÃO",
      "Um plano COMPLETO/EDUCAÇÃO",
      "Um plano BALANCEADO",
    ],
    optionIcons: {
      "Um plano RÁPIDO/AÇÃO": "🚀",
      "Um plano COMPLETO/EDUCAÇÃO": "📚",
      "Um plano BALANCEADO": "⚖️",
    },
    optionSubtitles: {
      "Um plano RÁPIDO/AÇÃO": "(protocolos diretos e práticos)",
      "Um plano COMPLETO/EDUCAÇÃO": "(entender tudo de trás pra frente)",
      "Um plano BALANCEADO": "(pouco de tudo)",
    },
    popups: {
      "Um plano RÁPIDO/AÇÃO": {
        icon: "⚡",
        title: "Você é prática.",
        body: "Quer resultados RÁPIDO. Sem enrolação.\n\nSeu plano personalizado vai ser estruturado\nEXATAMENTE assim: protocolos diretos, sem conteúdo\ndesnecessário.\n\nNada de encher linguiça. Só ação.",
      },
      "Um plano COMPLETO/EDUCAÇÃO": {
        icon: "🧠",
        title: "Você quer ENTENDER.",
        body: "Não quer apenas seguir. Quer saber o POR QUE.\n\nSeu plano vai incluir toda a educação hormonal,\nciência por trás dos protocolos, e contexto completo.\n\nVocê vai ser uma ESPECIALISTA em sua própria saúde.",
      },
      "Um plano BALANCEADO": {
        icon: "⚖️",
        title: "Você quer o melhor dos dois mundos.",
        body: "Excelente. Seu plano vai ter:\n- Educação suficiente para entender\n- Ação suficiente para executar rapidamente\n\nBalanceado. Eficiente. Sustentável.",
      },
    },
  },
  "13": {
    title: "Qual é sua altura?",
    subtitle: "(Em cm ou metros)",
    gradientBg: true,
    type: 'text',
    options: [],
    textConfig: {
      placeholder: "Exemplo: 165 ou 1,65",
      min: 140,
      max: 210,
      errorMessage: "Altura deve estar entre 140 e 210 cm",
      allowDecimal: true,
    },
  },
  "14": {
    title: "Qual é seu peso atual?",
    subtitle: "(Em kg)",
    type: 'text',
    options: [],
    textConfig: {
      placeholder: "Exemplo: 75 ou 75,5",
      min: 40,
      max: 200,
      errorMessage: "Peso deve estar entre 40 e 200 kg",
      allowDecimal: true,
    },
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
  const [textValue, setTextValue] = useState("");
  const [textError, setTextError] = useState(false);

  useEffect(() => {
    setSelectedSingle(null);
    setSelectedMulti([]);
    setScaleValue(5);
    setTextValue("");
    setTextError(false);
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
    // Multi-select with count-based popups
    if (isMulti && q.countPopupRanges) {
      const count = selectedMulti.length;
      const range = q.countPopupRanges.find((r) => count >= r.min && count <= r.max);
      if (range) {
        setActivePopup(range.popup(count));
        return;
      }
    }
    // If this question has scale popup ranges, show the matching popup
    if (q.type === 'scale' && q.scalePopupRanges) {
      const range = q.scalePopupRanges.find(
        (r) => scaleValue >= r.min && scaleValue <= r.max
      );
      if (range) {
        setActivePopup(range.popup);
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

  const hasSelection =
    q.type === 'scale' || q.multiSelectOptional
      ? true
      : isMulti
      ? selectedMulti.length > 0
      : !!selectedSingle;
  const showMultiHint = isMulti && q.multiSelectOptional && selectedMulti.length < 2;

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

        {q.type === 'scale' ? (
          <>
            <h2 className="font-bold text-[20px] text-[#2C2C2C] mt-8 mb-0 text-center">
              {q.title}
            </h2>
            <h2 className="font-bold text-[20px] text-[#E85D8C] mb-8 text-center">
              {q.subtitle}
            </h2>
          </>
        ) : (
          <>
            <h2
              className="font-bold text-[20px] mt-8 mb-0 text-center"
              style={{ color: q.titleColor || "#2C2C2C" }}
            >
              {q.title}
            </h2>
            {q.subtitle && (
              <h2 className="font-bold text-[20px] text-[#E85D8C] text-center mt-0 mb-0">
                {q.subtitle}
              </h2>
            )}
            {q.titleEnd && (
              <h2
                className="font-bold text-[20px] text-center mt-0 mb-8"
                style={{ color: q.titleColor || "#2C2C2C" }}
              >
                {q.titleEnd}
              </h2>
            )}
            {!q.titleEnd && q.subtitle && (
              <p
                className="text-[14px] text-center mb-8"
                style={{ color: q.subtitleColor || "#999" }}
              >
                {q.subtitle}
              </p>
            )}
          </>
        )}

        {/* Options / Scale */}
        <div className="flex flex-col flex-1">
          {q.type === 'scale' ? (
            <div className="flex flex-col items-center justify-center flex-1">
              {/* Large number display */}
              <div className="text-[48px] font-bold text-[#E85D8C] mb-4">
                {scaleValue}
              </div>

              {/* Range slider */}
              <div className="w-full px-2 mb-6">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={scaleValue}
                  onChange={(e) => setScaleValue(parseInt(e.target.value, 10))}
                  className="w-full h-10 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFB3D9 0%, #E85D8C ${(scaleValue - 1) / 9 * 100}%, #E0E0E0 ${(scaleValue - 1) / 9 * 100}%, #E0E0E0 100%)`,
                    borderRadius: '20px',
                    height: '8px',
                  }}
                />
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #E85D8C;
                    border: 3px solid #FFFFFF;
                    box-shadow: 0 2px 8px rgba(232, 93, 140, 0.3);
                    cursor: pointer;
                    transition: transform 0.15s ease;
                    margin-top: -12px;
                  }
                  input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #E85D8C;
                    border: 3px solid #FFFFFF;
                    box-shadow: 0 2px 8px rgba(232, 93, 140, 0.3);
                    cursor: pointer;
                    transition: transform 0.15s ease;
                  }
                  input[type="range"]::-moz-range-thumb:hover {
                    transform: scale(1.1);
                  }
                  input[type="range"]::-webkit-slider-runnable-track {
                    height: 8px;
                    border-radius: 20px;
                  }
                  input[type="range"]::-moz-range-track {
                    height: 8px;
                    border-radius: 20px;
                  }
                `}</style>
              </div>

              {/* Emoji labels */}
              <div className="flex justify-between w-full px-2 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-[24px]">😊</span>
                  <span className="text-[12px] text-[#999] mt-1">1 - Leve</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[24px]">😭</span>
                  <span className="text-[12px] text-[#999] mt-1">10 - Insuportável</span>
                </div>
              </div>
            </div>
          ) : (
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
                const icon = q.optionIcons?.[opt];
                const subtitle = q.optionSubtitles?.[opt];
                const btnHeight = subtitle ? "min-h-[70px] py-3" : "h-14";
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectSingle(opt)}
                    className={`w-full ${btnHeight} px-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between text-[16px] text-[#2C2C2C] ${
                      isSelected
                        ? "border-[#E85D8C] bg-[#FFE5ED] font-bold"
                        : "border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"
                    }`}
                  >
                    <span className="flex flex-col items-start gap-0.5">
                      <span className="flex items-center gap-3">
                        {icon && <span className="text-[20px]">{icon}</span>}
                        <span>{opt}</span>
                      </span>
                      {subtitle && (
                        <span className={`text-[13px] text-[#999] font-normal ${icon ? 'pl-8' : ''}`}>
                          {subtitle}
                        </span>
                      )}
                    </span>
                    {isSelected && (
                      <span className="text-[#E85D8C] text-lg font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sticky Continue button (always visible) */}
        <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-4 px-4">
          {showMultiHint && (
            <p className="text-[12px] text-[#999] text-center mb-2">
              Selecione pelo menos 2-3 para melhor personalização
            </p>
          )}
          <button
            onClick={handleContinue}
            disabled={!hasSelection}
            className={`w-full h-14 rounded-xl font-bold text-[16px] text-white transition-all ${
              hasSelection
                ? "bg-[#E85D8C] hover:bg-[#D64B7A]"
                : "bg-[#E85D8C] opacity-50 cursor-not-allowed"
            }`}
          >
            {q.type === 'scale' || isMulti ? "CONTINUAR →" : "PRÓXIMO →"}
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
