// Variable global para el objeto AJAX
var xhrInventario;

// Función universal para asignar eventos
function agregarEventos(ele, eve, fun, cap) {
    ele.addEventListener(eve, fun, cap);
}

// Asignar el evento al cargar la ventana
agregarEventos(window, 'load', cargarInventario, false);

function cargarInventario() {
    // 1. Crear el objeto
    xhrInventario = new XMLHttpRequest();
    // 2. Indicar método y archivo (Ruta corregida)
    xhrInventario.open('GET', 'gestion_inventario.php', true);
    // 3. Asignar respuesta
    xhrInventario.onreadystatechange = procesarInventario;
    // 4. Enviar
    xhrInventario.send(null);
}

function procesarInventario() {
    if (xhrInventario.readyState == 4) {
        if (xhrInventario.status == 200) {
            try {
                // Recibir el texto y convertir a JSON
                var json = JSON.parse(xhrInventario.responseText);
                
                var htmlControl = "";
                var htmlListado = "";

                // Uso de forEach con for-in, idéntico al requerimiento de la rúbrica (Punto 19)
                json.forEach(objeto => {
                    let item = {};
                    
                    // Extraer claves y valores
                    for (let clave in objeto) {
                        item[clave] = objeto[clave];
                    }

                    // 1. Llenar filas de la tarjeta "Control de Inventario-Sucursal"
                    htmlControl += `
                    <tr>
                        <td style="text-align: left; font-weight: 500;">${item['Nombre']}</td>
                        <td><input type="number" class="input-stock" value="${item['Stock_Norte']}"></td>
                        <td><input type="number" class="input-stock" value="${item['Stock_Sur']}"></td>
                        <td><input type="number" class="input-stock" value="${item['Stock_Central']}"></td>
                    </tr>`;

                    // 2. Llenar filas de la tarjeta "Listado de Productos"
                    htmlListado += `
                    <tr>
                        <td style="text-align: center; font-weight: normal;">${item['Clave_Producto']}</td>
                        <td>${item['Nombre']}</td>
                        <td>${item['Nombre_Categoria']}</td>
                        <td>$${item['Precio']}</td>
                        <td>${item['StockTotal']}</td>
                        <td>
                            <i class="bi bi-pencil-fill action-icon text-dark" title="Editar" onclick="editarProducto('${item['Clave_Producto']}')"></i>
                            <i class="bi bi-trash-fill action-icon text-dark" title="Eliminar" onclick="eliminarProducto('${item['Clave_Producto']}')"></i>
                        </td>
                    </tr>`;
                });

                // Inyectar el HTML en los tbody correspondientes
                document.getElementById('tabla-control-sucursales').innerHTML = htmlControl;
                document.getElementById('tabla-listado-productos').innerHTML = htmlListado;

            } catch (e) {
                console.error("Error al procesar el JSON: ", e);
            }
        } else {
            console.error("Error del servidor: " + xhrInventario.status);
        }
    }
}

// Funciones vacías preparadas para el CRUD
function editarProducto(clave) {
    console.log("Editando producto: " + clave);
}

function eliminarProducto(clave) {
    console.log("Eliminando producto: " + clave);
}