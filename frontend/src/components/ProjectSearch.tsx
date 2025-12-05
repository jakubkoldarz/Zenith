import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectDto } from "../types/projectDto";
import api from "../api";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, InputAdornment, TextField, useTheme } from "@mui/material";

export default function ProjectSearch() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;

        (async () => {
            try {
                setLoading(true);
                const response = await api.get<ProjectDto[]>("/projects");
                const projects: ProjectDto[] = response.data;
                setProjects(projects);
            } catch (error) {
                setProjects([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [open]);

    return (
        <Autocomplete
            size="small"
            sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                },
            }}
            options={projects}
            getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
            freeSolo
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" sx={{ ml: 0.5 }} />
                            </InputAdornment>
                        ),
                        placeholder: "Type to search your projects...",
                    }}
                />
            )}
        />
    );
}
