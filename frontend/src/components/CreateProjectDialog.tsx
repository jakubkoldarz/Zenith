import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    useTheme,
    alpha,
    Stack,
} from "@mui/material";
import { CreateProjectDto, ProjectDto } from "../types/projectDto";
import { useForm } from "react-hook-form";
import { useApi } from "../hooks/useApi";
import { enqueueSnackbar } from "notistack";
import { CreateProjectFormData, createProjectSchema } from "../schemas/projectSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onProjectCreated: (newProject: ProjectDto) => void;
}

export function CreateProjectDialog({ open, onClose, onProjectCreated }: CreateProjectDialogProps) {
    const theme = useTheme();
    const { data, error, loading, execute } = useApi<ProjectDto, CreateProjectDto>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: CreateProjectFormData) => {
        console.log("Submitting", data);
        try {
            const newProject = await execute("post", "projects", data);
            onProjectCreated(newProject);
            handleClose();
            enqueueSnackbar("Project created successfully!", { variant: "success" });
        } catch (err) {
            enqueueSnackbar("Failed to create project.", { variant: "error" });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : handleClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        paddingTop: 1,
                        backgroundColor: "background.paper",
                        backgroundImage: "none",
                        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>New Project</DialogTitle>

            <DialogContent>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        autoFocus
                        label="Project Name"
                        fullWidth
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name ? "Project name is required" : ""}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={3}>
                        <Button onClick={handleClose} disabled={loading} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                px: 4,
                                borderRadius: "8px",
                            }}
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
