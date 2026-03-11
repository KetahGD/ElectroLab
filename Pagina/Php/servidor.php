<?php
   session_start();
   $correo_cliente = $_POST['user_php'];
   $pass_cliente   = $_POST['pass_php'];
   
   $registro_encontrado = 0;
   
   require("conexion.php"); 

   if ( $cn->connect_errno == 0 ) {

      $buscar = $cn->query("SELECT * FROM Usuarios WHERE Correo = '$correo_cliente' AND Password = '$pass_cliente'");
      if( $buscar ) {
           while( $registro = $buscar->fetch_array() ) {
                $registro_encontrado = 1;   
                $_SESSION['nombre'] = $registro['Nombre']; 
                $_SESSION['correo'] = $registro['Correo'];
                $_SESSION['id_sesion'] = session_id(); 
                $datos = [
                   "status" => "success",
                   "message" => "Acceso concedido",
                   "rol" => $registro['Rol']
                ];
                header('Content-Type: application/json');
                echo( json_encode($datos) ); 
           }   
           if( $registro_encontrado == 0 ){
              $datos_error = [
                  "status" => "error", 
                  "message" => "Credenciales incorrectas"
              ];
              header('Content-Type: application/json');
              echo( json_encode($datos_error) );
           }
           $cn->close();    
      }
      else {
         echo("Revisar la consulta: " . $cn->error);
      }
   }
   else {
      echo("Falló la Conexión: " . $cn->connect_errno);             
   }
?>