import { ProjectRole } from "./projectRoles";

export interface ProjectDto {
    id: string;
    name: string;
    role: ProjectRole;
}

export interface CreateProjectDto {
    name: string;
}

export interface UpdateProjectDto {
    name: string;
}
