# Backend TypeScript con Express y MySQL

Este proyecto es una API REST desarrollada con TypeScript, Express y MySQL usando Docker.

## Requisitos Previos

1. **Docker Desktop**
   - Descargar e instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - Asegurarse que Docker Desktop esté corriendo

2. **Node.js** (opcional, solo si quieres ejecutar el proyecto sin Docker)
   - Descargar e instalar [Node.js](https://nodejs.org/) (versión 16 o superior)
   - Asegurarse que npm esté instalado (viene con Node.js)

3. **Git** (opcional)
   - Descargar e instalar [Git](https://git-scm.com/downloads)

## Configuración del Proyecto

1. **Clonar el repositorio** (o descargar el código fuente)
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. **Configurar variables de entorno**
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3000
   DB_HOST=db
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   ```

## Ejecución con Docker

1. **Construir y levantar los contenedores**
   ```bash
   docker-compose up --build
   ```
   Este comando:
   - Construirá las imágenes necesarias
   - Creará y ejecutará los contenedores
   - La API estará disponible en `http://localhost:3000`
   - MySQL estará disponible en el puerto 3307

2. **Para detener los contenedores**
   ```bash
   docker-compose down
   ```

## Endpoints Disponibles

- `POST /movement` - Crear un nuevo movimiento
- `GET /movement` - Obtener todos los movimientos
- `POST /movement/filter` - Filtrar movimientos
- `PUT /movement/:id` - Actualizar un movimiento
- `DELETE /movement/:id` - Eliminar un movimiento

## Estructura de la Base de Datos

La tabla `movements` contiene los siguientes campos:
- `id` (UUID) - Identificador único
- `description` (STRING) - Descripción del movimiento
- `amount` (INTEGER) - Monto del movimiento
- `date` (DATE) - Fecha del movimiento
- `origin` (STRING) - Origen del movimiento

## Solución de Problemas Comunes

1. **Error de conexión a la base de datos**
   - Verificar que Docker Desktop esté corriendo
   - Verificar que las credenciales en el archivo `.env` sean correctas
   - Asegurarse que el puerto 3307 esté disponible

2. **Error al construir los contenedores**
   - Intentar con: `docker-compose down -v && docker-compose up --build`
   - Verificar que no haya otros contenedores usando los mismos puertos

3. **Problemas con los permisos de Docker**
   - Ejecutar Docker Desktop como administrador
   - Reiniciar Docker Desktop

## Notas Adicionales

- La base de datos se inicializa automáticamente con Docker
- Los cambios en el código se reflejan automáticamente gracias a los volúmenes de Docker
- Los logs de la aplicación se pueden ver en la consola de Docker Desktop
