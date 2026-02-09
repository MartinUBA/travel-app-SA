export async function CargarListadoPOI() {
    try {
        // Cargar el archivo GeoJSON
        const response = await fetch('assets/POI.geojson');
        const geojson = await response.json();
        
        const features = geojson.features;
        const listaPOI = document.getElementById('lista-poi');
        const barrProgreso = document.getElementById('barra-progreso');
        const porcentajeProgreso = document.getElementById('porcentaje-progreso');
        
        // Filtrar solo los puntos (Point features)
        const puntos = features.filter(f => f.geometry.type === 'Point');
        
        // Recuperar el estado visitado del localStorage
        const estadoVisitado = JSON.parse(localStorage.getItem('estadoPOI')) || {};
        
        // Limpiar la lista
        listaPOI.innerHTML = '';
        
        // Crear el elemento para cada POI
        puntos.forEach((feature, index) => {
            const nombre = feature.properties.Name;
            const id = `poi-${index}`;
            const esVisitado = estadoVisitado[id] || false;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = `item-poi ${esVisitado ? 'visitado' : ''}`;
            itemDiv.dataset.id = id;
            itemDiv.dataset.nombre = nombre;
            itemDiv.dataset.coords = JSON.stringify([
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1]
            ]);
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-poi';
            checkbox.checked = esVisitado;
            checkbox.dataset.id = id;
            
            const nombreSpan = document.createElement('span');
            nombreSpan.className = 'nombre-poi';
            nombreSpan.textContent = nombre;
            
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(nombreSpan);
            listaPOI.appendChild(itemDiv);
            
            // Eventos
            checkbox.addEventListener('change', (e) => {
                marcarVisitado(e.target.checked, id, itemDiv);
                actualizarProgressBar(puntos.length);
            });
            
            // Click en el item para centrar el mapa
            itemDiv.addEventListener('click', (e) => {
                if (e.target.className !== 'checkbox-poi') {
                    window.usuarioMapCenter = true;
                    window.mapa.flyTo({
                        center: JSON.parse(itemDiv.dataset.coords),
                        zoom: 15,
                        duration: 1000
                    });
                }
            });
        });
        
        // Inicializar barra de progreso
        actualizarProgressBar(puntos.length);
        
    } catch (error) {
        console.error('Error al cargar los POI:', error);
        document.getElementById('lista-poi').innerHTML = '<p>Error al cargar los puntos de interés</p>';
    }
}

function marcarVisitado(esVisitado, id, itemDiv) {
    // Actualizar el localStorage
    const estadoVisitado = JSON.parse(localStorage.getItem('estadoPOI')) || {};
    
    if (esVisitado) {
        estadoVisitado[id] = true;
        itemDiv.classList.add('visitado');
    } else {
        delete estadoVisitado[id];
        itemDiv.classList.remove('visitado');
    }
    
    localStorage.setItem('estadoPOI', JSON.stringify(estadoVisitado));
}

function actualizarProgressBar(totalPuntos) {
    const estadoVisitado = JSON.parse(localStorage.getItem('estadoPOI')) || {};
    const visitados = Object.keys(estadoVisitado).length;
    const porcentaje = totalPuntos > 0 ? Math.round((visitados / totalPuntos) * 100) : 0;
    
    const barrProgreso = document.getElementById('barra-progreso');
    const porcentajeSpan = document.getElementById('porcentaje-progreso');
    
    barrProgreso.style.width = `${porcentaje}%`;
    porcentajeSpan.textContent = `${porcentaje}%`;
}
