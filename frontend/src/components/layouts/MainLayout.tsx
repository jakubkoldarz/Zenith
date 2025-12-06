import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader";
import { Container, Grid } from "@mui/material";
import SideMenu from "../SideMenu";
import { CreateProjectDialog } from "../CreateProjectDialog";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ProjectDto } from "../../types/projectDto";
import { ProjectRole } from "../../types/projectRoles";

export type ProjectContextType = {
    userProjects: ProjectDto[];
    sharedProjects: ProjectDto[];
    loadingProjects: boolean;
};

export default function MainLayout() {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const { data, error, loading, execute } = useApi<ProjectDto[]>();

    const userProjects: ProjectDto[] = useMemo<ProjectDto[]>(() => {
        return projects.filter((project) => project.role === ProjectRole.Owner);
    }, [projects]);
    const sharedProjects: ProjectDto[] = useMemo<ProjectDto[]>(() => {
        return projects.filter((project) => project.role !== ProjectRole.Owner);
    }, [projects]);

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
                    <Outlet context={{ userProjects, sharedProjects, loadingProjects: loading }} />
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
