var xhrCompra;

window.addEventListener('load', iniciarCarrito, false);

function iniciarCarrito() {
    cargarProductosCarrito();
    document.getElementById("btn-finalizar").addEventListener('click', procesarCompraAjax, false);
}

function cargarProductosCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoElectroLab')) || [];
    let contenedor = document.getElementById('lista-carrito');
    let html = '';
    let subtotal = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted mt-4">Tu carrito está vacío</p>';
        actualizarTotales(0);
        return;
    }

    // Uso de forEach para recorrer los productos del carrito
    carrito.forEach(producto => {
        let totalProducto = producto.precio * producto.cantidad;
        subtotal += totalProducto;

        html += `
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <div>
                <h6 class="mb-0 fw-bold">${producto.nombre}</h6>
                <small class="text-muted">Clave: ${producto.clave} | Cantidad: ${producto.cantidad}</small>
            </div>
            <span class="fw-bold text-primary">$${totalProducto.toFixed(2)}</span>
        </div>`;
    });

    contenedor.innerHTML = html;
    actualizarTotales(subtotal);
}

function actualizarTotales(subtotal) {
    let costoEnvio = subtotal > 0 ? 150.00 : 0.00; // Ejemplo: Envío fijo de $150
    let total = subtotal + costoEnvio;

    document.getElementById('subtotal-val').innerText = "$" + subtotal.toFixed(2);
    document.getElementById('envio-val').innerText = "$" + costoEnvio.toFixed(2);
    document.getElementById('total-val').innerText = "$" + total.toFixed(2);
}

function procesarCompraAjax() {
    let carrito = localStorage.getItem('carritoElectroLab');
    
    if (!carrito || JSON.parse(carrito).length === 0) {
        alert("Agrega productos al carrito antes de finalizar la compra.");
        return;
    }

    let subtotalTexto = document.getElementById('total-val').innerText.replace('$', '');
    let totalCompra = parseFloat(subtotalTexto);

    // 1.- Crear el objeto Ajax
    xhrCompra = new XMLHttpRequest();
    // 2.- Indicar método y archivo
    xhrCompra.open('POST', 'procesar_compra.php', true);
    // 3.- Asignar la función de respuesta
    xhrCompra.onreadystatechange = esperaRespuestaCompra;
    // 4.- Indicar encabezado
    xhrCompra.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // 5.- Enviar datos (Enviamos el JSON del carrito y el total como texto)
    let datos = "carrito=" + encodeURIComponent(carrito) + "&total=" + totalCompra;
    xhrCompra.send(datos);
}

function esperaRespuestaCompra() {
    if (xhrCompra.readyState == 4) {
        if (xhrCompra.status == 200) {
            try {
                var json = JSON.parse(xhrCompra.responseText);
                if (json.status === "success") {
                    alert("¡Compra exitosa! Tu folio es: " + json.folio);
                    localStorage.removeItem('carritoElectroLab'); // Vaciamos el carrito
                    window.location.reload(); // Recargamos para limpiar la vista
                } else {
                    alert("Error al procesar: " + json.message);
                }
            } catch (e) {
                console.error("Error JSON: ", e);
            }
        }
    }
}