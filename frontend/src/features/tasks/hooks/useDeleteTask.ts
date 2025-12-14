import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "../../projects/hooks/projectKeys";

export default function useDeleteTask(projectId: string, categoryId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: tasksApi.delete,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId, categoryId) });
            enqueueSnackbar("Task deleted successfully", { variant: "success" });
        },
        onError: (error) => {
            enqueueSnackbar("Failed to delete task", { variant: "error" });
        },
    });

    return {
        ...mutation,
        deleteTask: mutation.mutate,
        deleteTaskAsync: mutation.mutateAsync,
    };
}
