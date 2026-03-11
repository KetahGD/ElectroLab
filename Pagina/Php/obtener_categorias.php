<?php
   $registro_encontrado = 0;
   require("conexion.php");
   $categorias = [];

   if ($cn->connect_errno == 0) {
       $sql = "SELECT Codigo_Categoria, Nombre_Categoria FROM Categorias";
       $resultado = $cn->query($sql);
       
       if ($resultado) {
           while ($registro = $resultado->fetch_array()) {
               $registro_encontrado = 1;
               
               $categorias[] = [
                   'Codigo_Categoria' => $registro[0],
                   'Nombre_Categoria' => $registro[1]
               ];
           }
       }
       $cn->close();
   }
   
   header('Content-Type: application/json');
   echo json_encode($categorias);
?>