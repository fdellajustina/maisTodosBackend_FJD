// Criando o mapa. L é um objeto definido em orphanages.html quando importamos o script
const map = L.map('mapid').setView([-21.1799158,-47.8092582], 15);

// Criando tilelayer. Definido a camada que vai receber o mapa.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);  // addto var map

// criando um icone especifico
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

// criando marker. Na primeira vez que a aplicação começou esse let marker inicia os markers vazio. Na linha de baixo os markers são adicionados ou removidos cada vez que damos um clique, ou seja, quando eu clico estou passando apenas por aquela função e não por todas as funções dessa página
let marker;

// adiciona marker no mapa
map.on("click", (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng
    
    // seleciona o elemento que têm o name=lat e name=lng (no HTML fizemos inputs escondidos com esses names)
    document.querySelector('[name=lat]').value = lat  // aqui estamos pegando o atributo value do input hidden e dando o valor lat
    document.querySelector('[name=lng]').value = lng
    
    // antes de adicionar o marker é preciso remover os que já tinham sido colocados
    marker && map.removeLayer(marker) // caso marker existe remova (esse && faz esse teste condicional, se não ele vai para linha de baixo)
    
    // adiciona icone na layer
    marker = L.marker([lat, lng], { icon }).addTo(map)
}) // fica ouvindo se aconteceu um click e se acontecer ele executa uma função. O parametro event é uma propriedade do map



// adicionar o campo de fotos. Essa função vai ser chamada toda vez que clicarmos no botão de adicionar fotos
function addPhotoField() {
    // pegar o container de fotos (id=images). Essa é a div que conterá as fotos (divs da class .new-upload)
    const container = document.querySelector('#images')
    
    // pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
    
    // realizar a duplicação da ultima imagem adicionada. Com esse comando fieldsContainer.length pegamos a última div que foi adicionada
    const clonedFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true) // cloneNode(true) clona tudo. Se fosse cloneNode(false) clonaria apenas o elemento mais externo
    
    // verifica se o input está vazio antes de adicionar (para evitar de adicionar um campo sem a imagem)
    const input = clonedFieldContainer.children[0]
    if( input.value == "" ) {
        return 
    }
    
    // Limpando o campo do input antes de adicionar ele novamente
    input.value = ""
    
    // adicionar o clone ao container de imagem
    container.appendChild(clonedFieldContainer)
}

function removePhotoField(event) {
    // seleciona o span no qual clicamos
    const span = event.currentTarget
    
    // todos os campos contendo imagens
    const fieldsContainer = document.querySelectorAll('.new-upload')
    
    // verifica quantos campos de imagem têm, se for apenas 1 não permite a remoção
    if (fieldsContainer.length <= 1) {
        // se tiver apenas 1 campo iremos limpar ele quando clicarmos no x
        span.parentNode.children[0].value = ""
        return    
    }
    
    // seleciona o pai no span, isto é, a div onde está esse span
    span.parentNode.remove()
}

// troca do sim e não para o campo de verificação se atende nos finais de semana
// sugestao de nome de função toggleSelect. Toggle significa alternancia, portanto alternancia de seleção
function onWeekendsVisitation(event) {
    // pega todos os botões
    document.querySelectorAll('.button-select button')  // procura na class .button-select todos os botões
    
    // retirar class .active dos botões
    // ********************************
    // outra forma de escrever essa função simplificadamente. Esse caso só funciona pq temos uma linha de comando na função e um parametro sendo passado
    // .forEach( button => button.classList.remove('active') )
    // ********************************
    .forEach( (button) => {
        button.classList.remove('active')
    })
    
    // colocar a class .active no botão selecionado
    const buton = event.currentTarget
    buton.classList.add('active')
    
    // atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="opening-on-weekends"]') // pega o input
    
    // verifica se é SIM ou NÃO
    input.value = buton.dataset.value

}

function validate(event) {
    // validar lat e lng estao preenchidos
    const lat = document.querySelector('[name="lat"]')

    if( lat.value == "" ) {
        event.preventDefault()
        alert('Selecione um ponto no mapa!')
    }
}












