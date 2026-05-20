import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QuizHeader } from "@/components/QuizHeader";

export const Route = createFileRoute("/quiz/$step")({
  component: QuizStep,
});

const TOTAL = 20;

// Apenas 8 popups estratégicos distribuídos nas 18 perguntas iniciais
const POPUP_STEPS = new Set(["4", "6", "7", "8", "10", "12", "15", "17"]);

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
  type?: 'scale' | 'text' | 'select';
  scalePopupRanges?: ScaleRangePopup[];
  countPopupRanges?: CountRangePopup[];
  optionIcons?: Record<string, string>;
  titleColor?: string;
  optionSubtitles?: Record<string, string>;
  textConfig?: TextQuestionConfig;
  optional?: boolean;
};

const QUESTIONS: Record<string, Question> = {
  "1": {
    title: "Qual é a sua faixa etária?",
    subtitle: "(Vamos calibrar o plano ideal para você)",
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
  "15": {
    title: "Como está seu nível de estresse?",
    gradientBg: true,
    options: [
      "Muito alto (trabalho, vida pessoal)",
      "Alto (estou estressada)",
      "Moderado (dias bons e ruins)",
      "Baixo (estou razoável)",
      "Muito baixo (vida tranquila)",
    ],
    optionIcons: {
      "Muito alto (trabalho, vida pessoal)": "🚨",
      "Alto (estou estressada)": "😰",
      "Moderado (dias bons e ruins)": "😐",
      "Baixo (estou razoável)": "😌",
      "Muito baixo (vida tranquila)": "😊",
    },
    popups: {
      "Muito alto (trabalho, vida pessoal)": {
        icon: "🎯",
        title: "O estresse está amplificando seus sintomas.",
        body: "Isso é importantíssimo saber. Porque quando você\nreduz estresse + alinha hormônios, o efeito é multiplicativo.\n\nSua rotina vai incluir técnicas ESPECÍFICAS para\ngerenciar estresse. Vamos desativar essa bomba.",
      },
      "Alto (estou estressada)": {
        icon: "💪",
        title: "O estresse é um catalisador.",
        body: "Quanto mais estressada, mais amplificados os sintomas.\n\nSua rotina vai priorizar ALÍVIO DE ESTRESSE.\nIsso vai impactar TODOS os seus sintomas.",
      },
      "Moderado (dias bons e ruins)": {
        icon: "⚖️",
        title: "Você está equilibrada.",
        body: "Alguns dias são mais duros, outros leves.\n\nSua rotina vai incluir técnicas preventivas para\nnão deixar o estresse escalar.",
      },
      "Baixo (estou razoável)": {
        icon: "✨",
        title: "Você tem boa gestão de estresse.",
        body: "Excelente. Sua rotina pode focar 100% em outros\nsintomas. Você tem essa base coberta.",
      },
      "Muito baixo (vida tranquila)": {
        icon: "🧘",
        title: "Você está muito tranquila.",
        body: "Ótimo. Sua rotina vai ser mais sobre otimização\ne transformação. Você tem espaço mental para tudo.",
      },
    },
  },
  "16": {
    title: "Você está usando medicação (HRT/TRH)?",
    options: [
      "Sim, estou em tratamento",
      "Já usei, mas parei",
      "Meu médico recomendou, mas recuso",
      "Nunca usei",
      "Não tenho informação sobre isso",
    ],
    optionIcons: {
      "Sim, estou em tratamento": "✅",
      "Já usei, mas parei": "🛑",
      "Meu médico recomendou, mas recuso": "⚠️",
      "Nunca usei": "❌",
      "Não tenho informação sobre isso": "❓",
    },
    popups: {
      "Sim, estou em tratamento": {
        icon: "✅",
        title: "Você está com suporte médico.",
        body: "Excelente. A rotina que vamos montar para você é\nCOMPLEMENTAR à sua medicação, não substitui.\n\nJuntos, você vai ter suporte 360°: medicina + estilo de vida.",
      },
      "Já usei, mas parei": {
        icon: "🤔",
        title: "Você experimentou, mas parou.",
        body: "Entendemos. Talvez não tenha funcionado ou teve\nefeitos colaterais.\n\nA boa notícia? Existem MÚLTIPLAS formas de resolver isso\nsem medicação. Vamos explorar isso com você.",
      },
      "Meu médico recomendou, mas recuso": {
        icon: "💡",
        title: "Você quer tentar outras opções primeiro.",
        body: "Completamente válido. O método que vamos montar\npara você pode resolver muitos dos seus sintomas\nSEM medicação.\n\nSe em 60 dias não funcionar, você sempre pode voltar\nà medicação com seu médico. Mas tente primeiro com a gente.",
      },
      "Nunca usei": {
        icon: "🌿",
        title: "Você prefere abordagem natural.",
        body: "Perfeito. A maioria das mulheres consegue alívio\nsignificativo SEM medicação quando tem o método certo.\n\nVocê está na abordagem certa.",
      },
      "Não tenho informação sobre isso": {
        icon: "❓",
        title: "Vamos educar você.",
        body: "Seu plano vai incluir informação sobre HRT/TRH,\nprós e contras, e você vai ENTENDER todas as opções\ndisponíveis.\n\nDecisão informada é a melhor decisão.",
      },
    },
  },
  "17": {
    title: "Qual seu nível de comprometimento com a solução?",
    gradientBg: true,
    options: [
      "Estou desesperada. Faço o que for.",
      "Estou muito motivada.",
      "Estou interessada, mas cautelosa.",
      "Estou aqui 'só pra ver'.",
    ],
    optionIcons: {
      "Estou desesperada. Faço o que for.": "🔥",
      "Estou muito motivada.": "💪",
      "Estou interessada, mas cautelosa.": "🤔",
      "Estou aqui 'só pra ver'.": "👀",
    },
    popups: {
      "Estou desesperada. Faço o que for.": {
        icon: "🎯",
        title: "SUA HORA CHEGOU.",
        body: "Mulheres que chegam aqui com essa determinação\nconseguem resultados em DIAS.\n\nSeu corpo estava esperando por uma estrutura assim.\n\nVamos dar exatamente o que ele precisa?",
      },
      "Estou muito motivada.": {
        icon: "💪",
        title: "Você é a pessoa CERTA para este método.",
        body: "Essa motivação é ouro puro.\n\nCom sua energia, você vai implementar rápido, ver\nresultados rápido, e fortalecer o hábito.\n\nVamos transformar essa motivação em ação?",
      },
      "Estou interessada, mas cautelosa.": {
        icon: "🤝",
        title: "Você quer ter certeza antes de comprometer.",
        body: "Inteligente. Você vai conseguir resultados PROVADOS\nem poucos dias. Aí sua cautela vira confiança.\n\nVocê será sua própria prova. Vamos?",
      },
      "Estou aqui 'só pra ver'.": {
        icon: "👀",
        title: "Tudo bem estar exploratória.",
        body: "Mas já que chegou até aqui, seu corpo está pedindo\najuda. Pelo menos VER sua oferta personalizada custa nada.\n\nDepois você decide. Deal?",
      },
    },
  },
  "18": {
    title: "Como você nos conheceu?",
    subtitle: "(Para finalizar, qual seu nome?)",
    type: 'select',
    optional: true,
    options: [
      "Anúncio do Instagram",
      "Anúncio do Facebook",
      "Google Search",
      "Indicação de amiga",
      "Email/Newsletter",
      "Outro",
    ],
    textConfig: {
      placeholder: "Seu primeiro nome",
    },
  },
};

function QuizStep() {
  const { step } = useParams({ from: "/quiz/$step" });
  const stepNum = parseInt(step, 10) || 1;
  if (step === "19") return <ProcessingPage />;
  if (step === "20") return <TimelinePage />;
  if (step === "21") return <ResultsPage />;
  if (step === "22") return <SalesPage />;

  return <QuizQuestionPage step={step} stepNum={stepNum} />;
}

function QuizQuestionPage({ step, stepNum }: { step: string; stepNum: number }) {
  const navigate = useNavigate();
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
    if (autoAdvanceTimer.current) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  }, [step]);

  const saveAnswer = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("quizAnswers") || "{}");
      stored[step] = {
        single: selectedSingle,
        multi: selectedMulti,
        scale: scaleValue,
        text: textValue,
      };
      localStorage.setItem("quizAnswers", JSON.stringify(stored));
    } catch {}
  };

  const goNext = () => {
    saveAnswer();
    const next = stepNum + 1;
    if (next <= TOTAL) {
      navigate({ to: "/quiz/$step", params: { step: String(next) } });
    }
  };

  // Single-select handler — auto-advances after 1s
  const autoAdvanceTimer = useRef<number | null>(null);
  const handleSelectSingle = (opt: string) => {
    setSelectedSingle(opt);
    if (autoAdvanceTimer.current) {
      window.clearTimeout(autoAdvanceTimer.current);
    }
    // Only auto-advance for plain single-choice (not select/scale/text/multi)
    if (q.type === 'select' || q.type === 'scale' || q.type === 'text' || isMulti) {
      return;
    }
    autoAdvanceTimer.current = window.setTimeout(() => {
      // Show contextual popup if defined
      const popup = POPUP_STEPS.has(step) ? (q.popups?.[opt] ?? q.defaultPopup) : null;
      if (popup) {
        setActivePopup(popup);
        return;
      }
      try {
        const stored = JSON.parse(localStorage.getItem("quizAnswers") || "{}");
        stored[step] = { single: opt, multi: [], scale: scaleValue, text: textValue };
        localStorage.setItem("quizAnswers", JSON.stringify(stored));
      } catch {}
      const next = stepNum + 1;
      if (next <= TOTAL) {
        navigate({ to: "/quiz/$step", params: { step: String(next) } });
      }
    }, 1000);
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
    // Text input validation
    if (q.type === 'text' && q.textConfig) {
      const numValue = parseFloat(textValue.replace(',', '.'));
      const min = q.textConfig.min ?? -Infinity;
      const max = q.textConfig.max ?? Infinity;
      if (isNaN(numValue) || numValue < min || numValue > max) {
        setTextError(true);
        window.setTimeout(() => setTextError(false), 2500);
        setShowError(true);
        window.setTimeout(() => setShowError(false), 2500);
        return;
      }
      goNext();
      return;
    }
    // If this question has popups, show the contextual popup instead of advancing
    if (POPUP_STEPS.has(step)) {
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
    q.type === 'scale' || q.multiSelectOptional || q.optional || q.type === 'select'
      ? true
      : q.type === 'text'
      ? textValue.trim().length > 0
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
          </div>
        </div>

        <QuizHeader />

        {q.type === 'scale' ? (
          <>
            <h2 className="font-bold text-[18px] sm:text-[20px] text-[#2C2C2C] mt-6 mb-0 text-center leading-snug px-2">
              {q.title}
            </h2>
            <h2 className="font-semibold text-[14px] sm:text-[15px] text-[#E85D8C] mb-6 text-center leading-snug px-2">
              {q.subtitle}
            </h2>
          </>
        ) : (
          <>
            <h2
              className="font-bold text-[18px] sm:text-[20px] mt-6 mb-0 text-center leading-snug px-2"
              style={{ color: q.titleColor || "#2C2C2C" }}
            >
              {q.title}
            </h2>
            {q.subtitle && (
              <h2 className="font-semibold text-[14px] sm:text-[15px] text-[#E85D8C] text-center mt-1 mb-0 leading-snug px-2">
                {q.subtitle}
              </h2>
            )}
            {q.titleEnd && (
              <h2
                className="font-bold text-[18px] sm:text-[20px] text-center mt-1 mb-6 leading-snug px-2"
                style={{ color: q.titleColor || "#2C2C2C" }}
              >
                {q.titleEnd}
              </h2>
            )}
          </>
        )}

        {/* Options / Scale */}
        <div className="flex flex-col flex-1 mt-8">

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
          ) : q.type === 'text' ? (
            <div className="flex flex-col flex-1">
              <input
                type="text"
                inputMode="decimal"
                placeholder={q.textConfig?.placeholder}
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                  setTextError(false);
                  setShowError(false);
                }}
                className={`w-full h-14 px-4 rounded-xl border-2 text-[16px] text-[#2C2C2C] bg-white outline-none transition-all duration-200 ${
                  textError
                    ? "border-[#FFC107]"
                    : textValue.trim()
                    ? "border-[#E85D8C]"
                    : "border-[#E0E0E0]"
                }`}
                style={{
                  boxShadow: textValue.trim() && !textError ? '0 0 0 3px rgba(232, 93, 140, 0.1)' : 'none',
                }}
              />
              {textError && q.textConfig?.errorMessage && (
                <p className="text-[13px] text-[#FFC107] mt-2 text-center">
                  {q.textConfig.errorMessage}
                </p>
              )}
            </div>
          ) : q.type === 'select' ? (
            <div className="flex flex-col gap-3 flex-1">
              {q.textConfig && (
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={q.textConfig.placeholder}
                  className="w-full h-14 px-4 rounded-xl border-2 border-[#E0E0E0] bg-white text-[16px] text-[#2C2C2C] outline-none focus:border-[#E85D8C] transition-all duration-200"
                />
              )}
              <div className="relative">
                <select
                  value={selectedSingle ?? ''}
                  onChange={(e) => setSelectedSingle(e.target.value)}
                  className={`w-full h-14 px-4 pr-12 rounded-xl border-2 bg-white text-[16px] text-[#2C2C2C] appearance-none outline-none transition-all duration-200 cursor-pointer ${
                    selectedSingle ? "border-[#E85D8C]" : "border-[#E0E0E0]"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  {q.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
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
                      className={`w-full min-h-14 px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-[15px] sm:text-[16px] text-left text-[#2C2C2C] leading-snug ${
                        checked
                          ? "border-[#E85D8C] bg-[#FFE5ED] font-bold"
                          : "border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"
                      }`}
                    >
                      {/* Custom checkbox */}
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
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
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                }

                const isSelected = selectedSingle === opt;
                const icon = q.optionIcons?.[opt];
                const subtitle = q.optionSubtitles?.[opt];
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectSingle(opt)}
                    className={`w-full min-h-14 px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-between gap-3 text-[15px] sm:text-[16px] text-[#2C2C2C] leading-snug ${
                      isSelected
                        ? "border-[#E85D8C] bg-[#FFE5ED] font-bold"
                        : "border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"
                    }`}
                  >
                    <span className="flex flex-col items-start gap-0.5 text-left flex-1 min-w-0">
                      <span className="flex items-center gap-2 w-full">
                        {icon && <span className="text-[20px] shrink-0">{icon}</span>}
                        <span className="flex-1">{opt}</span>
                      </span>
                      {subtitle && (
                        <span className={`text-[12px] sm:text-[13px] text-[#999] font-normal ${icon ? 'pl-7' : ''}`}>
                          {subtitle}
                        </span>
                      )}
                    </span>
                    {isSelected && (
                      <span className="text-[#E85D8C] text-lg font-bold shrink-0">✓</span>
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
            {q.type === 'scale' || isMulti || q.type === 'text' || q.type === 'select' ? "CONTINUAR →" : "PRÓXIMO →"}
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
            {isMulti ? "Selecione pelo menos um sintoma" : q.type === 'text' ? q.textConfig?.errorMessage || "Digite um valor válido" : "Selecione uma opção para continuar"}
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

const PROCESSING_TASKS = [
  { text: "Analisando seu perfil hormonal...", at: 0 },
  { text: "Calibrando rotina para sua idade...", at: 2 },
  { text: "Mapeando seus sintomas-chave...", at: 4 },
  { text: "Calculando tempo ideal de sono...", at: 6 },
  { text: "Estruturando protocolo de estresse...", at: 8 },
];

const TESTIMONIALS = [
  { name: "Marina, 52 anos", quote: "Dormi a noite toda pela primeira vez em 3 anos!" },
  { name: "Beatriz, 48 anos", quote: "Meu peso normalizou sem fazer dieta maluca" },
  { name: "Carla, 51 anos", quote: "Meu marido perguntou se eu estava feliz novamente" },
  { name: "+8.247 mulheres", quote: "Já transformaram suas vidas com o nosso plano" },
];

function ProcessingPage() {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialVisible, setTestimonialVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const tick = window.setInterval(() => {
      const e = (Date.now() - start) / 1000;
      setElapsed(Math.min(e, 10));
      if (e >= 10) window.clearInterval(tick);
    }, 100);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const cycle = window.setInterval(() => {
      setTestimonialVisible(false);
      window.setTimeout(() => {
        setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
        setTestimonialVisible(true);
      }, 400);
    }, 2500);
    return () => window.clearInterval(cycle);
  }, []);

  const pct = Math.min(100, Math.round((elapsed / 10) * 100));
  const done = elapsed >= 10;
  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-b from-[#FFE5ED] to-white">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col px-4">
        {/* Progress bar */}
        <div className="pt-4">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div className="h-full bg-[#E85D8C] transition-all" style={{ width: "95%" }} />
            </div>
          </div>

        </div>

        {/* Heading */}
        <div className="text-center mt-10 mb-8">
          <p className="font-bold text-[18px] text-[#E85D8C]">
            🔄 Gerando seu plano personalizado...
          </p>
        </div>

        {/* Progress bar visual */}
        <div className="flex flex-col items-center">
          <div className="w-4/5 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E85D8C] transition-all duration-100 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-[16px] text-[#E85D8C] mt-2 font-medium tabular-nums">
            {pct}%
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-8 flex flex-col gap-3 px-2">
          {PROCESSING_TASKS.map((task) => {
            if (elapsed < task.at) return null;
            const isDone = elapsed >= task.at + 2;
            return (
              <div
                key={task.text}
                className="flex items-center gap-3 text-[16px] text-[#2C2C2C] animate-fade-in"
              >
                {isDone ? (
                  <span className="text-[20px] text-[#4CAF50]">✓</span>
                ) : (
                  <span className="text-[20px] text-[#FFC107] inline-block animate-spin">⏳</span>
                )}
                <span>{task.text}</span>
              </div>
            );
          })}
          {done && (
            <div className="flex items-center gap-3 text-[16px] text-[#2C2C2C] font-bold animate-fade-in">
              <span className="text-[24px] text-[#4CAF50]">✓</span>
              <span>Pronto! Seu plano foi criado exclusivamente para você.</span>
            </div>
          )}
        </div>

        {/* Testimonial */}
        <div className="mt-8 bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div
            className={`transition-opacity duration-500 ${testimonialVisible ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-[14px] text-[#2C2C2C] italic" style={{ lineHeight: 1.6 }}>
              "{t.quote}"
            </p>
            <p className="text-[12px] text-[#999] mt-2 not-italic">— {t.name}</p>
          </div>
        </div>

        <div className="flex-1" />

        {/* Final button */}
        {done && (
          <div className="pb-6 animate-fade-in">
            <button
              onClick={() => navigate({ to: "/quiz/$step", params: { step: "20" } })}
              className="w-full h-14 rounded-xl bg-[#E85D8C] hover:bg-[#D64B7A] text-white font-bold text-[16px] transition-colors"
            >
              VER MEU RESULTADO PERSONALIZADO →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelinePage() {
  const navigate = useNavigate();
  const [chartDone, setChartDone] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const CHART_MS = 5000;
  const STATIC_MS = 10000;

  const milestones = [
    { x: 60, y: 280, label: "Hoje", desc: "Acesso ao app liberado", color: "#CFCFE0", delay: 0.6 },
    { x: 150, y: 210, label: "1-3 dias", desc: "Primeiros sintomas melhoram", color: "#FFD700", delay: 2.6 },
    { x: 250, y: 130, label: "7 dias", desc: "Dormir melhor & mais energia", color: "#FFD700", delay: 5.0 },
    { x: 340, y: 55, label: "13-21 dias", desc: "Transformação visível", color: "#FFD700", delay: 7.4, big: true },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setChartDone(true), CHART_MS);
    const t2 = setTimeout(() => {
      navigate({ to: "/quiz/$step", params: { step: "21" } });
    }, CHART_MS + STATIC_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  useEffect(() => {
    if (!chartDone) return;
    setCountdown(10);
    const iv = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [chartDone]);

  return (
    <div
      className="min-h-screen w-full flex justify-center animate-fade-in"
      style={{ background: "linear-gradient(180deg, #3B1361 0%, #6B46C1 100%)" }}
    >
      <style>{`
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes nodePop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes balloonIn {
          0% { transform: translateY(8px) scale(0.6); opacity: 0; }
          60% { transform: translateY(-2px) scale(1.08); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(232,93,140,0.6)); }
          50% { filter: drop-shadow(0 0 14px rgba(232,93,140,1)); }
        }
        .timeline-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLine 8s ease-in-out forwards, glow 2s ease-in-out infinite;
        }
        .timeline-node {
          transform-origin: center;
          transform-box: fill-box;
          opacity: 0;
          animation: nodePop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .timeline-ring {
          transform-origin: center;
          transform-box: fill-box;
          animation: pulseRing 1.8s ease-out infinite;
        }
        .timeline-balloon {
          opacity: 0;
          animation: balloonIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
      `}</style>

      <div className="w-full max-w-[480px] min-h-screen flex flex-col px-5 pt-8 pb-6 text-white">
        <p className="text-center text-[12px] tracking-wide text-white/80">
          Seu plano pessoal está pronto!
        </p>

        <h1 className="text-center font-bold text-[28px] sm:text-[32px] leading-tight mt-3 mb-8">
          Recupere sua Energia em 13 Dias
        </h1>

        <div className="relative w-full">
          <svg width="100%" height="320" viewBox="0 0 400 320" className="overflow-visible">
            <path
              className="timeline-path"
              pathLength={1}
              d="M 60 280 Q 120 250 150 210 T 250 130 T 340 55"
              stroke="#E85D8C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {milestones.map((m, i) => (
              <g key={i}>
                <circle
                  className="timeline-node"
                  cx={m.x}
                  cy={m.y}
                  r={m.big ? 13 : 10}
                  fill={m.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  style={{ animationDelay: `${m.delay}s` }}
                />
                {m.big && (
                  <circle
                    className="timeline-ring"
                    cx={m.x}
                    cy={m.y}
                    r="18"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    style={{ animationDelay: `${m.delay + 0.3}s` }}
                  />
                )}
              </g>
            ))}
          </svg>

          {milestones.map((m, i) => {
            const leftPct = (m.x / 400) * 100;
            const topPx = m.y - 56;
            const align =
              leftPct < 25 ? "left" : leftPct > 75 ? "right" : "center";
            return (
              <div
                key={i}
                className="absolute timeline-balloon"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPx}px`,
                  transformOrigin:
                    align === "left" ? "left top" : align === "right" ? "right top" : "center top",
                  marginLeft:
                    align === "left" ? "-12px" : align === "right" ? undefined : undefined,
                  translate:
                    align === "left"
                      ? "-10% 0"
                      : align === "right"
                      ? "-90% 0"
                      : "-50% 0",
                  animationDelay: `${m.delay + 0.2}s`,
                }}
              >
                <div className="bg-white rounded-lg px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)] min-w-[120px] max-w-[160px]">
                  <p className="text-[11px] font-bold text-[#E85D8C] leading-tight">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-[#2C2C2C] leading-snug mt-0.5">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-1" />

        {chartDone ? (
          <div className="mt-10 mb-2 animate-fade-in">
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-center backdrop-blur-sm">
              <p className="text-[14px] text-white leading-relaxed">
                Vamos garantir que tudo esteja pronto para você ter a melhor experiência.
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                <p className="text-[13px] font-bold text-[#FFD700] tabular-nums">
                  Aguarde {countdown} segundo{countdown === 1 ? "" : "s"}...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-[13px] text-white/90 leading-relaxed mt-10 mb-10 px-2">
            Construindo sua linha do tempo personalizada...
          </p>
        )}
      </div>
    </div>
  );
}



type StoredAnswers = Record<
  string,
  { single: string | null; multi: string[]; scale: number; text: string }
>;

// ============= TELA 21: EDUCAÇÃO + PROVA SOCIAL =============
function ResultsPage() {
  const navigate = useNavigate();

  const goToOptions = () => {
    navigate({ to: "/quiz/$step", params: { step: "22" } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFE5ED 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#2C2C2C",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .story-card { animation: slideUp 0.5s ease-out both; }
        .story-card:nth-child(1) { animation-delay: 0.1s; }
        .story-card:nth-child(2) { animation-delay: 0.3s; }
        .story-card:nth-child(3) { animation-delay: 0.5s; }
        .play-overlay { transition: background 0.3s ease, transform 0.3s ease; }
        .story-card:hover .play-overlay {
          background: rgba(0,0,0,0.5);
          transform: scale(1.06);
        }
      `}</style>

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz/$step", params: { step: "20" } })}
            aria-label="Voltar"
            className="text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center"
          >
            ←
          </button>
          <div className="h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div className="h-full bg-[#E85D8C]" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <QuizHeader />

      {/* SEÇÃO 1 — Transição natural */}
      <section style={{ padding: "24px 16px 8px" }}>
        <p style={{ fontSize: 12, color: "#999", margin: "0 0 8px" }}>
          Você descobriu seu diagnóstico. Agora entenda suas opções.
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 16px",
            lineHeight: 1.25,
          }}
        >
          Como Funciona o Alinhamento Hormonal
        </h1>
        <p style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6, margin: 0 }}>
          Com base em suas 20 respostas, você descobriu exatamente o que seu
          corpo precisa. Agora vem a estrutura que faz a diferença: um método
          personalizado, prático e consistente.
          <br />
          <br />
          Veja como mulheres como você transformaram suas vidas:
        </p>
      </section>

      {/* SEÇÃO 2 — Stories de vídeo */}
      <section style={{ padding: "32px 16px 0", background: "#FFFFFF" }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 24px",
          }}
        >
          Histórias Reais de Mulheres que Começaram:
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { name: "Marina", age: 52, src: "/videos/depoimento-1.mp4" },
            { name: "Cláudia", age: 49, src: "/videos/depoimento-2.mp4" },
            { name: "Renata", age: 55, src: "/videos/depoimento-3.mp4" },
          ].map((s) => (
            <div key={s.src} className="story-card">
              <div
                style={{
                  position: "relative",
                  aspectRatio: "9 / 16",
                  background: "#000000",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  const video = e.currentTarget.querySelector("video") as HTMLVideoElement | null;
                  const overlay = e.currentTarget.querySelector(".play-overlay") as HTMLElement | null;
                  if (!video) return;
                  if (video.paused) {
                    video.play();
                    if (overlay) overlay.style.opacity = "0";
                  } else {
                    video.pause();
                    if (overlay) overlay.style.opacity = "1";
                  }
                }}
              >
                <video
                  src={s.src}
                  playsInline
                  preload="metadata"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onEnded={(e) => {
                    const overlay = e.currentTarget.parentElement?.querySelector(
                      ".play-overlay"
                    ) as HTMLElement | null;
                    if (overlay) overlay.style.opacity = "1";
                  }}
                />
                <div
                  className="play-overlay"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: 28,
                    transition: "opacity 0.2s ease",
                    pointerEvents: "none",
                  }}
                >
                  ▶
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#2C2C2C",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                {s.name}, {s.age} anos
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.6,
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          Clique para ver histórias de 8 segundos de mulheres reais que
          começaram com o método. Sem filtro, sem roteiro.
        </p>
      </section>

      {/* SEÇÃO 3 — Prova social com números */}
      <section style={{ padding: "32px 16px" }}>
        <div
          style={{
            background: "#FFF5F8",
            border: "2px solid #E85D8C",
            borderRadius: 12,
            padding: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 16,
            textAlign: "center",
          }}
        >
          {[
            { n: "8.247", d: "mulheres começaram" },
            { n: "82%", d: "veem alívio em 7 dias" },
            { n: "21", d: "dias transformação média" },
          ].map((stat) => (
            <div key={stat.n}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#E85D8C" }}>
                {stat.n}
              </div>
              <div style={{ fontSize: 13, color: "#2C2C2C", marginTop: 4 }}>
                {stat.d}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 4 — Educação + contexto */}
      <section style={{ background: "#FFFFFF", padding: "24px 16px" }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 16px",
          }}
        >
          Por que Isso Funciona Para Você:
        </h2>
        <p style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6, margin: "12px 0" }}>
          Seu diagnóstico mostrou que você não é fraca, não está envelhecendo e
          sua disposição não é preguiça. São seus hormônios pedindo
          alinhamento.
          <br />
          <br />
          A diferença entre você e alguém que transformou? Ela tinha um
          MÉTODO. Você agora também tem.
        </p>
        <p style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6, margin: "12px 0" }}>
          Nosso método não é genérico. Não é um app com 500 receitas
          aleatórias. É uma estrutura que se adapta ESPECIFICAMENTE ao seu
          tempo, seus sintomas e seu estilo de aprendizado.
          <br />
          <br />
          Em 7-14 dias você começa a sentir diferença. Em 21 dias a
          transformação fica visível.
        </p>
        <p style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6, margin: "12px 0" }}>
          O que você precisa é simples: 5-15 minutos por dia de rotina,
          check-ins para acompanhar seu progresso, e acesso a um método que JÁ
          funcionou para 8.247 mulheres.
          <br />
          <br />
          Agora é sua vez.
        </p>
      </section>

      {/* SEÇÃO 5 — Garantia */}
      <section style={{ padding: "0 16px 32px" }}>
        <div
          style={{
            background: "#E3F2FD",
            borderLeft: "4px solid #2196F3",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#2196F3",
              marginBottom: 6,
            }}
          >
            30 dias para você decidir se quer continuar
          </div>
          <p style={{ fontSize: 12, color: "#2C2C2C", lineHeight: 1.6, margin: 0 }}>
            Se em 30 dias achar que não é pra você, devolvemos seu dinheiro.
            Sem perguntas. Sem burocracia. Sem ressentimento.
            <br />
            A gente confia que vai funcionar. E você merece testar sem risco.
          </p>
        </div>
      </section>

      {/* SEÇÃO 6 — Transição para TELA 22 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "24px 16px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: 16,
          }}
        >
          Escolha a opção que faz mais sentido para você:
        </div>
        <button
          onClick={goToOptions}
          style={{
            width: "100%",
            height: 48,
            background: "#E85D8C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D64B7A")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#E85D8C")}
        >
          VER OPÇÕES →
        </button>
        <div style={{ fontSize: 12, color: "#999", marginTop: 12 }}>
          Sem pressão. Escolha no seu ritmo.
        </div>
      </section>
    </div>
  );
}

// ============= TELA 22: OPÇÕES CONSULTIVAS =============
type ConsultivePlan = {
  id: "basico" | "premium" | "vip";
  label: string;
  labelColor: string;
  name: string;
  subheading?: string;
  price: string;
  priceColor: string;
  description: string;
  features: string[];
  cta: string;
  checkoutUrl: string;
  cardBg: string;
  border: string;
  borderWidth: number;
  shadow: string;
  divider: string;
  btnBg: string;
  btnHover: string;
};

const CONSULTIVE_PLANS: ConsultivePlan[] = [
  {
    id: "basico",
    label: "Se você quer testar primeiro",
    labelColor: "#E85D8C",
    name: "Básico",
    price: "R$ 1,99",
    priceColor: "#E85D8C",
    description:
      "Acesso ao app. Sem compromisso. Perfeito para entender como funciona.",
    features: [
      "Acesso ao app",
      "Rotina diária",
      "Conteúdo base",
      "30 dias para decidir",
    ],
    cta: "COMEÇAR COM BÁSICO",
    checkoutUrl: "https://ggcheckout.app/checkout/v5/9NVEioxO8XP9XuebnhBn",
    cardBg: "#FFFFFF",
    border: "#E85D8C",
    borderWidth: 3,
    shadow: "0 4px 16px rgba(232,93,140,0.15)",
    divider: "#FFE5ED",
    btnBg: "linear-gradient(135deg,#E85D8C 0%,#FF8FB3 100%)",
    btnHover: "linear-gradient(135deg,#D64B7A 0%,#E85D8C 100%)",
  },
  {
    id: "premium",
    label: "⭐ MAIS POPULAR",
    labelColor: "#FFFFFF",
    name: "Premium",
    subheading: "Para transformação real",
    price: "R$ 9,89",
    priceColor: "#E85D8C",
    description:
      "O plano completo. Tudo que você precisa para transformar. 67% das mulheres escolhem este.",
    features: [
      "Tudo do Básico +",
      "Módulos Premium",
      "Protocolos avançados",
      "Acesso vitalício",
      "Suporte por email",
    ],
    cta: "ESCOLHER PREMIUM",
    checkoutUrl: "https://ggcheckout.app/checkout/v2/3B8zcUXZYtwguGI98R0f",
    cardBg: "#FFFFFF",
    border: "#E85D8C",
    borderWidth: 4,
    shadow: "0 6px 20px rgba(232,93,140,0.22)",
    divider: "#F5A5B8",
    btnBg: "linear-gradient(135deg,#E85D8C 0%,#FF8FB3 50%,#E85D8C 100%)",
    btnHover: "linear-gradient(135deg,#D64B7A 0%,#E85D8C 50%,#D64B7A 100%)",
  },
  {
    id: "vip",
    label: "Para quem quer máximo suporte",
    labelColor: "#9333EA",
    name: "VIP Total",
    subheading: "Transformação com acompanhamento",
    price: "R$ 29,90",
    priceColor: "#E85D8C",
    description:
      "Tudo do Premium + comunidade + consultora. Para quando você quer ajuda no caminho.",
    features: [
      "Tudo do Premium +",
      "Comunidade 24h (WhatsApp)",
      "Consultora VIP",
      "Relatório para médico",
      "Acompanhamento 30 dias",
    ],
    cta: "ESCOLHER VIP",
    checkoutUrl: "https://ggcheckout.app/checkout/v5/yUqnOnQmujpUEO6NhHb2",
    cardBg: "#FFFFFF",
    border: "#E85D8C",
    borderWidth: 3,
    shadow: "0 4px 16px rgba(232,93,140,0.15)",
    divider: "#EDE4FB",
    btnBg: "linear-gradient(135deg,#E85D8C 0%,#FF8FB3 100%)",
    btnHover: "linear-gradient(135deg,#D64B7A 0%,#E85D8C 100%)",
  },
];

const CONSULTIVE_FAQ = [
  {
    q: "Qual a diferença entre Básico, Premium e VIP?",
    a: "• Plano Básico (entrada / para começar com segurança)\n\nIdeal para quem quer dar o primeiro passo, conhecer o método e iniciar a rotina sem complicação.\n\nVocê recebe: acesso ao app + jornada base, com conteúdo guiado e recursos essenciais (leitura dos módulos, progresso e rotina/check-ins).\n\nPara quem é: quem quer testar com baixo risco e começar a organizar os sintomas e a rotina.\n\n• Plano Premium (mais completo para resultado prático no dia a dia)\n\nIdeal para quem quer ir além do básico e ter materiais avançados para acelerar o progresso.\n\nVocê recebe: tudo do Básico + acesso aos conteúdos e recursos Premium (materiais extras e protocolos mais direcionados para situações do dia a dia).\n\nPara quem é: quem já sente que precisa de uma solução mais completa e quer avançar com mais ferramentas práticas.\n\n• Plano VIP (Premium + acompanhamento e pertencimento)\n\nIdeal para quem não quer passar por essa fase sozinha e quer apoio contínuo além do conteúdo.\n\nVocê recebe: tudo do Premium + benefícios VIP (como comunidade, recursos exclusivos e suporte/aconselhamento dentro do que o programa oferece).\n\nPara quem é: quem quer acompanhamento, motivação e um ecossistema completo para manter consistência e evoluir mais rápido.",
  },
  {
    q: "Quanto tempo até ver resultado?",
    a: "7-14 dias você sente diferença. 21 dias a transformação fica visível.",
  },
  {
    q: "E se eu não gostar?",
    a: "30 dias para decidir. Se não valer, seu dinheiro volta. Sem perguntas.",
  },
  {
    q: "Como funciona depois que eu compro?",
    a: "Você recebe email com acesso. Instala no celular em 2 min. Começa hoje.",
  },
  {
    q: "Por que é tão barato?",
    a: "Porque alcança muita gente (economia de escala). Funciona bem = muitos clientes.",
  },
  {
    q: "Qual devo escolher?",
    a: "Se quer testar: Básico. Quer transformar: Premium. Quer suporte: VIP.",
  },
];

function SalesPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuy = (plan: ConsultivePlan) => {
    try {
      console.log("[analytics] checkout_click", { plan: plan.id });
    } catch {}
    window.location.href = plan.checkoutUrl;
  };

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#2C2C2C",
        overflowX: "hidden",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cardSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldShimmer {
          0% { background-position: -200% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 4px 14px rgba(232,93,140,0.35), 0 0 0 0 rgba(232,93,140,0.55); }
          50% { box-shadow: 0 6px 20px rgba(232,93,140,0.55), 0 0 0 8px rgba(232,93,140,0); }
        }
        .plan-card { animation: cardSlide 0.5s ease-out both; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .plan-card:nth-child(1) { animation-delay: 0.1s; }
        .plan-card:nth-child(2) { animation-delay: 0.3s; }
        .plan-card:nth-child(3) { animation-delay: 0.5s; }
        .plan-card:hover { transform: translateY(-3px); }
        .cta-gold {
          position: relative;
          overflow: hidden;
          background-size: 200% 200% !important;
          animation: goldShimmer 3.5s linear infinite;
          box-shadow: 0 4px 14px rgba(232,93,140,0.30);
          text-shadow: 0 1px 1px rgba(0,0,0,0.18);
          letter-spacing: 0.5px;
        }
        .cta-gold::after {
          content: "";
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: shine 2.8s ease-in-out infinite;
        }
        @keyframes shine {
          0% { left: -75%; }
          60%, 100% { left: 125%; }
        }
        .cta-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 22px rgba(232,93,140,0.45); }
        .cta-premium-pulse { animation: goldShimmer 3.5s linear infinite, goldPulse 2.2s ease-in-out infinite; }
        .faq-item { transition: all 0.3s ease; }
      `}</style>


      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white px-3 pt-3 pb-2 border-b border-[#F0E0E8]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz/$step", params: { step: "21" } })}
            aria-label="Voltar"
            className="text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center shrink-0"
          >
            ←
          </button>
          <div className="flex-1 text-center text-[12px] font-semibold text-[#E85D8C]">
            Suas opções
          </div>
          <span className="w-6 shrink-0" />
        </div>
      </div>

      {/* SEÇÃO 1 — Introdução consultiva */}
      <section
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFE5ED 100%)",
          padding: "32px 16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 12px",
          }}
        >
          Três Caminhos. Escolha o Seu.
        </h1>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
          Cada mulher é diferente. Por isso temos 3 opções.
          <br />
          Escolha a que combina com você agora.
        </p>
      </section>

      {/* SEÇÃO 2 — 3 cards consultivos */}
      <section ref={cardsRef} style={{ padding: "24px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {CONSULTIVE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="plan-card"
              style={{
                position: "relative",
                background: plan.cardBg,
                border: `${plan.borderWidth}px solid ${plan.border}`,
                borderRadius: 12,
                padding: plan.id === "premium" ? 24 : 20,
                paddingTop: plan.id === "premium" ? 40 : 20,
                boxShadow: plan.shadow,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {plan.id === "premium" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    background: "#E85D8C",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 800,
                    textAlign: "center",
                    padding: "6px 0",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  ⭐ MAIS POPULAR
                </div>
              )}
              {plan.id !== "premium" && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: plan.id === "basico" ? 400 : 700,
                    color: plan.labelColor,
                    marginBottom: 8,
                  }}
                >
                  {plan.label}
                </div>
              )}
              <div
                style={{
                  fontSize: plan.id === "premium" ? 20 : 18,
                  fontWeight: 700,
                  color: "#2C2C2C",
                }}
              >
                {plan.name}
              </div>
              {plan.subheading && (
                <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                  {plan.subheading}
                </div>
              )}
              <div
                style={{
                  fontSize: plan.id === "premium" ? 40 : 34,
                  fontWeight: 800,
                  color: plan.priceColor,
                  marginTop: 12,
                  lineHeight: 1.1,
                }}
              >
                {plan.price}
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: "12px 0" }}>
                {plan.description}
              </p>
              <div
                style={{
                  height: 1,
                  background: plan.divider,
                  opacity: plan.id === "basico" ? 1 : 0.6,
                  margin: "16px 0",
                }}
              />
              <div style={{ flex: 1 }}>
                {plan.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      fontSize: 12,
                      color: "#2C2C2C",
                      margin: "8px 0",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#4CAF50", fontWeight: 700 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleBuy(plan)}
                className={`cta-gold ${plan.id === "premium" ? "cta-premium-pulse" : ""}`}
                style={{
                  width: "100%",
                  height: plan.id === "premium" ? 52 : 48,
                  background: plan.btnBg,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  marginTop: 20,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 14px rgba(232,93,140,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = plan.btnHover;
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,93,140,0.50)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = plan.btnBg;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,93,140,0.35)";
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 2B — Garantia + Cancelamento seguro */}
      <section style={{ padding: "0 16px 24px" }}>
        {/* Selo de garantia */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 24, flexShrink: 0 }}>🛡️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
              Garantia de 7 dias
            </div>
            <div style={{ fontSize: 12, color: "#3F6B4F", lineHeight: 1.5 }}>
              Se você não sentir diferença na rotina em 7 dias, devolvemos 100% do valor. Sem perguntas.
            </div>
          </div>
        </div>

        {/* Cancelamento fácil */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <span style={{ fontSize: 24, flexShrink: 0 }}>🔒</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E40AF" }}>
              Cancelamento fácil e seguro
            </div>
            <div style={{ fontSize: 12, color: "#3B5F9F", lineHeight: 1.5 }}>
              Cancele quando quiser, sem burocracia. Você está no controle do seu investimento.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — Comparação simples */}
      <section style={{ background: "#FFFFFF", padding: "24px 16px" }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 16px",
          }}
        >
          Resumo das diferenças:
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #E0E0E0" }}>
                <th style={{ textAlign: "left", padding: 8, fontWeight: 700 }}>
                  Recurso
                </th>
                <th style={{ padding: 8, fontWeight: 700 }}>Básico</th>
                <th style={{ padding: 8, fontWeight: 700, color: "#E85D8C" }}>
                  Premium
                </th>
                <th style={{ padding: 8, fontWeight: 700, color: "#9333EA" }}>
                  VIP
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Acesso ao app", "✓", "✓", "✓"],
                ["Rotina diária", "✓", "✓", "✓"],
                ["Conteúdo Premium", "—", "✓", "✓"],
                ["Comunidade", "—", "—", "✓"],
                ["Consultora", "—", "—", "✓"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ textAlign: "left", padding: 8 }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: 8,
                        color: cell === "✓" ? "#4CAF50" : "#E0E0E0",
                        fontWeight: 700,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEÇÃO 4 — FAQ consultivo */}
      <section style={{ padding: "24px 16px" }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#2C2C2C",
            margin: "0 0 16px",
          }}
        >
          Dúvidas Comuns:
        </h2>
        <div>
          {CONSULTIVE_FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="faq-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#2C2C2C",
                    padding: 12,
                    background: open ? "#FFF5F8" : "#F5F5F5",
                    border: `1px solid ${open ? "#E85D8C" : "#E0E0E0"}`,
                    borderRadius: open ? "8px 8px 0 0" : 8,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: "#E85D8C", fontWeight: 700 }}>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#555",
                      lineHeight: 1.6,
                      padding: 12,
                      background: "#FFF5F8",
                      borderRadius: "0 0 8px 8px",
                      borderLeft: "3px solid #E85D8C",
                      borderRight: "1px solid #E85D8C",
                      borderBottom: "1px solid #E85D8C",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO 5 — Soft CTA */}
      <section style={{ padding: "0 16px 32px" }}>
        <div
          style={{
            background: "#FFE5ED",
            padding: 24,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#2C2C2C",
              margin: "0 0 12px",
            }}
          >
            Pronto para começar?
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#666",
              lineHeight: 1.6,
              margin: "0 0 20px",
            }}
          >
            Escolha uma das opções acima.
            <br />
            Ou volte e refaça o diagnóstico se precisar de esclarecimento.
            <br />
            Você está no controle. Sem pressão.
          </p>
          <button
            type="button"
            onClick={scrollToCards}
            style={{
              width: "100%",
              height: 48,
              background: "#E85D8C",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D64B7A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E85D8C")}
          >
            VOLTAR PARA AS OPÇÕES ↑
          </button>
        </div>
      </section>

      {/* SEÇÃO 6 — Footer */}
      <footer
        style={{
          background: "#F5F5F5",
          borderTop: "1px solid #E0E0E0",
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "#999", lineHeight: 1.6, margin: "0 0 8px" }}>
          Menopausa Sem Mistério © 2026
          <br />
          Educativo, não substitui consulta médica
        </p>
        <div style={{ fontSize: 11, color: "#E85D8C" }}>
          <a href="#" style={{ color: "#E85D8C", textDecoration: "underline" }}>
            Termos
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "#E85D8C", textDecoration: "underline" }}>
            Privacidade
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "#E85D8C", textDecoration: "underline" }}>
            Contato
          </a>
        </div>
      </footer>
    </div>
  );
}
