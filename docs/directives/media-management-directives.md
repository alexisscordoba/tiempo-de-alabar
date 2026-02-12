# Website of: Tiempo de Alabar
## Content Structure Directive: Media Management & Cloudflare Images Integration

### 1. Architectural Strategy: External CDN
To prevent "repository bloat" and ensure ultra-fast load times, all high-resolution assets—specifically event galleries, member profiles, and song covers—will be hosted on Cloudflare Images.

The Git repository will only store textual references (IDs or URLs) to these assets, rather than the binary image files themselves.

### 2. Strategic Benefits

* Repository Efficiency: Keeps the GitHub repository under 50MB, ensuring fast deployments and clones.
* Automatic Optimization: Cloudflare automatically serves images in modern formats (WebP/AVIF) based on the user's browser.
* On-the-Fly Resizing: The frontend can request specific dimensions (e.g., thumbnails for the Agenda vs. high-res for Modals) using URL parameters.
* Global Delivery: Images are served from Cloudflare’s Edge network, closest to the visitor.

### 3. Decap CMS Integration (media_library)
To integrate Decap CMS with Cloudflare Images, we bypass the default local folder behavior. Since Decap does not have a native Cloudflare plugin, we implement a Custom Media Library bridge via a Cloudflare Worker.

**CMS Configuration** (admin/config.yml)
```yaml
# Media folder remains for low-weight UI icons/system assets only
media_folder: "public/assets/system" 
public_folder: "/assets/system"

# Option B: Cloudflare Images External Library
media_library:
  name: cloudflare-images
  config:
    # This points to a custom Cloudflare Worker acting as an API bridge
    upload_endpoint: "https://media-bridge.tiempodealabar.workers.dev/upload"
    api_key: "${CLOUDFLARE_IMAGES_TOKEN}"
    account_id: "${CLOUDFLARE_ACCOUNT_ID}"
    # Use variants for different UI needs
    variant_public: "public"
    variant_thumb: "thumbnail"
```
### 4. Implementation Workflow
1. Upload: When the Administrator uploads an image in Decap CMS, the "Cloudflare Images Bridge" (Worker) intercepts the file.
2. Storage: The image is sent directly to the Cloudflare Images permanent storage.
3. Reference: Cloudflare returns a unique Image ID.
4. Markdown Entry: Decap CMS saves only the ID or the delivery URL in the Markdown Front Matter.
    * Example: event_cover_id: "75e8-4b21-af91-3e8d8b2a00"
5. Rendering: Astro 5 fetches the metadata and constructs the optimized delivery URL.

### 5. Frontend Rendering Logic (Astro 5)
In the Astro components, we utilize the Cloudflare delivery URL pattern to request the exact size needed:

```
---
// Logic for constructing the CDN URL
const { imageId } = Astro.props;
const cdnBase = "https://imagedelivery.net/YOUR_ACCOUNT_HASH";
const imageUrl = `${cdnBase}/${imageId}/public`;
---
<img 
  src={imageUrl} 
  alt="Event Cover" 
  class="glass-effect shadow-glow" 
  loading="lazy" 
/>
```

### 6. Media Policy for Content Types
* Events Gallery: Mandatory Cloudflare Images. Original high-res uploads are allowed as the CDN handles the compression.
* Song Covers: Mandatory Cloudflare Images.
* System Assets (Logos, Favicons): Stored locally in `public/assets/system` for immediate availability during the build process.

### 7. Maintenance & SEO
* Alt Text: Decap CMS will always require an alt_text field for every image upload to ensure accessibility and SEO ranking for the band’s photos.
* Cleanup: A quarterly audit should be performed to delete unused images from the Cloudflare Dashboard to optimize the 100,000-image limit of the basic plan.

This directive ensures that as the band grows and the number of events increases, the website's technical infrastructure remains lean, fast, and cost-effective.