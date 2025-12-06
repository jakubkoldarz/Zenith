import { useParams } from "react-router-dom";

interface ProjectDetailsParams extends Record<string, string | undefined> {
    id: string;
}

export default function ProjectDetails() {
    const { id } = useParams<ProjectDetailsParams>();

    return <div>Project Details Page for project ID: {id}</div>;
}
