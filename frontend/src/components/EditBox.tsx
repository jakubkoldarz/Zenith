import { Box, InputBase, Typography } from "@mui/material";
import { Activity, useEffect, useRef, useState } from "react";

export default function EditBox({ value, onSetValue }: { value?: string; onSetValue: (value: string) => void }) {
    const [editing, setEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current?.focus();
            inputRef.current.spellcheck = false;
            inputRef.current.value = value || "";
        }
    }, [editing]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            inputRef.current?.blur();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            setEditing(false);
        }
    };
    const submit = () => {
        setEditing(false);

        const newValue = (inputRef.current?.value || "").trim();
        if (newValue === "") {
            return;
        }

        onSetValue(inputRef.current?.value || "");
    };

    return (
        <>
            <Activity mode={editing ? "hidden" : "visible"}>
                <Box
                    onClick={() => setEditing(true)}
                    sx={{
                        px: 1,
                        borderRadius: 1,
                        cursor: "pointer",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.2)",
                        },
                    }}
                >
                    <Typography variant="h6" fontWeight="normal">
                        {value}
                    </Typography>
                </Box>
            </Activity>

            <Activity mode={!editing ? "hidden" : "visible"}>
                <Box sx={{ px: 1 }}>
                    <InputBase
                        inputRef={inputRef}
                        sx={{ borderBottom: "1px solid", fontSize: "1.25rem", fontFamily: '"Space Grotesk"' }}
                        fullWidth
                        onKeyDown={handleKeyDown}
                        onBlur={submit}
                    />
                </Box>
            </Activity>
        </>
    );
}
