<?php
   $registro_encontrado = 0;
   require("conexion.php");
   $datos = [];

   if ($cn->connect_errno == 0) {
       $sql = "SELECT p.Clave_Producto, p.Nombre, c.Nombre_Categoria, p.Precio, 
                      SUM(i.Stock),
                      SUM(CASE WHEN i.ID_Almacen = 1 THEN i.Stock ELSE 0 END),
                      SUM(CASE WHEN i.ID_Almacen = 2 THEN i.Stock ELSE 0 END),
                      0
               FROM Productos p, Categorias c, Inventario i
               WHERE p.Codigo_Categoria = c.Codigo_Categoria
               AND p.Clave_Producto = i.Clave_Producto
               GROUP BY p.Clave_Producto, p.Nombre, c.Nombre_Categoria, p.Precio";

       $resultado = $cn->query($sql);

       if ($resultado) {
           while ($registro = $resultado->fetch_array()) {
               $registro_encontrado = 1;
               
               $datos[] = [
                   'Clave_Producto' => $registro[0],
                   'Nombre' => $registro[1],
                   'Nombre_Categoria' => $registro[2],
                   'Precio' => $registro[3],
                   'StockTotal' => $registro[4],
                   'Stock_Norte' => $registro[5],
                   'Stock_Sur' => $registro[6],
                   'Stock_Central' => $registro[7]
               ];
           }
       }
       $cn->close();
   }
   
   header('Content-Type: application/json');
   echo json_encode($datos);
?>