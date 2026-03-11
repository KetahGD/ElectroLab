# ⚡ ElectroLab - Sistema de Gestión de Inventario y Ventas

**ElectroLab** es una plataforma web integral diseñada para la administración de una tienda de componentes electrónicos didácticos. El sistema permite gestionar inventarios en múltiples sucursales, administrar productos mediante un CRUD completo y facilitar la experiencia de compra del usuario final.

## 🎯 Objetivos del Proyecto

### General

Desarrollar un sistema de gestión que permita el control eficiente de componentes, administración de almacenes físicos y procesamiento de ventas en una plataforma web responsiva.

### Específicos

* **Control de Datos:** Base de datos relacional normalizada.
* **Gestión de Inventario:** Monitoreo de stock por sucursales (Norte y Centro).
* **Experiencia AJAX:** Buscador en tiempo real y carrito de compras sin recargas de página.
* **Consumo de Servicios:** Integración con APIs externas para conversión de divisas.

---

## 🛠️ Stack Tecnológico

* **Frontend:** HTML5, CSS3 (Custom), **Bootstrap 5** (Responsivo).
* **Lógica de Cliente:** **JavaScript Vanilla** (Peticiones asíncronas con `XMLHttpRequest`).
* **Backend:** **PHP 8** (Sintaxis orientada a índices numéricos).
* **Base de Datos:** **MySQL** (Consultas con `INNER JOIN` e Integridad Referencial).
* **Librerías:** **SweetAlert2** para notificaciones y diálogos.

---

## 📋 Cumplimiento de Rúbrica (Puntos Destacados)

Para la evaluación académica, el sistema integra:

1. **Consultas SQL Avanzadas:** Uso de `INNER JOIN` para cruzar Productos, Categorías e Inventario (**Punto 9**).
2. **Inserción de 6 Campos:** Registro de productos con Clave, Nombre, Precio, Categoría, Descripción y Stock Inicial (**Punto 15**).
3. **Doble Actualización:** Procesos de `UPDATE` tanto para precios de productos como para niveles de stock (**Punto 17**).
4. **Procesamiento de Datos:** Lectura de registros en PHP mediante `$buscar->fetch_array()` accediendo por índices numéricos (ej. `$registro[1]`) (**Requisito de clase**).
5. **Optimización del DOM:** Uso de `document.createDocumentFragment()` para cargar categorías en menús desplegables (**Punto 21**).
6. **Consumo de API:** Integración con *ExchangeRate-API* vía cURL en PHP para conversión de USD a MXN (**Punto 23**).

---

## 📂 Estructura del Repositorio

```text
└───Pagina
    ├───Base de datos       # Scripts SQL (index.sql y datos.sql)
    ├───Estilos             # Hojas de estilo CSS personalizadas
    ├───HTML                # Vistas principales (admin, carrito, catalogo, index)
    ├───img                 # Logotipos y galería de productos
    ├───JS                  # Controladores AJAX (Sintaxis asíncrona)
    └───Php                 # Lógica de servidor y conexión a BD

```

---

## 🔧 Instalación y Configuración

1. **Clonación:**
```bash
git clone https://github.com/TU_USUARIO/ElectroLab.git

```


2. **Base de Datos:**
* Crea una base de datos llamada `ElectroLab`.
* Importa el archivo `/Base de datos/index.sql` para la estructura.
* Importa el archivo `/Base de datos/datos.sql` para los datos de prueba.


3. **Conexión:**
* Ajusta las credenciales en `Php/conexion.php` (Server, User, Pass, DB).


4. **Acceso:**
* **Admin:** `24302106@utfv.edu.mx` | Pass: `24302106`
* **Cliente:** `juan.perez@email.com` | Pass: `cliente123`



---

## 👨‍💻 Autores

* **Rolando Silva** - *Desarrollo de Software Multiplataforma*
* **Emir Yandel** - *Desarrollo de Software Multiplataforma*

