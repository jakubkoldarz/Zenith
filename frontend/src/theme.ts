import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#7c3aed",
            light: "#a78bfa",
            dark: "#5b21b6",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#22d3ee",
            contrastText: "#0f172a",
        },

        background: {
            default: "#0f0f15",

            paper: "#18181b",
        },

        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },

        error: {
            main: "#ef4444",
        },
        success: {
            main: "#10b981",
        },
    },

    typography: {
        fontFamily: '"Inter", sans-serif',

        h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "-0.02em" },
        h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },

        button: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "0.05em" },
    },
});
