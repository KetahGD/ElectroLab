<?php
   session_start();
   require("conexion.php");

   if(isset($_POST['carrito']) && isset($_POST['total'])) {
       $id_usuario = 3; 
       $total = floatval($_POST['total']);
       $carrito = json_decode($_POST['carrito'], true); 
       $folio_venta = "F-" . date("Ymd-His"); 
       
       if ($cn->connect_errno == 0) {
           $sql_venta = "INSERT INTO Ventas (Folio_Venta, Total, ID_Usuario) VALUES ('$folio_venta', $total, $id_usuario)";
           
           if ($cn->query($sql_venta)) {
               $errores_detalle = 0;
               
               foreach ($carrito as $producto) {
                   $clave = $producto['clave'];
                   $cantidad = $producto['cantidad'];
                   $sql_detalle = "INSERT INTO Detalle_Venta (Folio_Venta, Clave_Producto, Cantidad) VALUES ('$folio_venta', '$clave', $cantidad)";
                   
                   if (!$cn->query($sql_detalle)) {
                       $errores_detalle++;
                   }
               }
               
               if ($errores_detalle == 0) {
                   $respuesta = ["status" => "success", "folio" => $folio_venta, "message" => "Venta registrada correctamente"];
               } else {
                   $respuesta = ["status" => "error", "message" => "Errores al guardar los detalles de la venta."];
               }
           } else {
               $respuesta = ["status" => "error", "message" => "Error al registrar la venta principal."];
           }
           $cn->close();
       } else {
           $respuesta = ["status" => "error", "message" => "Error de conexión a la BD"];
       }
   } else {
       $respuesta = ["status" => "error", "message" => "Datos incompletos"];
   }

   header('Content-Type: application/json');
   echo json_encode($respuesta);
?>