// Titulo

const tituloIndex = document.getElementById('tituloIndex');
tituloIndex.innerText = "Bienvenidos a la tienda!";

// Parrafo

const parrafo1 = document.createElement('p');
tituloIndex.appendChild(parrafo1);
parrafo1.innerText= "En nuestra pagina podra encontrar todo tipo de cartas para su coleccion o su deck competitivo"

parrafo1.classList.add('estiloParrafoIndex');
