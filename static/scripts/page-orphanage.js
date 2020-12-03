// lendo os valores de latitude e longetude
const spanLat = document.querySelector('span[data-lat]')
const spanLng = document.querySelector('span[data-lng]')


// objeto usado para impedir interação com o mapa (como dar zoom, mover para os lados, etc.)
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
}

// Criando o mapa. L é um objeto definido em orphanages.html quando importamos o script
const map = L.map('mapid', options).setView([spanLat.dataset.lat,spanLng.dataset.lng], 15);

// Criando tilelayer. Definido a camada que vai receber o mapa.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);  // addto var map

// criando um icone especifico
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

// Criando e adicionndo markers no mapa.
L.marker([spanLat.dataset.lat,spanLng.dataset.lng], { icon }).addTo(map);


/* Galeria de imagem */
function selectImage (event) {
    const button = event.currentTarget  // esse comando pega o botao atual clicado
    //console.log(button)
    
    // ##########################################################
    // remove todas as clases .active de todos os botões (que é um só, mas como eu nao sei qual é eu devo testar todos)
    const buttons = document.querySelectorAll(".images button") // faz a busca em todos os botoes dentro da div images (var bottons vai ter todos os botoes organizados numa lista que vai de 0 a 5 - 6 no ele. total)

    // primeira forma de remover
    buttons.forEach(removeActiveClass)  // forEach(): aplica uma regra que está entre () em cada um dos botoes. 
    function removeActiveClass(button) {
        button.classList.remove("active")  // bottons tem a propriedade classList que por sua vez possui a propriedade remove class, basta colocar entre parenteses o nome da classe.
    }

    // segunda forma de remover
//    buttons.forEach((button) => {
//        button.classList.remove("active")
//    })
    
    //console.log(buttons)
    
    // ##########################################################
    // selecionar a imagem clicada
    const image = button.children[0]  // o unico filho do botao é a imagem (esta no posiçao [0])
    const imageContainer = document.querySelector(".orphanage-details > img") // vai em orphanage-details e pega a primeira imagem que achar
    
    // ##########################################################
    // atualizar o container de imagem 
    imageContainer.src = image.src
    
    // ##########################################################
    // adicionar a clase .active  para o botao que foi clicado
    button.classList.add("active")  // o botao clicado vai receber a clase active (isto é, permanecer ativo apos ser clicado)
    
    
}