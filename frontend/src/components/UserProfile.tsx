import {
    Box,
    Grid,
    Paper,
    Typography,
    Avatar,
    TextField,
    Button,
    Divider,
    Stack,
    useTheme,
    alpha,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const user = {
    firstname: "Jan",
    lastname: "Kowalski",
    email: "jan.kowalski@zenith.app",
    role: "OWNER",
    joinedAt: "2023-11-01",
};

const projectsCount = 5;

export default function UserProfile() {
    const theme = useTheme();

    // Helper do inicjałów
    const initials = `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={3}>
                <Grid size={4}>
                    <Paper
                        sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            borderRadius: "16px",
                            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                                theme.palette.primary.main,
                                0.05
                            )} 100%)`,
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 2,
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                bgcolor: "primary.main",
                                boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                            }}
                        >
                            {initials}
                        </Avatar>

                        <Typography variant="h5" fontWeight="bold">
                            {user.firstname} {user.lastname}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {user.email}
                        </Typography>

                        <Box
                            sx={{
                                px: 2,
                                py: 0.5,
                                borderRadius: "20px",
                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.main,
                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                mb: 4,
                            }}
                        >
                            <Typography variant="caption" fontWeight="bold">
                                Active account
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={8}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <StatCard label="Projekty" value={projectsCount} icon={<AssignmentIcon color="primary" />} />
                        <StatCard label="Zadania" value="12" icon={<CheckCircleIcon color="secondary" />} />
                        <StatCard
                            label="Zespół"
                            value="3"
                            icon={<GroupIcon sx={{ color: theme.palette.success.main }} />}
                        />
                    </Grid>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Dane osobowe
                            </Typography>
                            <Button startIcon={<EditIcon />} size="small">
                                Edytuj
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Imię"
                                    defaultValue={user.firstname}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }} // Na razie tylko do odczytu
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Nazwisko"
                                    defaultValue={user.lastname}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    defaultValue={user.email}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                                Bezpieczeństwo
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<SecurityIcon />}
                                sx={{ borderRadius: "8px" }}
                            >
                                Zmień hasło
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

// --- MAŁY KOMPONENT POMOCNICZY DO KAFELKÓW STATYSTYK ---
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    const theme = useTheme();
    return (
        <Grid size={4}>
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: "12px",
                    bgcolor: alpha(theme.palette.background.default, 0.5), // Ciemniejsze tło
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: "8px",
                        bgcolor: alpha(theme.palette.background.paper, 1),
                        display: "flex",
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                        {label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}
