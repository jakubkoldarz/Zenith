import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader";
import { Grid } from "@mui/material";
import SideMenu from "../SideMenu";
import { CreateProjectDialog } from "../CreateProjectDialog";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ProjectDto } from "../../types/projectDto";

export default function MainLayout() {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const { data, error, loading, execute } = useApi<ProjectDto[]>();

    useEffect(() => {
        (async () => {
            try {
                const response = await execute("get", "projects");
                setProjects([...response]);
            } catch (err) {}
        })();
    }, []);

    const handleProjectCreated = (newProject: ProjectDto) => {
        setProjects((prevProjects) => [newProject, ...prevProjects]);
    };

    return (
        <>
            <AppHeader onOpenCreateDialog={() => setOpenCreateDialog(true)} />
            <Grid container spacing={2} margin={2}>
                <Grid size={2} display="flex" justifyContent="center">
                    <SideMenu />
                </Grid>
                <Grid size={10}>
                    <Outlet />
                </Grid>
            </Grid>
            <CreateProjectDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onProjectCreated={handleProjectCreated}
            />
        </>
    );
}
