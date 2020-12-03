// Criando o mapa. L é um objeto definido em orphanages.html quando importamos o script
const map = L.map('mapid').setView([-21.1799158,-47.8092582], 15);

// Criando tilelayer. Definido a camada que vai receber o mapa.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);  // addto var map

// criando um icone especifico
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


function addMarker({id, name, lat, lng}) {
    // Criando o popup overlay
    const popup = L.popup({
        closeButtom: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240,
    }).setContent(`${name} <a href="/orphanage?id=${id}" class="choose-orphanage"> <img src="/images/arrow-white.svg"> </a>`)

    // Criando e adicionndo markers no mapa.
    L.marker([lat,lng], { icon }).addTo(map).bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll('.orphanages span')


orphanagesSpan.forEach( orphanageElement => {
    const orphanage = {
        id: orphanageElement.dataset.id,
        name: orphanageElement.dataset.name,
        lat: orphanageElement.dataset.lat,
        lng: orphanageElement.dataset.lng        
    }
    
    addMarker(orphanage)

})