var xhr; 
agregarEventos(window, 'load', cargar, false);

function agregarEventos(ele, eve, fun, cap) {
    ele.addEventListener(eve, fun, cap);
}

function cargar() {
    agregarEventos(document.getElementById("bt_enviar"), 'click', CrearObjetoAjax, false);
    agregarEventos(document.getElementById("b_visible"), 'click', TogglePassword, false);
}

function CrearObjetoAjax() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'servidor.php');
    xhr.onreadystatechange = esperaRespuesta;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var email = document.getElementById('txt_email').value;
    var password = document.getElementById('txt_password').value;

    xhr.send(
        "user_php=" + encodeURIComponent(email) +
        "&pass_php=" + encodeURIComponent(password)
    );

    console.log("Solicitud enviada al servidor...");
}

function esperaRespuesta() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {    
            try {
                var json = JSON.parse(xhr.responseText);

                if (json.status === "success") {
                    alert("¡Bienvenido " + json.usuario + "!");
                    window.location.href = 'home.php';
                } else {
                    alert("Error: " + json.message);
                }
            } catch (e) {
                console.error("Error al parsear JSON:", e);
                console.log("Respuesta raw:", xhr.responseText);
            }
        } else {
            console.error("Error en el servidor. Status:", xhr.status);
        }
    }
}
function TogglePassword() {
    const passInput = document.getElementById('txt_password');
    const icon = document.querySelector('#b_visible i');

    if (passInput.type === 'password') {
        passInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}