import { Folder, Person } from "@mui/icons-material";
import { Button, IconButton, ListItemButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface route {
    link: string;
    label: string;
    icon: ReactElement;
}

export default function SideMenu(): ReactElement {
    const location = useLocation();
    const navigate = useNavigate();

    const routes: route[] = [
        { link: "/projects", label: "Projects", icon: <Folder /> },
        { link: "/profile", label: "Profile", icon: <Person /> },
    ];

    const routesElements = routes.map((route) => {
        return (
            <ListItemButton
                key={route.link}
                selected={location.pathname.startsWith(route.link)}
                onClick={() => navigate(route.link)}
                sx={{
                    px: 4,
                    width: "100%",
                    borderRadius: 2,
                    "&.Mui-selected": {
                        color: "primary.main",
                        "& .MuiSvgIcon-root": {
                            color: "primary.main",
                        },
                    },
                }}
                color="primary"
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    {route.icon}
                    <Typography variant="button" display="block">
                        {route.label}
                    </Typography>
                </Stack>
            </ListItemButton>
        );
    });

    return (
        <Stack
            sx={{ width: "100%" }}
            spacing={1}
            height="fit-content"
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            {routesElements}
        </Stack>
    );
}
