const imagens = [
    "./imgs/kesler1.png",
    "./imgs/kesler2.png",
    "./imgs/kesler3.png"
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

// FORMULÁRIO
function enviarFormulario() {
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    document.getElementById('erro-nome').textContent     = '';
    document.getElementById('erro-email').textContent    = '';
    document.getElementById('erro-mensagem').textContent = '';
    document.getElementById('form-sucesso').textContent  = '';

    let valido = true;

    if (!nome)     { document.getElementById('erro-nome').textContent     = 'Insira seu nome.';    valido = false; }
    if (!email)    { document.getElementById('erro-email').textContent    = 'Insira seu e-mail.';  valido = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                   { document.getElementById('erro-email').textContent    = 'E-mail inválido.';    valido = false; }
    if (!mensagem) { document.getElementById('erro-mensagem').textContent = 'Escreva uma mensagem.'; valido = false; }

    if (valido) {
        document.getElementById('form-sucesso').textContent = '✅ Mensagem enviada com sucesso!';
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensagem').value = '';
    }
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

let quizIndex = 0, pontuacao = 0, respondeu = false;

function carregarPergunta() {
    respondeu = false;
    const p = perguntas[quizIndex];
    document.getElementById('quiz-progresso').textContent = `Pergunta ${quizIndex + 1} de ${perguntas.length}`;
    document.getElementById('quiz-pergunta').textContent  = p.pergunta;
    document.getElementById('btn-proxima').style.display  = 'none';

    const opcoes = document.getElementById('quiz-opcoes');
    opcoes.innerHTML = '';
    p.opcoes.forEach((texto, i) => {
        const btn = document.createElement('button');
        btn.className   = 'quiz-opcao';
        btn.textContent = texto;
        btn.onclick     = () => responder(i, btn);
        opcoes.appendChild(btn);
    });
}

function responder(indice, btnClicado) {
    if (respondeu) return;
    respondeu = true;

    const correta = perguntas[quizIndex].correta;
    document.querySelectorAll('.quiz-opcao').forEach(b => b.disabled = true);

    if (indice === correta) { btnClicado.classList.add('correta'); pontuacao++; }
    else { btnClicado.classList.add('errada'); document.querySelectorAll('.quiz-opcao')[correta].classList.add('correta'); }

    const btn = document.getElementById('btn-proxima');
    btn.style.display = 'inline-block';
    btn.textContent   = quizIndex < perguntas.length - 1 ? 'Próxima' : 'Ver Resultado';
}

function proximaPergunta() {
    quizIndex++;
    quizIndex < perguntas.length ? carregarPergunta() : mostrarResultado();
}

function mostrarResultado() {
    document.getElementById('quiz-container').style.display  = 'none';
    document.getElementById('quiz-resultado').style.display  = 'block';

    const resultados = [
        { max: 4, emoji: '⚠️', msg: `${pontuacao}/10 — Você ainda não conhece bem o problema.` },
        { max: 8, emoji: '🛰️', msg: `${pontuacao}/10 — Você entende os riscos principais.` },
        { max: 10, emoji: '🚨', msg: `${pontuacao}/10 — Excelente!` },
    ];

    const r = resultados.find(r => pontuacao <= r.max);
    document.getElementById('quiz-resultado-emoji').textContent = r.emoji;
    document.getElementById('quiz-resultado-texto').textContent = r.msg;
}

function reiniciarQuiz() {
    quizIndex = 0; pontuacao = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-resultado').style.display = 'none';
    carregarPergunta();
}

document.addEventListener('DOMContentLoaded', carregarPergunta);