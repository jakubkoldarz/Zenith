import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { enqueueSnackbar } from "notistack";
import { CategoryDto } from "../types/categoriesSchemas";

export default function useDeleteCategory(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryId: string) => categoriesApi.delete(categoryId),

        onMutate: async (categoryId) => {
            await queryClient.cancelQueries({ queryKey: projectKeys.categories(projectId) });

            const previousCategories = queryClient.getQueryData<CategoryDto[]>(projectKeys.categories(projectId));

            if (previousCategories) {
                const newCategories = previousCategories.filter((c) => c.id !== categoryId);
                queryClient.setQueryData(projectKeys.categories(projectId), newCategories);
            }

            return { previousCategories };
        },

        onError: (_error, _categoryId, context) => {
            if (context?.previousCategories) {
                queryClient.setQueryData(projectKeys.categories(projectId), context.previousCategories);
            }
            enqueueSnackbar("Failed to delete category", { variant: "error" });
        },

        onSuccess: () => {
            enqueueSnackbar("Category deleted successfully", { variant: "success" });
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.categories(projectId) });
        },
    });
}
