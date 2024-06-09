

// Variables 
const carrito = document.querySelector('#carrito'); //
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // agrega al carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito') // Vacia el carrito
const listaCursos = document.querySelector('#lista-cursos') // Selecciona el curso
let carritoCompras = []; // Agrega cursos al carrito


cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregar un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);


    document.addEventListener('DOMContentLoaded', () => {

        carritoCompras = JSON.parse( localStorage.getItem('carrito')) || [];

        // console.log(carritoCompras);
        carritoHTML();

    });

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoCompras = []; // Limpia el arreglo

        limpiarHMTL(); // Limpia el HTML
    });
}



// Funciones 
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        // Creando una variable para seleccionar el card
        const cursoSeleccionado = e.target.parentElement.parentElement;

        // Extrayendo los datos de la funcion
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminando curso del carrito
function eliminarCurso(e) {
    //console.log;
    if(e.target.classList.contains('borrar-curso')){
        // Traer atributo ID del carrito 
        //console.log();

        // Id de listado de curso
        const cursoId = e.target.getAttribute('data-id');


        // Compara id existente del carrito con el id del listado de cursos
        // Elimina del arreglo de carritoCompras por el data-id
        carritoCompras = carritoCompras.filter(curso => curso.id !== cursoId); // Filtra todos id que no coinciden
        //console.log(carritoCompras);

        carritoHTML(); // Itera sobre el carrito y muestra su HTML
    }
}

// Lee el contenido del HTML al que le demos click y extrae la infomacion del curso
function leerDatosCurso(curso) {

    // console.log(curso);

    // Creando un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si un elemento existe dentro de un objeto
    const existe = carritoCompras.some( curso => curso.id === infoCurso.id);
    //console.log(existe); 

    if(existe) {
        // Existe el curso en el objeto sumamos la cantidad
        const cursos = carritoCompras.map(curso => {

            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } 
            // Aunque no exista lo retorna sin ser actualizada la cantidad
            else {
                return curso; // Retorna los objetos que no son duplicados o no existen
            }
        })
        carritoCompras = [...cursos];
    }
    else {
        // Sino existe lo agrega
        // Agregando elementos al arreglo carritoCompras
        carritoCompras = [...carritoCompras, infoCurso];
    }

    

    //console.log(carritoCompras);

    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpia el HTML
    limpiarHMTL();

    // Recorre el carrito y genera el HTML
    carritoCompras.forEach( (curso) => {
        // console.log(curso);
        // Una vez el codigo funcione, mejoralo con Destructuring
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

        <td>
            <img src="${imagen}" width=100>
        </td>

        <td>${titulo}</td>

        <td>${precio}</td>

        <td>${cantidad}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

        `;

        // Agregando el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row);
    })

    sincronizarLocalStorage();
}

// Sincronizar Local Storage
function sincronizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoCompras));
}

// Elimina los cursos del TBODY
function limpiarHMTL() {
    // Forma lenta de limpiar HTML
    // contenedorCarrito.innerHTML = '';

    // Forma mas rapida y ediciente de limpiar el HTML
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}