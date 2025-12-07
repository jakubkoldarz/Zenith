import { Card, CardActionArea, CardContent, Typography, Box, Grid } from "@mui/material";
import { ProjectDto } from "../types/projectDto";
import { useNavigate } from "react-router-dom";
import { useRoleColor } from "../hooks/useRoleColor";

export function ProjectCard({ project }: { project: ProjectDto }) {
    const navigate = useNavigate();
    const roleColor = useRoleColor(project.role);

    return (
        <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
                <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                    <CardContent>
                        <Typography
                            sx={{
                                WebkitLineClamp: 1,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                            gutterBottom
                            variant="h6"
                            fontWeight="normal"
                        >
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
        </Grid>
    );
}
