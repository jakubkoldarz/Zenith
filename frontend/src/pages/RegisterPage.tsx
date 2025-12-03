import { Stack } from "@mui/material";
import { RegisterForm } from "../components/AuthForm/RegisterForm";

export default function LoginPage() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundSize: "cover", backgroundImage: "url('star_banner.png')" }}
        >
            <RegisterForm />
        </Stack>
    );
}
