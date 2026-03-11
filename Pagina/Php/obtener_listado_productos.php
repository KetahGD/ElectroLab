<?php
   $registro_encontrado = 0;
   require("conexion.php");
   $productos = [];

   if ($cn->connect_errno == 0) {
       $sql = "SELECT p.Clave_Producto, p.Nombre, c.Nombre_Categoria, p.Precio, SUM(i.Stock)
               FROM Productos p, Categorias c, Inventario i
               WHERE p.Codigo_Categoria = c.Codigo_Categoria
               AND p.Clave_Producto = i.Clave_Producto
               GROUP BY p.Clave_Producto, p.Nombre, c.Nombre_Categoria, p.Precio";
               
       $resultado = $cn->query($sql);
       
       if ($resultado) {
           while ($registro = $resultado->fetch_array()) {
               $registro_encontrado = 1;
               
               $productos[] = [
                   'ID' => $registro[0],
                   'Nombre' => $registro[1],
                   'Categoria' => $registro[2],
                   'Precio' => $registro[3],
                   'Stock' => $registro[4]
               ];
           }
       }
       $cn->close();
   }
   
   header('Content-Type: application/json');
   echo json_encode($productos);
?>