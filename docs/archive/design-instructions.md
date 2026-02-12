# Website of: Tiempo de Alabar
## Design instructions directives
Modern, elegant, and youthful website for the Adventist Christian music band “Tiempo de Alabar.”
The site convey freshness, spirituality, and dynamism.

## Main objectives of the site
1. Showcase the band's music and let people know who we are.
2. Present our event schedule.
3. Offer resources for worship.

## About design

### Sensations
* Modern, elegant, simple, and youthful style
* Responsive design optimized for mobile devices
* Glass transparency, glow, gradients
* Clear and adaptable typography

### Color
* Primary #3e8d8b
* Secondary #40506d
* Accent #d8c8e1
* Neutrals #f3f4f7, #f5f7f9

### Animations
* Small movements when hovering over containers
* Buttons that gradually glow up on hover
* Loading effects when scrolling (fade-in, slide-in)
* Smooth transitions between sections

## Core Architecture

### Pages 
#### Primary Navigation
* "Inicio" [/]
* "Acerca de"[/acerca-de]
* "Música" [/musica]
* "Agenda" [/agenda]
* "Contacto" [/contacto]
#### Secondary Navigation
* "Apoyo" [/apoyo]
* "Organizar un evento" [/organizar]
* "Historial de eventos" [/historial-eventos]
#### Landing page
* "Bio/Streaming" [/bio]

### Components
#### Navbar: Fixed at the top, on all pages.
* Left zone: logo.
* Center zone: links to each primary navigation pages 
    * "Inicio"
    * "Acerca de"
    * "Música"
    * "Agenda"
    * "Contacto"
* Right zone: play icon button 
    * When clic on play button:
        * Open a full screen modal to choose a streaming platform
        * Title: "Escucha nuestra música en tu plataforma preferida"

#### Footer: at end of scroll, on all pages.
* Quick links to each primary navigation pages
    * "Inicio"
    * "Acerca de"
    * "Música"
    * "Agenda"
    * "Contacto"
* Social media links
* Credits
* Button text: "Apoyar a Tiempo de Alabar"
    * When hover: shows a heart icon
    * When clic: Redirects to "/apoyo"
* Button text: "Organizar un evento"
    * When hover: shows a gear icon (with subtle rotation animation)
    * When clic: Redirects to "/organizar"

## Development for each page

### "Inicio": Home page
#### Hero section
* Video or background image with gradient overlay
* Title text: "No importa dónde estés"
* Subtitle text: "es Tiempo de Alabar."
* Main CTA button: Play icon, and text "Nuestra música" → navigates to /musica
* Secondary CTA button: Calendar icon, "Ver agenda" → navigates to /agenda
#### Inspirational section
Block with a Bible verse or inspirational quote text.
#### Featured section
* Block or container with a new release
* Block or container with the next show
#### Streaming section
List Icons/buttons for direct access to streaming platforms.

### "Acerca de": About page with history, members and timeline
#### Hero section
* Background photo with gradient on top
* Main title: "¿Quienes somos?"
* Secondary title: short description of the band
#### About section
* Full description text
* History text
* List of goals and challenges
* Photo gallery carousel
#### Members section
Grid with active band members in containers
* Profile photo (aspect-ratio 2:3, object-fill cover)
* Text name, aligned bottom left, with a gradient, for easy reading
When hover a member container:
* Subtle zoom-in on profile photo
* The name text slides-up to make space
* Below of the name slides-up
    * Icon representing their role (guitar, piano, mic, drums, etc)
    * Short bio text
    * Button "ver más"
        * When clic button "ver más", darks or blur and open a modal with:
            * Left (On mobile: top): Main profile photo
            * Right (On mobile: bottom):
                * Name text
                * Icon for their role: guitar, piano, mic, drums, etc.
                * Full bio text
                * Button icons for social media links
                * Photo gallery carousel
            * Top right corner: X button to close modal (If the user clicks outside the modal, it closes)
At the end of the member grid
* Button: "Ver los miembros anteriores" 
    * When clic:
        * Refresh grid and show only inactive members
        * A left arrow button appers on top, to go back to active members
#### Timeline section
Important milestones in the band's history are displayed on a vertical timeline
* Cards containers with:
    * Year
    * Milestone title
When clic on container, open modal and reveal:
* Short description text
* Photo cover image
* Button "Ver más", when clic redirects to a specific milestone sub page
#### Event history section
* Button text: "Historial de eventos"
    * Redirects to "Historial de eventos" page

### "Música": Music page, grid list of songs
#### Hero section
* Background image with gradient and title: "Nuestra música".
#### Music section
Grid of songs with song cover art on containers
* Aspect-ratio 1:1
* Object-fill cover
When hovering over a song:
* Black gradient appers
* Slide-up main text, name song, aligned at the bottom left
* Below of name song, show a Play icon button 
    * When clic on button → darks or blur and open a modal with:
        * Left: Cover art song
        * Right: Streaming options
            * Below, "Ver más" button → link to the individual song page
        * Top right corner: X button to close modal (If the user clicks outside the modal, it closes)
* On right side of the play button, "Ver más" button → link to the individual song page

### "Musica" / [Name of song page]: Individual page of each song
#### Hero section
* Background: A color gradient that matches the cover art
* Left side: Song cover art image
* Right side of cover art:
    * Title of the song, with bold tipography
    * On top of the title: small text with song year
#### Play section
* Text "Escucha ahora"
* Play button: when clic reveals:
    * Streaming options buttons
    * Video clip embedded from youtube
    * Show a discrete button to hide

#### Song data section
Container that shows data of the song, with icons
* Music composer
* Lyrics composer
* Key
* Tempo
* Time signature
* Duration

