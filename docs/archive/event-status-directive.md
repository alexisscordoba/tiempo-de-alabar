# Website of: Tiempo de Alabar
## Content Structure Directive: Event Lifecycle and Status Management

### 1. Architectural Overview
The system uses a Hybrid Status Model. While the primary status is set manually via the CMS to provide editorial control, the "Finished" state is calculated dynamically in the frontend based on the user's current time. This ensures the website feels live and updated without requiring a code change at the exact moment a concert ends.

### 2. Status Definitions & Visibilities
#### Manual Statuses (Set in Decap CMS)
| Status        | Visibility       | UI Behavior                                                                                                  |
| :-----------: |:----------------:|:-------------------------------------------------------------------------------------------------------------|
| draft         | Hidden           | Not rendered by the build engine.                                                                            |
| upcoming      | Public (Agenda)  | Displays a "Coming Soon" badge. Shows basic info only (Date/Location). "View Details" button is disabled.    |
| scheduled     | Public (Agenda)  | Standard active event. Full details, modal access, and active reservation links.                             |
| sold out      | Public (Agenda)  | Displays a "Sold Out" badge. Full details visible, but the "Reserve" button is disabled.                     |
| canceled      | Public (Agenda)  | Displays a ""Canceled"" badge. Shows details/alerts but disables all action buttons.                         |
| archived      | Public (History) | The event is removed from the main ""Agenda"" section and moved to the ""Historical Events"" page.           |

#### Automatic Status (Calculated by Frontend)
| Status       | Trigger Condition         | UI Behavior                                                                                                               |
| :----------: |:--------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| finished     | Current Date > Event Date | Displays a ""Finished"" badge. Disables ""Reserve"" and ""Promo"" buttons. Shifts focus to the Setlist and Photo Gallery. |

### 3. Logic & Sorting Rules
To maintain a professional and active appearance, the agenda list follows a specific sorting priority:

1. Future Events (`upcoming`, `scheduled`, `sold out`): Sorted in ascending order (The closest upcoming event appears first).
2. Recent Events (`finished`): Sorted in descending order (The most recently finished event appears first). These stay in the main Agenda until manually moved to `archived`.
3. Visual Hierarchy: Finished events may be styled with lower opacity or a more subtle color palette to ensure the eye is drawn to future dates first.

### 4. Technical Implementation & Timezones

* Timezone Standard: All event times are stored and calculated using the Argentina Offset (UTC-3). This prevents events from expiring prematurely for users in different time zones.

* Interaction Lockdown: Once an event is calculated as finished, the UI must automatically:
    * Disable the `event_link_reserve` button.
    * Disable the `event_link_folderpromo` button.
    * Highlight the **Setlist** and **Photo Gallery** as the primary post-event content.

### 5. SEO & Deployment Strategy
To ensure Search Engines (like Google) crawl the most accurate data (e.g., recognizing that an event is indeed finished), a Manual Sync Policy is established:

* Weekly Build: A manual or scheduled deployment must be triggered once a week even if no content has changed.

* Content-Triggered Build: Every time a new song is added or a setlist is updated, a deployment is triggered.

* Result: This process "bakes" the finished status into the pure HTML/SSG files, ensuring that crawlers see the `Finished` badge and disabled links without needing to execute JavaScript.

### 6. Example Metadata (Markdown Front Matter)
```yaml
title: "Youth Congress Concert"
event_date: 2026-03-21
event_time: "20:00"
event_status: "scheduled" # Manual choice
# The "finished" badge will appear automatically after March 21st, 20:00 AR.
```
This directive provides the perfect balance between automation (reducing admin workload) and editorial control (deciding when to archive old content), while keeping the site's SEO at peak performance.