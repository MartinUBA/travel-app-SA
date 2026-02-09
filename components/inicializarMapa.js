export function InicializarMapa(longitudUsuario,latitudUsuario){
    return new maplibregl.Map({
        container: 'map', // container id
        style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=DDX58f79e8rhhueE9hkg', // style URL
        center: [longitudUsuario, latitudUsuario], // starting position [lng, lat] 
        zoom: 13 // starting zoom
    });
}