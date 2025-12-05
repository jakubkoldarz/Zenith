import { CircularProgress, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Stack>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
