document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.pokemontcg.io/v2/cards?q=name:glaceon';
    const listaDeCartas = document.getElementById('cards-list');
    const itemsCarrito = document.getElementById('cart-items');
    const botonCompra = document.getElementById('checkout-btn');


    // Función para obtener el carrito del localStorage
    function obtenerCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        return carrito;
    }

    // Función para guardar el carrito en el localStorage
    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Fetch del API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cards = data.data;
            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.innerHTML = `
                    <h3>${card.name} (${card.set.ptcgoCode} ${card.number})</h3>
                    <img src="${card.images.small}" alt="${card.name}">
                    <p>Set: ${card.set.name}</p>
                    <p>${card.rarity}</p>
                    <p>Precio: Us$${card.cardmarket.prices.averageSellPrice}</p>
                    <button class="add-to-cart-btn boton">Agregar al carrito</button>
                `;
                cardElement.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(card));
                listaDeCartas.appendChild(cardElement);
                cardElement.className = 'caja'; //Para agregar estilos
            });
        })
        .catch(error => console.error('Error al encontrar las cartas:', error));

    // Funcion para agregar item al carrito
    function addToCart(item) {
        let carrito = obtenerCarrito();

        // Verificar si el item ya está en el carrito
        const index = carrito.findIndex(cartItem => cartItem.id === item.id);
        
        if (index !== -1) {
            // Si el item ya está en el carrito, incrementar la cantidad
            carrito[index].cantidad++;
        } else {
            // Si el item no está en el carrito, agregarlo con cantidad inicial de 1
            carrito.push({ id: item.id, name: item.name, price: item.cardmarket.prices.averageSellPrice.toFixed(2), cantidad: 1, codig: item.set.ptcgoCode, num: item.number});
        }
        Toastify({

            text: "¡Se agrego al carrito!",
            className: "info",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #DEB887, #8c540c)",
            },
            }).showToast();
        guardarCarrito(carrito);
        renderizarCarrito(carrito);
    }

    // Funcion borrar item del carrito
    function borrarItem(index) {
        let carrito = obtenerCarrito();
        carrito.splice(index, 1); // Remove el item del carrito
        guardarCarrito(carrito);
        renderizarCarrito(carrito);
    }


    // Function para mostrar el carrito 
    function renderizarCarrito(carrito) {
        itemsCarrito.innerHTML = ''; // Limpiar el contenido anterior
        let total = 0;
        carrito.forEach((cartItem, index) => {
            total = total + cartItem.price * cartItem.cantidad;
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${cartItem.name} (${cartItem.codig} ${cartItem.num}) x${cartItem.cantidad} - $${(cartItem.price * cartItem.cantidad).toFixed(2)}
                <button class="remove-from-cart-btn botonQuitar">Quitar</button>
            `;
            cartItemElement.querySelector('.remove-from-cart-btn').addEventListener('click', () => borrarItem(index));
            cartItemElement.className = 'estiloCarrito';
            itemsCarrito.appendChild(cartItemElement);
        });
    }


    // Renderizar el carrito inicialmente al cargar la página
    function inicializar() {
        const carrito = obtenerCarrito();
        renderizarCarrito(carrito);
    }

    inicializar();

    //Funcion para finalizar la compra (cartel)
    function compraOK() {
        Swal.fire({
            title: "¡Muchas gracias por tu compra!",
            text: "esperemos que lo disfrutes",
            icon: "success"
        });
    }

    
     // Function vaciar carrito (luego de la compra)
    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        renderizarCarrito([]); //muestra un array vacio
    }

    // Boton de "compra" y vaciar el carrito
    botonCompra.addEventListener('click', () => {        
        compraOK();
        vaciarCarrito();
    });
    botonCompra.className = 'botonCompra'; // Estilo del boton de compra ("checkout")
});