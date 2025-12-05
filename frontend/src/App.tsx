import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PublicRoute from "./components/auth/PublicRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import useAuth from "./hooks/useAuth";

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={3000}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route element={<PublicRoute />}>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Route>

                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<DashboardPage />} />
                            </Route>

                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
