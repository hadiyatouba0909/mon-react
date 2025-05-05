/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = 'class'; // Active le mode sombre basé sur des classes
export const theme = {
    extend: {
        colors: {
            // Couleurs pour le mode clair/sombre
            light: {
                primary: '#ffffff',
                secondary: '#f1f5f9',
                text: '#1e293b',
                accent: '#3b82f6',
            },
            dark: {
                primary: '#1e293b',
                secondary: '#0f172a',
                text: '#f8fafc',
                accent: '#60a5fa',
            },
            indigo: {
                50: '#f0f5ff',
                100: '#e5edff',
                200: '#cddbfe',
                300: '#b4c6fc',
                400: '#8da2fb',
                500: '#6875f5',
                600: '#5850ec', // Primary color from your design
                700: '#5145cd',
                800: '#42389d',
                900: '#362f78',
                950: '#191448',
            },
        },
        animation: {
            'fade-in': 'fadeIn 0.5s ease-out forwards',
            'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            pulse: {
                '0%, 100%': { opacity: '1' },
                '50%': { opacity: '0.5' },
            },
        },
        transitionProperty: {
            'height': 'height',
            'spacing': 'margin, padding',
            'theme': 'background-color, border-color, color, fill, stroke',
        },
        boxShadow: {
            'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
    },
};
export const plugins = [];