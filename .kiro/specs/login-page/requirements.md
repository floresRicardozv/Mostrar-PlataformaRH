# Documento de Requisitos — Página de Login

## Introducción

Este documento define los requisitos para la página de inicio de sesión (login) de la plataforma DYLO HR. La página permitirá a los usuarios autenticarse mediante correo electrónico y contraseña, integrándose con el store de autenticación existente (Zustand). Dado que el backend aún no está disponible, el login utilizará un servicio mock que simula la respuesta del servidor. La interfaz se estilizará con Tailwind CSS y seguirá un diseño limpio y sencillo.

## Glosario

- **Login_Page**: Página de inicio de sesión que contiene el formulario de autenticación.
- **Login_Form**: Formulario dentro de Login_Page que captura las credenciales del usuario (email y contraseña).
- **Auth_Store**: Store de Zustand (`useAuthStore`) que gestiona el estado de autenticación (user, token, isAuthenticated, setAuth, logout).
- **Mock_Auth_Service**: Servicio simulado que reemplaza temporalmente al backend real, devolviendo respuestas de autenticación predefinidas.
- **Dashboard_Page**: Página protegida de destino tras un login exitoso, que incluye un botón de cierre de sesión.
- **Protected_Route**: Componente existente que restringe el acceso a rutas protegidas según el estado de autenticación.
- **Validator**: Módulo de validación que verifica el formato y completitud de los campos del formulario.
- **Tailwind_CSS**: Framework de utilidades CSS que se utilizará para estilizar los componentes de la interfaz.

## Requisitos

### Requisito 1: Instalación y configuración de Tailwind CSS

**Historia de Usuario:** Como desarrollador, quiero que Tailwind CSS esté instalado y configurado en el proyecto, para poder estilizar los componentes de la página de login con clases de utilidad.

#### Criterios de Aceptación

1. THE Tailwind_CSS SHALL estar instalado como dependencia de desarrollo en el proyecto DYLO-Platform---Front.
2. WHEN el proyecto se compila, THE Tailwind_CSS SHALL procesar las clases de utilidad y generar los estilos correspondientes.
3. THE Tailwind_CSS SHALL estar integrado con la configuración existente de Vite sin modificar otras configuraciones del proyecto.

### Requisito 2: Formulario de login con campos de email y contraseña

**Historia de Usuario:** Como usuario de la plataforma DYLO HR, quiero ver un formulario de login con campos de email y contraseña, para poder ingresar mis credenciales de acceso.

#### Criterios de Aceptación

1. THE Login_Page SHALL mostrar el Login_Form con un campo de entrada para email y un campo de entrada para contraseña.
2. THE Login_Form SHALL incluir un botón de envío con el texto "Iniciar Sesión".
3. THE Login_Form SHALL mostrar el campo de contraseña con tipo `password` para ocultar los caracteres ingresados.
4. THE Login_Page SHALL presentar un diseño centrado, limpio y sencillo utilizando clases de Tailwind_CSS.

### Requisito 3: Validación de campos del formulario

**Historia de Usuario:** Como usuario, quiero recibir mensajes de error claros cuando dejo campos vacíos o ingreso un email inválido, para poder corregir mis datos antes de enviar el formulario.

#### Criterios de Aceptación

1. WHEN el usuario envía el Login_Form con el campo de email vacío, THE Validator SHALL mostrar el mensaje "El correo electrónico es obligatorio" junto al campo de email.
2. WHEN el usuario envía el Login_Form con el campo de contraseña vacío, THE Validator SHALL mostrar el mensaje "La contraseña es obligatoria" junto al campo de contraseña.
3. WHEN el usuario envía el Login_Form con un email que no cumple el formato estándar de correo electrónico, THE Validator SHALL mostrar el mensaje "El formato del correo electrónico no es válido" junto al campo de email.
4. WHEN el Login_Form contiene errores de validación, THE Login_Form SHALL impedir el envío de las credenciales al Mock_Auth_Service.

### Requisito 4: Servicio mock de autenticación

**Historia de Usuario:** Como desarrollador, quiero un servicio mock que simule la respuesta del backend de autenticación, para poder desarrollar y probar el flujo de login sin depender del servidor real.

#### Criterios de Aceptación

