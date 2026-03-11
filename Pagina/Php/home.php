<?php
session_start();

// Validar si existe la sesión
if (!isset($_SESSION['nombre'])) {
    // Si no hay sesión, mandarlo de vuelta al login
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel ElectroLab</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="card p-4 shadow">
            <h1>Bienvenido, <?php echo $_SESSION['nombre']; ?></h1>
            <p>Has iniciado sesión correctamente en el sistema de ElectroLab.</p>
            <hr>
            <a href="logout.php" class="btn btn-danger">Cerrar Sesión</a>
        </div>
    </div>
</body>
</html>