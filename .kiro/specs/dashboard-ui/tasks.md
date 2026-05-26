# Plan de Implementación: Dashboard UI

## Resumen

Implementación del Dashboard UI de DYLO HR con layout de tres paneles (sidebar colapsable, área principal scrollable, sidebar derecho fijo). Se construye de forma incremental: primero la base (tipos, mocks, store, componentes reutilizables), luego el layout, después el contenido principal, el sidebar derecho, y finalmente la integración y verificación. Todos los datos son mock. Stack: React 19 + TypeScript estricto + Tailwind CSS v4 + Zustand.

## Tareas

- [x] 1. Fundación — Tipos, datos mock, store y componentes reutilizables
  - [x] 1.1 Crear archivo de tipos compartidos del dashboard
    - Crear `src/types/dashboard.types.ts` con todas las interfaces: `RequestCardData`, `NewsSlide`, `WelcomeData`, `ConvenioCategory`, `AttentionAlert`, `CalendarDay`, `AbsenceType`, `AbsentPerson`, `CalendarWeekData`, `UpcomingEvent`, `CelebrationPerson`, `CommercialTool`, `SidebarNavItemData`
    - Exportar todos los tipos para uso en mocks y componentes
    - _Requisitos: 14.3, 14.4_

  - [x] 1.2 Crear archivos de datos mock
    - Crear directorio `src/mocks/dashboard/`
    - Crear `solicitudes.mock.ts` con 3 tarjetas: Vacaciones (7 días), Cita Médica (2 días), Home Office (4 días)
    - Crear `noticias.mock.ts` con 3 slides de noticias
    - Crear `calendario.mock.ts` con datos de semana y personas ausentes
    - Crear `eventos.mock.ts` con lista de próximos eventos
    - Crear `aniversarios.mock.ts` con lista de personas
    - Crear `cumpleanos.mock.ts` con lista de personas
    - Crear `convenios.mock.ts` con 6 categorías: Restaurantes, Cuidado Personal, Mascotas, Entretenimiento, Educación, Salud y Bienestar
    - Crear `herramientas.mock.ts` con Presentaciones y Tarifario
    - Crear `atencion.mock.ts` con alertas de evaluación y solicitud
    - Crear `bienvenida.mock.ts` con datos del empleado
    - Crear `sidebar.mock.ts` con los 9 ítems de navegación
    - Cada archivo importa las interfaces de `dashboard.types.ts` y exporta datos tipados
    - _Requisitos: 14.1, 14.2, 14.3, 14.4_

  - [x] 1.3 Crear store del sidebar (`useSidebarStore`)
    - Crear `src/stores/useSidebarStore.ts` con Zustand
    - Estado: `collapsed: boolean` (default `false`), acción `toggle()`
    - _Requisitos: 2.1, 2.2, 2.3_

  - [x] 1.4 Crear componentes reutilizables UI
    - Crear `src/components/ui/Card.tsx` — contenedor genérico con `className`, `hoverClassName`, `onClick`
    - Crear `src/components/ui/Button.tsx` — botón con variantes `orange` y `teal` usando gradientes DYLO
    - Crear `src/components/ui/Badge.tsx` — etiqueta inline con fondo coloreado
    - Crear `src/components/ui/Avatar.tsx` — círculo con imagen o iniciales como fallback, tamaños `sm`/`md`/`lg`
    - Todos los componentes usan variables de color del tema Tailwind existente (`dylo-orange-*`, `dylo-teal-*`)
    - _Requisitos: 13.1, 13.2, 13.3, 13.4, 15.1, 15.2, 15.3_

  - [ ]* 1.5 Escribir tests unitarios para componentes reutilizables
    - Test: Card renderiza children y aplica className/hoverClassName
    - Test: Button variante `orange` aplica gradiente naranja correcto
    - Test: Button variante `teal` aplica gradiente teal correcto
    - Test: Badge renderiza children con estilos
    - Test: Avatar muestra imagen cuando `src` está presente
    - Test: Avatar muestra iniciales como fallback cuando `src` no está presente
    - _Requisitos: 13.1, 13.2, 13.3, 13.4, 15.1, 15.2_

