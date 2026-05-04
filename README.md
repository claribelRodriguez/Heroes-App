# Heroes App - Angular 21 (Zoneless)

Este repositorio contiene una aplicación de gestión de héroes desarrollada con Angular 21. El proyecto utiliza una arquitectura zoneless para optimizar el rendimiento y Vitest para la suite de pruebas unitarias.

## Instrucciones de ejecución

### Desarrollo Local

Para ejecutar la aplicación en un entorno de desarrollo local, siga estos pasos:

1.  **Instalación de dependencias:**
    ```bash
    npm install
    ```

2.  **Servidor de base de datos (Backend):**
    En una terminal independiente, ejecute el servidor mock:
    ```bash
    npm run backend
    ```
    El servidor estará disponible en `http://localhost:3000`.

3.  **Servidor de aplicación (Frontend):**
    En otra terminal, inicie el servidor de desarrollo de Angular:
    ```bash
    npm start
    ```
    La aplicación se cargará en `http://localhost:4200`.

### Ejecución con Docker

El proyecto está configurado para ejecutarse en contenedores utilizando Docker y Docker Compose.

1.  **Iniciar servicios:**
    Desde la raíz del proyecto, ejecute el siguiente comando:
    ```bash
    docker-compose up --build
    ```

2.  **Puertos configurados:**
    -   Aplicación web: `http://localhost:80`
    -   Servidor JSON: `http://localhost:3000`

## Pruebas Unitarias

La suite de pruebas utiliza Vitest. Para ejecutar los tests y generar informes de cobertura, utilice los siguientes comandos:

-   Ejecución de tests: `npm test`
-   Informe de cobertura: `npx vitest run --coverage`

## Stack Tecnológico
- Angular 21 (Zoneless)
- Vitest / JSDOM
- Docker / Docker Compose
- Nginx (Servidor de producción)
