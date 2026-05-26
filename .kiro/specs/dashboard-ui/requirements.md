# Documento de Requisitos — Dashboard UI

## Introducción

El Dashboard UI es la vista principal de la plataforma DYLO HR que se muestra tras el inicio de sesión. Reemplaza el placeholder actual (`DashboardPage`) con un dashboard completo que incluye un sidebar de navegación colapsable, un área de contenido principal con carrusel de noticias, tarjetas de solicitudes, sección de convenios, y un sidebar derecho con widgets de calendario, eventos, cumpleaños y herramientas. Todos los datos son mock/hardcoded por ahora, excepto la autenticación que usa el store existente.

## Glosario

- **Dashboard**: Vista principal de la aplicación tras autenticación, compuesta por Sidebar, Área_Principal y Sidebar_Derecho.
- **Sidebar**: Panel de navegación lateral izquierdo con fondo oscuro (#1a1a1a), colapsable, que contiene el logo DYLO, ítems de menú e íconos sociales.
- **Área_Principal**: Zona central scrollable con fondo gris claro que contiene la cabecera de bienvenida, tarjetas de solicitudes, carrusel de noticias, barra de bienvenida y sección de convenios.
- **Sidebar_Derecho**: Panel lateral derecho fijo con fondo blanco que contiene widgets de atención, calendario, eventos, aniversarios, cumpleaños y herramientas comerciales.
- **Tarjeta_Solicitud**: Componente de tarjeta que muestra el balance de un tipo de solicitud (Vacaciones, Cita Médica, Home Office) con ícono, etiqueta y cantidad en texto naranja.
- **Carrusel_Noticias**: Componente de carrusel con borde naranja punteado que muestra anuncios/noticias con paginación por puntos.
- **Carrusel_Bienvenida**: Componente de carrusel dentro de la barra de bienvenida que rota entre múltiples entradas de WelcomeData (empleados nuevos del mes), mostrando una entrada a la vez con auto-rotación y navegación manual.
- **Carrusel_Horizontal**: Componente de carrusel tipo ticker/marquee horizontal que desplaza contenido automáticamente cuando los elementos exceden el ancho visible del contenedor.
- **Widget_Calendario**: Componente del Sidebar_Derecho que muestra una vista semanal del mes con filtros por tipo de ausencia y avatares de personas ausentes.
- **Tarjeta_Convenio**: Componente de tarjeta con imagen de fondo y overlay de gradiente oscuro que muestra una categoría de convenio.
- **Mock_Data**: Archivos separados que contienen datos estáticos simulados para cada sección del Dashboard, diseñados para ser reemplazados por llamadas a API en el futuro.
- **Auth_Store**: Store de Zustand existente (`useAuthStore`) que provee la información del usuario autenticado.

## Requisitos

### Requisito 1: Layout General del Dashboard

**Historia de Usuario:** Como empleado autenticado, quiero ver un dashboard con tres paneles (sidebar izquierdo, contenido principal y sidebar derecho), para poder navegar y consultar información relevante de un vistazo.

#### Criterios de Aceptación

1. WHEN el empleado accede a la ruta `/dashboard`, THE Dashboard SHALL renderizar tres paneles: Sidebar a la izquierda, Área_Principal en el centro y Sidebar_Derecho a la derecha.
2. THE Sidebar SHALL tener un fondo oscuro (#1a1a1a) y ocupar un ancho fijo cuando está expandido.
3. THE Área_Principal SHALL tener un fondo gris claro y ser scrollable verticalmente.
4. THE Sidebar_Derecho SHALL tener un fondo blanco y permanecer fijo durante el scroll del Área_Principal.
5. THE Dashboard SHALL ser responsive con enfoque desktop-first, adaptando el layout en pantallas menores.

### Requisito 2: Sidebar de Navegación Colapsable

**Historia de Usuario:** Como empleado, quiero poder colapsar y expandir el sidebar de navegación, para tener más espacio de trabajo cuando lo necesite.

#### Criterios de Aceptación

1. THE Sidebar SHALL tener dos estados: expandido (logo completo + texto "DYNAMIC LOGISTICS" + ítems con ícono y texto) y colapsado (solo íconos + logo reducido).
2. WHEN el empleado hace clic en el botón "Ocultar", THE Sidebar SHALL colapsar con una animación suave de transición de ancho.
3. WHEN el empleado hace clic en el ícono de menú hamburguesa en estado colapsado, THE Sidebar SHALL expandirse con una animación suave de transición de ancho.
4. THE Sidebar SHALL mostrar los siguientes ítems de menú con íconos: Inicio, Reloj checador, Solicitudes, Calendario, Organigrama, Colaboradores, Recibos de nómina, Convenios, Evaluaciones.
5. THE Sidebar SHALL mostrar en la parte inferior un enlace "Universidad DYLO" con ícono naranja.
6. THE Sidebar SHALL mostrar en el footer íconos de redes sociales (info, instagram, youtube).

### Requisito 3: Cabecera de Bienvenida y Tarjetas de Solicitudes

**Historia de Usuario:** Como empleado, quiero ver un mensaje de bienvenida personalizado y el resumen de mis solicitudes disponibles, para conocer rápidamente mi balance de días.

#### Criterios de Aceptación

1. THE Área_Principal SHALL mostrar un mensaje "Bienvenido, [Nombre] 👋" donde [Nombre] se obtiene del Auth_Store.
2. THE Área_Principal SHALL mostrar una etiqueta "Solicitudes" con un enlace "Ver más >" en color naranja.
3. THE Área_Principal SHALL mostrar tres Tarjeta_Solicitud en una fila: Vacaciones (Disponibles, 7 días), Cita Médica (Utilizados, 2 días) y Home Office (Utilizados, 4 días).
4. EACH Tarjeta_Solicitud SHALL tener fondo blanco (#F6F6F6), esquinas redondeadas, ícono, etiqueta descriptiva y cantidad en texto naranja.
5. WHEN el empleado pasa el cursor sobre una Tarjeta_Solicitud, THE Tarjeta_Solicitud SHALL cambiar el fondo a #E7E7E7.
6. THE Área_Principal SHALL obtener los datos de las Tarjeta_Solicitud desde un archivo Mock_Data dedicado.

### Requisito 4: Barra Superior Derecha (Acciones Rápidas)

**Historia de Usuario:** Como empleado, quiero tener acceso rápido a las acciones de checar entrada, modo oscuro, notificaciones y ayuda, para realizar acciones frecuentes sin navegar.

#### Criterios de Aceptación

1. THE Dashboard SHALL mostrar un botón "Checar entrada" con gradiente verde/teal (#55D2D0 → #099796) e ícono de play en la zona superior derecha.
2. WHEN el empleado pasa el cursor sobre el botón "Checar entrada", THE botón SHALL cambiar al gradiente hover (#3BB8B6 → #00807F).
3. THE Dashboard SHALL mostrar íconos de toggle de modo oscuro, campana de notificaciones e ícono de ayuda junto al botón "Checar entrada".

### Requisito 5: Carrusel de Noticias

**Historia de Usuario:** Como empleado, quiero ver las noticias y anuncios de la empresa en un carrusel, para mantenerme informado de las novedades.

#### Criterios de Aceptación

1. THE Área_Principal SHALL mostrar un Carrusel_Noticias con borde naranja punteado que ocupe el ancho principal.
2. THE Carrusel_Noticias SHALL mostrar contenido de artículos/noticias con título, texto e imagen.
3. THE Carrusel_Noticias SHALL mostrar puntos de paginación en la parte inferior para indicar la cantidad de slides (3 puntos).
4. WHEN el empleado hace clic en un punto de paginación, THE Carrusel_Noticias SHALL navegar al slide correspondiente.
5. THE Carrusel_Noticias SHALL obtener los datos de noticias desde un archivo Mock_Data dedicado.

### Requisito 6: Barra de Bienvenida con Carrusel de Empleados

**Historia de Usuario:** Como empleado, quiero ver los nombres y roles de los nuevos ingresos del mes en una barra de bienvenida rotativa, para conocer a los compañeros que se incorporan a la empresa.

#### Criterios de Aceptación

1. THE Área_Principal SHALL mostrar una barra "Bienvenidos" con ícono de ola debajo del Carrusel_Noticias.
2. THE barra de bienvenida SHALL contener un Carrusel_Bienvenida que muestre una entrada de WelcomeData a la vez, incluyendo el nombre del empleado y un badge con el rol.
3. THE Carrusel_Bienvenida SHALL rotar automáticamente entre las entradas de WelcomeData cada 4 segundos.
4. WHEN el empleado hace clic en la flecha de navegación derecha, THE Carrusel_Bienvenida SHALL avanzar a la siguiente entrada de WelcomeData.
5. WHEN el empleado hace clic en la flecha de navegación izquierda, THE Carrusel_Bienvenida SHALL retroceder a la entrada anterior de WelcomeData.
6. WHEN el Carrusel_Bienvenida llega a la última entrada, THE Carrusel_Bienvenida SHALL volver a la primera entrada al avanzar (comportamiento circular).
7. WHEN el empleado interactúa manualmente con las flechas de navegación, THE Carrusel_Bienvenida SHALL pausar la auto-rotación durante 8 segundos antes de reanudarla.
8. WHEN solo existe una entrada de WelcomeData, THE Carrusel_Bienvenida SHALL mostrar esa entrada de forma estática sin flechas de navegación.
9. THE barra de bienvenida SHALL obtener los datos desde un archivo Mock_Data dedicado que contenga un array de WelcomeData.

### Requisito 7: Sección de Convenios

**Historia de Usuario:** Como empleado, quiero ver los convenios disponibles organizados por categoría, para descubrir los beneficios que la empresa ofrece.

#### Criterios de Aceptación

1. THE Área_Principal SHALL mostrar una sección "Convenios" con ícono de checkmark y subtítulo "¡Descubre los convenios que tenemos para ti!".
2. THE sección de convenios SHALL mostrar una grilla de 3 columnas y 2 filas con las categorías: Restaurantes, Cuidado Personal, Mascotas, Entretenimiento, Educación, Salud y Bienestar.
3. EACH Tarjeta_Convenio SHALL tener una imagen de fondo con overlay de gradiente oscuro (negro a blanco) al 73% de opacidad y texto blanco.
4. WHEN el empleado pasa el cursor sobre una Tarjeta_Convenio, THE Tarjeta_Convenio SHALL cambiar la opacidad del overlay al 100%.
5. THE sección de convenios SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 8: Widget de Atención (Sidebar Derecho)

**Historia de Usuario:** Como empleado, quiero ver alertas de evaluaciones pendientes y solicitudes en revisión, para atender asuntos urgentes a tiempo.

#### Criterios de Aceptación

1. THE Sidebar_Derecho SHALL mostrar una sección "Atención" en la parte superior.
2. THE sección de atención SHALL mostrar un aviso "Evaluación pendiente — vence hoy" con enlace naranja "Ver >".
3. THE sección de atención SHALL mostrar un aviso "Solicitud en revisión" con enlace naranja "Ver >".
4. THE sección de atención SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 9: Widget de Calendario Semanal

**Historia de Usuario:** Como empleado, quiero ver un calendario semanal con las ausencias de mi equipo, para planificar mi semana considerando la disponibilidad del equipo.

#### Criterios de Aceptación

1. THE Widget_Calendario SHALL mostrar el encabezado del mes y año ("Marzo 2026") con flechas de navegación izquierda y derecha.
2. THE Widget_Calendario SHALL mostrar una vista semanal con los días Lun-Dom y sus fechas correspondientes.
3. THE Widget_Calendario SHALL resaltar el día actual con un círculo naranja.
4. THE Widget_Calendario SHALL mostrar pestañas de filtro: Vacaciones (activa en naranja), Home Office e Incapacidad.
5. WHEN una pestaña de filtro está activa, THE Widget_Calendario SHALL mostrar círculos de avatar de las personas ausentes por ese tipo y un conteo (ejemplo: "3 personas").
6. THE Widget_Calendario SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 10: Widget de Próximos Eventos

**Historia de Usuario:** Como empleado, quiero ver los próximos eventos de la empresa, para no perder reuniones o capacitaciones importantes.

#### Criterios de Aceptación

1. THE Sidebar_Derecho SHALL mostrar una sección "Próximos eventos" con íconos de checkmark.
2. THE sección de eventos SHALL listar eventos con formato "DD Mes — Nombre del evento" (ejemplo: "30 Mar — Capacitación OPS").
3. THE sección de eventos SHALL mostrar un botón "Ver calendario completo >" con gradiente naranja.
4. THE sección de eventos SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 11: Widgets de Aniversarios y Cumpleaños con Carrusel Horizontal

**Historia de Usuario:** Como empleado, quiero ver los aniversarios y cumpleaños del mes en un carrusel horizontal que se desplace automáticamente cuando hay muchos nombres, para poder ver a todos mis compañeros sin que el contenido se trunque.

#### Criterios de Aceptación

1. THE Sidebar_Derecho SHALL mostrar una sección "Aniversarios" con ícono de fiesta y una lista de nombres separados por "|".
2. THE Sidebar_Derecho SHALL mostrar una sección "Cumpleaños" con ícono de pastel y una lista de nombres separados por "|".
3. WHEN la lista de nombres excede el ancho visible del contenedor, THE sección de aniversarios SHALL activar un Carrusel_Horizontal que desplace los nombres automáticamente de derecha a izquierda.
4. WHEN la lista de nombres excede el ancho visible del contenedor, THE sección de cumpleaños SHALL activar un Carrusel_Horizontal que desplace los nombres automáticamente de derecha a izquierda.
5. THE Carrusel_Horizontal SHALL desplazar los nombres de forma continua y fluida con una animación CSS de tipo marquee.
6. WHEN el empleado pasa el cursor sobre el Carrusel_Horizontal, THE Carrusel_Horizontal SHALL pausar la animación de desplazamiento.
7. WHEN el empleado retira el cursor del Carrusel_Horizontal, THE Carrusel_Horizontal SHALL reanudar la animación de desplazamiento desde la posición actual.
8. WHEN la lista de nombres cabe dentro del ancho visible del contenedor, THE sección SHALL mostrar los nombres de forma estática sin animación de desplazamiento.
9. THE sección de aniversarios y cumpleaños SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 12: Widget de Herramientas Comerciales

**Historia de Usuario:** Como empleado del área comercial, quiero acceder rápidamente a presentaciones y tarifarios, para tener las herramientas de venta a la mano.

#### Criterios de Aceptación

1. THE Sidebar_Derecho SHALL mostrar una sección "Herramientas comerciales" con dos botones con ícono: "Presentaciones" y "Tarifario".
2. THE sección de herramientas comerciales SHALL obtener los datos desde un archivo Mock_Data dedicado.

### Requisito 13: Componentes Reutilizables

**Historia de Usuario:** Como desarrollador, quiero que el dashboard use componentes reutilizables, para mantener consistencia visual y facilitar el mantenimiento.

#### Criterios de Aceptación

1. THE Dashboard SHALL utilizar componentes reutilizables para Card, Button, Badge y Avatar.
2. THE componente Card SHALL aceptar propiedades de estilo configurables (fondo, borde, padding, hover).
3. THE componente Button SHALL soportar variantes de gradiente naranja y gradiente teal según el sistema de diseño DYLO.
4. EACH componente reutilizable SHALL usar las variables de color definidas en el tema de Tailwind CSS existente (dylo-orange-*, dylo-teal-*).

### Requisito 14: Arquitectura de Datos Mock

**Historia de Usuario:** Como desarrollador, quiero que los datos mock estén en archivos separados por sección, para poder reemplazarlos fácilmente por llamadas a API en el futuro.

#### Criterios de Aceptación

1. THE Dashboard SHALL almacenar los datos mock en archivos TypeScript separados dentro de un directorio dedicado.
2. EACH sección del Dashboard (solicitudes, noticias, calendario, eventos, aniversarios, cumpleaños, convenios, herramientas, atención) SHALL tener su propio archivo Mock_Data.
3. EACH archivo Mock_Data SHALL exportar interfaces TypeScript tipadas para los datos que contiene.
4. THE Dashboard SHALL importar los datos mock a través de las interfaces tipadas, permitiendo reemplazo futuro por servicios API sin modificar los componentes.

### Requisito 15: Integración con Sistema de Diseño DYLO

**Historia de Usuario:** Como diseñador, quiero que el dashboard siga fielmente el sistema de diseño DYLO, para mantener coherencia visual en toda la plataforma.

#### Criterios de Aceptación

1. THE Dashboard SHALL usar los gradientes naranja definidos: activo (#FFDB70 → #F59D47) y hover (#FFDB70 → #F78616).
2. THE Dashboard SHALL usar los gradientes teal definidos: activo (#55D2D0 → #099796) y hover (#3BB8B6 → #00807F).
3. THE Dashboard SHALL usar Tailwind CSS con las variables de color existentes del tema DYLO (dylo-orange-*, dylo-teal-*).
4. IF un color requerido por el diseño no existe en el tema actual, THEN THE Dashboard SHALL extender el tema de Tailwind CSS con la nueva variable de color.
