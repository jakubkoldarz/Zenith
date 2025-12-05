import { Box, Typography, TextField, useTheme, Button, InputAdornment, Alert } from "@mui/material";
import { Key, Email, Badge, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlassCard } from "../ui/GlassCard";
import { RegisterFormData, registerSchema } from "../../schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthResponseDto, LoginDto, RegisterDto } from "../../types/authDto";
import { useApi } from "../../hooks/useApi";
import { enqueueSnackbar } from "notistack";

export const RegisterForm = () => {
    const theme = useTheme();
    const iconColor = theme.palette.primary.light;
    const { data, loading, error, execute } = useApi<null, RegisterDto>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await execute("post", "auth/register", data as RegisterDto);
            enqueueSnackbar("Registration successful! Please log in.", { variant: "success" });
            navigate("/login");
        } catch (err) {}
    };

    return (
        <GlassCard
            sx={{
                padding: "3rem",
                width: "100%",
                maxWidth: 450,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h3"
                component="h2"
                sx={{ marginBottom: "1rem", color: theme.palette.primary.light, textAlign: "center" }}
            >
                Welcome to Zenith
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                <TextField
                    type="text"
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    {...register("firstname")}
                    error={!!errors.firstname}
                    helperText={errors.firstname ? errors.firstname.message : ""}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                <TextField
                    type="text"
                    label="Lastname"
                    variant="outlined"
                    fullWidth
                    {...register("lastname")}
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message as string}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Badge sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                {error && <Alert severity="error">{error.errors.join(", ")}</Alert>}

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={loading}
                    sx={{ marginTop: "1.5rem", py: 1.5, fontWeight: 600 }}
                >
                    Register
                </Button>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: "1rem", color: theme.palette.text.secondary }}
                >
                    Already have an account?
                    <Link
                        to="/login"
                        style={{ color: theme.palette.primary.light, textDecoration: "none", marginLeft: "5px" }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </GlassCard>
    );
};