1. WHEN el Login_Form envía credenciales válidas (email: "admin@dylo.com", contraseña: "admin123"), THE Mock_Auth_Service SHALL devolver un objeto de usuario con id, email, name y role, junto con un token JWT simulado.
2. WHEN el Login_Form envía credenciales que no coinciden con las credenciales mock predefinidas, THE Mock_Auth_Service SHALL devolver un error con el mensaje "Credenciales inválidas".
3. THE Mock_Auth_Service SHALL simular un retardo de respuesta de entre 500ms y 1000ms para emular el comportamiento de una llamada de red real.
4. THE Mock_Auth_Service SHALL estar implementado como un módulo independiente que pueda ser reemplazado por el servicio real de autenticación sin modificar el Login_Form.

### Requisito 5: Integración con el store de autenticación (Zustand)

**Historia de Usuario:** Como usuario, quiero que al iniciar sesión exitosamente mis datos se almacenen en el estado de la aplicación, para mantener mi sesión activa mientras navego.

#### Criterios de Aceptación

1. WHEN el Mock_Auth_Service devuelve una respuesta exitosa, THE Login_Page SHALL invocar la función `setAuth` del Auth_Store con los datos del usuario y el token recibidos.
2. WHEN el Auth_Store recibe los datos de autenticación mediante `setAuth`, THE Auth_Store SHALL establecer `isAuthenticated` en `true`.
3. WHEN el usuario hace clic en el botón de cierre de sesión en Dashboard_Page, THE Auth_Store SHALL restablecer `user` a `null`, `token` a `null` e `isAuthenticated` a `false`.

### Requisito 6: Redirección tras login exitoso

**Historia de Usuario:** Como usuario, quiero ser redirigido automáticamente al dashboard después de iniciar sesión, para acceder directamente a las funcionalidades de la plataforma.

#### Criterios de Aceptación

1. WHEN el Auth_Store establece `isAuthenticated` en `true` tras un login exitoso, THE Login_Page SHALL redirigir al usuario a la ruta `/dashboard`.
2. WHEN un usuario no autenticado intenta acceder a la ruta `/dashboard`, THE Protected_Route SHALL redirigir al usuario a la ruta `/login`.
3. WHEN un usuario autenticado accede a la ruta `/login`, THE Login_Page SHALL redirigir al usuario a la ruta `/dashboard`.

### Requisito 7: Página placeholder de Dashboard con cierre de sesión

**Historia de Usuario:** Como usuario autenticado, quiero ver una página de dashboard con un botón de cierre de sesión, para poder salir de mi cuenta de forma segura.

#### Criterios de Aceptación

1. THE Dashboard_Page SHALL mostrar un mensaje de bienvenida que incluya el nombre del usuario autenticado obtenido del Auth_Store.
2. THE Dashboard_Page SHALL incluir un botón con el texto "Cerrar Sesión".
3. WHEN el usuario hace clic en el botón "Cerrar Sesión", THE Dashboard_Page SHALL invocar la función `logout` del Auth_Store.
4. WHEN la función `logout` del Auth_Store se ejecuta, THE Dashboard_Page SHALL redirigir al usuario a la ruta `/login`.

### Requisito 8: Manejo de estados de carga y error en el login

**Historia de Usuario:** Como usuario, quiero ver indicadores visuales durante el proceso de login y mensajes claros si ocurre un error, para entender el estado de mi solicitud de autenticación.

#### Criterios de Aceptación

1. WHILE el Mock_Auth_Service está procesando la solicitud de autenticación, THE Login_Form SHALL deshabilitar el botón de envío y mostrar un indicador de carga (texto "Cargando...").
2. WHILE el Mock_Auth_Service está procesando la solicitud de autenticación, THE Login_Form SHALL deshabilitar los campos de email y contraseña para prevenir modificaciones.
3. WHEN el Mock_Auth_Service devuelve un error de credenciales inválidas, THE Login_Form SHALL mostrar el mensaje de error devuelto por el servicio en la parte superior del formulario.
4. IF ocurre un error inesperado durante la comunicación con el Mock_Auth_Service, THEN THE Login_Form SHALL mostrar el mensaje "Ocurrió un error inesperado. Intente nuevamente." en la parte superior del formulario.

### Requisito 9: Integración con el enrutador existente

**Historia de Usuario:** Como desarrollador, quiero que la página de login y el dashboard se integren con el enrutador existente de React Router, para mantener la consistencia de la navegación en la aplicación.

#### Criterios de Aceptación

1. THE Login_Page SHALL estar registrada en el AppRouter en la ruta `/login`, reemplazando el componente placeholder existente.
2. THE Dashboard_Page SHALL estar registrada en el AppRouter dentro de la ruta protegida por Protected_Route en la ruta `/dashboard`, reemplazando el componente placeholder existente.
3. WHEN el usuario navega a una ruta no definida, THE AppRouter SHALL redirigir al usuario a la ruta `/login`.
