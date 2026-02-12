# Website of: Tiempo de Alabar
## Content Structure Directive: Event & Setlist System

### 1. Architectural Philosophy: "Event as a Single Container"
To optimize performance and administrative ease, the Event functions as an autonomous object. All information required to render the schedule page and its details (modals) must reside within the event file itself. The use of external relational tables for song lists is avoided to maintain a "Single Source of Truth."

### 2. The setlist Field Definition
Within each event, there is a collection of objects called a setlist. This list is hybrid, allowing for the integration of songs from the internal database or independent text entries.

#### Setlist Object Structure:
Each item in the setlist contains:

* song_id (Optional): A technical reference (slug or ID) to an existing file in the songs collection.
* custom_name (Optional): A free-text field.
* order (Automatic): The position defined by the administrator within the CMS interface.

### Processing Rules (Business Logic):
* Full Link: If song_id exists and custom_name is empty, the system automatically pulls the official title, musical key, and worship resources from the linked song.

* Override (Alias): If song_id exists and custom_name contains text, the system displays the custom_name in the list but maintains the link to the original song's chords/lyrics.

* Manual Entry: If song_id is null and custom_name contains text, it is rendered as a plain text item (ideal for covers, prayer moments, or special guests).

### 3. Publication States and Visibility
The lifecycle of an event is managed via the event_status field. Astro will filter and render components based on this state:

* draft: The event is ignored by the static site generator. It is not visible on the web.

* upcoming: The event is visible in the general schedule list. It only displays basic data (Date, Location, Title). The "View Details" button is disabled.

* scheduled: The event is fully visible. Access to the detailed modal is enabled, including the description, photo gallery, and the Setlist.

* sold_out: Similar to scheduled, but the booking/ticket links are disabled and a warning label is displayed.

* canceled: The event remains visible to inform the public but features an alert visual style and no interaction options.

### 4. Administrative Workflow
The CMS workflow is designed to be incremental:

* Initial Phase: Create the event in draft state with a confirmed date and location.

* Announcement Phase: Change to upcoming state to generate awareness on the timeline.

* Finalization Phase: Load the setlist (selecting songs or typing them manually), complete details, and change the state to scheduled.

* Sync: Upon saving, a Markdown file with YAML Front Matter is generated, which Astro uses to atomically rebuild the schedule section.

### 5. Data Structure Example (YAML Front Matter)
```yaml
title: "Concert of Hope"
date: 2026-03-21
event_status: "scheduled"
location: "Central Auditorium"
setlist:
  - song_id: "gracias"
    custom_name: "" # Displays official title
  - song_id: "creacion-perfecta"
    custom_name: "Creation (Acoustic Version)" # Displays alias
  - song_id: null
    custom_name: "Opening Hymn (Cover)" # Manual entry
```

This directive ensures the site is easy to maintain for the end-user (administrator) and extremely fast for the visitor, fulfilling Astro 5 and Decap CMS standards.