import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { UpdateTaskDto } from "../types/tasksSchemas";
import { enqueueSnackbar } from "notistack";

export default function useUpdateTask(projectId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskDto }) => tasksApi.update(taskId, data),
        onSuccess: (data, variables) => {
            const categoryId = data.categoryId;
            queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId, categoryId) });
            enqueueSnackbar("Task updated successfully", { variant: "success" });
        },
        onError: () => {
            const message = "Failed to update task";
            enqueueSnackbar(message, { variant: "error" });
        },
    });

    return {
        ...mutation,
        updateTask: mutation.mutate,
        updateTaskAsync: mutation.mutateAsync,
    };
}
