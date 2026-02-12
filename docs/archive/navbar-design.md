# NAVBAR DESIGN
El diseño del navbar está separado en dos estados: 
* Inicial (hero, fondo transparente)
* Scrolled (sticky, fondo claro)

---

### 1. Estructura y Layout (Común a ambos estados)

* **Distribución:** Utiliza un modelo de **Flexbox** (`justify-content: space-between`) para dividir el navbar en tres áreas claras:
* **Izquierda (Branding):** Logo compuesto por un isotipo (icono de nota musical en un contenedor redondeado) y el nombre "Alabar" en tipografía sans-serif de peso grueso.
* **Centro (Navegación):** Un menú tipo "píldora" que agrupa los enlaces principales.
* **Derecha (Acción/CTA):** Un botón de acción circular flotante con un icono de *play*.


* **Forma:** Ambos estados utilizan bordes altamente redondeados (`border-radius: 50px` o superior), lo que le da un aspecto orgánico y suave.

### 2. Estado Inicial (Hero / Transparente)

Este estado está diseñado para no competir visualmente con la imagen o video principal del encabezado.

* **Fondo:** Completamente transparente (`background: transparent`).
* **Navegación Central:** Los enlaces están contenidos en una cápsula con un **borde fino** (probablemente `1px solid rgba(255,255,255,0.3)`) para dar estructura sin añadir peso visual.
* **Tipografía:** Color blanco para maximizar el contraste sobre fondos oscuros o con imágenes de alto contraste.
* **Efecto Visual:** El logo y el botón de acción parecen "flotar" sobre el contenido.

### 3. Estado "Scrolled" (Sticky / Fondo Claro)

Cuando el usuario hace scroll, el navbar transiciona a una versión más funcional y legible sobre contenido variable.

* **Fondo:** Blanco o gris muy claro con **opacidad reducida** (aprox. `rgba(255, 255, 255, 0.8)`).
* **Backdrop Filter:** Es muy probable que aplique un `backdrop-filter: blur(10px)` para desenfocar lo que pasa por debajo, manteniendo la legibilidad de los textos.
* **Tipografía:** Cambia a un tono oscuro (gris carbón o azul marino muy oscuro) para mantener el contraste.
* **Contenedor Central:** El menú central pierde el borde fino y se asienta sobre un fondo ligeramente más oscuro o con una sombra interna sutil para diferenciarse de la base del navbar.

---

### Detalles Técnicos de UI

| Elemento | Descripción |
| --- | --- |
| **Tipografía** | Sans-serif geométrica, en mayúsculas (Uppercase) para los links, con espaciado entre letras (*letter-spacing*) para mejorar la legibilidad. |
| **Paleta de Colores** | Teal/Cian (en el botón y punto del logo), Blanco y Escala de grises profunda. |
| **Botón Play** | Círculo con gradiente sutil o color sólido Teal, con un icono de triángulo blanco centrado. |
| **Transición** | El cambio entre ambos estados suele implementarse con `transition: all 0.3s ease-in-out` en CSS para que el cambio de color y fondo sea fluido. |

> **Nota de diseño:** El uso de una "píldora dentro de otra píldora" para el menú central es un recurso visual excelente para jerarquizar la navegación sin necesidad de usar divisores verticales o iconos extra.