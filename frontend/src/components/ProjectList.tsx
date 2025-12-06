import { Backdrop, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ProjectDto } from "../types/projectDto";
import { ProjectCard } from "./ProjectCard";
import { Activity, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { enqueueSnackbar } from "notistack";

export default function ProjectList() {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const { execute, loading } = useApi<ProjectDto[]>();

    useEffect(() => {
        (async () => {
            try {
                const response = await execute("get", "projects");
                setProjects([...response]);
            } catch (err) {
                enqueueSnackbar("Failed to load projects", { variant: "error" });
            }
        })();
    }, []);

    return (
        <Stack direction="row" spacing={2} margin={2} flexWrap="wrap">
            <Backdrop open={loading}>
                <CircularProgress />
                <Typography variant="h6" color="primary" marginLeft={2}>
                    Loading projects...
                </Typography>
            </Backdrop>
            {projects.map((project) => {
                return <ProjectCard key={project.id} project={project} />;
            })}
        </Stack>
    );
}
