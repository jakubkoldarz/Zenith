import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader";
import { Box, Grid } from "@mui/material";
import SideMenu from "../SideMenu";
import { CreateProjectDialog } from "../../features/projects/components/CreateProjectDialog";
import { ProjectDto, UpdateProjectDto } from "../../features/projects/types/projectSchemas";
import { useState } from "react";

export type ProjectContextType = {
    userProjects: ProjectDto[];
    sharedProjects: ProjectDto[];
    loadingProjects: boolean;
    updateProjectInList: (projectId: string, updatedFields: UpdateProjectDto) => void;
};

export default function MainLayout() {
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
            <AppHeader onOpenCreateDialog={() => setOpenCreateDialog(true)} />
            <Grid container spacing={2} sx={{ flexGrow: 1, p: 2, overflow: "hidden" }}>
                <Grid
                    size={{ xs: 12, md: 3, lg: 2 }}
                    display="flex"
                    justifyContent="center"
                    sx={{ height: "100%", overflowY: "auto" }}
                >
                    <SideMenu />
                </Grid>
                <Grid size={{ xs: 12, md: 9, lg: 10 }} sx={{ height: "100%", overflow: "hidden" }}>
                    <Outlet />
                </Grid>
            </Grid>
            <CreateProjectDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
        </Box>
    );
}
