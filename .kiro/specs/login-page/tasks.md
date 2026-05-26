# Plan de Implementación: Página de Login

## Resumen

Implementación incremental de la página de login para DYLO HR. Se comienza con la instalación de Tailwind CSS v4, luego se crean las utilidades de validación, el servicio mock de autenticación, las páginas (LoginPage y DashboardPage), y finalmente se integra todo en el enrutador existente. Los tests de propiedades usan fast-check y los tests unitarios usan Vitest + React Testing Library.

## Tareas

- [x] 1. Instalar y configurar Tailwind CSS v4 con el plugin de Vite
  - Instalar `tailwindcss` y `@tailwindcss/vite` como dependencias de desarrollo
  - Agregar el plugin `@tailwindcss/vite` en `vite.config.ts`
  - Agregar `@import "tailwindcss"` en `src/index.css` para activar las clases de utilidad
  - Verificar que el proyecto compila correctamente tras la configuración
  - _Requisitos: 1.1, 1.2, 1.3_

- [x] 2. Crear módulo de validación del formulario
  - [x] 2.1 Implementar funciones de validación en `src/utils/validators.ts`
    - Crear la interfaz `ValidationErrors` con campos opcionales `email` y `password`
    - Implementar `validateEmail(email: string): string | undefined` con reglas: vacío → mensaje obligatorio, formato inválido → mensaje de formato
    - Implementar `validatePassword(password: string): string | undefined` con regla: vacío → mensaje obligatorio
    - Implementar `validateLoginForm(email, password): ValidationErrors` que orqueste ambas validaciones
    - Exportar todas las funciones e interfaces
    - _Requisitos: 3.1, 3.2, 3.3_

  - [ ]* 2.2 Escribir test de propiedad para validación de email
    - **Propiedad 1: Correctitud de validación de email**
    - Para cualquier string arbitrario generado por fast-check, verificar que: string vacío → error obligatorio, string no vacío sin formato email → error de formato, string con formato email válido → sin error
    - Usar `fc.assert(fc.property(...), { numRuns: 100 })`
    - **Valida: Requisitos 3.1, 3.3**

  - [ ]* 2.3 Escribir tests unitarios para validadores
    - Test: email vacío retorna mensaje "El correo electrónico es obligatorio"
    - Test: email con formato inválido retorna mensaje "El formato del correo electrónico no es válido"
    - Test: contraseña vacía retorna mensaje "La contraseña es obligatoria"
    - Test: campos válidos retornan objeto vacío
    - Test: `validateLoginForm` combina errores de ambos campos
    - _Requisitos: 3.1, 3.2, 3.3_

- [x] 3. Crear servicio mock de autenticación
  - [x] 3.1 Implementar `src/services/mockAuthService.ts`
    - Definir la interfaz `AuthResponse` con `user` (id, email, name, role) y `token`
    - Implementar función `login(email, password): Promise<AuthResponse>` que simule un retardo de 500-1000ms
    - Credenciales válidas (`admin@dylo.com` / `admin123`): retornar datos de usuario y token simulado
    - Cualquier otra combinación: lanzar `Error("Credenciales inválidas")`
    - Exportar como módulo independiente reemplazable
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 3.2 Escribir test de propiedad para credenciales inválidas
    - **Propiedad 2: Credenciales inválidas siempre son rechazadas**
    - Para cualquier par (email, password) generado por fast-check que no sea exactamente ("admin@dylo.com", "admin123"), verificar que `login()` lanza error con mensaje "Credenciales inválidas"
    - Usar `fc.assert(fc.asyncProperty(...), { numRuns: 100 })`
    - **Valida: Requisito 4.2**

  - [ ]* 3.3 Escribir tests unitarios para mockAuthService
    - Test: credenciales válidas retornan AuthResponse con estructura correcta
    - Test: credenciales inválidas lanzan error "Credenciales inválidas"
    - Test: la respuesta tiene retardo (>= 500ms)
    - _Requisitos: 4.1, 4.2, 4.3_

- [x] 4. Checkpoint — Verificar validadores y servicio mock
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas.

