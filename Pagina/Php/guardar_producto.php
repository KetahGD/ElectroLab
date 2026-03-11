<?php
   require("conexion.php");

   $clave = $_POST['clave_php'];
   $nombre = $_POST['nombre_php'];
   $precio = floatval($_POST['precio_php']);
   $categoria = intval($_POST['categoria_php']);
   $descripcion = $_POST['desc_php'];

   if ($cn->connect_errno == 0) {
       $sql1 = "INSERT INTO Productos (Clave_Producto, Nombre, Precio, Codigo_Categoria, Descripcion) 
                VALUES ('$clave', '$nombre', $precio, $categoria, '$descripcion')";
               
       if ($cn->query($sql1)) {
           // Insertamos un registro en inventario para mantener la relación del producto
           $sql2 = "INSERT INTO Inventario (Clave_Producto, ID_Almacen, Stock) VALUES ('$clave', 1, 0)";
           $cn->query($sql2);
           
           $respuesta = ["status" => "success", "message" => "Producto registrado exitosamente."];
       } else {
           $respuesta = ["status" => "error", "message" => "Error al registrar el producto."];
       }
       $cn->close();
   } else {
       $respuesta = ["status" => "error", "message" => "Error de conexión."];
   }

   header('Content-Type: application/json');
   echo json_encode($respuesta);
?>