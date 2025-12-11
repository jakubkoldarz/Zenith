import { Checkbox, FormControlLabel, Stack, Typography, useTheme } from "@mui/material";
import { TaskDto } from "../types/tasksSchemas";

export default function TaskView({ task }: { task: TaskDto }) {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            sx={{
                backgroundColor: theme.palette.glass.background,
                py: 1,
                px: 2,
                borderRadius: 2,
            }}
        >
            <FormControlLabel
                control={<Checkbox color="primary" size="small" checked={task.isCompleted} />}
                label={
                    <Typography
                        variant="body2"
                        sx={{
                            WebkitLineClamp: 1,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {task.title}
                    </Typography>
                }
            />
        </Stack>
    );
}
