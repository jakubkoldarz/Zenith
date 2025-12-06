import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import RegisterPage from "./pages/RegisterPage";
import PublicRoute from "./components/auth/PublicRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import MainLayout from "./components/layouts/MainLayout";
import UserProfile from "./components/UserProfile";
import ProjectDetails from "./components/ProjectDetails";
import ProjectsPanel from "./components/ProjectsPanel";

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
                                <Route element={<MainLayout />}>
                                    <Route path="/profile" element={<UserProfile />} />
                                    <Route path="/projects" element={<ProjectsPanel />} />
                                    <Route path="projects/:id" element={<ProjectDetails />} />
                                </Route>
                            </Route>

                            <Route path="*" element={<Navigate to="/projects" replace />} />
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
