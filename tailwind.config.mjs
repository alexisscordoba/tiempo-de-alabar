/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#3e8d8b',
                secondary: '#40506d',
                accent: '#d8c8e1',
                neutral: {
                    light: '#f3f4f7',
                    DEFAULT: '#f5f7f9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
