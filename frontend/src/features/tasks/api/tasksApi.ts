import api from "../../../api";
import { CreateTaskDto, MoveTaskDto, TaskDto, UpdateTaskDto } from "../types/tasksSchemas";

const getAllTasksByCategoryId = async (categoryId: string): Promise<TaskDto[]> => {
    const response = await api.get<TaskDto[]>(`/tasks?categoryId=${categoryId}`);
    return response.data;
};

const getTask = async (taskId: string): Promise<TaskDto> => {
    const response = await api.get<TaskDto>(`/tasks/${taskId}`);
    return response.data;
};

const createTask = async (data: CreateTaskDto): Promise<TaskDto> => {
    const response = await api.post<TaskDto>("/tasks", data);
    return response.data;
};

const updateTask = async (taskId: string, data: UpdateTaskDto): Promise<TaskDto> => {
    console.log("Updating task:", taskId, data);
    const response = await api.patch<TaskDto>(`/tasks/${taskId}`, data);
    return response.data;
};

const deleteTask = async (taskId: string): Promise<void> => {
    await api.delete<void>(`/tasks/${taskId}`);
};

const moveTask = async (taskId: string, data: MoveTaskDto): Promise<TaskDto> => {
    const response = await api.patch<TaskDto>(`/tasks/${taskId}/move`, data);
    return response.data;
};

export const tasksApi = {
    getOne: getTask,
    getAll: getAllTasksByCategoryId,
    create: createTask,
    update: updateTask,
    delete: deleteTask,
    move: moveTask,
};
