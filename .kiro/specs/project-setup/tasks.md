# Plan de Implementación: Configuración del Proyecto DYLO Platform

## Visión General

Implementación secuencial de la configuración del proyecto full-stack DYLO Platform: verificación de prerequisitos, scaffold del frontend (React + Vite + TypeScript + Zustand + React Router + Axios), scaffold del backend (NestJS + TypeScript), y configuración de herramientas de calidad de código (ESLint flat config + Prettier). Todo se ejecuta directamente en el entorno local sin Docker.

## Tareas

- [x] 1. Implementar el módulo de verificación de prerequisitos
  - [x] 1.1 Crear la estructura del módulo de verificación en `DYLO-Platform---Front/src/utils/prerequisites/`
    - Crear el archivo `types.ts` con las interfaces `PrerequisiteCheck`, `CheckResult` y `ToolRequirement`
    - Crear el archivo `constants.ts` con la configuración `PREREQUISITES` (Node.js >= 18, npm >= 9, Git >= 2)
    - _Requisitos: 1.1, 1.2, 1.3_

  - [x] 1.2 Implementar las funciones de parsing y comparación de versiones
    - Crear `version-utils.ts` con la función `parseVersionOutput(output: string): { major: number, minor: number, patch: number } | null`
    - Implementar `compareVersions(current: string, minimum: string): boolean` con comparación semver (major > minor > patch)
    - _Requisitos: 1.1, 1.2, 1.3_

  - [ ]* 1.3 Escribir property test: Round-trip de parsing de versiones
    - **Propiedad 1: Round-trip de parsing de versiones**
    - Usar fast-check para generar cadenas semver válidas y verificar que `parseVersionOutput` extrae correctamente major, minor y patch
    - Tag: `Feature: project-setup, Property 1: Version parsing round-trip`
    - **Valida: Requisitos 1.1, 1.2, 1.3**

  - [ ]* 1.4 Escribir property test: Correctitud de comparación de versiones
    - **Propiedad 2: Correctitud de comparación de versiones**
    - Usar fast-check para generar pares de versiones y verificar transitividad y correctitud de `compareVersions`
    - Tag: `Feature: project-setup, Property 2: Version comparison correctness`
    - **Valida: Requisitos 1.1, 1.2, 1.3**

  - [x] 1.5 Implementar la función `checkPrerequisites` y el reporte de resultados
    - Crear `check-prerequisites.ts` con la función principal que ejecuta los comandos de versión y genera `CheckResult[]`
    - Implementar lógica de reporte: mostrar resumen de versiones si todo pasa, o listar herramientas faltantes con versión mínima requerida
    - Manejar errores de ejecución de comandos (tratar como "no instalada")
    - _Requisitos: 1.4, 1.5_

  - [ ]* 1.6 Escribir property test: Completitud del reporte de prerequisitos
    - **Propiedad 3: Completitud del reporte de prerequisitos**
    - Usar fast-check para generar conjuntos mixtos de resultados (éxitos/fallos) y verificar que el reporte contiene todas las herramientas
    - Tag: `Feature: project-setup, Property 3: Prerequisite report completeness`
    - **Valida: Requisitos 1.4, 1.5**

  - [ ]* 1.7 Escribir unit tests para funciones de verificación de prerequisitos
    - Test `parseVersionOutput("v22.14.0")` retorna `{ major: 22, minor: 14, patch: 0 }`
    - Test `parseVersionOutput("invalid")` retorna `null`
    - Test `compareVersions("18.0.0", "18.0.0")` retorna `true`
    - Test reporte con mezcla de éxitos y fallos
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Checkpoint — Verificar módulo de prerequisitos
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas.

- [x] 3. Scaffold del proyecto Frontend (React + Vite + TypeScript)
  - [x] 3.1 Crear el proyecto React con Vite en `DYLO-Platform---Front/`
    - Ejecutar `npm create vite@latest . -- --template react-ts` dentro de `DYLO-Platform---Front/`
    - Ejecutar `npm install` para instalar dependencias
    - Verificar que se generan los archivos: `src/App.tsx`, `src/main.tsx`, `public/`, `tsconfig.json`, `package.json`, `vite.config.ts`, `index.html`
    - _Requisitos: 2.1, 2.2_

  - [x] 3.2 Verificar configuración de TypeScript estricto en el frontend
    - Confirmar que `tsconfig.json` (o `tsconfig.app.json`) contiene `"strict": true`
    - Si no está presente, añadirlo manualmente
    - _Requisitos: 2.3_

  - [x] 3.3 Instalar dependencias adicionales del frontend (Zustand, React Router, Axios)
    - Ejecutar `npm install zustand react-router-dom axios` dentro de `DYLO-Platform---Front/`
    - Verificar que las dependencias aparecen en `package.json` bajo `dependencies`
    - _Requisitos: 2.1_

  - [x] 3.4 Crear la estructura de carpetas del frontend (`stores/`, `routes/`, `services/`)
    - Crear directorio `src/stores/`
    - Crear directorio `src/routes/`
    - Crear directorio `src/services/`
    - _Requisitos: 2.2_

  - [x] 3.5 Crear el store base de autenticación con Zustand
    - Crear `src/stores/useAuthStore.ts` con la interfaz `AuthState` (user, token, isAuthenticated, setAuth, logout)
    - Definir la interfaz `User` con campos: id, email, name, role
    - _Requisitos: 2.1_

  - [x] 3.6 Configurar React Router con estructura base de rutas
    - Crear `src/routes/ProtectedRoute.tsx` — guard que redirige a `/login` si no está autenticado
    - Crear `src/routes/AppRouter.tsx` — configuración principal con rutas: `/login`, `/dashboard` (protegida), y fallback a `/login`
    - Usar componentes placeholder para LoginPage y DashboardPage
    - _Requisitos: 2.1_

  - [x] 3.7 Crear la instancia de Axios configurada
    - Crear `src/services/api.ts` con instancia de Axios usando `baseURL` desde variable de entorno `VITE_API_URL`
    - Configurar interceptor de request para inyectar token JWT desde `useAuthStore`
    - Configurar interceptor de response para hacer logout automático en error 401
    - _Requisitos: 2.1_

  - [x] 3.8 Integrar AppRouter en App.tsx / main.tsx
    - Actualizar `src/App.tsx` o `src/main.tsx` para usar `<AppRouter />` como componente raíz
    - _Requisitos: 2.1, 2.4_

  - [x] 3.9 Verificar scripts del frontend en `package.json`
    - Confirmar que existen los scripts: `dev`, `build`, `lint`, `preview`
    - Añadir script `format`: `prettier --write "src/**/*.{ts,tsx,css,html}"`
    - _Requisitos: 2.4, 2.5, 5.1, 5.3_

  - [x] 3.10 Ejecutar `npm run build` en el frontend y verificar compilación exitosa
    - Ejecutar el comando y confirmar exit code 0 sin errores de TypeScript
    - _Requisitos: 2.5_

