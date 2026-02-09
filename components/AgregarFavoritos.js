    let favoritos =[]
    const botonFavoritos = document.getElementById('btn-favoritos')
    const listaFavoritos = document.getElementById('lista-favoritos')

    botonFavoritos.addEventListener('click', () => {
        if(listaFavoritos.style.display == 'none'){
            listaFavoritos.style.display = 'block'
        } else {
            listaFavoritos.style.display ='none'

        }
    })

export function AgregarFavoritos(Nombre){
    favoritos.push(Nombre)

    listaFavoritos.innerHTML = ""

    favoritos.forEach((punto_interes) => {               //punto interés va a almacenar todos los favoritos
        let item = document.createElement('div')
        item.innerHTML = punto_interes

        listaFavoritos.appendChild(item)

    })
}