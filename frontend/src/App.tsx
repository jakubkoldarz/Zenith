import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
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
                            <Route path="*" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/" element={<DashboardPage />} />
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
