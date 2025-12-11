import { alpha, Theme } from "@mui/material";

export const getScrollbarStyles = (theme: Theme) => ({
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.grey[400]} transparent`,

    "&::-webkit-scrollbar": {
        width: "6px",
        height: "6px",
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: alpha(theme.palette.grey[500], 0.3),
        borderRadius: "20px",

        border: "transparent",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: alpha(theme.palette.grey[500], 0.6),
    },
    "&::-webkit-scrollbar-corner": {
        background: "transparent",
    },
});
