const imagens = [
    "src/assets/imgs/kesler1.png",
    "src/assets/imgs/kesler2.png",
    "src/assets/imgs/kesler3.png"
];

let index = 0;

function mostrarSlide(){
    document.getElementsByClassName('imagem-ss')[0].src = imagens[index];
};
function voltarSlide (){
    index--
    if (index < 0) {
        index = imagens.length - 1
    }
    mostrarSlide();
};
function proximoSlide (){
    index++
    if (index >= imagens.length) {
        index = 0
    }
    mostrarSlide();
}


// TEMA
const temas = {
    roxo:  { '--cor-primaria': '#9040a8', '--cor-secundaria': '#7c5fff', '--cor-acento': '#471eff', '--cor-fundo': '#17002c', '--cor-nav-bg': '#230431' },
    azul:  { '--cor-primaria': '#1a6fff', '--cor-secundaria': '#3fa9f5', '--cor-acento': '#0033cc', '--cor-fundo': '#00112c', '--cor-nav-bg': '#001a3d' },
    verde: { '--cor-primaria': '#00a86b', '--cor-secundaria': '#00e0a0', '--cor-acento': '#007a4d', '--cor-fundo': '#001a10', '--cor-nav-bg': '#002918' },
};

function trocarTema(nome) {
    Object.entries(temas[nome]).forEach(([prop, val]) =>
        document.documentElement.style.setProperty(prop, val)
    );

    const fundos = {
        roxo:  'linear-gradient(20deg, black, #200149, #320149, black)',
        azul:  'linear-gradient(20deg, black, #001a4d, #002466, black)',
        verde: 'linear-gradient(20deg, black, #001a0d, #002914, black)',
    };

    document.body.style.backgroundImage = fundos[nome];
}

// QUIZ
const perguntas = [
    { pergunta: "O que é a Síndrome de Kessler?",
      opcoes: ["Um defeito em foguetes durante o lançamento.", "Um efeito em que colisões espaciais geram mais detritos, causando novas colisões.", "Uma falha em satélites de comunicação.", "Um fenômeno climático da atmosfera terrestre."],
      correta: 1 },
    { pergunta: "O que pode causar a Síndrome de Kessler?",
      opcoes: ["Tempestades na Terra.", "Excesso de astronautas em órbita.", "Colisões entre satélites e detritos espaciais.", "Falta de combustível nos satélites."],
      correta: 2 },
    { pergunta: "Qual tecnologia do dia a dia pode ser afetada por esse problema?",
      opcoes: ["Geladeiras.", "Satélites de GPS, internet e comunicação.", "Bicicletas elétricas.", "Impressoras."],
      correta: 1 },
    { pergunta: "O que acontece quando um satélite colide com outro objeto em órbita?",
      opcoes: ["Ele desaparece sem deixar vestígios.", "Produz milhares de fragmentos que podem causar novas colisões.", "Cai imediatamente na Terra.", "Fica invisível."],
      correta: 1 },
    { pergunta: "Se a Síndrome de Kessler atingir níveis críticos, qual pode ser a consequência?",
      opcoes: ["As viagens espaciais se tornam mais seguras.", "O acesso ao espaço pode ficar extremamente difícil por séculos.", "A Lua se afastará da Terra.", "Os satélites ganharão mais vida útil."],
      correta: 1 },
    { pergunta: "Qual é o nome dado aos fragmentos gerados por colisões em órbita?",
      opcoes: ["Asteroides.", "Detritos espaciais.", "Cometas.", "Meteoritos."],
      correta: 1 },
    { pergunta: "Qual organização foi pioneira no estudo e alerta sobre o lixo espacial?",
      opcoes: ["ESA.", "JAXA.", "NASA.", "Roscosmos."],
      correta: 2 },
    { pergunta: "O que é LEO?",
      opcoes: ["Um tipo de foguete reutilizável.", "Órbita Terrestre Baixa, abaixo de 2.000 km.", "Sistema de navegação por satélite.", "Laboratório Espacial Orbital."],
      correta: 1 },
    { pergunta: "Qual tecnologia o OrbClear usa para capturar detritos com segurança?",
      opcoes: ["Laser de alta potência.", "Redes e braços robóticos.", "Imãs supercondutores.", "Explosivos direcionados."],
      correta: 1 },
    { pergunta: "Por que a Síndrome de Kessler é considerada irreversível se atingir nível crítico?",
      opcoes: ["Porque destrói a atmosfera terrestre.", "Porque cada colisão gera novos detritos que causam mais colisões indefinidamente.", "Porque apaga os sinais de GPS permanentemente.", "Porque aquece o planeta acima do limite habitável."],
      correta: 1 },
];

let pontuacao = 0;

for (let i = 0; i < perguntas.length; i++) {

    let texto = `Pergunta ${i + 1} de ${perguntas.length}\n\n`;
    texto += perguntas[i].pergunta + "\n\n";

    for (let j = 0; j < perguntas[i].opcoes.length; j++) {
        texto += `${j + 1} - ${perguntas[i].opcoes[j]}\n`;
    }

    // Validação da entrada do usuário
    let resposta;
    let valida = false;

    while (!valida) {
        let entrada = prompt(texto);

        // Usuário cancelou ou deixou em branco
        if (entrada === null || entrada.trim() === "") {
            alert("⚠️ Por favor, responda antes de continuar.");
            continue;
        }

        resposta = Number(entrada);

        // Verifica se é um número dentro das opções disponíveis
        if (!isNaN(resposta) && resposta >= 1 && resposta <= perguntas[i].opcoes.length) {
            valida = true;
        } else {
            alert(`⚠️ Digite um número entre 1 e ${perguntas[i].opcoes.length}.`);
        }
    }

    if (resposta - 1 === perguntas[i].correta) {
        console.log("✅ Resposta correta!");
        pontuacao++;
    } else {
        console.log("❌ Resposta incorreta!");
        console.log(
            "Resposta correta: " +
            perguntas[i].opcoes[perguntas[i].correta]
        );
    }
}

console.log("\n===== RESULTADO FINAL =====");

let mensagemFinal;

if (pontuacao <= 4) {
    mensagemFinal = `⚠️ ${pontuacao}/10 — Você ainda não conhece bem o problema.`;
}
else if (pontuacao <= 8) {
    mensagemFinal = `🛰️ ${pontuacao}/10 — Você entende os riscos principais.`;
}
else {
    mensagemFinal = `🚀 ${pontuacao}/10 — Excelente!`;
}

console.log(mensagemFinal);
alert(`${mensagemFinal}\n\nAbra o console do navegador (F12 → Console) para ver o detalhamento das suas respostas!`);