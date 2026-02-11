export function Ruteo(
    map,
    longitudUsuario,
    latitudUsuario,
    longitudPOI,
    latitudPOI,
    YOUR_ACCESS_TOKEN,
    txtVisualizarDistancia
){

    if (map.getSource('ruta_source')) {
        map.removeLayer('ruta_layer');
        map.removeSource('ruta_source');
    }

    // Remover marcador de llegada anterior si existe
    const marcadorAnterior = document.querySelector('[data-llegada-marker]');
    if (marcadorAnterior) {
        marcadorAnterior.remove();
    }

    //Con esto llamo a la api de ruteo de location IQ. Luego invoco las propiedades geometry y distance.
    fetch(`https://us1.locationiq.com/v1/directions/driving/${longitudUsuario},${latitudUsuario};${longitudPOI},${latitudPOI}?key=${YOUR_ACCESS_TOKEN}&geometries=geojson`)
        .then((response) => response.json())
        .then((dataRuteo) => {

            let ruta = dataRuteo.routes[0].geometry;
            let distancia = dataRuteo.routes[0].distance;

            txtVisualizarDistancia.textContent = `Distancia ${distancia} km`

            map.addSource('ruta_source', {
                'type': 'geojson',
                'data': ruta
            });
            map.addLayer({
                'id': 'ruta_layer',
                'type': 'line',
                'source': 'ruta_source',
                'paint': {
                    'line-color': '#FF0000',
                    'line-width': 4,
                }
            })

            // Crear elemento HTML para la banderita roja de llegada
            const elementoBanderita = document.createElement('div');
            elementoBanderita.innerHTML = '🚩';
            elementoBanderita.style.fontSize = '32px';
            elementoBanderita.style.cursor = 'pointer';
            elementoBanderita.setAttribute('data-llegada-marker', 'true');

            // Agregar marcador en el punto final de la ruta
            new maplibregl.Marker({
                element: elementoBanderita
            })
                .setLngLat([longitudPOI, latitudPOI])
                .addTo(map);

        })
}