import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Alert, Container, useMediaQuery, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import api from "../services/api";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/login", { email, password });

            alert(response.data.message);
            localStorage.setItem("email", email);
            onLogin();
        } catch (error) {
            setError(error.response?.data?.message || "로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F9F9F9",
            }}
        >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Card
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: "16px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                        backgroundColor: "#FFFFFF",
                        width: isMobile ? "90%" : "100%",
                        maxWidth: "400px",
                    }}
                >
                    <CardContent>
                        <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, color: "#222", mb: 2 }}>
                            로그인
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="이메일" variant="outlined" margin="normal" name="email" value={email} onChange={handleEmailChange} />
                            <TextField fullWidth label="비밀번호" variant="outlined" type="password" margin="normal" name="password" value={password} onChange={handlePasswordChange} autoComplete="current-password" />
                            <motion.div whileTap={{ scale: 0.97 }}>
                                <Button variant="contained" fullWidth type="submit" disabled={loading} sx={{ mt: 3, py: 1.5, fontSize: "1rem", fontWeight: "bold", borderRadius: "30px", backgroundColor: loading ? "#A0A0A0" : "#6AAD47" }}>
                                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "로그인"}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </Container>
    );
};

export default Login;


