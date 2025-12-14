import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, useTheme, alpha, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskDto, UpdateTaskDto, UpdateTaskSchema } from "../types/tasksSchemas";
import useUpdateTask from "../hooks/useUpdateTask";
import { useEffect } from "react";

export function UpdateTaskDialog({
    open,
    onClose,
    projectId,
    task,
}: {
    open: boolean;
    onClose: () => void;
    projectId: string;
    task: TaskDto | null;
}) {
    const theme = useTheme();
    const { updateTask, isPending: loading } = useUpdateTask(projectId);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateTaskDto>({
        resolver: zodResolver(UpdateTaskSchema),
    });

    useEffect(() => {
        if (open && task) {
            reset({
                title: task.title,
                description: task.description || "",
                isCompleted: task.isCompleted,
            });
        }
    }, [open, task, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: UpdateTaskDto) => {
        if (!task) return;
        updateTask({ taskId: task.id, data: data }, { onSuccess: handleClose });
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
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>{task?.title}</DialogTitle>

            <DialogContent>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        autoFocus
                        label="Task Title"
                        fullWidth
                        variant="outlined"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title ? "Task title is required" : ""}
                    />
                    <TextField
                        label="Task Description"
                        fullWidth
                        multiline
                        variant="outlined"
                        {...register("description")}
                        minRows={4}
                        error={!!errors.description}
                        helperText={errors?.description ? "" : ""}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={3}>
                        <Button onClick={handleClose} disabled={loading} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                px: 4,
                                borderRadius: "8px",
                            }}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
