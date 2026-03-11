// Variable global para el objeto AJAX
var xhr;

// Asignar evento al cargar la ventana
window.addEventListener('load', CargarCatalogo, false);

function CargarCatalogo() {
    // Paso 1.- Crear el objeto
    xhr = new XMLHttpRequest();
    
    // Paso 2.- Indicar método y archivo
    xhr.open('GET', 'obtener_productos.php', true);
    
    // Paso 3.- Asignar función que recibe respuesta
    xhr.onreadystatechange = esperaRespuestaCatalogo;
    
    // Paso 5.- Enviar petición (como es GET, no enviamos parámetros)
    xhr.send(null);
}

function esperaRespuestaCatalogo() {
    // Preguntar si la respuesta ya está lista
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            try {
                // Recibir la respuesta del servidor
                var json = JSON.parse(xhr.responseText);
                
                var htmlTarjetas = "";
                
                // Uso de forEach (Punto 19 de la rúbrica)
                json.forEach(objeto => {
                    
                    // Objeto temporal para guardar los valores limpios
                    let producto = {};
                    
                    // Uso de for-in para obtener claves y valores (Punto 19 de la rúbrica)
                    for (let clave in objeto) {
                        producto[clave] = objeto[clave];
                        // console.log(clave + ": " + objeto[clave]); // Descomentar para ver en consola como pide el profe
                    }
                    
                    // Construir la tarjeta HTML inyectando los valores del producto
                    // Asumimos que las imágenes se llaman igual que la clave (ej. MC-ARD-001.jpg)
                    htmlTarjetas += `
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm rounded-4">
                            <div class="card-body d-flex flex-column align-items-center justify-content-center" style="min-height: 200px; background-color: #fff;">
                                <img src="img/${producto['Clave_Producto']}.jpg" alt="${producto['Nombre']}" class="img-fluid mb-2" style="max-height: 120px; object-fit: contain;" onerror="this.src='img/logo.png'">
                                <h6 class="text-center fw-bold mt-2" style="font-size: 0.95rem;">${producto['Nombre']}</h6>
                                <span class="badge bg-secondary mb-2">${producto['Nombre_Categoria']}</span>
                                <span class="text-primary fw-bold">$${producto['Precio']}</span>
                            </div>
                            <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3 px-3">
                                <span class="badge bg-light text-dark border">Stock: ${producto['StockTotal']}</span>
                                <button class="btn btn-info rounded-pill fw-bold text-dark px-4" style="background-color: #cce5ff; border:none;" onclick="agregarAlCarrito('${producto['Clave_Producto']}')">Añadir</button>
                            </div>
                        </div>
                    </div>
                    `;
                });
                
                // Inyectar todo el HTML generado dentro del div contenedor
                document.getElementById('contenedor-productos').innerHTML = htmlTarjetas;
                
            } catch (e) {
                console.error("Error al procesar el JSON: ", e);
            }
        } else {
            console.error("Error de servidor. Código: " + xhr.status);
        }
    }
}

// Función para guardar en el carrito temporal (localStorage)
function agregarAlCarrito(clave, nombre, precio) {
    // Leemos el carrito actual o creamos uno vacío
    let carrito = JSON.parse(localStorage.getItem('carritoElectroLab')) || [];
    
    // Buscamos si el producto ya está en el carrito
    let index = carrito.findIndex(p => p.clave === clave);
    
    if (index !== -1) {
        carrito[index].cantidad += 1; // Si ya existe, sumamos 1
    } else {
        carrito.push({ clave: clave, nombre: nombre, precio: parseFloat(precio), cantidad: 1 });
    }
    
    // Guardamos nuevamente en el almacenamiento del navegador
    localStorage.setItem('carritoElectroLab', JSON.stringify(carrito));
    alert("¡" + nombre + " añadido al carrito!");


    // Agregamos el evento 'keyup' para buscar mientras se teclea
    document.querySelector('.search-bar').addEventListener('keyup', function() {
        let termino = this.value;
        
        let xhrBuscar = new XMLHttpRequest();
        xhrBuscar.open('POST', 'buscar_productos.php', true);
        xhrBuscar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhrBuscar.onreadystatechange = function() {
            if (xhrBuscar.readyState == 4 && xhrBuscar.status == 200) {
                // Reutilizamos la misma lógica de pintado de tarjetas que ya tienes
                var json = JSON.parse(xhrBuscar.responseText);
                var htmlTarjetas = "";
                
                json.forEach(objeto => {
                    let p = {};
                    for (let clave in objeto) { p[clave] = objeto[clave]; }
                    
                    htmlTarjetas += `
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm rounded-4">
                            <div class="card-body d-flex flex-column align-items-center justify-content-center" style="min-height: 200px; background-color: #fff;">
                                <img src="img/${p['Clave_Producto']}.jpg" class="img-fluid mb-2" style="max-height: 120px;" onerror="this.src='img/logo.png'">
                                <h6 class="text-center fw-bold mt-2">${p['Nombre']}</h6>
                                <span class="badge bg-secondary mb-2">${p['Nombre_Categoria']}</span>
                                <span class="text-primary fw-bold">$${p['Precio']}</span>
                            </div>
                            <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3 px-3">
                                <span class="badge bg-light text-dark border">Stock: ${p['StockTotal']}</span>
                                <button class="btn btn-info rounded-pill fw-bold" onclick="agregarAlCarrito('${p['Clave_Producto']}', '${p['Nombre']}', ${p['Precio']})">Añadir</button>
                            </div>
                        </div>
                    </div>`;
                });
                document.getElementById('contenedor-productos').innerHTML = htmlTarjetas;
            }
        };
        xhrBuscar.send("termino_php=" + encodeURIComponent(termino));
    });
}