import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { CreateTaskDto } from "../types/tasksSchemas";
import { projectKeys } from "../../projects/hooks/projectKeys";

export default function useCreateTask(projectId: string, categoryId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId, categoryId) });
            queryClient.invalidateQueries({ queryKey: projectKeys.category(projectId, categoryId) });
        },
    });

    return {
        ...mutation,
        createTask: mutation.mutate,
        createTaskAsync: mutation.mutateAsync,
    };
}
