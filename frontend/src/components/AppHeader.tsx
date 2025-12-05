import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { theme } from "../theme";
import ProjectSearch from "./ProjectSearch";
import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function AppHeader() {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const userAvatarButton = useRef<HTMLButtonElement | null>(null);
    const { logout } = useAuth();

    return (
        <AppBar sx={{ backgroundColor: theme.palette.background.default }}>
            <Toolbar>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 0 }}>
                    <Box component="img" src="/logo_new.png" alt="Logo" sx={{ height: 40 }} />
                    <Typography variant="h5">Zenith</Typography>
                </Stack>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <ProjectSearch />
                </Box>
                <Box>
                    <Tooltip title="User Settings">
                        <IconButton ref={userAvatarButton} onClick={() => setMenuAnchor(userAvatarButton.current)}>
                            <Avatar sx={{ width: 40, height: 40 }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        open={Boolean(menuAnchor)}
                        onClose={() => setMenuAnchor(null)}
                        anchorEl={menuAnchor}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
