import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader";
import { Grid } from "@mui/material";
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
    updateProjectInList: (projectId: string, updatedFields: Partial<ProjectDto>) => void;
};

export default function MainLayout() {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const { loading, execute } = useApi<ProjectDto[]>();

    const userProjects: ProjectDto[] = useMemo<ProjectDto[]>(() => {
        return projects.filter((project) => project.role === ProjectRole.Owner);
    }, [projects]);
    const sharedProjects: ProjectDto[] = useMemo<ProjectDto[]>(() => {
        return projects.filter((project) => project.role !== ProjectRole.Owner);
    }, [projects]);

    useEffect(() => {
        (async () => {
            await fetchProjects();
        })();
    }, []);

    const handleProjectCreated = (newProject: ProjectDto) => {
        setProjects((prevProjects) => [newProject, ...prevProjects]);
    };

    const fetchProjects = async () => {
        try {
            const response = await execute("get", "projects");
            setProjects([...response]);
        } catch (err) {}
    };

    const updateProjectInList = (projectId: string, updatedFields: Partial<ProjectDto>) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => (project.id === projectId ? { ...project, ...updatedFields } : project))
        );
    };

    return (
        <>
            <AppHeader onOpenCreateDialog={() => setOpenCreateDialog(true)} />
            <Grid container spacing={2} margin={2}>
                <Grid size={{ xs: 12, md: 3, lg: 2 }} display="flex" justifyContent="center">
                    <SideMenu />
                </Grid>
                <Grid size={{ xs: 12, md: 9, lg: 10 }} px={2}>
                    <Outlet context={{ userProjects, sharedProjects, loadingProjects: loading, updateProjectInList }} />
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