- [x] 2. Layout — DashboardLayout y Sidebar
  - [x] 2.1 Crear componente DashboardLayout
    - Crear `src/components/dashboard/DashboardLayout.tsx`
    - Implementar CSS Grid de 3 columnas: sidebar (240px/64px) | main (1fr) | right-sidebar (300px)
    - Leer `collapsed` de `useSidebarStore` para ajustar ancho de primera columna
    - Área principal scrollable, sidebar derecho fijo
    - Fondo gris claro para área principal, fondo blanco para sidebar derecho
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 2.2 Crear componente Sidebar
    - Crear `src/components/dashboard/Sidebar.tsx` y `src/components/dashboard/SidebarNavItem.tsx`
    - Fondo `#1a1a1a`, logo DYLO (completo/reducido según estado)
    - Lista de 9 ítems de menú con ícono + texto (o solo ícono en colapsado)
    - Enlace "Universidad DYLO" con ícono naranja
    - Footer con íconos sociales (info, instagram, youtube)
    - Botón "Ocultar" / ícono hamburguesa para toggle usando `useSidebarStore.toggle()`
    - Animación suave de transición de ancho con Tailwind `transition-all duration-300`
    - Importar datos de navegación desde `sidebar.mock.ts`
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 2.3 Escribir tests unitarios para Layout y Sidebar
    - Test: DashboardLayout renderiza 3 paneles (sidebar, main, right)
    - Test: Sidebar muestra los 9 ítems de menú
    - Test: Sidebar toggle: expandido → colapsado → expandido
    - _Requisitos: 1.1, 2.1, 2.2, 2.3, 2.4_

- [x] 3. Checkpoint — Verificar fundación y layout
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Contenido principal — WelcomeHeader, RequestCards, NewsCarousel, WelcomeBar, ConveniosGrid
  - [x] 4.1 Crear componente WelcomeHeader
    - Crear `src/components/dashboard/WelcomeHeader.tsx`
    - Mostrar "Bienvenido, [Nombre] 👋" obteniendo nombre del `useAuthStore`
    - Mostrar etiqueta "Solicitudes" con enlace "Ver más >" en color naranja
    - _Requisitos: 3.1, 3.2_

  - [x] 4.2 Crear componente RequestCards
    - Crear `src/components/dashboard/RequestCards.tsx`
    - Renderizar 3 tarjetas en fila usando componente `Card`
    - Cada tarjeta: fondo `#F6F6F6`, ícono SVG inline, label, sublabel, count en texto naranja
    - Hover: fondo cambia a `#E7E7E7`
    - Importar datos desde `solicitudes.mock.ts`
    - _Requisitos: 3.3, 3.4, 3.5, 3.6_

  - [ ]* 4.3 Escribir test de propiedad para RequestCard
    - **Propiedad 1: RequestCard muestra datos correctamente**
    - Para cualquier `RequestCardData` válido con label y count arbitrarios, el componente debe mostrar el label y el count en el DOM
    - **Valida: Requisito 3.4**

  - [x] 4.4 Crear componente NewsCarousel
    - Crear `src/components/dashboard/NewsCarousel.tsx`
    - Borde naranja punteado, ancho completo
    - Estado local `activeIndex` con `useState`
    - Slides con `transform: translateX(-activeIndex * 100%)` y `transition-transform duration-300`
    - Cada slide muestra título, texto e imagen
    - Puntos de paginación en la parte inferior, click cambia `activeIndex`
    - Clampear índice a `[0, slides.length - 1]`
    - Importar datos desde `noticias.mock.ts`
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 4.5 Escribir tests de propiedad para NewsCarousel
    - **Propiedad 2: NewsSlide muestra título, contenido e imagen**
    - Para cualquier `NewsSlide` válido, el slide debe contener título, contenido y un `<img>` con el src correcto
    - **Valida: Requisito 5.2**
    - **Propiedad 3: Cantidad de puntos de paginación igual a cantidad de slides**
    - Para cualquier array de `NewsSlide[]` de longitud N ≥ 1, los puntos de paginación deben ser exactamente N
    - **Valida: Requisito 5.3**
    - **Propiedad 4: Navegación del carrusel por punto de paginación**
    - Para cualquier array de longitud N y cualquier índice i en [0, N), click en punto i activa slide i
    - **Valida: Requisito 5.4**

  - [x] 4.6 Crear componente WelcomeBar
    - Crear `src/components/dashboard/WelcomeBar.tsx`
    - Barra "Bienvenidos" con ícono de ola
    - Mostrar nombre del empleado y badge con rol usando componente `Badge`
    - Importar datos desde `bienvenida.mock.ts`
    - _Requisitos: 6.1, 6.2, 6.3_

  - [ ]* 4.7 Escribir test de propiedad para WelcomeBar
    - **Propiedad 5: WelcomeBar muestra nombre y rol**
    - Para cualquier `WelcomeData` válido con nombre y rol arbitrarios, el componente debe mostrar el nombre y el rol dentro de un badge
    - **Valida: Requisito 6.2**

  - [x] 4.8 Crear componentes ConveniosGrid y ConvenioCard
    - Crear `src/components/dashboard/ConveniosGrid.tsx` y `src/components/dashboard/ConvenioCard.tsx`
    - Sección "Convenios" con ícono de checkmark y subtítulo "¡Descubre los convenios que tenemos para ti!"
    - Grilla 3 columnas × 2 filas
    - Cada `ConvenioCard`: imagen de fondo, overlay gradiente oscuro al 73% opacidad, texto blanco
    - Hover: overlay al 100% opacidad
    - Fallback de color sólido si imagen no carga (`onError`)
    - Importar datos desde `convenios.mock.ts`
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 4.9 Escribir test de propiedad para ConvenioCard
    - **Propiedad 6: ConvenioCard muestra nombre de categoría**
    - Para cualquier `ConvenioCategory` válido con nombre arbitrario, el componente debe mostrar el nombre de la categoría
    - **Valida: Requisito 7.3**

  - [x] 4.10 Crear componente TopBar
    - Crear `src/components/dashboard/TopBar.tsx`
    - Botón "Checar entrada" con gradiente teal usando componente `Button` variante `teal`
    - Íconos de toggle modo oscuro, campana de notificaciones, ícono de ayuda
    - _Requisitos: 4.1, 4.2, 4.3_