#### Lyrics and chords section
Displays lyrics and chords with interactive buttons
* Main container to show lyrics and chords
* Toolbox with buttons
    * Button switch to choose show only lyrics, or lyrics with chords
        * If show chords is on: Appers buttons to transpose chord keys
    * Buttons to increase/decrease font size
    * Fullscreen button: when clic show main container in full screen
        * Should adapt to any screen
        * Maintain the toolbox configuration
        * Top right corner: X button to close fullscreen mode

#### Resources section
Shows buttons to download each resource, organized into three areas.
Only resources that are available for download should be displayed.
###### Area "Musical"
* Tutorial (Youtube video)
* Partitura (PDF file)
* Letras y acordes (PDF file)
* ChordPro (file)
###### Area "Audiovisual"
* Pista instrumental (mp3 or wav file)
* Multipista (zip with mp3 or wav files)
* Presentacion PPT (ppt file)
* ProPresenter (file)
* FreeShow (show file)
###### Area "Inspiración"
* Descripción (Song description text)
* Referencias bíblicas (bible reference text)
* Historia (song history text)
* Etiquetas (grouped song tags)

### "Agenda": Schedule page
#### Hero section
* Background Photo with gradient
* Main title "Próximos eventos"

#### Events section
List of events in containers
* Image event cover
* name of the event
* date
* "+" button to show details
    * When hover: "+" button extends and show text "Ver detalles"
        * When clicked → animated modal with:
            * Cover image
            * Main text: event name
            * Secondary text with icons
                * date
                * End date
                * time
                * Location
                * Address
            * Map visualizer an link to google maps
            * Description of the event
            * Event guest list
            * Setlist (list of songs)
            * Small photo gallery carousel
            * Info about pricing
            * Main button to reserve a place
            * Secondary button to download promotional material
            * Top right corner: X button to close modal (If the user clicks outside the modal, it closes)
#### Event history and organize an event section
* Button text: "Historial de eventos"
    * Redirects to "/historial-eventos"
* Card "Organizar evento": Card with text + subtle rotating gear icon
    * Redirects to "/organizar"

### "Contacto": Contact page details
Left side:
* Title: "Contactanos"
* Subtitle: "Organicemos un concierto juntos. Estamos aquí para hacer un momento especial de adoración."
* Background: Solid color with gradient

Top right side:
* Contact information with icons
    * Phone
    * Email
    * Location
* Button to:
    * WhatsApp
    * Telegram
Bottom right side
* Contact form: name, email, phone number, event date, location, and message
* Button to send
* Confirmation of submission with a thank you message

### "Apoyo": Support/Donations page details [/apoyo]
#### Hero Section
* Background: image with a dark gradient to ensure text contrast.
* Main Title: "Tu ayuda"
* Subtitle: "Puede hacer la diferencia"
#### Allocation Section
A grid of cards explaining how the funds are used.
Style: Apply glassmorphism (blur and transparency) to the cards with accent border

#### Ways to Collaborate section
A visual list of the different ways to support the ministry.
Interaction: Use small motion animations or a "glow up" effect when hovering over each category

#### Monetary Donation Methods
* Primary button: Mercado Pago Link
* Secondary button: PayPal link
* Bank Transfer Information: A dedicated information block with a clean layout
    * CBU: with a prominent "Copiar" (Copy) button.
    * Alias: with a prominent "Copiar" (Copy) button.
    * Account Holder: Show account holder information.

#### Gratitude Section
Text: "Muchas gracias por colaborar" Centered, stylized text.
Feature Image: Display the group photo with rounded corners (large radius) and a soft glow effect.

### "Organizar un evento": Event planner page details [/organizar]
#### Hero Section
* Background: Image with a gradient to ensure text contrast.
* Title text: "Organicemos un evento juntos"
* Subtitle text: "Todos los detalles que tenés que saber"

#### Introduction Band Info
Layout: Two-column split.
* Left Side: Display the featured image with rounded corners and a soft "glow" effect.
* Right Side: 
    * Group Detail: Highlight total people/staff inside a stylized badge using the Accent color
    * Description: Featured text
#### Technical Rider
Stageplot & Inputs

##### Stageplot Visualization:
* Display the image of stageplot
* Button text: "Descargar PDF"
##### Input List: 
* Create a technical table or numbered list to display items list
    * Clean rows with alternating neutral backgrounds
    * On mobile devices: should collapse into expandable "Accordions"

#### Logistics Requirements
* General Needs: A checklist-style section showing items
* Backline Provided: Use a "What we bring" card to list items
    * Small horizontal slider or carousel images
* Backline Required: 
    * Text: "Que necesitamos del organizador" 
    * Listing items
    * Use an info icon for these items

### "Historial de eventos": Event history page details
#### Hero Section
* Background: A carousel of featured images
* Main Title: "Momentos Vividos"
* Subtitle: "Un recorrido por los lugares donde hemos compartido con vos"

#### Filtering Navigation
* Search/Filter Bar: Allow users to filter the history by event name.
    * Style: Minimalist search bar with a border and glassmorphism effect.
* Buttons to select a year

#### Past Events Grid
Display all archived events in a grid.
* Ordering: Sort by date in descending order (most recent first).
* Grid Layout: 3-column grid for desktop, 1-column for mobile.

#### Event Card Design (History version)
* Cover Image container
    * Image fills the container
    * Apply a grayscale filter 
        * When hover:
            * Image turns into color.
            * Image subtle zoom-in
            * Date Badge shows-up: small on the right op corner, with the year and month.
        * When clic: open a modal with:
            * Cover image
            * Main text: event name in bold 
            * Display event date and location with a small location icon.
            * Type Tag: A small pill-shaped label showing event type
            * text: event description
            * Event guest list
            * main section: photo gallery or slider
            * Top right corner: X button to close modal
                * If the user clicks outside the modal, it closes