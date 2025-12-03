import { useState } from "react";
import api from "../api";
import { AxiosError } from "axios";
import { ErrorResponseDto } from "../types/errorResponseDto";
import { string } from "zod";

export const useApi = <TResponse, TPayload = void>() => {
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
            let errorMessage: ErrorResponseDto = { status: -1, errors: ["An unexpected error occurred"] };

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data as ErrorResponseDto;
                errorMessage.errors ??= [err.message];
            }

            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, execute };
};
