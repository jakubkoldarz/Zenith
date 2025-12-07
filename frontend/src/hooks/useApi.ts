import { useState } from "react";
import api from "../api";
import { AxiosError } from "axios";
import { ErrorResponseDto } from "../types/errorResponseDto";

export const useApi = <TResponse, TPayload = void>() => {
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // Inicjalizujemy jako null
    const [error, setError] = useState<ErrorResponseDto | null>(null);

    const execute = async (
        method: "get" | "post" | "put" | "patch" | "delete",
        endpoint: string,
        payload?: TPayload
    ): Promise<TResponse> => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await api[method]<TResponse>(endpoint, payload);
            setData(response.data);
            return response.data;
        } catch (err: any) {
            let errorDto: ErrorResponseDto = {
                status: 500,
                errors: ["An unexpected error occurred"],
            };

            if (err instanceof AxiosError && err.response) {
                errorDto.status = err.response.status;

                if (err.response.data && (err.response.data as any).errors) {
                    errorDto.errors = [...(err.response.data as any).errors];
                }
            } else if (err instanceof Error) {
                errorDto.errors = [err.message];
            }

            setError(errorDto);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, execute };
};
