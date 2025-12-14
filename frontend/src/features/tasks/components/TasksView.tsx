import { Stack, useTheme } from "@mui/material";
import useCategoryTasks from "../hooks/useCategoryTasks";
import { CategoryDto } from "../../categories/types/categoriesSchemas";
import TaskView from "./TaskView";
import { getScrollbarStyles } from "../../../components/ui/Scrollbar";
import { TaskDto } from "../types/tasksSchemas";

export default function TasksView({
    category,
    onSelect,
}: {
    category: CategoryDto;
    onSelect: (task: TaskDto) => void;
}) {
    const { tasks } = useCategoryTasks(category.projectId, category.id);
    const theme = useTheme();

    return (
        <Stack gap={1} maxHeight="100%" sx={{ overflowY: "auto", padding: 1, ...getScrollbarStyles(theme) }}>
            {tasks.map((task) => (
                <TaskView projectId={category.projectId} onClick={onSelect} key={task.id} task={task} />
            ))}
        </Stack>
    );
}
