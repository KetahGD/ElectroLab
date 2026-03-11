var xhrCategorias;
var xhrListado;
var xhrGuardar;

// Asignar eventos al cargar la ventana
window.addEventListener('load', function() {
    cargarCategorias();
    cargarListadoProductos();
    document.getElementById("btn_guardar_producto").addEventListener("click", guardarProductoNuevo);
});

// ---------------------------------------------------------
// 1. CARGAR CATEGORÍAS EN EL SELECT USANDO UN "FRAGMENT" (Punto 21)
// ---------------------------------------------------------
function cargarCategorias() {
    xhrCategorias = new XMLHttpRequest();
    xhrCategorias.open('GET', 'obtener_categorias.php', true);
    xhrCategorias.onreadystatechange = function() {
        if (xhrCategorias.readyState == 4 && xhrCategorias.status == 200) {
            let json = JSON.parse(xhrCategorias.responseText);
            let select = document.getElementById("sel_categoria");
            
            // Crear el Fragmento (Requisito estricto de la lista de cotejo)
            let fragmento = document.createDocumentFragment();
            
            json.forEach(cat => {
                let opcion = document.createElement("option");
                opcion.value = cat.Codigo_Categoria;
                opcion.textContent = cat.Nombre_Categoria;
                fragmento.appendChild(opcion);
            });
            
            // Inyectar el fragmento completo de golpe en el DOM
            select.appendChild(fragmento);
        }
    };
    xhrCategorias.send(null);
}

// ---------------------------------------------------------
// 2. CARGAR LA TABLA USANDO FOR-EACH Y FOR-IN (Punto 19)
// ---------------------------------------------------------
function cargarListadoProductos() {
    xhrListado = new XMLHttpRequest();
    xhrListado.open('GET', 'obtener_listado_productos.php', true);
    xhrListado.onreadystatechange = function() {
        if (xhrListado.readyState == 4 && xhrListado.status == 200) {
            let json = JSON.parse(xhrListado.responseText);
            let htmlFilas = "";
            
            // Uso de forEach y for-in (Requisito estricto)
            json.forEach(objeto => {
                let item = {};
                for (let clave in objeto) {
                    item[clave] = objeto[clave];
                }
                
                htmlFilas += `
                <tr>
                    <td style="text-align: center;">${item['ID']}</td>
                    <td>${item['Nombre']}</td>
                    <td>${item['Categoria']}</td>
                    <td>$${item['Precio']}</td>
                    <td>${item['Stock']}</td>
                    <td style="text-align: center;">
                        <i class="bi bi-pencil-fill action-icon text-primary mx-1" style="cursor:pointer;" title="Editar"></i>
                        <i class="bi bi-trash-fill action-icon text-danger mx-1" style="cursor:pointer;" title="Eliminar" onclick="confirmarEliminar('${item['ID']}')"></i>
                    </td>
                </tr>`;
            });
            document.getElementById('tabla-productos-body').innerHTML = htmlFilas;
        }
    };
    xhrListado.send(null);
}

// ---------------------------------------------------------
// 3. ENVIAR EL FORMULARIO POR AJAX (Punto 14 y 15)
// ---------------------------------------------------------
function validaDatosProducto() {
    if (document.getElementById('txt_clave').value.trim() === "" || 
        document.getElementById('txt_nombre').value.trim() === "" ||
        document.getElementById('txt_precio').value.trim() === "" ||
        document.getElementById('sel_categoria').value === "Categoria") {
        return false;
    }
    return true;
}

function guardarProductoNuevo() {
    if (validaDatosProducto() === true) {
        xhrGuardar = new XMLHttpRequest();
        xhrGuardar.open('POST', 'guardar_producto.php', true);
        xhrGuardar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhrGuardar.onreadystatechange = function() {
            if (xhrGuardar.readyState == 4 && xhrGuardar.status == 200) {
                let respuesta = JSON.parse(xhrGuardar.responseText);
                if (respuesta.status === "success") {
                    // SweetAlert de éxito (Punto 20)
                    Swal.fire('¡Guardado!', respuesta.message, 'success');
                    document.getElementById("form-producto").reset(); // Limpiar cajas
                    cargarListadoProductos(); // Recargar la tabla automáticamente
                } else {
                    Swal.fire('Error', respuesta.message, 'error');
                }
            }
        };
        
        let clave = document.getElementById('txt_clave').value;
        let nombre = document.getElementById('txt_nombre').value;
        let precio = document.getElementById('txt_precio').value;
        let categoria = document.getElementById('sel_categoria').value;
        let desc = document.getElementById('txt_descripcion').value;
        
        let parametros = "clave_php=" + encodeURIComponent(clave) + 
                         "&nombre_php=" + encodeURIComponent(nombre) + 
                         "&precio_php=" + encodeURIComponent(precio) + 
                         "&categoria_php=" + encodeURIComponent(categoria) + 
                         "&desc_php=" + encodeURIComponent(desc);
                         
        xhrGuardar.send(parametros);
    } else {
        Swal.fire('Atención', 'Por favor llena todos los campos requeridos.', 'warning');
    }
}

// Función de prueba para el botón eliminar usando SweetAlert
function confirmarEliminar(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Eliminarás el producto " + id + " y todo su inventario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let xhrEliminar = new XMLHttpRequest();
            xhrEliminar.open('POST', 'eliminar_producto.php', true);
            xhrEliminar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrEliminar.onreadystatechange = function() {
                if (xhrEliminar.readyState == 4 && xhrEliminar.status == 200) {
                    let resp = JSON.parse(xhrEliminar.responseText);
                    if (resp.status === "success") {
                        Swal.fire('¡Borrado!', resp.message, 'success');
                        cargarListadoProductos(); // Recarga la tabla
                    } else {
                        Swal.fire('Error', resp.message, 'error');
                    }
                }
            };
            xhrEliminar.send("clave_php=" + encodeURIComponent(id));
        }
    });
}
