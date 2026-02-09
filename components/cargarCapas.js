export function CargarCapas(map) {
    map.addSource('puntos_interes_source', {
        'type': 'geojson',
        'data': 'assets/POI.geojson'
    });
    
    // Capa de sombra para las estrellas
    map.addLayer({
        'id': 'puntos_interes_sombra',
        'type': 'symbol',
        'source': 'puntos_interes_source',
        'filter': ['==', ['geometry-type'], 'Point'],
        'layout': {
            'text-field': '★',
            'text-size': 20,
            'text-allow-overlap': true,
            'text-ignore-placement': true
        },
        'paint': {
            'text-color': '#000000',
            'text-opacity': 0.3,
            'text-halo-color': '#000000',
            'text-halo-width': 2
        }
    });
    
    // Capa principal de estrellas con color
    map.addLayer({
        'id': 'puntos_interes_layer',
        'type': 'symbol',
        'source': 'puntos_interes_source',
        'filter': ['==', ['geometry-type'], 'Point'],
        'layout': {
            'text-field': '★',
            'text-size': 18,
            'text-allow-overlap': true,
            'text-ignore-placement': true
        },
        'paint': {
            'text-color': '#FFD700',
            'text-halo-color': '#333333',
            'text-halo-width': 1.5,
            'text-opacity': 1
        }
    });
}