- [x] 5. Checkpoint — Verificar contenido principal
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Sidebar derecho — Widgets
  - [x] 6.1 Crear componente RightSidebar
    - Crear `src/components/dashboard/RightSidebar.tsx`
    - Contenedor con fondo blanco que agrupa todos los widgets del sidebar derecho
    - _Requisitos: 1.4_

  - [x] 6.2 Crear componente AttentionWidget
    - Crear `src/components/dashboard/AttentionWidget.tsx`
    - Sección "Atención" con alertas: "Evaluación pendiente — vence hoy" y "Solicitud en revisión"
    - Cada alerta con enlace naranja "Ver >"
    - Importar datos desde `atencion.mock.ts`
    - _Requisitos: 8.1, 8.2, 8.3, 8.4_

  - [x] 6.3 Crear componente CalendarWidget
    - Crear `src/components/dashboard/CalendarWidget.tsx`
    - Header: mes/año + flechas de navegación para cambiar semana
    - Grilla 7 columnas (Lun-Dom) con fechas
    - Día actual resaltado con `bg-dylo-orange rounded-full`
    - Pestañas de filtro: Vacaciones (activa en naranja), Home Office, Incapacidad
    - Lista de avatares de personas ausentes filtradas por tipo + conteo
    - Importar datos desde `calendario.mock.ts`
    - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 6.4 Escribir tests de propiedad para CalendarWidget
    - **Propiedad 7: CalendarWidget renderiza datos de la semana completa**
    - Para cualquier `CalendarWeekData` con monthYear y 7 `CalendarDay`, el widget debe mostrar monthYear y las 7 fechas
    - **Valida: Requisitos 9.1, 9.2**
    - **Propiedad 8: CalendarWidget resalta el día actual**
    - Para cualquier `CalendarWeekData` donde exactamente un día tiene `isToday=true`, solo ese día debe tener la clase de resaltado naranja
    - **Valida: Requisito 9.3**
    - **Propiedad 9: Filtro del calendario muestra conteo correcto de ausentes**
    - Para cualquier array de `AbsentPerson[]` con tipos mixtos y cualquier `AbsenceType` como filtro, el conteo mostrado debe igualar la cantidad de personas con ese tipo
    - **Valida: Requisito 9.5**

  - [x] 6.5 Crear componente EventsWidget
    - Crear `src/components/dashboard/EventsWidget.tsx`
    - Sección "Próximos eventos" con íconos de checkmark
    - Lista de eventos en formato "DD Mes — Nombre del evento"
    - Botón "Ver calendario completo >" con gradiente naranja usando componente `Button`
    - Importar datos desde `eventos.mock.ts`
    - _Requisitos: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 6.6 Escribir test de propiedad para EventsWidget
    - **Propiedad 10: Eventos se muestran en formato correcto**
    - Para cualquier `UpcomingEvent` con day, month y name arbitrarios, el output debe contener "{day} {month} — {name}"
    - **Valida: Requisito 10.2**

  - [x] 6.7 Crear componentes AnniversariesWidget y BirthdaysWidget
    - Crear `src/components/dashboard/AnniversariesWidget.tsx` — sección "Aniversarios" con ícono de fiesta, nombres separados por "|"
    - Crear `src/components/dashboard/BirthdaysWidget.tsx` — sección "Cumpleaños" con ícono de pastel, nombres separados por "|"
    - Importar datos desde `aniversarios.mock.ts` y `cumpleanos.mock.ts`
    - _Requisitos: 11.1, 11.2, 11.3_

  - [ ]* 6.8 Escribir test de propiedad para Aniversarios/Cumpleaños
    - **Propiedad 11: Nombres de celebraciones se unen con separador**
    - Para cualquier array de `CelebrationPerson[]` de longitud N ≥ 1, los nombres deben aparecer unidos por "|"
    - **Valida: Requisitos 11.1, 11.2**

  - [x] 6.9 Crear componente ToolsWidget
    - Crear `src/components/dashboard/ToolsWidget.tsx`
    - Sección "Herramientas comerciales" con dos botones con ícono: "Presentaciones" y "Tarifario"
    - Usar componente `Button` para los botones
    - Importar datos desde `herramientas.mock.ts`
    - _Requisitos: 12.1, 12.2_