- [x] 4. Scaffold del proyecto Backend (NestJS + TypeScript)
  - [x] 4.1 Crear el proyecto NestJS en `DYLO-Platform---Back/`
    - Ejecutar `npx @nestjs/cli new . --strict --skip-git --package-manager npm` dentro de `DYLO-Platform---Back/`
    - Verificar que se generan los archivos: `src/app.module.ts`, `src/app.controller.ts`, `src/app.service.ts`, `src/main.ts`, `tsconfig.json`, `package.json`, `nest-cli.json`
    - _Requisitos: 3.1, 3.2_

  - [x] 4.2 Verificar configuración de TypeScript estricto en el backend
    - Confirmar que `tsconfig.json` contiene `"strict": true`
    - _Requisitos: 3.3_

  - [x] 4.3 Verificar endpoint GET raíz del backend
    - Confirmar que `app.controller.ts` tiene un endpoint GET en `/` que responde con un mensaje de confirmación
    - Si no existe, implementarlo
    - _Requisitos: 3.6_

  - [x] 4.4 Verificar scripts del backend en `package.json`
    - Confirmar que existen los scripts: `start`, `start:dev`, `build`, `lint`, `test`, `format`
    - Añadir script `format` si no existe: `prettier --write "src/**/*.ts"`
    - _Requisitos: 3.4, 3.5, 5.2, 5.4_

  - [x] 4.5 Ejecutar `npm run build` en el backend y verificar compilación exitosa
    - Ejecutar el comando y confirmar exit code 0 sin errores de TypeScript
    - _Requisitos: 3.5_

- [x] 5. Checkpoint — Verificar scaffolds de ambos proyectos
  - Asegurar que ambos proyectos compilan sin errores, preguntar al usuario si surgen dudas.

- [x] 6. Configurar ESLint (flat config) + Prettier en ambos proyectos
  - [x] 6.1 Configurar ESLint flat config y Prettier en el frontend
    - Verificar que Vite generó `eslint.config.js` con reglas de React y TypeScript
    - Instalar `eslint-config-prettier` y `prettier` como devDependencies
    - Extender `eslint.config.js` con `eslint-config-prettier` para desactivar reglas de formato conflictivas
    - Crear `.prettierrc` con la configuración compartida (semi, trailingComma, singleQuote, printWidth: 100, tabWidth: 2)
    - _Requisitos: 4.1, 4.3_

  - [x] 6.2 Configurar ESLint flat config y Prettier en el backend
    - Migrar `.eslintrc.js` generado por NestJS a `eslint.config.mjs` (flat config)
    - Instalar `eslint-config-prettier`, `prettier` y plugins necesarios como devDependencies
    - Incluir `eslint-config-prettier` en la configuración flat para desactivar reglas de formato conflictivas
    - Crear `.prettierrc` con la misma configuración compartida que el frontend
    - Eliminar `.eslintrc.js` antiguo
    - _Requisitos: 4.2, 4.4_

  - [x] 6.3 Ejecutar lint en ambos proyectos y verificar cero errores
    - Ejecutar `npm run lint` en `DYLO-Platform---Front/` y confirmar cero errores
    - Ejecutar `npm run lint` en `DYLO-Platform---Back/` y confirmar cero errores
    - Corregir cualquier error reportado en el código generado por el scaffold
    - _Requisitos: 4.5_

- [x] 7. Verificación final — Asegurar que todo funciona correctamente
  - Asegurar que todos los tests pasan en ambos proyectos, preguntar al usuario si surgen dudas.
  - Verificar ausencia de archivos Docker (`Dockerfile`, `docker-compose.yml`) en ambos workspaces
  - _Requisitos: 5.1, 5.2_

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los property tests validan propiedades universales de correctitud usando fast-check
- Los unit tests validan ejemplos específicos y casos borde
- Todo se ejecuta directamente en el entorno local sin Docker (Node.js v22.14.0, npm 10.9.2, Git 2.49.0)
- Las tareas 3.3–3.8 son nuevas y cubren la instalación y configuración de Zustand, React Router y Axios en el frontend
