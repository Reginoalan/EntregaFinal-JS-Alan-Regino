// Aca se declaran el footer y la barra de navegacion

const cuerpo = document.body;
const cabecera = document.getElementById('header');
const navegacion = document.createElement('div');
const nav = document.createElement('nav');
const ul = document.createElement('ul');
const links = ["Index", "Productos","Carrito"];
const imagenHeader = document.createElement('img');


const liImagen = document.createElement('li');
const img = document.createElement('img');
const origen = document.createElement('a');

origen.href = '/';
origen.appendChild(img);
img.src = './img/logo.png';
img.alt = 'PokeLogo';

liImagen.appendChild(origen);
ul.appendChild(liImagen);

cabecera.appendChild(navegacion);
navegacion.appendChild(nav);
nav.appendChild(ul);
navegacion.className='navbar';

for (const link of links) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.toLowerCase()}.html" >${link}</a>`;
    ul.appendChild(li);
}

cabecera.style.backgroundColor = '#DEB887';
cabecera.style.fontSize = '40px';

const footer = document.getElementById('footer');
footer.innerHTML = 'Todos los derechos reservados 2024®';