- [x] 7. Checkpoint — Verificar sidebar derecho
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Integración — Reemplazar DashboardPage y actualizar rutas
  - [x] 8.1 Reemplazar DashboardPage con el nuevo dashboard
    - Modificar `src/pages/DashboardPage.tsx` para usar `DashboardLayout`
    - Componer dentro del layout: `Sidebar`, área principal (WelcomeHeader, TopBar, RequestCards, NewsCarousel, WelcomeBar, ConveniosGrid), `RightSidebar`
    - Mantener la integración con `useAuthStore` para el nombre del usuario
    - Eliminar el contenido placeholder actual
    - _Requisitos: 1.1, 3.1_

  - [x] 8.2 Verificar integración con rutas existentes
    - Confirmar que `AppRouter.tsx` sigue funcionando con la nueva `DashboardPage`
    - Confirmar que `ProtectedRoute` protege correctamente el dashboard
    - No se requieren cambios en las rutas (la ruta `/dashboard` ya existe)
    - _Requisitos: 1.1_

  - [ ]* 8.3 Escribir tests de integración
    - Test: DashboardPage renderiza el layout completo con los 3 paneles
    - Test: Nombre del usuario del auth store aparece en WelcomeHeader
    - Test: Sidebar toggle funciona end-to-end dentro del DashboardLayout
    - _Requisitos: 1.1, 2.1, 3.1_

- [x] 9. Checkpoint final — Verificación completa
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Carrusel de Bienvenida — WelcomeBar con rotación automática y navegación
  - [x] 10.1 Actualizar mock de bienvenida a array
    - Modificar `src/mocks/dashboard/bienvenida.mock.ts` para exportar `bienvenidaMock` como `WelcomeData[]` (array) en lugar de un objeto único
    - Incluir al menos 3 entradas de ejemplo con nombres y roles distintos
    - _Requisitos: 6.9_

  - [x] 10.2 Refactorizar WelcomeBar como carrusel
    - Modificar `src/components/dashboard/WelcomeBar.tsx`
    - Agregar `useState<number>` para `activeIndex` (default 0)
    - Agregar `useState<boolean>` para `isPaused` (default false)
    - Agregar `useRef` para `pauseTimeoutRef` (timeout de pausa)
    - Implementar `useEffect` con `setInterval` para auto-rotación cada 4 segundos: `setActiveIndex((prev) => (prev + 1) % data.length)`
    - Limpiar interval en cleanup del useEffect
    - No iniciar interval si `data.length <= 1`
    - Renderizar solo la entrada en `data[activeIndex]`: nombre + Badge con rol
    - _Requisitos: 6.2, 6.3_

  - [x] 10.3 Agregar flechas de navegación con lógica circular
    - Agregar botones de flecha izquierda (`LuChevronLeft`) y derecha (`LuChevronRight`) a los lados de la zona de contenido
    - Handler flecha derecha: `setActiveIndex((prev) => (prev + 1) % data.length)`
    - Handler flecha izquierda: `setActiveIndex((prev) => (prev - 1 + data.length) % data.length)`
    - Ocultar flechas cuando `data.length <= 1` (fallback estático)
    - _Requisitos: 6.4, 6.5, 6.6, 6.8_

  - [x] 10.4 Implementar pausa de auto-rotación tras interacción manual
    - Al hacer clic en cualquier flecha, llamar `pauseAutoRotation()`
    - `pauseAutoRotation`: setIsPaused(true), limpiar timeout previo, crear nuevo timeout de 8 segundos que ejecuta setIsPaused(false)
    - El useEffect de auto-rotación debe respetar `isPaused` (no avanzar mientras está pausado)
    - Limpiar timeout en cleanup del componente
    - _Requisitos: 6.7_

  - [ ]* 10.5 Escribir test de propiedad para WelcomeBar carrusel — entrada única visible
    - **Propiedad 5: WelcomeBar carrusel muestra una entrada a la vez**
    - Para cualquier array de `WelcomeData[]` de longitud N ≥ 1 y cualquier índice activo i, el componente debe mostrar exactamente el nombre y rol de la entrada i
    - **Valida: Requisito 6.2**

  - [ ]* 10.6 Escribir test de propiedad para navegación circular
    - **Propiedad 12: Navegación circular del carrusel de bienvenida**
    - Para cualquier array de `WelcomeData[]` de longitud N ≥ 2 y cualquier índice i, clic derecha → (i+1)%N, clic izquierda → (i-1+N)%N
    - **Valida: Requisitos 6.4, 6.5, 6.6**

  - [ ]* 10.7 Escribir test de propiedad para auto-rotación
    - **Propiedad 13: Auto-rotación del carrusel de bienvenida avanza el índice**
    - Para cualquier array de longitud N ≥ 2 y cualquier índice i, después de 4s sin interacción, el índice debe ser (i+1)%N
    - Usar `vi.useFakeTimers()` y `vi.advanceTimersByTime(4000)`
    - **Valida: Requisito 6.3**

  - [ ]* 10.8 Escribir tests unitarios para WelcomeBar edge cases
    - Test: Con una sola entrada, no se renderizan flechas de navegación (Req 6.8)
    - Test: Tras clic en flecha, auto-rotación se pausa 8s y luego reanuda (Req 6.7)
    - Test: Con array vacío, la barra no se renderiza