- [x] 5. Implementar LoginPage
  - [x] 5.1 Crear componente `src/pages/LoginPage.tsx`
    - Renderizar formulario con campo de email, campo de contraseña (type="password") y botón "Iniciar Sesión"
    - Estilizar con clases de Tailwind CSS: diseño centrado, limpio y sencillo
    - Al enviar: ejecutar `validateLoginForm`; si hay errores, mostrarlos inline junto a cada campo y NO llamar al servicio
    - Si validación pasa: llamar a `mockAuthService.login()`, mostrar "Cargando..." en el botón y deshabilitar campos y botón
    - En caso de éxito: invocar `setAuth()` del `useAuthStore` y redirigir a `/dashboard` con `useNavigate`
    - En caso de error del servicio: mostrar mensaje de error en banner superior del formulario
    - En caso de error inesperado: mostrar "Ocurrió un error inesperado. Intente nuevamente."
    - Si el usuario ya está autenticado (`isAuthenticated`), redirigir a `/dashboard`
    - Limpiar error del servidor al reintentar envío
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 3.4, 5.1, 5.2, 6.1, 6.3, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 5.2 Escribir tests unitarios para LoginPage
    - Test: renderiza campos de email, contraseña y botón "Iniciar Sesión"
    - Test: campo de contraseña tiene type="password"
    - Test: muestra errores de validación inline al enviar con campos vacíos
    - Test: botón muestra "Cargando..." y campos se deshabilitan durante la petición
    - Test: muestra error del servidor en banner superior
    - Test: redirige a /dashboard si ya está autenticado
    - _Requisitos: 2.1, 2.2, 2.3, 3.1, 3.2, 6.3, 8.1, 8.2, 8.3_

- [x] 6. Implementar DashboardPage
  - [x] 6.1 Crear componente `src/pages/DashboardPage.tsx`
    - Obtener datos del usuario desde `useAuthStore`
    - Mostrar mensaje de bienvenida que incluya el nombre del usuario
    - Renderizar botón "Cerrar Sesión"
    - Al hacer clic en "Cerrar Sesión": invocar `logout()` del store y redirigir a `/login`
    - Estilizar con clases de Tailwind CSS
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 5.3_

  - [ ]* 6.2 Escribir test de propiedad para mensaje de bienvenida
    - **Propiedad 4: Mensaje de bienvenida incluye el nombre del usuario**
    - Para cualquier objeto User con nombre arbitrario no vacío, al renderizar DashboardPage con ese usuario en el store, el output debe contener el nombre
    - Usar `fc.assert(fc.property(...), { numRuns: 100 })` con React Testing Library
    - **Valida: Requisito 7.1**

  - [ ]* 6.3 Escribir tests unitarios para DashboardPage
    - Test: renderiza botón "Cerrar Sesión"
    - Test: clic en botón invoca `logout()` del store
    - Test: redirige a /login tras logout
    - _Requisitos: 7.2, 7.3, 7.4_

- [x] 7. Checkpoint — Verificar páginas LoginPage y DashboardPage
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas.

- [x] 8. Integrar páginas en el enrutador y test del store
  - [x] 8.1 Actualizar `src/routes/AppRouter.tsx`
    - Reemplazar los componentes placeholder inline por imports de `LoginPage` y `DashboardPage` desde `src/pages/`
    - Mantener la estructura de rutas existente: `/login`, `/dashboard` (protegida), `*` → redirect a `/login`
    - _Requisitos: 9.1, 9.2, 9.3_

  - [ ]* 8.2 Escribir test de propiedad para round-trip del store de autenticación
    - **Propiedad 3: Round-trip del store de autenticación**
    - Para cualquier objeto User válido y token no vacío, `setAuth(user, token)` establece `isAuthenticated=true` con los datos correctos; luego `logout()` restablece todo a null/false
    - Usar `fc.assert(fc.property(...), { numRuns: 100 })`
    - **Valida: Requisitos 5.2, 5.3**

  - [ ]* 8.3 Escribir tests unitarios para AppRouter
    - Test: `/login` renderiza LoginPage
    - Test: `/dashboard` protegido renderiza DashboardPage cuando autenticado
    - Test: ruta desconocida redirige a `/login`
    - _Requisitos: 9.1, 9.2, 9.3_

- [x] 9. Checkpoint final — Verificar integración completa
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido.
- Cada tarea referencia requisitos específicos para trazabilidad.
- Los checkpoints aseguran validación incremental.
- Los tests de propiedades validan propiedades universales de correctitud con fast-check.
- Los tests unitarios validan ejemplos específicos y casos borde con Vitest + React Testing Library.
