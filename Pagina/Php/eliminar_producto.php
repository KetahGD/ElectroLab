<?php
   require("conexion.php");
   $clave = $_POST['clave_php'];

   if ($cn->connect_errno == 0) {
       // Gracias al "ON DELETE CASCADE" que configuramos en tu SQL, esto borrará también el inventario asociado automáticamente
       $sql = "DELETE FROM Productos WHERE Clave_Producto = '$clave'";
               
       if ($cn->query($sql)) {
           $respuesta = ["status" => "success", "message" => "Producto eliminado permanentemente."];
       } else {
           $respuesta = ["status" => "error", "message" => "Error al eliminar."];
       }
       $cn->close();
   } else {
       $respuesta = ["status" => "error", "message" => "Error de conexión."];
   }

   header('Content-Type: application/json');
   echo json_encode($respuesta);
?>