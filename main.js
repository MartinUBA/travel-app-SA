import { InicializarMapa } from "./components/inicializarMapa.js";
import {CargarCapas} from "./components/cargarCapas.js"
import {AgregarEventosPopUps} from "./components/agregarEventosPopups.js"
import {Geocodificacion} from "./components/Geocodificacion.js"
import { CrearLeyenda } from "./components/CrearLeyenda.js";
import { FiltrarCategoria } from "./components/FiltrarCategoria.js";

import { CargarListadoPOI } from "./components/CargarListadoPOI.js";
import { Ruteo } from "./components/Ruteo.js";

let YOUR_ACCESS_TOKEN = "pk.dae20e02d5705edf5e4594c719ccb018" 
const ingresarDatos = document.getElementById("ingresarDatos");
const btnBuscar = document.getElementById("btnBuscar");
const txtVisualizarDistancia= document.getElementById("visualizacion-distancia");
const btnLimpiarRuta = document.getElementById("btnLimpiarRuta")

// Coordenadas de San Andrés, Colombia (centro de la isla)
const SAN_ANDRES_LAT = 12.58174506769098;
const SAN_ANDRES_LNG = -81.69955088399756;

const map = InicializarMapa(SAN_ANDRES_LNG, SAN_ANDRES_LAT);

// Pasar el mapa a objeto global para que otros componentes puedan acceder
window.mapa = map;

// Esperar a que el mapa esté completamente cargado
map.on('load', () => {
    CargarCapas(map);
    AgregarEventosPopUps(map, SAN_ANDRES_LNG, SAN_ANDRES_LAT, YOUR_ACCESS_TOKEN, txtVisualizarDistancia);
    Geocodificacion(map, SAN_ANDRES_LNG, SAN_ANDRES_LAT, btnBuscar, YOUR_ACCESS_TOKEN, ingresarDatos, txtVisualizarDistancia, btnLimpiarRuta);
    CrearLeyenda();
    FiltrarCategoria(map);
    CargarListadoPOI();
    AgregarEventoClickDerecho(map, SAN_ANDRES_LNG, SAN_ANDRES_LAT, YOUR_ACCESS_TOKEN, txtVisualizarDistancia);
});

function AgregarEventoClickDerecho(map, longitudUsuario, latitudUsuario, accessToken, txtVisualizarDistancia) {
    let popupAbierto = null;
    
    map.on('contextmenu', (evento) => {
        evento.preventDefault();
        
        // Cerrar el popup anterior si existe
        if (popupAbierto) {
            popupAbierto.remove();
        }
        
        const coordenadas = [evento.lngLat.lng, evento.lngLat.lat];
        const longitudPOI = coordenadas[0];
        const latitudPOI = coordenadas[1];
        
        const contenidoPopUp = document.createElement('div');
        contenidoPopUp.className = 'popup-content';
        
        const botonesContenedor = document.createElement('div');
        botonesContenedor.className = 'popup-botones';
        
        const btnIr = document.createElement('button');
        btnIr.innerHTML = 'Go';
        btnIr.className = 'popup-btn popup-btn-primary';
        
        botonesContenedor.appendChild(btnIr);
        contenidoPopUp.appendChild(botonesContenedor);
        
        btnIr.addEventListener('click', () => {
            Ruteo(
                map,
                longitudUsuario,
                latitudUsuario,
                longitudPOI,
                latitudPOI,
                accessToken,
                txtVisualizarDistancia
            );
        });
        
        popupAbierto = new maplibregl.Popup()
            .setLngLat(coordenadas)
            .setDOMContent(contenidoPopUp)
            .addTo(map);
    });
} 
 