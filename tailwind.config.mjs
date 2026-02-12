/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            screens: {
                'desktop': '980px',
            },
            colors: {
                primary: '#3e8d8b',
                secondary: '#40506d',
                accent: '#d8c8e1',
                neutral: {
                    1: '#f3f4f7',
                    2: '#f5f7f9',
                    light: '#f3f4f7',
                    DEFAULT: '#f5f7f9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
        },
    },
    plugins: [],
}
