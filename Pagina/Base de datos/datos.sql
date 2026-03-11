-- Insertar Categorías de Especialidad
INSERT INTO Categorias (Nombre_Categoria) VALUES 
('Robótica'), 
('Microcontroladores'), 
('Sensores'), 
('Energía');

-- Insertar Almacenes
INSERT INTO Almacenes (Nombre, Ubicacion) VALUES 
('Sucursal Centro', 'Av. Principal #123, Centro'),
('Bodega Norte', 'Parque Industrial Norte, Nave 4');

-- Insertar Usuarios (1 Admin, 2 Clientes)
INSERT INTO Usuarios (Nombre, Correo, Password, Rol) VALUES 
('Administrador', '24302106@utfv.edu.mx', '24302106', 'Admin'),
('Administrador', '24302116@utfv.edu.mx', '24302116', 'Admin'),
('Juan Perez', 'juan.perez@email.com', 'cliente123', 'Cliente'),
('Maria Garcia', 'maria.garcia@email.com', 'cliente123', 'Cliente');

-- Insertar Productos (Los 4 originales + 8 nuevos)
INSERT INTO Productos (Clave_Producto, Nombre, Precio, Codigo_Categoria, Descripcion) VALUES 
('MC-ARD-001', 'Arduino Uno R3', 450.00, 2, 'Placa microcontrolador basada en ATmega328P.'),
('SN-ULT-001', 'Sensor Ultrasónico HC-SR04', 85.50, 3, 'Módulo de medición de distancia por ultrasonido.'),
('RB-MTR-001', 'Motor DC con Reductor', 120.00, 1, 'Motor de corriente continua de 3V-6V para carritos robot.'),
('EN-BTR-001', 'Batería LiPo 3.7V 1000mAh', 180.00, 4, 'Batería recargable de polímero de litio.'),
('RB-SRV-001', 'Micro Servomotor SG90 9g', 45.00, 1, 'Mini servo de 180 grados con engranajes de nylon.'),
('RB-CHS-002', 'Chasis Carro Robot 2WD', 150.00, 1, 'Kit de chasis de acrílico con 2 llantas y rueda loca.'),
('MC-ESP-002', 'Módulo ESP32 WROOM-32', 140.00, 2, 'Placa con Wi-Fi y Bluetooth integrados, ideal para IoT.'),
('MC-RAS-003', 'Raspberry Pi Pico', 110.00, 2, 'Placa microcontrolador de alto rendimiento con chip RP2040.'),
('SN-DHT-002', 'Sensor Temperatura DHT11', 40.00, 3, 'Sensor digital básico para medir temperatura y humedad.'),
('SN-PIR-003', 'Sensor de Movimiento PIR', 55.00, 3, 'Módulo HC-SR501 infrarrojo para detección de movimiento.'),
('EN-PNL-002', 'Panel Solar Mini 5V', 45.00, 4, 'Celda solar policristalina encapsulada para proyectos pequeños.'),
('EN-STP-003', 'Módulo Step-Down LM2596', 35.00, 4, 'Convertidor reductor de voltaje DC-DC ajustable hasta 3A.');

-- Insertar Inventario (Distribución de stock en almacenes)
INSERT INTO Inventario (Clave_Producto, ID_Almacen, Stock) VALUES 
('MC-ARD-001', 1, 15),
('MC-ARD-001', 2, 50),
('SN-ULT-001', 1, 5), 
('SN-ULT-001', 2, 100),
('RB-MTR-001', 1, 30),
('EN-BTR-001', 2, 20),


('RB-SRV-001', 1, 40),
('RB-SRV-001', 2, 80),
('RB-CHS-002', 1, 10),
('MC-ESP-002', 1, 25),
('MC-ESP-002', 2, 30),
('MC-RAS-003', 2, 15),
('SN-DHT-002', 1, 50),
('SN-PIR-003', 1, 8), 
('SN-PIR-003', 2, 45),
('EN-PNL-002', 2, 20),
('EN-STP-003', 1, 60),
('EN-STP-003', 2, 40);

-- Insertar Ventas de prueba
INSERT INTO Ventas (Folio_Venta, Fecha, Total, ID_Usuario) VALUES 
('F-2024-001', '2026-03-08 10:30:00', 535.50, 2),
('F-2024-002', '2026-03-09 11:15:00', 240.00, 3);

-- Insertar Detalles de esas ventas
INSERT INTO Detalle_Venta (Folio_Venta, Clave_Producto, Cantidad) VALUES 
('F-2024-001', 'MC-ARD-001', 1),
('F-2024-001', 'SN-ULT-001', 1),
('F-2024-002', 'RB-MTR-001', 2);