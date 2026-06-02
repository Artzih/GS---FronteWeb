const imagens = [
    "./imgs/kesler1.png",
    "./imgs/kesler2.png",
    "./imgs/kesler3.png"
];

let index = 0;

function mostrarSlide (){
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