import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#490eadff",
            light: "#4b21caff",
            dark: "#5b21b6",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#1565C0",
            contrastText: "#ffffff",
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

        roles: {
            owner: "#6200EA",
            editor: "#2962FF",
            viewer: "#00695C",
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

declare module "@mui/material/styles" {
    interface Palette {
        roles: {
            owner: string;
            editor: string;
            viewer: string;
        };
    }

    interface PaletteOptions {
        roles?: {
            owner?: string;
            editor?: string;
            viewer?: string;
        };
    }
}
