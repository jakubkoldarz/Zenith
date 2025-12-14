import { Box, Checkbox, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { TaskDto } from "../types/tasksSchemas";
import useUpdateTask from "../hooks/useUpdateTask";
import useDeleteTask from "../hooks/useDeleteTask";
import { CancelOutlined } from "@mui/icons-material";

export default function TaskView({
    task,
    onClick,
    projectId,
}: {
    task: TaskDto;
    onClick: (task: TaskDto) => void;
    projectId: string;
}) {
    const theme = useTheme();
    const { updateTask } = useUpdateTask(projectId);
    const { deleteTask, isPending: loading } = useDeleteTask(projectId, task.categoryId);

    const handleToggleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isCompleted = event.target.checked;
        updateTask({ taskId: task.id, data: { isCompleted } });
    };

    const handleRemoveTask = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteTask(task.id);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
                backgroundColor: theme.palette.glass.background,
                py: 1,
                px: 2,
                opacity: loading ? 0.6 : 1,
                pointerEvents: loading ? "none" : "auto",
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                },
                "&:hover button": {
                    opacity: 0.5,
                    color: "red",
                },
            }}
            onClick={() => onClick(task)}
        >
            <Checkbox
                color="primary"
                size="small"
                checked={task.isCompleted}
                onChange={handleToggleStatus}
                onClick={(e) => e.stopPropagation()}
                sx={{ padding: 0.5, marginRight: 1 }}
            />

            <Typography
                variant="body2"
                sx={{
                    WebkitLineClamp: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    color: task.isCompleted ? "text.secondary" : "text.primary",
                    opacity: task.isCompleted ? 0.6 : 1,
                }}
            >
                {task.title}
            </Typography>
            <Box display="flex" flexGrow={1}></Box>
            <IconButton
                onClick={handleRemoveTask}
                sx={{
                    opacity: 0,
                    width: "15px",
                    height: "15px",
                    transition: "opacity 125ms, color 125ms",
                    transitionTimingFunction: "ease-in",
                }}
            >
                <CancelOutlined />
            </IconButton>
        </Stack>
    );
}
