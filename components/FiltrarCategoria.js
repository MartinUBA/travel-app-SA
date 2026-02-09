export function FiltrarCategoria(map) {
    const filtroCategorias = document.getElementById('filtro-categorias')

    if (filtroCategorias) {
        filtroCategorias.addEventListener('change', () => {
            const categoriaSeleccionada = filtroCategorias.value
            
            if (categoriaSeleccionada === "all") {
                map.setFilter("puntos_interes_layer", null);
            } else {
                map.setFilter("puntos_interes_layer", ["==",["get","Nombre"],categoriaSeleccionada])
            }
        })
    }
}