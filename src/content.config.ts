import { defineCollection, z, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

// --- 1. MÚSICA ---
const musica = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/musica" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        // slug is handled by the loader/filename usually, but if explicitly in frontmatter:
        slug: z.string().optional(),
        status: z.enum(['published', 'draft']),
        year: z.number(),
        composer: z.string().optional(),
        lyricist: z.string().optional(),

        technical: z.object({
            key: z.string().optional(),
            time: z.string().optional(),
            tempo: z.number().optional(),
            duration: z.number().optional(),
            structure: z.string().optional(),
            ccli: z.number().optional()
        }).optional(),

        design: z.object({
            coverart: image().optional(),
            coverart_alt: z.string().optional(),
            background_color: z.string().optional() // HEX
        }).optional(),

        streaming: z.object({
            youtube_clip: z.string().optional(),
            spotify: z.string().optional(),
            apple: z.string().optional(),
            youtubemusic: z.string().optional(),
            deezer: z.string().optional(),
            amazon: z.string().optional(),
            tidal: z.string().optional(),
            soundcloud: z.string().optional(),
        }).optional(),

        resources: z.array(z.object({
            label: z.string(),
            file_url: z.string()
        })).optional(),

        resources_videos: z.array(z.object({
            label: z.string(),
            youtube_id: z.string()
        })).optional(),

        meta: z.object({
            biblerefs: z.array(z.string()).optional(),
            tags: z.array(z.string()).optional()
        }).optional(),

        description: z.string().optional(), // markdown content field handled as string in frontmatter if strictly mapped? Decap puts it in frontmatter if widget is markdown.
        history: z.string().optional(),

        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            og_image: image().optional()
        }).optional(),
    })
});

// --- 2. EVENTOS ---
const eventos = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        year: z.number(),
        // slug: z.string().optional(),
        cover: image(),
        cover_alt: z.string().optional(),
        status: z.enum(['draft', 'upcoming', 'scheduled', 'sold_out', 'canceled', 'archived']).default('draft'),
        featured: z.boolean().default(false),

        date: z.date(),
        end_date: z.date().optional(),
        time: z.string(),
        end_time: z.string().optional(),
        price: z.string().default("Entrada libre y gratuita"),
        link_reserve: z.string().optional(),

        location: z.object({
            type: z.enum(['church', 'park', 'theater', 'auditorium', 'stadium', 'hall', 'other']),
            name: z.string(),
            address: z.string().optional(),
            city: z.string().optional(),
            lat: z.number().optional(),
            lng: z.number().optional(),
        }),

        content: z.object({
            guests: z.string().optional(),
            setlist: z.array(z.object({
                song_id: reference('musica').nullable().optional(),
                custom_name: z.string().optional()
            })).optional(),
            gallery: z.array(image()).optional(),
            link_promo: z.string().optional()
        }).optional(),

        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            og_image: image().optional()
        }).optional(),
    })
});

// --- 3. MEMBERS (MIEMBROS) ---
const members = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/members" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        nickname: z.string(),
        // slug: z.string().optional(),
        status: z.enum(['draft', 'active', 'former']).default('active'),
        order: z.number().default(1),
        start_date: z.date(),
        end_date: z.date().nullable().optional(),

        roles: z.array(reference('roles')).optional(),

        photos: z.object({
            ph_profile: image(),
            ph_profile_alt: z.string().optional(),
            ph_secondary: image().optional(),
            ph_secondary_alt: z.string().optional(),
            gallery: z.array(image()).optional()
        }).optional(),

        bio_short: z.string(),
        social: z.object({
            instagram: z.string().optional(),
            youtube: z.string().optional(),
            tiktok: z.string().optional(),
            facebook: z.string().optional(),
            x: z.string().optional(),
            soundcloud: z.string().optional(),
            spotify: z.string().optional()
        }).optional(),
    })
});

// --- 4. ROLES ---
const roles = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/roles" }),
    schema: z.object({
        rol_id: z.string(),
        rol_name: z.string(),
        rol_icon: z.string().optional()
    })
});

// --- 5. HITOS (LÍNEA DE TIEMPO) ---
const hitos = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/hitos" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        year: z.number(),
        date: z.date().optional(),
        featured: z.boolean().default(false),
        has_subpage: z.boolean().default(false),
        // slug: z.string(),

        design: z.object({
            cover: image(),
            gallery: z.array(image()).optional(),
            related_song: reference('musica').nullable().optional(),
            related_event: reference('eventos').nullable().optional()
        }).optional(),

        summary: z.string().optional(),
        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            og_image: image().optional()
        }).optional(),
    })
});

// --- 6. SETTINGS (GLOBALS) ---
const settings = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/data" }),
    schema: z.object({
        site_info: z.object({
            legal: z.string().optional(),
            developed: z.string().optional()
        }).optional(),
        contact_info: z.object({
            phone: z.string().optional(),
            email: z.string().optional(),
            location: z.string().optional()
        }).optional(),
        links: z.array(z.object({
            label: z.string(),
            url: z.string(),
            type: z.enum(['streaming', 'video', 'social', 'contact']),
            icon: z.string().optional()
        })).optional()
    })
});


// --- 7. PAGES (Static Content) ---
// Using specific schemas for each page could be verbose, so we might use a loose schema or specific ones. 
// For now, I'll define a generic one or per-page if critical validation is needed. 
// Given the variety, I'll create a single "pages" collection that allows optional sections for all pages.

const pages = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: ({ image }) => z.object({
        // Common Hero
        hero: z.object({
            title: z.string().optional(),
            subtitle: z.string().optional(),
            background: image().optional(),
            cta_primary_label: z.string().optional(),
            cta_primary_link: z.string().optional(),
            cta_secondary_label: z.string().optional(),
            cta_secondary_link: z.string().optional(),
        }).optional(),

        // Inicio Specific
        quote_block: z.object({
            active: z.boolean().default(true),
            text: z.string()
        }).optional(),
        musica_snippet: z.object({
            title: z.string(),
            text: z.string(),
            button_label: z.string()
        }).optional(),
        featured: z.any().optional(), // Complex relations, keep loose for now or strictly map

        // Acerca De Specific
        identity: z.object({
            description: z.string().optional(),
            history: z.string().optional(),
            goals: z.array(z.string().or(z.object({ item: z.string() }))).optional()
        }).optional(),
        gallery: z.array(z.string().or(z.object({ image: z.string() }))).optional(),

        // Organizar Specific
        info: z.any().optional(),
        rider: z.any().optional(),
        logistics: z.any().optional(),

        // Apoyo/Donaciones Specific
        allocation: z.any().optional(),
        ways: z.any().optional(),
        donation: z.any().optional(),
        gratitude: z.any().optional(),

        // Contacto
        form: z.any().optional(),

        // Bio 
        // (Loose schema for now to avoid huge file, can refine later)

        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            og_image: image().optional()
        }).optional(),
    })
});

export const collections = {
    musica,
    eventos,
    members,
    roles,
    hitos,
    settings,
    pages
};
