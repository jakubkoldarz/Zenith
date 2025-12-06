import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectDto } from "../types/projectDto";
import api from "../api";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Badge, Chip, InputAdornment, Stack, TextField, Typography, useTheme } from "@mui/material";
import { RoleChip } from "./RoleChip";

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
                setProjects([...response.data]);
            } catch (error) {
                console.log(error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [open]);

    return (
        <Autocomplete<ProjectDto, false, false, true>
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            loading={loading}
            size="small"
            sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                },
            }}
            options={[...projects]}
            freeSolo
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                return option.name;
            }}
            renderInput={(params) => {
                const { InputProps, ...restParams } = params;

                return (
                    <TextField
                        {...restParams}
                        variant="outlined"
                        placeholder="Search..."
                        slotProps={{
                            input: {
                                ...InputProps,
                                startAdornment: (
                                    <>
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" sx={{ ml: 0.5 }} />
                                        </InputAdornment>
                                        {InputProps.startAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                );
            }}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id} onClick={() => navigate(`/projects/${option.id}`)}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            py="0.5rem"
                            spacing={1}
                            width="100%"
                        >
                            <Typography variant="body1">{option.name}</Typography>
                            <RoleChip role={option.role} />
                        </Stack>
                    </li>
                );
            }}
        />
    );
}
