import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import { ProjectDto } from "../types/projectDto";
import { useNavigate } from "react-router-dom";
import { useRoleColor } from "../hooks/useRoleColor";

export function ProjectCard({ project }: { project: ProjectDto }) {
    const navigate = useNavigate();
    const roleColor = useRoleColor(project.role);

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {project.name}
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: 2,
                            backgroundColor: roleColor,
                            width: "100%",
                            height: 5,
                        }}
                    ></Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
