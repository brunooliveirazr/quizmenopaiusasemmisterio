import{u as W,j as e,a as F,r as l}from"./index-BKs-NMLQ.js";import{Q as z}from"./QuizHeader-Cza4Ju0O.js";const V=20,I=new Set(["4","6","7","8","10","12","15","17"]),M={1:{title:"Qual é a sua faixa etária?",subtitle:"(Vamos calibrar o plano ideal para você)",options:["Até 40 anos","41-45 anos","46-50 anos","51-55 anos","Acima de 55 anos"]},2:{title:"Em qual estágio você está?",subtitle:"(Isso é essencial para seu plano)",options:["Pré-menopausa (ainda menstruo)","Perimenopausa (irregular)","Menopausa (parou há 1 ano)","Pós-menopausa (parou há +1 ano)","Não tenho certeza"],toastMessage:"✓ Excelente! Já estamos identificando as soluções certas para você..."},3:{title:"Selecione seus principais sintomas:",subtitle:"(Quanto mais você selecionar, melhor será a personalização)",multiSelect:!0,options:["Fogachos/Ondas de calor","Insônia/Sono ruim","Irritabilidade/Mudanças de humor","Ganho de peso","Confusão mental/Falta de foco","Ressecamento vaginal","Fadiga/Cansaço extremo","Dores nas articulações"]},4:{title:"Você já tentou resolver isso antes?",gradientBg:!0,options:["Nunca tentei nada","Tentei chás/vitaminas soltas","Tentei academia/dieta","Tentei medicação (HRT)","Tentei TUDO. Nada funcionou.","Testo coisas, mas desisto rápido"],defaultPopup:{icon:"💡",title:"Anotado!",body:`Cada tentativa anterior nos ajuda a entender o que NÃO funciona para você — e a montar o plano certo a partir daqui.

Vamos continuar?`},popups:{"Nunca tentei nada":{icon:"✨",title:"Ótimo!",body:`Você ainda está no ponto zero.
Isso significa que quando você implementar a solução certa, os resultados vão aparecer RÁPIDO.

A maioria das mulheres que começa aqui vê mudanças em 7-14 dias. Você pode ser a próxima.

Vamos lá?`},"Tentei chás/vitaminas soltas":{icon:"🌿",title:"Faz sentido tentar...",body:`Chás e vitaminas isoladas até ajudam, mas raramente atacam a raiz hormonal.

Quando a gente combina os elementos certos NA ORDEM CERTA, o efeito muda completamente.

Vamos descobrir sua combinação?`},"Tentei academia/dieta":{icon:"💪",title:"Academia e dieta são ótimos... MAS",body:`...quando a culpa é hormonal, nenhum agachamento do mundo resolve.

A boa notícia? Quando você ALINHA os hormônios, tudo o mais fica fácil.

Vamos descobrir como fazer isso para VOCÊ especificamente. Continua?`},"Tentei medicação (HRT)":{icon:"💊",title:"Você já deu um passo grande.",body:`HRT funciona para muitas mulheres — mas precisa estar acompanhada de rotina, alimentação e suporte específico para você.

Vamos descobrir o que está faltando no seu plano.`},"Tentei TUDO. Nada funcionou.":{icon:"💔",title:"Eu entendo.",body:`Você já investiu tempo, dinheiro e esperança.
E mesmo assim... nada colou.

Mas sabe o que descobri? O problema não é VOCÊ.
É que você estava tentando soluções genéricas.
Você precisa de algo PERSONALIZADO.

É exatamente isso que estamos montando agora. Vamos continuar?`},"Testo coisas, mas desisto rápido":{icon:"🌀",title:'Você não é "sem força de vontade".',body:`Você só nunca teve um plano simples o bastante para seguir.

O que vamos montar aqui cabe na sua rotina — sem dietas malucas, sem 2h de academia, sem culpa.

Vamos continuar?`}}},5:{title:"O que MAIS te frustra nos sintomas?",subtitle:"(Escolha o que mais impacta sua vida)",options:["A exaustão. Acordar cansada.","A irritabilidade. Estar de mau humor constante.","A insegurança. Ganho de peso.","A falta de foco. Confusão mental.","O impacto no relacionamento. Libido em queda.","Tudo junto. É um caos."],defaultPopup:{icon:"💡",title:"Anotado!",body:"Entendemos o que mais te frustra. Vamos construir o plano certo para isso."},popups:{"A exaustão. Acordar cansada.":{icon:"😴",title:"Acordar cansada é um sinal...",body:`...de que seus hormônios estão pedindo ajuda.
O pior? Você tenta descansar mais e AINDA assim acorda morta.

Quando você alinha a rotina certa com seu corpo, essa exaustão some em dias.

Você merece acordar DISPOSTA. Vamos fazer isso acontecer?`},"A irritabilidade. Estar de mau humor constante.":{icon:"😤",title:"A irritabilidade destroi relacionamentos.",body:`Você sabe disso. E o pior é que você NÃO CONSEGUE CONTROLAR.

Não é fraqueza sua. É química. Seus hormônios estão gritando.

Quando você reequilibra, sua paciência volta.
Seus relacionamentos melhoram. Você volta a ser VOCÊ.

Pronto para isso?`},"A insegurança. Ganho de peso.":{icon:"🪞",title:"Você não reconhece seu próprio corpo.",body:`Dietas extremas funcionam um tempo, aí volta tudo.
A culpa é hormonal, não sua.

Quando você alinha os hormônios, seu peso normaliza naturalmente. Sem loucura. Sem fome.

Você merece se sentir confiante de novo.`},"A falta de foco. Confusão mental.":{icon:"🧠",title:"A confusão mental é aterradora.",body:`Perder o fio da conversa, esquecer palavras simples, falta de concentração...

Você pensa que está enlouquecendo. MAS isso é neurohormonal.
Quando você estabiliza os hormônios, a clareza volta rápido.

Sua mente ainda está lá. Apenas esperando você ativar.`},"O impacto no relacionamento. Libido em queda.":{icon:"💕",title:"A queda de libido afeta o casal.",body:`Você se sente desejável? Sente desejo?

Quando os hormônios estão alinhados, tudo muda.
Volta a diversão. Volta a conexão.

Você merece uma vida sexual plena também.
Vamos recuperar isso?`},"Tudo junto. É um caos.":{icon:"🌪️",title:"Você está em um caos hormonal total.",body:`Múltiplos sintomas atacando de uma vez.
Isso é exaustivo.

MAS sabe qual é a notícia BOA? Uma solução bem estruturada resolve MÚLTIPLOS sintomas de uma vez.

Você não precisa resolver um por um.
Um reequilíbrio hormonal bem feito tira você do caos.`}}},6:{title:"De 1 a 10: Quanto os sintomas",subtitle:"impactam seu dia a dia?",type:"scale",gradientBg:!0,options:[],scalePopupRanges:[{min:1,max:3,popup:{icon:"✨",title:"Ainda está leve, MAS...",body:`Você está aqui porque sabe que pode piorar.
Melhor agir AGORA antes que fique insuportável.

Você está sendo inteligente. Vamos prevenir o pior.`}},{min:4,max:6,popup:{icon:"📈",title:"Isso está impactando sua qualidade de vida.",body:`Você merece estar melhor.

A boa notícia? No seu nível, as soluções funcionam RÁPIDO.
Em 2-3 semanas você já nota diferença.`}},{min:7,max:10,popup:{icon:"🆘",title:"Você está sofrendo.",body:`E isso HÁ QUANTO TEMPO?

Isso acaba agora.

As mulheres que estavam no seu patamar reportam alívio significativo em 7-14 dias depois de começar.

Você TEM solução. E está bem aqui.`}}]},7:{title:"Quantas noites por semana você dorme MAL?",options:["Quase toda noite (5-7 noites)","Maioria das noites (3-4 noites)","Algumas noites (1-2 noites)","Durmo bem, mas acordar é uma luta (letargia)","Meu sono é ok"],popups:{"Quase toda noite (5-7 noites)":{icon:"🚨",title:"Você está perdendo 35-49 horas de sono por semana.",body:`Sabe o que isso significa? Você está operando como um zumbi.
Seu corpo está pedindo SOCORRO.

Mas aqui está a boa notícia: sono ruim é UM dos sintomas mais RÁPIDOS de resolver quando você alinha os hormônios.

Algumas mulheres dormem BEM na primeira noite.

Você pode ser uma delas.`},"Maioria das noites (3-4 noites)":{icon:"😪",title:"Você está perdendo 15-28 horas de sono por mês.",body:`Isso acumula. Seu corpo está exausto.

Mas a recuperação também é rápida.
Quando você implementa o protocolo certo,
o sono melhora DRASTICAMENTE em dias.`},"Algumas noites (1-2 noites)":{icon:"🌙",title:"Pelo menos não é toda noite.",body:`Mas essas 1-2 noites ruins por semana acumulam cansaço.

A boa notícia? Com alguns ajustes simples nos hormônios,
você dorme perfeitamente toda noite.`},"Durmo bem, mas acordar é uma luta (letargia)":{icon:"😴",title:"Você tem letargia (dormência excessiva).",body:`Consegue dormir, mas acordar é um inferno.
Peso nos membros, confusão ao acordar...

Isso é hormonal. Quando você estabiliza, o despertar
fica fácil e você acorda CHEIA DE ENERGIA.`},"Meu sono é ok":{icon:"✅",title:"Ótimo! Você tem esse aspecto controlado.",body:`Mas se os outros sintomas estão te afetando,
eles podem começar a afetar o sono em breve.

Melhor reequilibrar agora e manter o sono bom.`}}},8:{title:"Qual é seu maior MEDO em relação à menopausa?",gradientBg:!0,titleColor:"#E85D8C",options:["Que nunca vai passar","Que vou ficar gorda/desatraente","Que perdi meu 'auge'","Que vou ficar louca/deprimida","Que vou precisar de medicação","Que nunca mais serei a mesma"],optionIcons:{"Que nunca vai passar":"⏰","Que vou ficar gorda/desatraente":"🪞","Que perdi meu 'auge'":"👑","Que vou ficar louca/deprimida":"🧠","Que vou precisar de medicação":"💊","Que nunca mais serei a mesma":"😔"},popups:{"Que nunca vai passar":{icon:"💫",title:"Medo de ser PERMANENTE.",body:`Mas aqui está a verdade: menopausa é uma TRANSIÇÃO.
Não é uma prisão.

Quando você ALINHA seu corpo com um método estruturado,
você atravessa essa transição com alívio, não com sofrimento.

Mulheres saem desse estado em semanas, não em anos.
Você também pode.`},"Que vou ficar gorda/desatraente":{icon:"💗",title:"Medo de perder sua sexualidade e atratividade.",body:`Aqui está a realidade: mulheres na menopausa são LINDAS.
O problema não é a idade. É o DESEQUILÍBRIO hormonal.

Quando você reequilibra, você volta a se sentir
sexy, confiante e DESEJÁVEL.

Seu corpo continua seu. Você apenas volta a ter controle.`},"Que perdi meu 'auge'":{icon:"✨",title:"O mito de que mulheres 'viram velhas' é FALSO.",body:`Você não perdeu seu auge. Você está entrando em um NOVO capítulo.

Mulheres depois de 45-50 anos dizem que se sentem mais
CONFIANTES, mais CERTAS DE SI MESMAS e mais VIVAS.

Esse é o auge REAL.

Vamos te levar até lá?`},"Que vou ficar louca/deprimida":{icon:"🌈",title:"O medo de perder o controle emocional é real.",body:`Mas é justamente porque é hormonal que EXISTE solução.

Quando você reequilibra, a estabilidade emocional volta.
Seu humor volta. Você volta a se reconhecer.

Esse não é um caminho sem volta. É um caminho com saída.`},"Que vou precisar de medicação":{icon:"🌿",title:"Medo de virar dependente de hormônios sintéticos.",body:`Entendo o medo. MAS existem muitas outras formas
de reequilibrar sem medicação pesada.

Método estruturado, rotina, nutrição, sono, estresse...
Tudo isso muda os hormônios NATURALMENTE.

Medicação é uma opção. Existem outras. Você escolhe.`},"Que nunca mais serei a mesma":{icon:"🦋",title:"Você está certa. Nunca mais será a mesma.",body:`Porque você vai ser MELHOR.

Você vai ser mais sábia, mais confiante, mais você mesma.
A menopausa não é morte de identidade. É transformação.

E transformação, quando bem guiada, é libertadora.

Vamos transformar você em algo melhor?`}}},9:{title:"Se você tivesse um método que se",subtitle:"adaptasse EXATAMENTE ao seu perfil,",titleEnd:"você seguiria?",gradientBg:!0,options:["Sim, com certeza","Depende, como funciona?","Talvez, se fosse fácil","Não acredito que funcione para mim"],popups:{"Sim, com certeza":{icon:"🎯",title:"PERFEITO!",body:`Você é exatamente o tipo de pessoa que tem sucesso.

Pessoas que sabem que precisam de algo personalizado
(não genérico) são as que MAIS conseguem resultados.

Você está no caminho certo. Vamos continuar?`},"Talvez, se fosse fácil":{icon:"💡",title:"Você quer algo que FUNCIONE mas que NÃO EXIJA MUITO.",body:`Ótima notícia: o método que estamos montando para você
é feito para ser executável em 10-15 minutos por dia.

Simples. Eficaz. Sustentável.

Vamos?`},"Depende, como funciona?":{icon:"🤔",title:"Pergunta inteligente.",body:`Você quer saber COMO funciona antes de comprometer.

Excelente. Suas respostas estão nos ajudando a construir
exatamente o método que faz sentido para você.

Continue respondendo. Logo te mostramos tudo.`},"Não acredito que funcione para mim":{icon:"🤝",title:"Você foi decepcionada antes. EU ENTENDO.",body:`Mas pense comigo: você já viu alguém com sucesso
usando uma estratégia GENÉRICA que não foi feita para eles?

Claro que não. Sucesso sempre vem de personalização.

Você merece tentar algo que foi FEITO para você, não para
'todo mundo'.

Vamos ver se dessa vez é diferente?`}}},10:{title:"Imagina acordar e você:",subtitle:"(Selecione as vitórias que você quer)",subtitleColor:"#E85D8C",multiSelect:!0,multiSelectOptional:!0,options:["💤 Dormiu a noite INTEIRA, acordou descansada","🔥 Não teve fogacho","⚡ Tem ENERGIA para o dia","🪞 Se sente linda no espelho","❤️ Quer seu parceiro / sente desejo","🧠 Consegue se focar no trabalho","😊 Está de bom humor","🎮 Sente controle sobre seu corpo"],countPopupRanges:[{min:0,max:1,popup:()=>({icon:"💭",title:"Você quer algo específico.",body:`Perfeito. Sua solução será altamente focada.

Vamos continuar montando seu método personalizado.`})},{min:2,max:4,popup:n=>({icon:"🎯",title:`Essas ${n} vitórias são poderosas.`,body:`São EXATAMENTE o que mulheres que seguem o método conseguem em 21-30 dias.

Não é promessa mágica. São resultados REAIS de mulheres como você que já passaram por aqui.

Você quer estar nessa lista em 30 dias?`})},{min:5,max:8,popup:n=>({icon:"🌟",title:"Você quer TUDO. E merece tudo.",body:`${n} vitórias. Isso é ambicioso, mas REALIZÁVEL.

Mulheres que chegam aqui com essa determinação conseguem a maioria (senão todas) essas vitórias em 60 dias.

Você vai ser uma delas. Vamos lá?`})}]},11:{title:"Quanto tempo você consegue dedicar por dia a uma rotina?",gradientBg:!0,options:["5 minutos (só o essencial)","10-15 minutos (rotina rápida)","20-30 minutos (posso investir bem)","1 hora (sou dedicada)","Múltiplas vezes ao dia"],optionIcons:{"5 minutos (só o essencial)":"⏱️","10-15 minutos (rotina rápida)":"⏱️","20-30 minutos (posso investir bem)":"⏱️","1 hora (sou dedicada)":"⏱️","Múltiplas vezes ao dia":"⏱️"},popups:{"5 minutos (só o essencial)":{icon:"⚡",title:"Perfeito. Ultra-rápido.",body:`O método tem uma versão ULTRA-RÁPIDA.
5 minutos é o suficiente quando é bem estruturado.

Qualidade > Quantidade.

Vamos montar sua versão de 5 minutos.`},"10-15 minutos (rotina rápida)":{icon:"🎯",title:"Esse é o SWEET SPOT.",body:`10-15 minutos é o tempo ideal para rotina consistente
que FUNCIONA.

Nem tão pouco que fica ineficaz.
Nem tanto que você cansa e desiste.

Vamos estruturar exatamente para isso.`},"20-30 minutos (posso investir bem)":{icon:"📈",title:"Você está investindo DIREITO.",body:`20-30 minutos permite aprofundamento real.

Com esse tempo, você consegue combinar meditação,
exercício, nutrição e mindfulness.

Seu resultado vai ser MULTIPLICADO.`},"1 hora (sou dedicada)":{icon:"💪",title:"Você é DEDICADA.",body:`Com 1 hora por dia, você pode ter um método
praticamente completo, variado e sustentável.

Suas chances de sucesso são altíssimas.`},"Múltiplas vezes ao dia":{icon:"🔥",title:"Você quer MÁXIMA transformação.",body:`Perfeito. Vamos estruturar um método que você
executa em pequenas doses ao longo do dia.

Mais frequência = Mais neuroplasticidade = Mais rápido
você muda.`}}},12:{title:"Você prefere:",options:["Um plano RÁPIDO/AÇÃO","Um plano COMPLETO/EDUCAÇÃO","Um plano BALANCEADO"],optionIcons:{"Um plano RÁPIDO/AÇÃO":"🚀","Um plano COMPLETO/EDUCAÇÃO":"📚","Um plano BALANCEADO":"⚖️"},optionSubtitles:{"Um plano RÁPIDO/AÇÃO":"(protocolos diretos e práticos)","Um plano COMPLETO/EDUCAÇÃO":"(entender tudo de trás pra frente)","Um plano BALANCEADO":"(pouco de tudo)"},popups:{"Um plano RÁPIDO/AÇÃO":{icon:"⚡",title:"Você é prática.",body:`Quer resultados RÁPIDO. Sem enrolação.

Seu plano personalizado vai ser estruturado
EXATAMENTE assim: protocolos diretos, sem conteúdo
desnecessário.

Nada de encher linguiça. Só ação.`},"Um plano COMPLETO/EDUCAÇÃO":{icon:"🧠",title:"Você quer ENTENDER.",body:`Não quer apenas seguir. Quer saber o POR QUE.

Seu plano vai incluir toda a educação hormonal,
ciência por trás dos protocolos, e contexto completo.

Você vai ser uma ESPECIALISTA em sua própria saúde.`},"Um plano BALANCEADO":{icon:"⚖️",title:"Você quer o melhor dos dois mundos.",body:`Excelente. Seu plano vai ter:
- Educação suficiente para entender
- Ação suficiente para executar rapidamente

Balanceado. Eficiente. Sustentável.`}}},13:{title:"Qual é sua altura?",subtitle:"(Em cm ou metros)",gradientBg:!0,type:"text",options:[],textConfig:{placeholder:"Exemplo: 165 ou 1,65",min:140,max:210,errorMessage:"Altura deve estar entre 140 e 210 cm",allowDecimal:!0}},14:{title:"Qual é seu peso atual?",subtitle:"(Em kg)",type:"text",options:[],textConfig:{placeholder:"Exemplo: 75 ou 75,5",min:40,max:200,errorMessage:"Peso deve estar entre 40 e 200 kg",allowDecimal:!0}},15:{title:"Como está seu nível de estresse?",gradientBg:!0,options:["Muito alto (trabalho, vida pessoal)","Alto (estou estressada)","Moderado (dias bons e ruins)","Baixo (estou razoável)","Muito baixo (vida tranquila)"],optionIcons:{"Muito alto (trabalho, vida pessoal)":"🚨","Alto (estou estressada)":"😰","Moderado (dias bons e ruins)":"😐","Baixo (estou razoável)":"😌","Muito baixo (vida tranquila)":"😊"},popups:{"Muito alto (trabalho, vida pessoal)":{icon:"🎯",title:"O estresse está amplificando seus sintomas.",body:`Isso é importantíssimo saber. Porque quando você
reduz estresse + alinha hormônios, o efeito é multiplicativo.

Sua rotina vai incluir técnicas ESPECÍFICAS para
gerenciar estresse. Vamos desativar essa bomba.`},"Alto (estou estressada)":{icon:"💪",title:"O estresse é um catalisador.",body:`Quanto mais estressada, mais amplificados os sintomas.

Sua rotina vai priorizar ALÍVIO DE ESTRESSE.
Isso vai impactar TODOS os seus sintomas.`},"Moderado (dias bons e ruins)":{icon:"⚖️",title:"Você está equilibrada.",body:`Alguns dias são mais duros, outros leves.

Sua rotina vai incluir técnicas preventivas para
não deixar o estresse escalar.`},"Baixo (estou razoável)":{icon:"✨",title:"Você tem boa gestão de estresse.",body:`Excelente. Sua rotina pode focar 100% em outros
sintomas. Você tem essa base coberta.`},"Muito baixo (vida tranquila)":{icon:"🧘",title:"Você está muito tranquila.",body:`Ótimo. Sua rotina vai ser mais sobre otimização
e transformação. Você tem espaço mental para tudo.`}}},16:{title:"Você está usando medicação (HRT/TRH)?",options:["Sim, estou em tratamento","Já usei, mas parei","Meu médico recomendou, mas recuso","Nunca usei","Não tenho informação sobre isso"],optionIcons:{"Sim, estou em tratamento":"✅","Já usei, mas parei":"🛑","Meu médico recomendou, mas recuso":"⚠️","Nunca usei":"❌","Não tenho informação sobre isso":"❓"},popups:{"Sim, estou em tratamento":{icon:"✅",title:"Você está com suporte médico.",body:`Excelente. A rotina que vamos montar para você é
COMPLEMENTAR à sua medicação, não substitui.

Juntos, você vai ter suporte 360°: medicina + estilo de vida.`},"Já usei, mas parei":{icon:"🤔",title:"Você experimentou, mas parou.",body:`Entendemos. Talvez não tenha funcionado ou teve
efeitos colaterais.

A boa notícia? Existem MÚLTIPLAS formas de resolver isso
sem medicação. Vamos explorar isso com você.`},"Meu médico recomendou, mas recuso":{icon:"💡",title:"Você quer tentar outras opções primeiro.",body:`Completamente válido. O método que vamos montar
para você pode resolver muitos dos seus sintomas
SEM medicação.

Se em 60 dias não funcionar, você sempre pode voltar
à medicação com seu médico. Mas tente primeiro com a gente.`},"Nunca usei":{icon:"🌿",title:"Você prefere abordagem natural.",body:`Perfeito. A maioria das mulheres consegue alívio
significativo SEM medicação quando tem o método certo.

Você está na abordagem certa.`},"Não tenho informação sobre isso":{icon:"❓",title:"Vamos educar você.",body:`Seu plano vai incluir informação sobre HRT/TRH,
prós e contras, e você vai ENTENDER todas as opções
disponíveis.

Decisão informada é a melhor decisão.`}}},17:{title:"Qual seu nível de comprometimento com a solução?",gradientBg:!0,options:["Estou desesperada. Faço o que for.","Estou muito motivada.","Estou interessada, mas cautelosa.","Estou aqui 'só pra ver'."],optionIcons:{"Estou desesperada. Faço o que for.":"🔥","Estou muito motivada.":"💪","Estou interessada, mas cautelosa.":"🤔","Estou aqui 'só pra ver'.":"👀"},popups:{"Estou desesperada. Faço o que for.":{icon:"🎯",title:"SUA HORA CHEGOU.",body:`Mulheres que chegam aqui com essa determinação
conseguem resultados em DIAS.

Seu corpo estava esperando por uma estrutura assim.

Vamos dar exatamente o que ele precisa?`},"Estou muito motivada.":{icon:"💪",title:"Você é a pessoa CERTA para este método.",body:`Essa motivação é ouro puro.

Com sua energia, você vai implementar rápido, ver
resultados rápido, e fortalecer o hábito.

Vamos transformar essa motivação em ação?`},"Estou interessada, mas cautelosa.":{icon:"🤝",title:"Você quer ter certeza antes de comprometer.",body:`Inteligente. Você vai conseguir resultados PROVADOS
em poucos dias. Aí sua cautela vira confiança.

Você será sua própria prova. Vamos?`},"Estou aqui 'só pra ver'.":{icon:"👀",title:"Tudo bem estar exploratória.",body:`Mas já que chegou até aqui, seu corpo está pedindo
ajuda. Pelo menos VER sua oferta personalizada custa nada.

Depois você decide. Deal?`}}},18:{title:"Como você nos conheceu?",subtitle:"(Para finalizar, qual seu nome?)",type:"select",optional:!0,options:["Anúncio do Instagram","Anúncio do Facebook","Google Search","Indicação de amiga","Email/Newsletter","Outro"],textConfig:{placeholder:"Seu primeiro nome"}}};function ae(){const{step:n}=W({from:"/quiz/$step"}),d=parseInt(n,10)||1;return n==="19"?e.jsx(X,{}):n==="20"?e.jsx(G,{}):n==="21"?e.jsx(J,{}):n==="22"?e.jsx(K,{}):e.jsx($,{step:n,stepNum:d})}function $({step:n,stepNum:d}){const r=F(),a=M[n]??M[1],u=d/V*100,c=!!a.multiSelect,[o,i]=l.useState(null),[s,p]=l.useState([]),[x,f]=l.useState(!1),[g,b]=l.useState(!1),[S,E]=l.useState(null),[v,O]=l.useState(5),[y,N]=l.useState(""),[q,A]=l.useState(!1);l.useEffect(()=>{i(null),p([]),O(5),N(""),A(!1),f(!1),b(!1),E(null),C.current&&(window.clearTimeout(C.current),C.current=null)},[n]);const P=()=>{try{const t=JSON.parse(localStorage.getItem("quizAnswers")||"{}");t[n]={single:o,multi:s,scale:v,text:y},localStorage.setItem("quizAnswers",JSON.stringify(t))}catch{}},w=()=>{P();const t=d+1;t<=V&&r({to:"/quiz/$step",params:{step:String(t)}})},C=l.useRef(null),R=t=>{i(t),C.current&&window.clearTimeout(C.current),!(a.type==="select"||a.type==="scale"||a.type==="text"||c)&&(C.current=window.setTimeout(()=>{const m=I.has(n)?a.popups?.[t]??a.defaultPopup:null;if(m){E(m);return}try{const j=JSON.parse(localStorage.getItem("quizAnswers")||"{}");j[n]={single:t,multi:[],scale:v,text:y},localStorage.setItem("quizAnswers",JSON.stringify(j))}catch{}const h=d+1;h<=V&&r({to:"/quiz/$step",params:{step:String(h)}})},1e3))},B=t=>{b(!1),p(m=>m.includes(t)?m.filter(h=>h!==t):[...m,t])},L=()=>{if(!D){b(!0),window.setTimeout(()=>b(!1),2500);return}if(a.type==="text"&&a.textConfig){const t=parseFloat(y.replace(",",".")),m=a.textConfig.min??-1/0,h=a.textConfig.max??1/0;if(isNaN(t)||t<m||t>h){A(!0),window.setTimeout(()=>A(!1),2500),b(!0),window.setTimeout(()=>b(!1),2500);return}w();return}if(I.has(n)){if(!c&&o&&(a.popups||a.defaultPopup)){const t=a.popups?.[o]??a.defaultPopup;if(t){E(t);return}}if(c&&a.countPopupRanges){const t=s.length,m=a.countPopupRanges.find(h=>t>=h.min&&t<=h.max);if(m){E(m.popup(t));return}}if(a.type==="scale"&&a.scalePopupRanges){const t=a.scalePopupRanges.find(m=>v>=m.min&&v<=m.max);if(t){E(t.popup);return}}}w()},Q=()=>{E(null),w()},U=()=>{d>1?r({to:"/quiz/$step",params:{step:String(d-1)}}):r({to:"/"})},D=a.type==="scale"||a.multiSelectOptional||a.optional||a.type==="select"?!0:a.type==="text"?y.trim().length>0:c?s.length>0:!!o,H=c&&a.multiSelectOptional&&s.length<2;return e.jsx("div",{className:`min-h-screen w-full flex justify-center ${a.gradientBg?"bg-gradient-to-b from-white to-[#FFE5ED]":"bg-white"}`,children:e.jsxs("div",{className:"w-full max-w-[480px] min-h-screen flex flex-col px-4 pt-6 pb-4",children:[e.jsx("div",{className:"sticky top-0 z-10 bg-white pb-2 -mx-4 px-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:U,"aria-label":"Voltar",className:"text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center",children:"←"}),e.jsx("div",{className:"h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-[#E85D8C] transition-all duration-500",style:{width:`${u}%`}})})]})}),e.jsx(z,{}),a.type==="scale"?e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"font-bold text-[18px] sm:text-[20px] text-[#2C2C2C] mt-6 mb-0 text-center leading-snug px-2",children:a.title}),e.jsx("h2",{className:"font-semibold text-[14px] sm:text-[15px] text-[#E85D8C] mb-6 text-center leading-snug px-2",children:a.subtitle})]}):e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"font-bold text-[18px] sm:text-[20px] mt-6 mb-0 text-center leading-snug px-2",style:{color:a.titleColor||"#2C2C2C"},children:a.title}),a.subtitle&&e.jsx("h2",{className:"font-semibold text-[14px] sm:text-[15px] text-[#E85D8C] text-center mt-1 mb-0 leading-snug px-2",children:a.subtitle}),a.titleEnd&&e.jsx("h2",{className:"font-bold text-[18px] sm:text-[20px] text-center mt-1 mb-6 leading-snug px-2",style:{color:a.titleColor||"#2C2C2C"},children:a.titleEnd})]}),e.jsx("div",{className:"flex flex-col flex-1 mt-8",children:a.type==="scale"?e.jsxs("div",{className:"flex flex-col items-center justify-center flex-1",children:[e.jsx("div",{className:"text-[48px] font-bold text-[#E85D8C] mb-4",children:v}),e.jsxs("div",{className:"w-full px-2 mb-6",children:[e.jsx("input",{type:"range",min:1,max:10,value:v,onChange:t=>O(parseInt(t.target.value,10)),className:"w-full h-10 appearance-none cursor-pointer",style:{background:`linear-gradient(to right, #FFB3D9 0%, #E85D8C ${(v-1)/9*100}%, #E0E0E0 ${(v-1)/9*100}%, #E0E0E0 100%)`,borderRadius:"20px",height:"8px"}}),e.jsx("style",{children:`
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
                `})]}),e.jsxs("div",{className:"flex justify-between w-full px-2 mb-8",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-[24px]",children:"😊"}),e.jsx("span",{className:"text-[12px] text-[#999] mt-1",children:"1 - Leve"})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-[24px]",children:"😭"}),e.jsx("span",{className:"text-[12px] text-[#999] mt-1",children:"10 - Insuportável"})]})]})]}):a.type==="text"?e.jsxs("div",{className:"flex flex-col flex-1",children:[e.jsx("input",{type:"text",inputMode:"decimal",placeholder:a.textConfig?.placeholder,value:y,onChange:t=>{N(t.target.value),A(!1),b(!1)},className:`w-full h-14 px-4 rounded-xl border-2 text-[16px] text-[#2C2C2C] bg-white outline-none transition-all duration-200 ${q?"border-[#FFC107]":y.trim()?"border-[#E85D8C]":"border-[#E0E0E0]"}`,style:{boxShadow:y.trim()&&!q?"0 0 0 3px rgba(232, 93, 140, 0.1)":"none"}}),q&&a.textConfig?.errorMessage&&e.jsx("p",{className:"text-[13px] text-[#FFC107] mt-2 text-center",children:a.textConfig.errorMessage})]}):a.type==="select"?e.jsxs("div",{className:"flex flex-col gap-3 flex-1",children:[a.textConfig&&e.jsx("input",{type:"text",value:y,onChange:t=>N(t.target.value),placeholder:a.textConfig.placeholder,className:"w-full h-14 px-4 rounded-xl border-2 border-[#E0E0E0] bg-white text-[16px] text-[#2C2C2C] outline-none focus:border-[#E85D8C] transition-all duration-200"}),e.jsx("div",{className:"relative",children:e.jsxs("select",{value:o??"",onChange:t=>i(t.target.value),className:`w-full h-14 px-4 pr-12 rounded-xl border-2 bg-white text-[16px] text-[#2C2C2C] appearance-none outline-none transition-all duration-200 cursor-pointer ${o?"border-[#E85D8C]":"border-[#E0E0E0]"}`,style:{backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center",backgroundSize:"20px"},children:[e.jsx("option",{value:"",disabled:!0,children:"Selecione uma opção"}),a.options.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}):e.jsx("div",{className:"flex flex-col gap-3 flex-1",children:a.options.map(t=>{if(c){const T=s.includes(t);return e.jsxs("button",{onClick:()=>B(t),className:`w-full min-h-14 px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-[15px] sm:text-[16px] text-left text-[#2C2C2C] leading-snug ${T?"border-[#E85D8C] bg-[#FFE5ED] font-bold":"border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"}`,children:[e.jsx("div",{className:`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${T?"bg-[#E85D8C] border-[#E85D8C]":"bg-white border-[#E0E0E0]"}`,children:T&&e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M2 6L5 9L10 3",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"flex-1",children:t})]},t)}const m=o===t,h=a.optionIcons?.[t],j=a.optionSubtitles?.[t];return e.jsxs("button",{onClick:()=>R(t),className:`w-full min-h-14 px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-between gap-3 text-[15px] sm:text-[16px] text-[#2C2C2C] leading-snug ${m?"border-[#E85D8C] bg-[#FFE5ED] font-bold":"border-[#E0E0E0] bg-white hover:border-[#E85D8C] hover:bg-[#FFF5F8]"}`,children:[e.jsxs("span",{className:"flex flex-col items-start gap-0.5 text-left flex-1 min-w-0",children:[e.jsxs("span",{className:"flex items-center gap-2 w-full",children:[h&&e.jsx("span",{className:"text-[20px] shrink-0",children:h}),e.jsx("span",{className:"flex-1",children:t})]}),j&&e.jsx("span",{className:`text-[12px] sm:text-[13px] text-[#999] font-normal ${h?"pl-7":""}`,children:j})]}),m&&e.jsx("span",{className:"text-[#E85D8C] text-lg font-bold shrink-0",children:"✓"})]},t)})})}),e.jsxs("div",{className:"sticky bottom-0 bg-white pt-4 pb-2 -mx-4 px-4",children:[H&&e.jsx("p",{className:"text-[12px] text-[#999] text-center mb-2",children:"Selecione pelo menos 2-3 para melhor personalização"}),e.jsx("button",{onClick:L,disabled:!D,className:`w-full h-14 rounded-xl font-bold text-[16px] text-white transition-all ${D?"bg-[#E85D8C] hover:bg-[#D64B7A]":"bg-[#E85D8C] opacity-50 cursor-not-allowed"}`,children:a.type==="scale"||c||a.type==="text"||a.type==="select"?"CONTINUAR →":"PRÓXIMO →"})]}),x&&!c&&e.jsx("div",{className:"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#4CAF50] text-white px-4 py-4 rounded-lg text-[14px] shadow-lg animate-fade-in",style:{opacity:.95},children:a.toastMessage??"✓ Perfeito! Estamos montando seu diagnóstico..."}),g&&e.jsx("div",{className:"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FF5252] text-white px-5 py-4 rounded-lg text-[14px] shadow-lg animate-fade-in",style:{opacity:.95},children:c?"Selecione pelo menos um sintoma":a.type==="text"?a.textConfig?.errorMessage||"Digite um valor válido":"Selecione uma opção para continuar"}),S&&e.jsx("div",{className:"fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6",children:e.jsxs("div",{role:"dialog","aria-modal":"true",className:"bg-white border-2 border-[#E85D8C] rounded-xl p-5 max-w-[320px] w-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center animate-fade-in",style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'},children:[e.jsx("div",{className:"text-4xl mb-2",children:S.icon}),e.jsx("h3",{className:"font-bold text-[18px] text-[#2C2C2C] mb-3",children:S.title}),e.jsx("p",{className:"text-[14px] text-[#2C2C2C] whitespace-pre-line mb-5",style:{lineHeight:1.6},children:S.body}),e.jsx("button",{onClick:Q,className:"w-full h-12 rounded-lg bg-[#E85D8C] hover:bg-[#D64B7A] text-white font-bold text-[15px] transition-colors",children:"OK, Continuar →"})]})})]})})}const _=[{text:"Analisando seu perfil hormonal...",at:0},{text:"Calibrando rotina para sua idade...",at:2},{text:"Mapeando seus sintomas-chave...",at:4},{text:"Calculando tempo ideal de sono...",at:6},{text:"Estruturando protocolo de estresse...",at:8}],k=[{name:"Marina, 52 anos",quote:"Dormi a noite toda pela primeira vez em 3 anos!"},{name:"Beatriz, 48 anos",quote:"Meu peso normalizou sem fazer dieta maluca"},{name:"Carla, 51 anos",quote:"Meu marido perguntou se eu estava feliz novamente"},{name:"+8.247 mulheres",quote:"Já transformaram suas vidas com o nosso plano"}];function X(){const n=F(),[d,r]=l.useState(0),[a,u]=l.useState(0),[c,o]=l.useState(!0);l.useEffect(()=>{const x=Date.now(),f=window.setInterval(()=>{const g=(Date.now()-x)/1e3;r(Math.min(g,10)),g>=10&&window.clearInterval(f)},100);return()=>window.clearInterval(f)},[]),l.useEffect(()=>{const x=window.setInterval(()=>{o(!1),window.setTimeout(()=>{u(f=>(f+1)%k.length),o(!0)},400)},2500);return()=>window.clearInterval(x)},[]);const i=Math.min(100,Math.round(d/10*100)),s=d>=10,p=k[a];return e.jsx("div",{className:"min-h-screen w-full flex justify-center bg-gradient-to-b from-[#FFE5ED] to-white",children:e.jsxs("div",{className:"w-full max-w-[480px] min-h-screen flex flex-col px-4",children:[e.jsx("div",{className:"pt-4",children:e.jsx("div",{className:"flex items-center gap-3",children:e.jsx("div",{className:"h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-[#E85D8C] transition-all",style:{width:"95%"}})})})}),e.jsx("div",{className:"text-center mt-10 mb-8",children:e.jsx("p",{className:"font-bold text-[18px] text-[#E85D8C]",children:"🔄 Gerando seu plano personalizado..."})}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"w-4/5 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-[#E85D8C] transition-all duration-100 ease-linear",style:{width:`${i}%`}})}),e.jsxs("div",{className:"text-[16px] text-[#E85D8C] mt-2 font-medium tabular-nums",children:[i,"%"]})]}),e.jsxs("div",{className:"mt-8 flex flex-col gap-3 px-2",children:[_.map(x=>{if(d<x.at)return null;const f=d>=x.at+2;return e.jsxs("div",{className:"flex items-center gap-3 text-[16px] text-[#2C2C2C] animate-fade-in",children:[f?e.jsx("span",{className:"text-[20px] text-[#4CAF50]",children:"✓"}):e.jsx("span",{className:"text-[20px] text-[#FFC107] inline-block animate-spin",children:"⏳"}),e.jsx("span",{children:x.text})]},x.text)}),s&&e.jsxs("div",{className:"flex items-center gap-3 text-[16px] text-[#2C2C2C] font-bold animate-fade-in",children:[e.jsx("span",{className:"text-[24px] text-[#4CAF50]",children:"✓"}),e.jsx("span",{children:"Pronto! Seu plano foi criado exclusivamente para você."})]})]}),e.jsx("div",{className:"mt-8 bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",children:e.jsxs("div",{className:`transition-opacity duration-500 ${c?"opacity-100":"opacity-0"}`,children:[e.jsxs("p",{className:"text-[14px] text-[#2C2C2C] italic",style:{lineHeight:1.6},children:['"',p.quote,'"']}),e.jsxs("p",{className:"text-[12px] text-[#999] mt-2 not-italic",children:["— ",p.name]})]})}),e.jsx("div",{className:"flex-1"}),s&&e.jsx("div",{className:"pb-6 animate-fade-in",children:e.jsx("button",{onClick:()=>n({to:"/quiz/$step",params:{step:"20"}}),className:"w-full h-14 rounded-xl bg-[#E85D8C] hover:bg-[#D64B7A] text-white font-bold text-[16px] transition-colors",children:"VER MEU RESULTADO PERSONALIZADO →"})})]})})}function G(){const n=F(),[d,r]=l.useState(!1),[a,u]=l.useState(10),c=5e3,o=1e4,i=[{x:60,y:280,label:"Hoje",desc:"Acesso ao app liberado",color:"#CFCFE0",delay:.6},{x:150,y:210,label:"1-3 dias",desc:"Primeiros sintomas melhoram",color:"#FFD700",delay:2.6},{x:250,y:130,label:"7 dias",desc:"Dormir melhor & mais energia",color:"#FFD700",delay:5},{x:340,y:55,label:"13-21 dias",desc:"Transformação visível",color:"#FFD700",delay:7.4,big:!0}];return l.useEffect(()=>{const s=setTimeout(()=>r(!0),c),p=setTimeout(()=>{n({to:"/quiz/$step",params:{step:"21"}})},c+o);return()=>{clearTimeout(s),clearTimeout(p)}},[n]),l.useEffect(()=>{if(!d)return;u(10);const s=setInterval(()=>{u(p=>p>0?p-1:0)},1e3);return()=>clearInterval(s)},[d]),e.jsxs("div",{className:"min-h-screen w-full flex justify-center animate-fade-in",style:{background:"linear-gradient(180deg, #3B1361 0%, #6B46C1 100%)"},children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"w-full max-w-[480px] min-h-screen flex flex-col px-5 pt-8 pb-6 text-white",children:[e.jsx("p",{className:"text-center text-[12px] tracking-wide text-white/80",children:"Seu plano pessoal está pronto!"}),e.jsx("h1",{className:"text-center font-bold text-[28px] sm:text-[32px] leading-tight mt-3 mb-8",children:"Recupere sua Energia em 13 Dias"}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("svg",{width:"100%",height:"320",viewBox:"0 0 400 320",className:"overflow-visible",children:[e.jsx("path",{className:"timeline-path",pathLength:1,d:"M 60 280 Q 120 250 150 210 T 250 130 T 340 55",stroke:"#E85D8C",strokeWidth:"4",fill:"none",strokeLinecap:"round"}),i.map((s,p)=>e.jsxs("g",{children:[e.jsx("circle",{className:"timeline-node",cx:s.x,cy:s.y,r:s.big?13:10,fill:s.color,stroke:"#FFFFFF",strokeWidth:"2",style:{animationDelay:`${s.delay}s`}}),s.big&&e.jsx("circle",{className:"timeline-ring",cx:s.x,cy:s.y,r:"18",fill:"none",stroke:"#FFD700",strokeWidth:"2",style:{animationDelay:`${s.delay+.3}s`}})]},p))]}),i.map((s,p)=>{const x=s.x/400*100,f=s.y-56,g=x<25?"left":x>75?"right":"center",b=g==="left"?"-10%":g==="right"?"-90%":"-50%";return e.jsx("div",{className:"absolute",style:{left:`${x}%`,top:`${f}px`,transformOrigin:g==="left"?"left top":g==="right"?"right top":"center top",marginLeft:g==="left"?"-12px":void 0,transform:`translateX(${b})`},children:e.jsxs("div",{className:"timeline-balloon bg-white rounded-lg px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)] min-w-[120px] max-w-[160px]",style:{animationDelay:`${s.delay+.2}s`},children:[e.jsx("p",{className:"text-[11px] font-bold text-[#E85D8C] leading-tight",children:s.label}),e.jsx("p",{className:"text-[11px] text-[#2C2C2C] leading-snug mt-0.5",children:s.desc})]})},p)})]}),e.jsx("div",{className:"flex-1"}),d?e.jsx("div",{className:"mt-10 mb-2 animate-fade-in",children:e.jsxs("div",{className:"bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-center backdrop-blur-sm",children:[e.jsx("p",{className:"text-[14px] text-white leading-relaxed",children:"Vamos garantir que tudo esteja pronto para você ter a melhor experiência."}),e.jsxs("div",{className:"mt-3 flex items-center justify-center gap-2",children:[e.jsx("span",{className:"inline-block w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"}),e.jsxs("p",{className:"text-[13px] font-bold text-[#FFD700] tabular-nums",children:["Aguarde ",a," segundo",a===1?"":"s","..."]})]})]})}):e.jsx("p",{className:"text-center text-[13px] text-white/90 leading-relaxed mt-10 mb-10 px-2",children:"Construindo sua linha do tempo personalizada..."})]})]})}function J(){const n=F(),d=()=>{n({to:"/quiz/$step",params:{step:"22"}})};return e.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(180deg, #FFFFFF 0%, #FFE5ED 100%)",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',color:"#2C2C2C",animation:"fadeIn 0.5s ease-out"},children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"sticky top-0 z-10 bg-white px-4 pt-4 pb-2",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>n({to:"/quiz/$step",params:{step:"20"}}),"aria-label":"Voltar",className:"text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center",children:"←"}),e.jsx("div",{className:"h-1 flex-1 bg-[#E0E0E0] rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-[#E85D8C]",style:{width:"100%"}})})]})}),e.jsx(z,{}),e.jsxs("section",{style:{padding:"24px 16px 8px"},children:[e.jsx("p",{style:{fontSize:12,color:"#999",margin:"0 0 8px"},children:"Você descobriu seu diagnóstico. Agora entenda suas opções."}),e.jsx("h1",{style:{fontSize:26,fontWeight:700,color:"#2C2C2C",margin:"0 0 16px",lineHeight:1.25},children:"Como Funciona o Alinhamento Hormonal"}),e.jsxs("p",{style:{fontSize:14,color:"#2C2C2C",lineHeight:1.6,margin:0},children:["Com base em suas 20 respostas, você descobriu exatamente o que seu corpo precisa. Agora vem a estrutura que faz a diferença: um método personalizado, prático e consistente.",e.jsx("br",{}),e.jsx("br",{}),"Veja como mulheres como você transformaram suas vidas:"]})]}),e.jsxs("section",{style:{padding:"32px 16px 0",background:"#FFFFFF"},children:[e.jsx("h2",{style:{fontSize:18,fontWeight:700,color:"#2C2C2C",margin:"0 0 24px"},children:"Histórias Reais de Mulheres que Começaram:"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:16},children:[{name:"Marina",age:52,src:"/videos/depoimento-1.mp4"},{name:"Cláudia",age:49,src:"/videos/depoimento-2.mp4"},{name:"Renata",age:55,src:"/videos/depoimento-3.mp4"}].map(r=>e.jsxs("div",{className:"story-card",children:[e.jsxs("div",{style:{position:"relative",aspectRatio:"9 / 16",background:"#000000",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",cursor:"pointer"},onClick:a=>{const u=a.currentTarget.querySelector("video"),c=a.currentTarget.querySelector(".play-overlay");u&&(u.paused?(u.play(),c&&(c.style.opacity="0")):(u.pause(),c&&(c.style.opacity="1")))},children:[e.jsx("video",{src:r.src,playsInline:!0,preload:"metadata",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"},onEnded:a=>{const u=a.currentTarget.parentElement?.querySelector(".play-overlay");u&&(u.style.opacity="1")}}),e.jsx("div",{className:"play-overlay",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:72,height:72,borderRadius:"50%",background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",fontSize:28,transition:"opacity 0.2s ease",pointerEvents:"none"},children:"▶"})]}),e.jsxs("div",{style:{fontSize:12,fontWeight:700,color:"#2C2C2C",marginTop:8,textAlign:"center"},children:[r.name,", ",r.age," anos"]})]},r.src))}),e.jsx("p",{style:{fontSize:13,color:"#666",lineHeight:1.6,marginTop:16,marginBottom:0},children:"Clique para ver histórias de 8 segundos de mulheres reais que começaram com o método. Sem filtro, sem roteiro."})]}),e.jsx("section",{style:{padding:"32px 16px"},children:e.jsx("div",{style:{background:"#FFF5F8",border:"2px solid #E85D8C",borderRadius:12,padding:20,display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:16,textAlign:"center"},children:[{n:"8.247",d:"mulheres começaram"},{n:"82%",d:"veem alívio em 7 dias"},{n:"21",d:"dias transformação média"}].map(r=>e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:22,fontWeight:700,color:"#E85D8C"},children:r.n}),e.jsx("div",{style:{fontSize:13,color:"#2C2C2C",marginTop:4},children:r.d})]},r.n))})}),e.jsxs("section",{style:{background:"#FFFFFF",padding:"24px 16px"},children:[e.jsx("h2",{style:{fontSize:18,fontWeight:700,color:"#2C2C2C",margin:"0 0 16px"},children:"Por que Isso Funciona Para Você:"}),e.jsxs("p",{style:{fontSize:14,color:"#2C2C2C",lineHeight:1.6,margin:"12px 0"},children:["Seu diagnóstico mostrou que você não é fraca, não está envelhecendo e sua disposição não é preguiça. São seus hormônios pedindo alinhamento.",e.jsx("br",{}),e.jsx("br",{}),"A diferença entre você e alguém que transformou? Ela tinha um MÉTODO. Você agora também tem."]}),e.jsxs("p",{style:{fontSize:14,color:"#2C2C2C",lineHeight:1.6,margin:"12px 0"},children:["Nosso método não é genérico. Não é um app com 500 receitas aleatórias. É uma estrutura que se adapta ESPECIFICAMENTE ao seu tempo, seus sintomas e seu estilo de aprendizado.",e.jsx("br",{}),e.jsx("br",{}),"Em 7-14 dias você começa a sentir diferença. Em 21 dias a transformação fica visível."]}),e.jsxs("p",{style:{fontSize:14,color:"#2C2C2C",lineHeight:1.6,margin:"12px 0"},children:["O que você precisa é simples: 5-15 minutos por dia de rotina, check-ins para acompanhar seu progresso, e acesso a um método que JÁ funcionou para 8.247 mulheres.",e.jsx("br",{}),e.jsx("br",{}),"Agora é sua vez."]})]}),e.jsx("section",{style:{padding:"0 16px 32px"},children:e.jsxs("div",{style:{background:"#E3F2FD",borderLeft:"4px solid #2196F3",borderRadius:8,padding:16},children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#2196F3",marginBottom:6},children:"30 dias para você decidir se quer continuar"}),e.jsxs("p",{style:{fontSize:12,color:"#2C2C2C",lineHeight:1.6,margin:0},children:["Se em 30 dias achar que não é pra você, devolvemos seu dinheiro. Sem perguntas. Sem burocracia. Sem ressentimento.",e.jsx("br",{}),"A gente confia que vai funcionar. E você merece testar sem risco."]})]})}),e.jsxs("section",{style:{background:"#FFFFFF",padding:"24px 16px 40px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#2C2C2C",marginBottom:16},children:"Escolha a opção que faz mais sentido para você:"}),e.jsx("button",{onClick:d,style:{width:"100%",height:48,background:"#E85D8C",color:"#FFFFFF",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",transition:"background 0.3s ease"},onMouseEnter:r=>r.currentTarget.style.background="#D64B7A",onMouseLeave:r=>r.currentTarget.style.background="#E85D8C",children:"VER OPÇÕES →"}),e.jsx("div",{style:{fontSize:12,color:"#999",marginTop:12},children:"Sem pressão. Escolha no seu ritmo."})]})]})}const Y=[{id:"basico",label:"Se você quer testar primeiro",labelColor:"#E85D8C",name:"Básico",price:"R$ 1,99",priceColor:"#E85D8C",description:"Acesso ao app. Sem compromisso. Perfeito para entender como funciona.",features:["Acesso ao app","Rotina diária","Conteúdo base","30 dias para decidir"],cta:"COMEÇAR COM BÁSICO",checkoutUrl:"https://ggcheckout.app/checkout/v5/9NVEioxO8XP9XuebnhBn",cardBg:"#FFFFFF",border:"#E85D8C",borderWidth:3,shadow:"0 4px 16px rgba(232,93,140,0.15)",divider:"#FFE5ED",btnBg:"linear-gradient(135deg,#E85D8C 0%,#FF8FB3 100%)",btnHover:"linear-gradient(135deg,#D64B7A 0%,#E85D8C 100%)"},{id:"premium",label:"⭐ MAIS POPULAR",labelColor:"#FFFFFF",name:"Premium",subheading:"Para transformação real",price:"R$ 9,89",priceColor:"#E85D8C",description:"O plano completo. Tudo que você precisa para transformar. 67% das mulheres escolhem este.",features:["Tudo do Básico +","Módulos Premium","Protocolos avançados","Acesso vitalício","Suporte por email"],cta:"ESCOLHER PREMIUM",checkoutUrl:"https://ggcheckout.app/checkout/v2/3B8zcUXZYtwguGI98R0f",cardBg:"#FFFFFF",border:"#E85D8C",borderWidth:4,shadow:"0 6px 20px rgba(232,93,140,0.22)",divider:"#F5A5B8",btnBg:"linear-gradient(135deg,#E85D8C 0%,#FF8FB3 50%,#E85D8C 100%)",btnHover:"linear-gradient(135deg,#D64B7A 0%,#E85D8C 50%,#D64B7A 100%)"},{id:"vip",label:"👑 TRANSFORMAÇÃO TOTAL",labelColor:"#FFFFFF",name:"VIP Total",subheading:"Transformação com acompanhamento",price:"R$ 29,90",priceColor:"#9333EA",description:"Tudo do Premium + comunidade + consultora. Para quando você quer ajuda no caminho.",features:["Tudo do Premium +","Comunidade 24h (WhatsApp)","Consultora VIP","Relatório para médico","Acompanhamento 30 dias"],cta:"ESCOLHER VIP",checkoutUrl:"https://ggcheckout.app/checkout/v5/yUqnOnQmujpUEO6NhHb2",cardBg:"linear-gradient(180deg, #FFFFFF 0%, #F3E8FF 100%)",border:"#9333EA",borderWidth:3,shadow:"0 4px 16px rgba(147,51,234,0.15)",divider:"#D8B4FE",btnBg:"#9333EA",btnHover:"#7E22CE"}],Z=[{q:"Qual a diferença entre Básico, Premium e VIP?",a:`• Plano Básico (entrada / para começar com segurança)

Ideal para quem quer dar o primeiro passo, conhecer o método e iniciar a rotina sem complicação.

Você recebe: acesso ao app + jornada base, com conteúdo guiado e recursos essenciais (leitura dos módulos, progresso e rotina/check-ins).

Para quem é: quem quer testar com baixo risco e começar a organizar os sintomas e a rotina.

• Plano Premium (mais completo para resultado prático no dia a dia)

Ideal para quem quer ir além do básico e ter materiais avançados para acelerar o progresso.

Você recebe: tudo do Básico + acesso aos conteúdos e recursos Premium (materiais extras e protocolos mais direcionados para situações do dia a dia).

Para quem é: quem já sente que precisa de uma solução mais completa e quer avançar com mais ferramentas práticas.

• Plano VIP (Premium + acompanhamento e pertencimento)

Ideal para quem não quer passar por essa fase sozinha e quer apoio contínuo além do conteúdo.

Você recebe: tudo do Premium + benefícios VIP (como comunidade, recursos exclusivos e suporte/aconselhamento dentro do que o programa oferece).

Para quem é: quem quer acompanhamento, motivação e um ecossistema completo para manter consistência e evoluir mais rápido.`},{q:"Quanto tempo até ver resultado?",a:"7-14 dias você sente diferença. 21 dias a transformação fica visível."},{q:"E se eu não gostar?",a:"30 dias para decidir. Se não valer, seu dinheiro volta. Sem perguntas."},{q:"Como funciona depois que eu compro?",a:"Você recebe email com acesso. Instala no celular em 2 min. Começa hoje."},{q:"Por que é tão barato?",a:"Porque alcança muita gente (economia de escala). Funciona bem = muitos clientes."},{q:"Qual devo escolher?",a:"Se quer testar: Básico. Quer transformar: Premium. Quer suporte: VIP."}];function K(){const n=F(),[d,r]=l.useState(0),a=l.useRef(null);l.useEffect(()=>{window.scrollTo(0,0)},[]);const u=o=>{try{console.log("[analytics] checkout_click",{plan:o.id})}catch{}window.location.href=o.checkoutUrl},c=()=>{a.current?.scrollIntoView({behavior:"smooth",block:"start"})};return e.jsxs("div",{style:{minHeight:"100vh",background:"#FFFFFF",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',color:"#2C2C2C",overflowX:"hidden",animation:"fadeIn 0.5s ease-out"},children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"sticky top-0 z-10 bg-white px-3 pt-3 pb-2 border-b border-[#F0E0E8]",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{type:"button",onClick:()=>n({to:"/quiz/$step",params:{step:"21"}}),"aria-label":"Voltar",className:"text-[#999] hover:text-[#E85D8C] text-xl leading-none w-6 h-6 flex items-center justify-center shrink-0",children:"←"}),e.jsx("div",{className:"flex-1 text-center text-[12px] font-semibold text-[#E85D8C]",children:"Suas opções"}),e.jsx("span",{className:"w-6 shrink-0"})]})}),e.jsxs("section",{style:{background:"linear-gradient(180deg, #FFFFFF 0%, #FFE5ED 100%)",padding:"32px 16px",textAlign:"center"},children:[e.jsx("h1",{style:{fontSize:24,fontWeight:700,color:"#2C2C2C",margin:"0 0 12px"},children:"Três Caminhos. Escolha o Seu."}),e.jsxs("p",{style:{fontSize:14,color:"#666",lineHeight:1.6,margin:0},children:["Cada mulher é diferente. Por isso temos 3 opções.",e.jsx("br",{}),"Escolha a que combina com você agora."]})]}),e.jsx("section",{ref:a,style:{padding:"24px 16px"},children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16},children:Y.map(o=>e.jsxs("div",{className:"plan-card",style:{position:"relative",background:o.cardBg,border:`${o.borderWidth}px solid ${o.border}`,borderRadius:12,padding:o.id==="premium"||o.id==="vip"?24:20,paddingTop:o.id==="premium"||o.id==="vip"?40:20,boxShadow:o.shadow,display:"flex",flexDirection:"column",overflow:"hidden"},children:[(o.id==="premium"||o.id==="vip")&&e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,background:o.id==="vip"?"#9333EA":"#E85D8C",color:"#FFFFFF",fontSize:11,fontWeight:800,textAlign:"center",padding:"6px 0",letterSpacing:"0.8px",textTransform:"uppercase"},children:o.id==="vip"?"👑 TRANSFORMAÇÃO TOTAL":"⭐ MAIS POPULAR"}),o.id!=="premium"&&o.id!=="vip"&&e.jsx("div",{style:{fontSize:11,fontWeight:o.id==="basico"?400:700,color:o.labelColor,marginBottom:8},children:o.label}),e.jsxs("div",{style:{fontSize:o.id==="premium"||o.id==="vip"?20:18,fontWeight:700,color:"#2C2C2C",display:"flex",alignItems:"center",gap:8},children:[o.name,o.id==="premium"&&e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#E85D8C 0%,#FF8FB3 100%)",color:"#FFFFFF",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.6px",padding:"3px 10px",borderRadius:999,boxShadow:"0 2px 8px rgba(232,93,140,0.35)"},children:[e.jsx("span",{children:"🏆"}),"Mais escolhido"]})]}),o.subheading&&e.jsx("div",{style:{fontSize:12,color:"#999",marginTop:4},children:o.subheading}),e.jsx("div",{style:{fontSize:o.id==="premium"||o.id==="vip"?40:34,fontWeight:800,color:o.priceColor,marginTop:12,lineHeight:1.1},children:o.price}),e.jsx("p",{style:{fontSize:13,color:"#666",lineHeight:1.6,margin:"12px 0"},children:o.description}),e.jsx("div",{style:{height:1,background:o.divider,opacity:o.id==="basico"?1:.6,margin:"16px 0"}}),e.jsx("div",{style:{flex:1},children:o.features.map(i=>e.jsxs("div",{style:{fontSize:12,color:"#2C2C2C",margin:"8px 0",display:"flex",gap:8},children:[e.jsx("span",{style:{color:"#4CAF50",fontWeight:700},children:"✓"}),e.jsx("span",{children:i})]},i))}),e.jsx("button",{onClick:()=>u(o),className:`cta-gold ${o.id==="premium"||o.id==="vip"?"cta-premium-pulse":""}`,style:{width:"100%",height:o.id==="premium"||o.id==="vip"?52:48,background:o.btnBg,color:"#FFFFFF",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",marginTop:20,transition:"transform 0.3s ease, box-shadow 0.3s ease",boxShadow:o.id==="vip"?"0 4px 14px rgba(147,51,234,0.35)":"0 4px 14px rgba(232,93,140,0.35)"},onMouseEnter:i=>{i.currentTarget.style.background=o.btnHover,i.currentTarget.style.transform="translateY(-2px) scale(1.02)",i.currentTarget.style.boxShadow=o.id==="vip"?"0 8px 24px rgba(147,51,234,0.50)":"0 8px 24px rgba(232,93,140,0.50)"},onMouseLeave:i=>{i.currentTarget.style.background=o.btnBg,i.currentTarget.style.transform="translateY(0) scale(1)",i.currentTarget.style.boxShadow=o.id==="vip"?"0 4px 14px rgba(147,51,234,0.35)":"0 4px 14px rgba(232,93,140,0.35)"},children:o.cta})]},o.id))})}),e.jsxs("section",{style:{padding:"0 16px 24px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:10,padding:"14px 16px",marginBottom:12},children:[e.jsx("span",{style:{fontSize:24,flexShrink:0},children:"🛡️"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#166534"},children:"Garantia de 7 dias"}),e.jsx("div",{style:{fontSize:12,color:"#3F6B4F",lineHeight:1.5},children:"Se você não sentir diferença na rotina em 7 dias, devolvemos 100% do valor. Sem perguntas."})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:10,padding:"14px 16px"},children:[e.jsx("span",{style:{fontSize:24,flexShrink:0},children:"🔒"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#1E40AF"},children:"Cancelamento fácil e seguro"}),e.jsx("div",{style:{fontSize:12,color:"#3B5F9F",lineHeight:1.5},children:"Cancele quando quiser, sem burocracia. Você está no controle do seu investimento."})]})]})]}),e.jsxs("section",{style:{background:"#FFFFFF",padding:"24px 16px"},children:[e.jsx("h3",{style:{fontSize:16,fontWeight:700,color:"#2C2C2C",margin:"0 0 16px"},children:"Resumo das diferenças:"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:12,textAlign:"center"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{borderBottom:"1px solid #E0E0E0"},children:[e.jsx("th",{style:{textAlign:"left",padding:8,fontWeight:700},children:"Recurso"}),e.jsx("th",{style:{padding:8,fontWeight:700},children:"Básico"}),e.jsx("th",{style:{padding:8,fontWeight:700,color:"#E85D8C"},children:"Premium"}),e.jsx("th",{style:{padding:8,fontWeight:700,color:"#9333EA"},children:"VIP"})]})}),e.jsx("tbody",{children:[["Acesso ao app","✓","✓","✓"],["Rotina diária","✓","✓","✓"],["Conteúdo Premium","—","✓","✓"],["Comunidade","—","—","✓"],["Consultora","—","—","✓"]].map((o,i)=>e.jsxs("tr",{style:{borderBottom:"1px solid #F5F5F5"},children:[e.jsx("td",{style:{textAlign:"left",padding:8},children:o[0]}),o.slice(1).map((s,p)=>e.jsx("td",{style:{padding:8,color:s==="✓"?"#4CAF50":"#E0E0E0",fontWeight:700},children:s},p))]},i))})]})})]}),e.jsxs("section",{style:{padding:"24px 16px"},children:[e.jsx("h2",{style:{fontSize:18,fontWeight:700,color:"#2C2C2C",margin:"0 0 16px"},children:"Dúvidas Comuns:"}),e.jsx("div",{children:Z.map((o,i)=>{const s=d===i;return e.jsxs("div",{style:{marginBottom:10},children:[e.jsxs("button",{type:"button",onClick:()=>r(s?null:i),className:"faq-item",style:{width:"100%",textAlign:"left",fontSize:13,fontWeight:700,color:"#2C2C2C",padding:12,background:s?"#FFF5F8":"#F5F5F5",border:`1px solid ${s?"#E85D8C":"#E0E0E0"}`,borderRadius:s?"8px 8px 0 0":8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:o.q}),e.jsx("span",{style:{color:"#E85D8C",fontWeight:700},children:s?"−":"+"})]}),s&&e.jsx("div",{style:{fontSize:13,color:"#555",lineHeight:1.6,padding:12,background:"#FFF5F8",borderRadius:"0 0 8px 8px",borderLeft:"3px solid #E85D8C",borderRight:"1px solid #E85D8C",borderBottom:"1px solid #E85D8C",whiteSpace:"pre-line"},children:o.a})]},i)})})]}),e.jsx("section",{style:{padding:"0 16px 32px"},children:e.jsxs("div",{style:{background:"#FFE5ED",padding:24,borderRadius:12,textAlign:"center"},children:[e.jsx("h3",{style:{fontSize:16,fontWeight:700,color:"#2C2C2C",margin:"0 0 12px"},children:"Pronto para começar?"}),e.jsxs("p",{style:{fontSize:14,color:"#666",lineHeight:1.6,margin:"0 0 20px"},children:["Escolha uma das opções acima.",e.jsx("br",{}),"Ou volte e refaça o diagnóstico se precisar de esclarecimento.",e.jsx("br",{}),"Você está no controle. Sem pressão."]}),e.jsx("button",{type:"button",onClick:c,style:{width:"100%",height:48,background:"#E85D8C",color:"#FFFFFF",fontSize:15,fontWeight:700,border:"none",borderRadius:10,cursor:"pointer",transition:"background 0.3s ease"},onMouseEnter:o=>o.currentTarget.style.background="#D64B7A",onMouseLeave:o=>o.currentTarget.style.background="#E85D8C",children:"VOLTAR PARA AS OPÇÕES ↑"})]})}),e.jsxs("footer",{style:{background:"#F5F5F5",borderTop:"1px solid #E0E0E0",padding:"24px 16px",textAlign:"center"},children:[e.jsxs("p",{style:{fontSize:11,color:"#999",lineHeight:1.6,margin:"0 0 8px"},children:["Menopausa Sem Mistério © 2026",e.jsx("br",{}),"Educativo, não substitui consulta médica"]}),e.jsxs("div",{style:{fontSize:11,color:"#E85D8C"},children:[e.jsx("a",{href:"#",style:{color:"#E85D8C",textDecoration:"underline"},children:"Termos"})," ","|"," ",e.jsx("a",{href:"#",style:{color:"#E85D8C",textDecoration:"underline"},children:"Privacidade"})," ","|"," ",e.jsx("a",{href:"mailto:adm@menopausasemmisterio.com.br",style:{color:"#E85D8C",textDecoration:"underline"},children:"Suporte"})]})]})]})}export{ae as component};
