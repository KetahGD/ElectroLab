<?php
$host = "localhost";
$user = "root";
$pass = "12345678";
$db   = "ElectroLab";

$cn = new mysqli($host, $user, $pass, $db);

if ($cn->connect_error) {
    die("Error de conexión: " . $cn->connect_error);
}
?>