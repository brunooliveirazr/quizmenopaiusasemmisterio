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
  const navigate = useNavigate();
  const stepNum = parseInt(step, 10) || 1;
  if (step === "19") return <ProcessingPage />;
  if (step === "22") return <TimelinePage />;
  if (step === "20") return <ResultsPage />;
  if (step === "21") return <SalesPage />;
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
            <span className="text-[12px] text-[#999] tabular-nums">19 / 20</span>
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
              onClick={() => navigate({ to: "/quiz/$step", params: { step: "22" } })}
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

type StoredAnswers = Record<
  string,
  { single: string | null; multi: string[]; scale: number; text: string }
>;

function ResultsPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<StoredAnswers>({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("quizAnswers") || "{}");
      setAnswers(stored);
    } catch {}
  }, []);

  const age = answers["1"]?.single ?? "—";
  const stage = answers["2"]?.single ?? "—";
  const symptoms = answers["3"]?.multi ?? [];
  const impact = answers["6"]?.scale ?? 0;
  const time = answers["11"]?.single ?? "—";
  const style = answers["12"]?.single ?? "—";
  const mainSymptom = symptoms[0] ?? "seus sintomas";

  const symptomsLabel =
    symptoms.length === 0
      ? "—"
      : symptoms.length <= 3
      ? symptoms.join(", ")
      : `${symptoms.slice(0, 3).join(", ")} +${symptoms.length - 3}`;

  const totalAnswered = Object.keys(answers).length;

  const handleSeeOffer = () => {
    try {
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    } catch {}
    navigate({ to: "/quiz/$step", params: { step: "21" } });
  };

  const handleRestart = () => {
    try {
      localStorage.removeItem("quizAnswers");
    } catch {}
    navigate({ to: "/quiz/$step", params: { step: "1" } });
  };

  const Check = () => (
    <span style={{ color: "#4CAF50", marginRight: 8, fontWeight: 700 }}>✓</span>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFE5ED 0%, #FFFFFF 100%)",
        paddingBottom: 24,
      }}
    >
      <div className="sticky top-0 z-10 bg-white pb-2 px-4 pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz/$step", params: { step: "19" } })}
            aria-label="Voltar"
            className="text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center"
          >
            ←
          </button>
          <div className="h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div className="h-full bg-[#E85D8C]" style={{ width: "100%" }} />
          </div>
          <span className="text-[12px] text-[#999] tabular-nums">20 / 20</span>
        </div>
      </div>
      <QuizHeader />

      <div style={{ padding: "24px 16px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#E85D8C",
              marginTop: 24,
              marginBottom: 8,
            }}
          >
            SEU DIAGNÓSTICO PERSONALIZADO
          </h1>
          <p style={{ fontSize: 14, color: "#999", marginBottom: 32 }}>
            Baseado em {totalAnswered} respostas específicas suas
          </p>
        </div>

        {/* Diagnóstico card */}
        <div
          style={{
            background: "#FFF5F8",
            border: "2px solid #E85D8C",
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            fontSize: 14,
            color: "#2C2C2C",
            lineHeight: 1.8,
          }}
        >
          <div><Check />Idade: {age}</div>
          <div><Check />Estágio: {stage}</div>
          <div><Check />Sintomas principais: {symptomsLabel}</div>
          <div><Check />Nível de impacto: {impact}/10</div>
          <div><Check />Tempo disponível: {time}</div>
          <div><Check />Estilo: {style}</div>
        </div>

        {/* Recomendação card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "2px solid #E85D8C",
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            boxShadow: "0 4px 12px rgba(232, 93, 140, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#E85D8C",
              marginBottom: 12,
            }}
          >
            RECOMENDAÇÃO:
          </div>
          <div
            style={{
              height: 1,
              background: "#E0E0E0",
              marginBottom: 16,
            }}
          />
          <p
            style={{
              fontSize: 14,
              color: "#2C2C2C",
              lineHeight: 1.6,
              marginBottom: 12,
            }}
          >
            Com base em seu perfil, você precisa de um método que combina:
          </p>
          <div style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.8 }}>
            <div><Check />Rotina {time} diária</div>
            <div><Check />Foco em {mainSymptom}</div>
            <div><Check />Abordagem {style}</div>
            <div><Check />Suporte estruturado (não genérico)</div>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#2C2C2C",
              lineHeight: 1.6,
              marginTop: 16,
              fontWeight: 600,
            }}
          >
            Você descobriu como funcionava!
            <br />
            Agora vem a solução...
          </p>
        </div>

        <p
          style={{
            fontSize: 14,
            color: "#999",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Sua oferta personalizada está esperando.
        </p>

        <button
          onClick={handleSeeOffer}
          style={{
            display: "block",
            width: "100%",
            height: 56,
            background: "#E85D8C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 16,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D64B7A")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#E85D8C")}
        >
          VER MINHA OFERTA PERSONALIZADA →
        </button>

        <button
          onClick={handleRestart}
          style={{
            display: "block",
            width: "100%",
            height: 48,
            background: "transparent",
            color: "#E85D8C",
            border: "1px solid #E85D8C",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Voltar e refazer
        </button>
      </div>
    </div>
  );
}


// ============= TELA 21: PÁGINA DE VENDAS INTEGRADA =============
type SalesPlan = {
  id: "basico" | "premium" | "vip";
  name: string;
  price: string;
  priceNote: string;
  badge: string;
  badgeStyle: "soft" | "primary";
  ribbon?: string;
  features: { text: string; emphasis?: boolean }[];
  checkoutUrl: string;
  highlight?: boolean;
  cardBg?: string;
  borderColor?: string;
  borderWidth?: number;
  shadow?: string;
  scale?: number;
};

const SALES_PLANS: SalesPlan[] = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 1,99",
    priceNote: "acesso único",
    badge: "POPULAR ENTRE INICIANTES",
    badgeStyle: "soft",
    features: [
      { text: "Acesso ao app + jornada base" },
      { text: "Rotina diária / check-ins" },
      { text: "Leitura de conteúdo" },
      { text: "Sem commitment - teste e avalie" },
    ],
    checkoutUrl: "https://ggcheckout.app/checkout/v5/9NVEioxO8XP9XuebnhBn",
    cardBg: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 2,
    shadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 9,89",
    priceNote: "acesso completo ao app",
    badge: "MAIS POPULAR ⭐",
    badgeStyle: "primary",
    ribbon: "RECOMENDADO",
    features: [
      { text: "Tudo do Básico +" },
      { text: "Módulos Premium desbloqueados" },
      { text: "Protocolos avançados & aprofundamento" },
      { text: "Acesso vitalício" },
      { text: "MAIS ESCOLHIDO", emphasis: true },
    ],
    checkoutUrl: "https://ggcheckout.app/checkout/v2/3B8zcUXZYtwguGI98R0f",
    highlight: true,
    cardBg: "#FFFFFF",
    borderColor: "#E85D8C",
    borderWidth: 3,
    shadow: "0 4px 16px rgba(232,93,140,0.2)",
    scale: 1.02,
  },
  {
    id: "vip",
    name: "VIP Total",
    price: "R$ 29,90",
    priceNote: "transformação completa",
    badge: "PARA QUEM QUER TUDO",
    badgeStyle: "soft",
    features: [
      { text: "Tudo do Premium +" },
      { text: "Comunidade 24h (WhatsApp privado)" },
      { text: "Consultora VIP (orientação personalizada)" },
      { text: "Relatório para levar ao médico" },
      { text: "Plano VIP 30 dias guiado", emphasis: true },
      { text: "SUPORTE MÁXIMO", emphasis: true },
    ],
    checkoutUrl: "https://ggcheckout.app/checkout/v5/yUqnOnQmujpUEO6NhHb2",
    cardBg: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)",
    borderColor: "#E85D8C",
    borderWidth: 2,
    shadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
];

const FAQ_ITEMS = [
  {
    q: "Como funciona o acesso ao app?",
    a: "Após a confirmação do pagamento, você recebe um link por e-mail para acessar seu app. Pode ser instalado no celular como um app normal (sem ir à App Store).",
  },
  {
    q: "Qual a diferença entre os planos?",
    a: "Básico é para teste (R$ 1,99). Premium é o completo com recursos avançados (R$ 9,89). VIP inclui comunidade + suporte de consultora (R$ 29,90).",
  },
  {
    q: "Preciso fazer de novo o quiz se comprar Premium depois de Básico?",
    a: "Não! Seus dados ficam salvos. É só fazer upgrade e novos recursos desbloqueiam.",
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "Maioria das mulheres vê melhora em 7-14 dias. Alguns em dias. Cada corpo é único.",
  },
  {
    q: "É realmente seguro? Como vocês tratam meus dados?",
    a: "Seus dados são criptografados e nunca compartilhados. Você tem privacidade completa.",
  },
];

function SalesPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<StoredAnswers>({});
  const [orderBump, setOrderBump] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        sessionStorage.getItem("quizAnswers") ||
          localStorage.getItem("quizAnswers") ||
          "{}",
      );
      setAnswers(stored);
    } catch {}
    window.scrollTo(0, 0);
  }, []);

  const age = answers["1"]?.single ?? "—";
  const stage = answers["2"]?.single ?? "—";
  const symptoms = answers["3"]?.multi ?? [];
  const impact = answers["6"]?.scale ?? 0;
  const time = answers["11"]?.single ?? "5 minutos/dia";
  const symptomsLabel =
    symptoms.length === 0
      ? "—"
      : symptoms.slice(0, 3).join(", ");

  const recommendedPlan: SalesPlan["id"] =
    impact >= 8 ? "vip" : impact >= 5 ? "premium" : "basico";
  const recommendedName =
    SALES_PLANS.find((p) => p.id === recommendedPlan)?.name ?? "Premium";

  const recommendationMessage = `Você tem ${time} disponível e nível de impacto ${impact}/10. O plano ${recommendedName.toUpperCase()} é ideal para você: equilíbrio entre ação rápida e profundidade.`;

  const buildCheckoutUrl = (plan: SalesPlan) => {
    const params = new URLSearchParams({
      plan: plan.id,
      bump: orderBump ? "1" : "0",
      age: String(age),
      stage: String(stage),
      symptoms: symptoms.join("|"),
      impact: String(impact),
      time: String(time),
    });
    return `${plan.checkoutUrl}?${params.toString()}`;
  };

  const handleBuy = (plan: SalesPlan) => {
    try {
      console.log("[analytics] checkout_click", { plan: plan.id, bump: orderBump });
    } catch {}
    window.location.href = buildCheckoutUrl(plan);
  };

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const Check = ({ color = "#4CAF50" }: { color?: string }) => (
    <span style={{ color, marginRight: 8, fontWeight: 700 }}>✓</span>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#2C2C2C",
        overflowX: "hidden",
      }}
    >
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white px-3 pt-3 pb-2 border-b border-[#F0E0E8]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz/$step", params: { step: "20" } })}
            aria-label="Voltar"
            className="text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center shrink-0"
          >
            ←
          </button>
          <div className="flex-1 text-center text-[11px] sm:text-[12px] font-semibold text-[#E85D8C] tracking-wide">
            🔒 OFERTA ESPECIAL — APENAS HOJE
          </div>
          <span className="w-6 shrink-0" />
        </div>
      </div>

      {/* SECTION 1 — Header + Recap */}
      <section
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFE5ED 100%)",
          padding: "32px 16px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, lineHeight: 1 }}>🎉</div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#2C2C2C",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Seu Diagnóstico Personalizado está Pronto!
          </h1>
          <p style={{ fontSize: 14, color: "#999", margin: 0 }}>
            Baseado em suas respostas específicas
          </p>
        </div>

        <div
          style={{
            background: "#FFF5F8",
            border: "2px solid #E85D8C",
            borderRadius: 12,
            padding: 20,
            fontSize: 14,
            color: "#2C2C2C",
            lineHeight: 1.8,
          }}
        >
          <div><Check />Idade: <b>{age}</b></div>
          <div><Check />Estágio: <b>{stage}</b></div>
          <div><Check />Sintomas principais: <b>{symptomsLabel}</b></div>
          <div><Check />Nível de impacto: <b>{impact}/10</b></div>
          <div><Check />Tipo de plano ideal: <b>{recommendedName}</b></div>
        </div>
      </section>

      {/* SECTION 2 — Recommendation */}
      <section style={{ padding: "24px 16px" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#E85D8C",
            marginBottom: 12,
          }}
        >
          Sua Recomendação Baseada no Perfil:
        </h3>
        <p style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6, margin: 0 }}>
          {recommendationMessage}
        </p>
      </section>

      {/* SECTION 3 — VSL */}
      <section style={{ padding: "0 16px 32px" }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: 16,
          }}
        >
          Como Funciona o Método
        </h3>
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#F0F0F0",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: 14,
            textAlign: "center",
            padding: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 40, marginBottom: 8 }}>▶</div>
            Vídeo explicativo (2 minutos) — em breve
          </div>
        </div>
      </section>

      {/* SECTION 4 — Pricing cards */}
      <section ref={cardsRef} style={{ padding: "0 16px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SALES_PLANS.map((plan) => (
            <div
              key={plan.id}
              style={{
                position: "relative",
                background: plan.cardBg,
                border: `${plan.borderWidth}px solid ${plan.borderColor}`,
                borderRadius: 16,
                padding: 20,
                boxShadow: plan.shadow,
                transition: "all 0.3s ease",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-block",
                  background:
                    plan.badgeStyle === "primary" ? "#E85D8C" : "#FFE5ED",
                  color: plan.badgeStyle === "primary" ? "#FFFFFF" : "#E85D8C",
                  fontSize: 11,
                  fontWeight: 700,
                  padding:
                    plan.badgeStyle === "primary" ? "8px 14px" : "6px 12px",
                  borderRadius: 20,
                  marginBottom: 12,
                }}
              >
                {plan.badge}
              </div>

              {plan.ribbon && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#4CAF50",
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {plan.ribbon}
                </div>
              )}

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#2C2C2C",
                  margin: "0 0 8px",
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#E85D8C",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                {plan.price}
              </div>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 20 }}>
                {plan.priceNote}
              </div>

              <div
                style={{
                  height: 1,
                  background: plan.highlight ? "#E85D8C" : "#E0E0E0",
                  margin: "20px 0",
                }}
              />

              <div style={{ fontSize: 14, color: "#2C2C2C", lineHeight: 1.6 }}>
                {plan.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 12,
                      fontWeight: f.emphasis ? 700 : 400,
                      color: f.emphasis ? "#E85D8C" : "#2C2C2C",
                    }}
                  >
                    <Check />
                    {f.text}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleBuy(plan)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#D64B7A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#E85D8C")
                }
                style={{
                  width: "100%",
                  height: 48,
                  background: "#E85D8C",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginTop: 24,
                  transition: "all 0.3s ease",
                }}
              >
                COMPRAR AGORA →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — Order bump */}
      <section style={{ padding: "16px 16px 32px" }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: 16,
          }}
        >
          Potencialize Seus Resultados
        </h3>
        <label
          style={{
            display: "flex",
            gap: 12,
            background: "linear-gradient(180deg, #FFF9E6 0%, #FFFBF0 100%)",
            border: "2px dashed #FFC107",
            borderRadius: 12,
            padding: 16,
            cursor: "pointer",
            alignItems: "flex-start",
          }}
        >
          <input
            type="checkbox"
            checked={orderBump}
            onChange={(e) => setOrderBump(e.target.checked)}
            style={{
              width: 20,
              height: 20,
              accentColor: "#FFC107",
              marginTop: 2,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#2C2C2C" }}>
              Planilha de Acompanhamento + E-book Extra
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#666",
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              Rastreie seus sintomas dia a dia e entenda seus padrões
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#FFC107" }}>
              + R$ 7,90
            </div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
              (será adicionado ao seu carrinho)
            </div>
          </div>
        </label>
      </section>

      {/* SECTION 6 — Guarantee */}
      <section style={{ padding: "0 16px 32px" }}>
        <div
          style={{
            background: "#F0F8FF",
            borderLeft: "4px solid #2196F3",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#2C2C2C",
              margin: "0 0 8px",
            }}
          >
            30 Dias de Garantia Incondicional
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Se em 30 dias você não sentir melhora nos seus sintomas, devolvemos
            100% do seu dinheiro. Sem perguntas. Sem burocracia. O risco é TODO
            NOSSO.
          </p>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section style={{ padding: "0 16px 32px" }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: 24,
          }}
        >
          Dúvidas Frequentes
        </h2>
        <div>
          {FAQ_ITEMS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ marginBottom: 12 }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#2C2C2C",
                    padding: 16,
                    background: "#F5F5F5",
                    border: "1px solid #E0E0E0",
                    borderRadius: open ? "8px 8px 0 0" : 8,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s ease",
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
                      padding: 16,
                      background: "#FAFAFA",
                      borderRadius: "0 0 8px 8px",
                      borderLeft: "3px solid #E85D8C",
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

      {/* SECTION 8 — Final CTA */}
      <section style={{ padding: "0 16px 32px" }}>
        <div
          style={{
            background: "linear-gradient(180deg, #FFE5ED 0%, #FFFFFF 100%)",
            padding: "32px 16px",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#2C2C2C",
              margin: "0 0 12px",
            }}
          >
            Qual é a sua escolha?
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#666",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Você pode continuar como está.
            <br />
            Ou você pode começar SUA transformação AGORA.
          </p>
          <button
            type="button"
            onClick={scrollToCards}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D64B7A";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(232,93,140,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E85D8C";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(232,93,140,0.3)";
            }}
            style={{
              width: "100%",
              height: 56,
              background: "#E85D8C",
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 700,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(232,93,140,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            ESCOLHA SEU PLANO ACIMA ↑
          </button>
        </div>
      </section>

      {/* SECTION 9 — Social proof */}
      <section style={{ padding: "0 16px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
          Junte-se a 8.247 mulheres que já transformaram suas vidas
        </p>
        <div
          style={{
            fontSize: 18,
            color: "#FFD700",
            marginBottom: 8,
            letterSpacing: 2,
          }}
        >
          ⭐⭐⭐⭐⭐
        </div>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          4.8/5 em satisfação (baseado em +2.400 avaliações)
        </p>
      </section>

      {/* SECTION 10 — Footer */}
      <footer
        style={{
          background: "#F5F5F5",
          borderTop: "1px solid #E0E0E0",
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#999",
            lineHeight: 1.6,
            margin: "0 0 12px",
          }}
        >
          Menopausa Sem Mistérios © 2026. Todos os direitos reservados.
          <br />
          Este conteúdo é educativo, não substitui orientação médica.
          <br />
          Consulte seu médico antes de fazer qualquer mudança em saúde.
        </p>
        <div
          style={{
            fontSize: 11,
            color: "#E85D8C",
          }}
        >
          <a href="#" style={{ color: "#E85D8C", textDecoration: "underline" }}>
            Termos de Serviço
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "#E85D8C", textDecoration: "underline" }}>
            Política de Privacidade
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
