import { Ruteo } from "./Ruteo.js"
import { AgregarFavoritos } from "./AgregarFavoritos.js"

export function AgregarEventosPopUps(map, longitudUsuario,latitudUsuario,YOUR_ACCESS_TOKEN,txtVisualizarDistancia) {
    map.on('click', 'puntos_interes_layer', (evento) => {

        const coordenadas = evento.features[0].geometry.coordinates.slice()
        const atributos = evento.features[0].properties

        let longitudPOI = coordenadas[0]
        let latitudPOI = coordenadas[1]

        const contenidoPopUp = document.createElement('div');
        contenidoPopUp.className = 'popup-content';

        const nombrePOI = document.createElement('h3');
        nombrePOI.className = 'popup-nombre';
        nombrePOI.innerHTML = atributos.Name;
        contenidoPopUp.appendChild(nombrePOI);

        const botonesContenedor = document.createElement('div');
        botonesContenedor.className = 'popup-botones';

        const btnIr = document.createElement('button');
        btnIr.innerHTML = "Ir"
        btnIr.className = 'popup-btn popup-btn-primary';

        const btnFavoritos = document.createElement('button');
        btnFavoritos.innerHTML = "Fav"
        btnFavoritos.className = 'popup-btn';

        const btnVisited = document.createElement('button');
        btnVisited.innerHTML = "Visited"
        btnVisited.className = 'popup-btn';

        botonesContenedor.appendChild(btnIr)
        botonesContenedor.appendChild(btnFavoritos)
        botonesContenedor.appendChild(btnVisited)

        contenidoPopUp.appendChild(botonesContenedor)

        btnIr.addEventListener('click', () => {
            Ruteo(
                map,
                longitudUsuario,
                latitudUsuario,
                longitudPOI,
                latitudPOI,
                YOUR_ACCESS_TOKEN,
                txtVisualizarDistancia
            );
        })

        btnFavoritos.addEventListener('click', () => {
            AgregarFavoritos(atributos.Name);
        })

        btnVisited.addEventListener('click', () => {
            // Buscar el elemento en la lista POI por nombre
            const listaPOI = document.getElementById('lista-poi');
            const itemPOI = Array.from(listaPOI.querySelectorAll('.item-poi')).find(
                item => item.dataset.nombre === atributos.Name
            );

            if (itemPOI) {
                // Obtener el checkbox del item
                const checkbox = itemPOI.querySelector('.checkbox-poi');
                
                if (checkbox && !checkbox.checked) {
                    // Marcar el checkbox y disparar el evento change
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        })

        new maplibregl.Popup()
            .setLngLat(coordenadas)
            .setDOMContent(contenidoPopUp)
            .addTo(map);
    })
}