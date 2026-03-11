CREATE DATABASE IF NOT EXISTS ElectroLab;
USE ElectroLab;

-- Tabla de Categorías
CREATE TABLE Categorias (
    Codigo_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Categoria VARCHAR(100) NOT NULL
);

-- Tabla de Almacenes (Sucursales físicas)
CREATE TABLE Almacenes (
    ID_Almacen INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Ubicacion VARCHAR(255) NOT NULL
);

-- Tabla de Usuarios (Clientes y Administradores)
CREATE TABLE Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Rol ENUM('Admin', 'Cliente') NOT NULL DEFAULT 'Cliente'
);

-- Tabla de Productos
CREATE TABLE Productos (
    Clave_Producto VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Codigo_Categoria INT NOT NULL,
    Descripcion TEXT,
    FOREIGN KEY (Codigo_Categoria) REFERENCES Categorias(Codigo_Categoria) ON DELETE CASCADE
);

-- Tabla de Inventario (Tabla intermedia Productos - Almacenes)
CREATE TABLE Inventario (
    ID_Inventario INT AUTO_INCREMENT PRIMARY KEY,
    Clave_Producto VARCHAR(20) NOT NULL,
    ID_Almacen INT NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    FOREIGN KEY (Clave_Producto) REFERENCES Productos(Clave_Producto) ON DELETE CASCADE,
    FOREIGN KEY (ID_Almacen) REFERENCES Almacenes(ID_Almacen) ON DELETE CASCADE
);

-- Tabla de Ventas
CREATE TABLE Ventas (
    Folio_Venta VARCHAR(20) PRIMARY KEY,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    Total DECIMAL(10, 2) NOT NULL,
    ID_Usuario INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE CASCADE
);

-- Tabla de Detalle_Venta (Tabla intermedia Ventas - Productos)
CREATE TABLE Detalle_Venta (
    ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    Folio_Venta VARCHAR(20) NOT NULL,
    Clave_Producto VARCHAR(20) NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (Folio_Venta) REFERENCES Ventas(Folio_Venta) ON DELETE CASCADE,
    FOREIGN KEY (Clave_Producto) REFERENCES Productos(Clave_Producto) ON DELETE CASCADE
);