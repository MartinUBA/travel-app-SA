import { Ruteo } from "./Ruteo.js"

export function Geocodificacion (
    map,
    longitudUsuario,
    latitudUsuario,btnBuscar,
    YOUR_ACCESS_TOKEN,
    ingresarDatos, 
    txtVisualizarDistancia, 
    btnLimpiarRuta) {

    let marcadorUsuario = new maplibregl.Marker()
        .setLngLat([longitudUsuario,latitudUsuario])
        .addTo(map)

    let marcadorPOI = null
    btnBuscar.addEventListener('click', () => {

    let direccionEntrada = ingresarDatos.value  // Con esto obtengo el valor texto de la variable Ingresar Datos



        fetch(`https://us1.locationiq.com/v1/search?key=${YOUR_ACCESS_TOKEN}&q=${direccionEntrada}&format=json`) //LLamo a la API locationIQ
            .then((response) => response.json())
            .then((dataGeocodificacion) => {
                let latitudPOI = dataGeocodificacion[0].lat;
                let longitudPOI = dataGeocodificacion[0].lon;

                if(marcadorPOI) {           // Si existe el marcador, lo remueve
                    marcadorPOI.remove()
                }

                marcadorPOI = new maplibregl.Marker()
                    .setLngLat([longitudPOI,latitudPOI])
                    .addTo(map);
            
                map.flyTo({
                    center:[longitudPOI,latitudPOI],
                    zoom: 15
                });

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


        })
        //Para limpiar la ruta
        btnLimpiarRuta.addEventListener('click', () => {

            if(map.getSource('ruta_source')) {
                map.removeLayer('ruta_layer');
                map.removeSource('ruta_source');
            }
            if(marcadorPOI) {           // Si existe el marcador, lo remueve
                marcadorPOI.remove()
            }
    
        })
}