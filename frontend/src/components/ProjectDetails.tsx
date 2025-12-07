import { Suspense, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProjectDto, UpdateProjectDto } from "../types/projectDto";
import { useApi } from "../hooks/useApi";
import { enqueueSnackbar } from "notistack";
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    InputBase,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { ArrowBack, ErrorOutline, PersonAdd, Share } from "@mui/icons-material";
import EditBox from "./EditBox";
import { ProjectContextType } from "./layouts/MainLayout";

interface ProjectDetailsParams extends Record<string, string | undefined> {
    id: string;
}

export default function ProjectDetails() {
    const { id } = useParams<ProjectDetailsParams>();
    const [project, setProject] = useState<ProjectDto | null>(null);
    const { error, loading, execute } = useApi<ProjectDto>();
    const { loading: loadingUpdate, execute: executeUpdate } = useApi<ProjectDto, UpdateProjectDto>();
    const theme = useTheme();
    const navigate = useNavigate();

    async function fetchProjectDetails() {
        try {
            const response = await execute("get", `/projects/${id}`);
            setProject(response);
        } catch (err) {
            setProject(null);
            enqueueSnackbar("Failed to load project details", { variant: "error" });
        }
    }

    useEffect(() => {
        if (id === null) return;
        (async () => {
            await fetchProjectDetails();
        })();
    }, []);

    const onRetry = async () => {
        await fetchProjectDetails();
    };

    const { updateProjectInList } = useOutletContext<ProjectContextType>();

    const handleChangeProjectName = (newName: string) => {
        const oldProject = project;

        if (project) {
            setProject({ ...project, name: newName });
        }

        if (project?.id) {
            updateProjectInList(project.id, { name: newName });
        }

        (async () => {
            try {
                await executeUpdate("patch", `/projects/${id}`, { name: newName });
                enqueueSnackbar("Project name updated successfully", { variant: "success" });
            } catch (err) {
                enqueueSnackbar("Failed to update project name", { variant: "error" });

                if (oldProject) {
                    setProject(oldProject);
                    updateProjectInList(oldProject.id, { name: oldProject.name });
                }
            }
        })();
    };

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress />
                <Typography variant="h6" marginLeft={2} color="primary">
                    Loading project details...
                </Typography>
            </Backdrop>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "80vh",
                        textAlign: "center",
                        gap: 2,
                    }}
                >
                    <ErrorOutline sx={{ fontSize: 100, color: "text.secondary", opacity: 0.5 }} />

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Ooops! We couldn't locate your project.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We couldn't find the project you're looking for. It might have been deleted, or perhaps it never
                        existed in our plain of existence.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button variant="text" startIcon={<ArrowBack />} onClick={() => navigate("/projects")}>
                            Go Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={onRetry}>
                            Try Again
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <Stack
                direction="column"
                borderRadius={2}
                overflow="hidden"
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
                }}
            >
                <AppBar position="static" sx={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <Toolbar>
                        <EditBox value={project?.name} onSetValue={handleChangeProjectName} />
                        {loadingUpdate && <CircularProgress color="inherit" size={24} />}
                        <Box flexGrow={1} />
                        <Button variant="contained" startIcon={<PersonAdd />}>
                            Share Project
                        </Button>
                    </Toolbar>
                </AppBar>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum neque, quo omnis ratione officia
                    laboriosam odit? Ullam suscipit, dolor quisquam alias magnam natus sed fugit reiciendis culpa
                    dolore, minima dolorem nobis error ratione aperiam voluptate asperiores assumenda nam ut? Pariatur
                    obcaecati placeat dolore cupiditate officia autem perferendis magnam similique quasi.
                </p>
            </Stack>
        </>
    );
}
