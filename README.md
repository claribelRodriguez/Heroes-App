# Heroes App 🏎️💨

Este proyecto es una aplicación moderna de gestión de superhéroes construida con **Angular 21**, diseñada bajo los más altos estándares de rendimiento y mantenibilidad (Arquitectura "Ferrari").

## 🚀 Características Principales

- **Angular 21 (Zoneless)**: Implementación de arquitectura sin `Zone.js` para un rendimiento de renderizado superior.
- **Programación Reactiva con Signals**:
  - Uso de `rxResource` para la gestión asíncrona de datos.
  - `linkedSignal` para la sincronización inteligente de estado en formularios.
  - `computed` y `Signal Inputs` para un flujo de datos eficiente.
- **Deferrable Views (@defer)**: Optimización de carga crítica mediante Lazy Loading de componentes en función del viewport.
- **Diseño Premium**: Interfaz moderna basada en **Angular Material**, con efectos de Glassmorphism, animaciones fluidas y un sistema de diseño responsivo.
- **Persistencia Real**: Backend simulado con `json-server` para operaciones CRUD reales.
- **Testing Moderno**: Suite de pruebas unitarias migrada de Karma a **Vitest** para una ejecución ultrarrápida.

## 🛠️ Stack Tecnológico

- **Frontend**: Angular 21, RxJS, Signals.
- **UI/UX**: Angular Material, SweetAlert2, CSS Grid/Flexbox.
- **Tooling**: Vitest, Angular CLI.

## 📦 Instalación y Uso

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el Servidor de Datos (Backend):**
   ```bash
   npm run backend
   ```

3. **Iniciar la Aplicación (Frontend):**
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:4200`.

## 🧪 Testing

Para ejecutar las pruebas unitarias con Vitest:
```bash
npm test
```

---
Desarrollado con ❤️ por Claribel Rodriguez
