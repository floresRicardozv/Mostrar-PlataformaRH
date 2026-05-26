# Documento de Requisitos — Configuración del Proyecto DYLO Platform

## Introducción

Este documento define los requisitos para la configuración inicial del proyecto full-stack DYLO Platform. El proyecto consta de dos workspaces independientes: un frontend en React con TypeScript (`DYLO-Platform---Front`) y un backend en NestJS con TypeScript (`DYLO-Platform---Back`). No se utilizará Docker. El objetivo es verificar que todas las herramientas necesarias estén instaladas y luego crear la estructura base de ambos proyectos.

## Glosario

- **Sistema_Verificador**: Módulo o script encargado de comprobar que las herramientas y dependencias necesarias están instaladas en el entorno del desarrollador.
- **Scaffold_Frontend**: Proceso de creación de la estructura base del proyecto React con TypeScript en el workspace `DYLO-Platform---Front`.
- **Scaffold_Backend**: Proceso de creación de la estructura base del proyecto NestJS con TypeScript en el workspace `DYLO-Platform---Back`.
- **Entorno_Desarrollo**: La máquina local del desarrollador donde se ejecutan Node.js, npm y las herramientas de desarrollo.
- **Prerequisitos**: Conjunto mínimo de herramientas requeridas: Node.js (v18+), npm (v9+), Git.
- **Workspace_Front**: Directorio `DYLO-Platform---Front` donde reside el código del frontend.
- **Workspace_Back**: Directorio `DYLO-Platform---Back` donde reside el código del backend.

## Requisitos

### Requisito 1: Verificación de Prerequisitos del Entorno

**User Story:** Como desarrollador, quiero verificar que tengo todas las herramientas necesarias instaladas, para poder crear y ejecutar el proyecto sin problemas.

#### Criterios de Aceptación

1. WHEN el desarrollador inicia la configuración del proyecto, THE Sistema_Verificador SHALL comprobar que Node.js versión 18 o superior está instalado en el Entorno_Desarrollo.
2. WHEN el desarrollador inicia la configuración del proyecto, THE Sistema_Verificador SHALL comprobar que npm versión 9 o superior está instalado en el Entorno_Desarrollo.
3. WHEN el desarrollador inicia la configuración del proyecto, THE Sistema_Verificador SHALL comprobar que Git está instalado en el Entorno_Desarrollo.
4. IF alguno de los Prerequisitos no está instalado o no cumple la versión mínima, THEN THE Sistema_Verificador SHALL mostrar un mensaje indicando qué herramienta falta y la versión mínima requerida.
5. WHEN todos los Prerequisitos están verificados correctamente, THE Sistema_Verificador SHALL mostrar un resumen confirmando las versiones detectadas de cada herramienta.

### Requisito 2: Scaffold del Proyecto Frontend (React + TypeScript)

**User Story:** Como desarrollador, quiero crear la estructura base del frontend con React y TypeScript, para tener un punto de partida funcional para el desarrollo.

#### Criterios de Aceptación

1. WHEN los Prerequisitos están verificados, THE Scaffold_Frontend SHALL crear un proyecto React con TypeScript dentro del Workspace_Front utilizando Vite como herramienta de build.
2. THE Scaffold_Frontend SHALL generar la siguiente estructura mínima en el Workspace_Front: `src/`, `src/App.tsx`, `src/main.tsx`, `public/`, `tsconfig.json`, `package.json`, `vite.config.ts` e `index.html`.
3. THE Scaffold_Frontend SHALL configurar TypeScript en modo estricto (`"strict": true`) en el archivo `tsconfig.json`.
4. WHEN el scaffold se completa, THE Scaffold_Frontend SHALL permitir ejecutar el servidor de desarrollo con el comando `npm run dev` sin errores.
5. WHEN el scaffold se completa, THE Scaffold_Frontend SHALL permitir compilar el proyecto con el comando `npm run build` sin errores de TypeScript.

### Requisito 3: Scaffold del Proyecto Backend (NestJS + TypeScript)

**User Story:** Como desarrollador, quiero crear la estructura base del backend con NestJS y TypeScript, para tener un punto de partida funcional para el desarrollo de la API.

#### Criterios de Aceptación

1. WHEN los Prerequisitos están verificados, THE Scaffold_Backend SHALL crear un proyecto NestJS con TypeScript dentro del Workspace_Back utilizando el CLI de NestJS (`@nestjs/cli`).
2. THE Scaffold_Backend SHALL generar la siguiente estructura mínima en el Workspace_Back: `src/`, `src/app.module.ts`, `src/app.controller.ts`, `src/app.service.ts`, `src/main.ts`, `tsconfig.json`, `package.json` y `nest-cli.json`.
3. THE Scaffold_Backend SHALL configurar TypeScript en modo estricto (`"strict": true`) en el archivo `tsconfig.json`.
4. WHEN el scaffold se completa, THE Scaffold_Backend SHALL permitir ejecutar el servidor de desarrollo con el comando `npm run start:dev` sin errores.
5. WHEN el scaffold se completa, THE Scaffold_Backend SHALL permitir compilar el proyecto con el comando `npm run build` sin errores de TypeScript.
6. WHEN el scaffold se completa, THE Scaffold_Backend SHALL exponer un endpoint GET en la ruta raíz (`/`) que responda con un mensaje de confirmación.

### Requisito 4: Configuración de Herramientas de Calidad de Código

**User Story:** Como desarrollador, quiero tener ESLint y Prettier configurados en ambos proyectos, para mantener un código limpio y consistente desde el inicio.

#### Criterios de Aceptación

1. THE Scaffold_Frontend SHALL incluir ESLint configurado con reglas compatibles con React y TypeScript en el Workspace_Front.
2. THE Scaffold_Backend SHALL incluir ESLint configurado con reglas compatibles con NestJS y TypeScript en el Workspace_Back.
3. THE Scaffold_Frontend SHALL incluir Prettier configurado como formateador de código en el Workspace_Front.
4. THE Scaffold_Backend SHALL incluir Prettier configurado como formateador de código en el Workspace_Back.
5. WHEN el desarrollador ejecuta el comando de lint en cualquiera de los dos workspaces, THE Sistema_Verificador SHALL reportar cero errores en el código generado por el scaffold.

### Requisito 5: Independencia de Docker

**User Story:** Como desarrollador, quiero que ambos proyectos se ejecuten directamente en mi máquina local sin Docker, para simplificar el flujo de desarrollo.

#### Criterios de Aceptación

1. THE Scaffold_Frontend SHALL ejecutarse directamente en el Entorno_Desarrollo sin requerir Docker ni contenedores.
2. THE Scaffold_Backend SHALL ejecutarse directamente en el Entorno_Desarrollo sin requerir Docker ni contenedores.
3. THE Scaffold_Frontend SHALL incluir en el archivo `package.json` todos los scripts necesarios para desarrollo, build y lint sin dependencias de Docker.
4. THE Scaffold_Backend SHALL incluir en el archivo `package.json` todos los scripts necesarios para desarrollo, build, lint y testing sin dependencias de Docker.