- [x] 11. Carrusel Horizontal — MarqueeText para Aniversarios y Cumpleaños
  - [x] 11.1 Crear componente reutilizable MarqueeText
    - Crear `src/components/ui/MarqueeText.tsx`
    - Props: `children: React.ReactNode`, `className?: string`, `speed?: number` (default 10s)
    - Usar `useRef` para contenedor y contenido interno
    - Usar `useState<boolean>` para `isOverflowing` (default false)
    - Usar `useEffect` que compara `contentRef.scrollWidth > containerRef.clientWidth` y actualiza `isOverflowing`
    - Cuando `isOverflowing=true`: duplicar el contenido (renderizar children dos veces) dentro de un wrapper con `animation: marquee {speed}s linear infinite`
    - Definir `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }` como estilo inline o clase CSS
    - En hover: aplicar `animation-play-state: paused` (via clase `hover:[animation-play-state:paused]` o inline style)
    - Cuando `isOverflowing=false`: renderizar children estáticamente sin animación
    - Contenedor con `overflow: hidden` y `white-space: nowrap`
    - _Requisitos: 11.5, 11.6, 11.7, 11.8_

  - [x] 11.2 Refactorizar AnniversariesWidget para usar MarqueeText
    - Modificar `src/components/dashboard/AnniversariesWidget.tsx`
    - Envolver la lista de nombres (separados por "|") dentro de `<MarqueeText>`
    - Mantener la estructura visual existente (encabezado con ícono de fiesta)
    - _Requisitos: 11.1, 11.3_

  - [x] 11.3 Refactorizar BirthdaysWidget para usar MarqueeText
    - Modificar `src/components/dashboard/BirthdaysWidget.tsx`
    - Envolver la lista de nombres (separados por "|") dentro de `<MarqueeText>`
    - Mantener la estructura visual existente (encabezado con ícono de pastel)
    - _Requisitos: 11.2, 11.4_

  - [ ]* 11.4 Escribir tests unitarios para MarqueeText
    - Test: Cuando contenido cabe en contenedor, no aplica animación (Req 11.8)
    - Test: Cuando contenido excede contenedor, aplica clase/estilo de animación marquee (Req 11.3, 11.5)
    - Test: En hover, animation-play-state es paused (Req 11.6)
    - Nota: Requiere mockear `scrollWidth` y `clientWidth` en los refs del DOM

- [x] 12. Checkpoint — Verificación de carruseles
  - Verificar que WelcomeBar rota automáticamente entre entradas
  - Verificar que flechas navegan circularmente
  - Verificar que pausa funciona tras interacción manual
  - Verificar que MarqueeText activa animación solo cuando hay overflow
  - Verificar que hover pausa el marquee
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los tests de propiedad validan propiedades universales de correctitud (13 propiedades del diseño)
- Los tests unitarios validan ejemplos específicos y casos borde
- Librería PBT: fast-check (requiere instalación como devDependency junto con vitest, @testing-library/react, @testing-library/jest-dom, jsdom)
