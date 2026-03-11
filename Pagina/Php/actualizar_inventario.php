<?php
   require("conexion.php");
   
   $clave = $_POST['clave_php'];
   $almacen = intval($_POST['almacen_php']);
   $nuevo_stock = intval($_POST['stock_php']);

   if ($cn->connect_errno == 0) {
       // Verificamos si ya existe el registro en ese almacén
       $check = $cn->query("SELECT * FROM Inventario WHERE Clave_Producto = '$clave' AND ID_Almacen = $almacen");
       
       if ($check->num_rows > 0) {
           $sql = "UPDATE Inventario SET Stock = $nuevo_stock WHERE Clave_Producto = '$clave' AND ID_Almacen = $almacen";
       } else {
           $sql = "INSERT INTO Inventario (Clave_Producto, ID_Almacen, Stock) VALUES ('$clave', $almacen, $nuevo_stock)";
       }
       
       if ($cn->query($sql)) {
           $respuesta = ["status" => "success", "message" => "Stock actualizado."];
       } else {
           $respuesta = ["status" => "error", "message" => "Error al actualizar."];
       }
       $cn->close();
   }
   
   header('Content-Type: application/json');
   echo json_encode($respuesta);
?>