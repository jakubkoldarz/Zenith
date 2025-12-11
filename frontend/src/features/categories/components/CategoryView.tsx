import { Box, Divider, Stack, useTheme } from "@mui/material";
import { CategoryDto } from "../types/categoriesSchemas";
import TasksView from "../../tasks/components/TasksView";
import EditBox from "../../../components/EditBox";
import useUpdateCategory from "../hooks/useUpdateCategory";
import { GlassButton } from "../../../components/ui/GlassButton";
import { Add } from "@mui/icons-material";
import useCategoryTasks from "../../tasks/hooks/useCategoryTasks";
import { CreateTaskDialog } from "../../tasks/components/CreateTaskDialog";
import { useState } from "react";

export default function CategoryView({ category }: { category: CategoryDto }) {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const theme = useTheme();
    const { updateCategory } = useUpdateCategory();
    const { tasks } = useCategoryTasks(category.projectId, category.id);

    const handleSetName = (newName: string) => {
        updateCategory({
            id: category.id!,
            projectId: category.projectId!,
            data: { name: newName },
        });
    };

    return (
        <>
            <Stack
                direction="column"
                sx={{
                    flexShrink: 0,
                    width: "300px",
                    backgroundColor: theme.palette.background.paper,
                    padding: 2,
                    borderRadius: 2,
                    maxHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: theme.shadows[3],
                }}
                spacing={2}
            >
                <Box flexShrink={0}>
                    <EditBox value={category.name} onSetValue={handleSetName} />
                </Box>
                <Divider sx={{ paddingBottom: 1, marginTop: "0 !important", paddingTop: 0 }} />

                {tasks.length > 0 && (
                    <Stack direction="column" sx={{ overflowY: "auto", minHeight: 0 }}>
                        <TasksView category={category} />
                    </Stack>
                )}
                {tasks.length > 0 && <Divider />}
                <GlassButton onClick={() => setIsOpenDialog(true)} color="inherit" size="small" startIcon={<Add />}>
                    Add Task
                </GlassButton>
            </Stack>
            <CreateTaskDialog
                categoryId={category.id}
                projectId={category.projectId}
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
            />
        </>
    );
}
