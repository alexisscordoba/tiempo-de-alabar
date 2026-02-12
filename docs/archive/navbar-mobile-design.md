# Concepto y Comportamiento: Navbar Mobile
Para que el navbar sea accesible, se deben aplicar estas instrucciones solo cuando un usuario está usando un dispositivo mobile o si las dimenciones de la pantalla son muy pequeñas.

Este documento describe la experiencia visual y funcional del sistema de navegación para dispositivos móviles.
El diseño está formado por un sistema de "pastillas flotantes o pildoras" que se transforman dinámicamente según la interacción del usuario.

## 1. La Identidad Visual: El Diseño de "Pastillas/pildoras"
El navbar se compone de dos elementos independientes que flotan en la parte superior:

A la izquierda: Una pastilla pequeña que contiene la identidad (Logo circular), o muta hacia la derecha formando una pildora y contiene el logo + Texto "Alabar".
Estado 1: Modo compacto
( ♫ )
Estado 2: Modo extendido
( ♫ ) ---> ( ( ♫ ) Alabar )

A la derecha: Una pastilla pequeña que contiene el botón menú (icono tipo hamburguesa) y que muta hacia la izquierda formando una pildora que contiene botón menú (☰) + botón play (►).
Estado 1: Modo compacto
( ☰ )
Estado 2: Modo extendido
( ( ► ) ☰ ) <--- ( ☰ ) 

Ambas comparten un efecto de "vidrio esmerilado" (glassmorphism). Esto significa que son traslúcidas, permitiendo ver colores borrosos del fondo, lo que da una sensación de profundidad y ligereza.

## 2. Estados de la Pastilla Derecha (Morphing)
La pastilla de la derecha no es estática, cambia de forma orgánicamente:

- Modo Compacto: Se ve como un círculo pequeño con el icono de menú, tres lineas tipo hamburguesa (☰). Se usa cuando el usuario está concentrado leyendo el contenido.
- Modo Extendido: La pastilla se alarga horizontalmente y se convierte en una pildora, y revela un botón de "Play" rápido a la derecha del menú. Es el estado ideal para invitar a la acción sin estorbar.
- Modo menú Desplegado: Al tocar el botón de menú, la pastilla se expande hacia abajo y hacia la izquierda, convirtiéndose en un panel rectangular que contiene los enlaces de navegación, y abajo, mas pequeño, los iconos de las redes sociales. El botón de menú (☰) se transforma en (X), al hacer clic vuelve a su estado anterior.

Estado 3: Modo menú desplegado
    <--- ( ☰ )
           |
           V
┌───────────────┐
|           (X) |
| INICIO        |
| ACERCA DE     |
| MÚSICA        |
| AGENDA        |
| CONTACTO      |
|  ________     |
| 🎵 📺 📷    |
└───────────────┘

## 3. Inteligencia de Movimiento (Scroll)

El navbar es consciente de lo que hace el usuario. Para evitar que la interfaz sea "nerviosa", implementamos una lógica de intención:

No reacciona a movimientos mínimos: Si el usuario mueve la pantalla apenas unos píxeles, el navbar no cambia. Necesita detectar un movimiento claro (hacia abajo para esconderse, hacia arriba para reaparecer).
Acompaña la lectura: Si el usuario está bajando la página de forma decidida, el botón de "Play" se esconde suavemente para dejar más espacio libre. Si el usuario sube un poco (señal de que busca navegación), el botón vuelve a aparecer.

## 4. La Experiencia del Menú Abierto
Cuando el usuario decide abrir el menú, el comportamiento es sutil y humano:
Aparición en Cascada: Los enlaces (Inicio, Música, etc.) no aparecen de golpe. Entran uno tras otro con un retraso mínimo, creando un efecto visual de flujo natural.
Cierre por Desinterés: Si el menú está abierto y el usuario decide simplemente seguir haciendo scroll hacia abajo para leer más, el menú entiende que ya no es necesario y se retrae solo después de que la pantalla se ha movido un trecho considerable.
Clic Exterior: Si el usuario toca cualquier parte de la pantalla que esté fuera del menú, este se cierra inmediatamente, respetando la intuición de navegación moderna.

## 5. Sensación Orgánica (Animaciones)
La clave de este navbar no es solo qué hace, sino cómo lo hace. Las animaciones no son lineales ni rígidas:
Tienen un ligero efecto elástico. Cuando algo se expande o se mueve, lo hace con una curva que tiene un pequeño rebote al final, lo que le da una personalidad viva y tecnológica.
Al accionar el botón "menú", Todo el contenido de la pastilla izquierda coordinadamente se desplaza a la izquierda y desaparece.
Notas para la Implementación