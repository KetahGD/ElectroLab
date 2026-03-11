<?php
   $registro_encontrado = 0;
   require("conexion.php"); 
   $datos = [];

   if ( $cn->connect_errno == 0 ) {
      // Unión implícita en el WHERE
      $sql = "SELECT p.Clave_Producto, p.Nombre, p.Precio, c.Nombre_Categoria, SUM(i.Stock) 
              FROM Productos p, Categorias c, Inventario i 
              WHERE p.Codigo_Categoria = c.Codigo_Categoria 
              AND p.Clave_Producto = i.Clave_Producto 
              GROUP BY p.Clave_Producto, p.Nombre, p.Precio, c.Nombre_Categoria";
              
      $buscar = $cn->query($sql);
      
      if( $buscar ) {
           while( $registro = $buscar->fetch_array() ) {
                $registro_encontrado = 1;   
                
                $datos[] = [
                    'Clave_Producto' => $registro[0],
                    'Nombre' => $registro[1],
                    'Precio' => $registro[2],
                    'Nombre_Categoria' => $registro[3],
                    'StockTotal' => $registro[4]
                ];
           }   
           $cn->close();    
      }
   }
   
   header('Content-Type: application/json');
   echo( json_encode($datos) ); 
?>