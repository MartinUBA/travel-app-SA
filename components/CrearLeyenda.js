export function CrearLeyenda(){
    const menuHamburguesa = document.getElementById('btn-menu-hamburguesa');
    const sidebar = document.getElementById('sidebar');

    if (menuHamburguesa && sidebar) {
        menuHamburguesa.addEventListener('click', () => {
            sidebar.classList.toggle("activo");
        });
    }
}