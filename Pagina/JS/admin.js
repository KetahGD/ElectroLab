var xhrAdmin;

// Asignar el evento al cargar la ventana
agregarEventos(window, 'load', cargarDashboard, false);

function agregarEventos(ele, eve, fun, cap) {
    ele.addEventListener(eve, fun, cap);
}

function cargarDashboard() {
    // 1. Crear el objeto AJAX
    xhrAdmin = new XMLHttpRequest();
    // 2. Indicar el método y archivo (asegúrate de tener este PHP creado para tus ventas)
    xhrAdmin.open('GET', 'obtener_ventas_admin.php', true);
    // 3. Asignar la función de respuesta
    xhrAdmin.onreadystatechange = procesarDashboard;
    // 4. Enviar petición
    xhrAdmin.send();
}

function procesarDashboard() {
    if (xhrAdmin.readyState == 4) {
        if (xhrAdmin.status == 200) {
            try {
                // Parsear el JSON recibido
                var json = JSON.parse(xhrAdmin.responseText);
                var tbody = document.getElementById('tabla-ventas-body');
                var htmlFilas = "";
                var totalVentasHoy = 0;

                // Uso del forEach requerido en la rúbrica
                json.forEach(objeto => {
                    let venta = {};
                    
                    // Uso de for-in para obtener claves y valores
                    for (let clave in objeto) {
                        venta[clave] = objeto[clave];
                    }

                    // Sumamos para la tarjeta de estadística
                    totalVentasHoy += parseFloat(venta['Total']);

                    // Construimos la fila inyectando los datos
                    htmlFilas += `
                    <tr>
                        <td>${venta['Folio']}</td>
                        <td>${venta['Fecha']}</td>
                        <td>${venta['Cliente']}</td>
                        <td class="fw-bold text-success">$${venta['Total']}</td>
                    </tr>
                    `;
                });

                // Inyectamos las filas en la tabla
                tbody.innerHTML = htmlFilas;
                
                // Actualizamos la tarjeta de estadística
                document.getElementById('val-ventas-hoy').innerText = "$" + totalVentasHoy.toFixed(2);

            } catch (e) {
                console.error("Error al parsear el dashboard: ", e);
            }
        } else {
            console.error("Error del servidor: " + xhrAdmin.status);
        }
    }
}