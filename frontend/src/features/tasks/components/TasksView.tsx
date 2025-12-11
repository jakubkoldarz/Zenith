import { Stack, useTheme } from "@mui/material";
import useCategoryTasks from "../hooks/useCategoryTasks";
import { CategoryDto } from "../../categories/types/categoriesSchemas";
import TaskView from "./TaskView";
import { getScrollbarStyles } from "../../../components/ui/Scrollbar";

export default function TasksView({ category }: { category: CategoryDto }) {
    const { tasks } = useCategoryTasks(category.projectId, category.id);
    const theme = useTheme();

    return (
        <Stack gap={1} maxHeight="100%" sx={{ overflowY: "auto", padding: 1, ...getScrollbarStyles(theme) }}>
            {tasks.map((task) => (
                <TaskView key={task.id} task={task} />
            ))}
        </Stack>
    );
}
