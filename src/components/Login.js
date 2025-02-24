import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Alert, Container, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import api from "../services/api";

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // 로그인 요청 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email: credentials.email,
                password: credentials.password,
            });

            alert(response.data.message);
            localStorage.setItem("email", credentials.email);
            onLogin();
        } catch (error) {
            setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
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
                backgroundColor: "#F9F9F9", // 배경색 조정
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center", // 가운데 정렬
                }}
            >
                <Card
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: "16px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                        backgroundColor: "#FFFFFF",
                        width: isMobile ? "90%" : "100%", // 모바일 너비 조정
                        maxWidth: "400px",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{ fontWeight: 700, color: "#222", mb: 2 }}
                        >
                            로그인
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="이메일"
                                variant="outlined"
                                margin="normal"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="비밀번호"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                            <motion.div whileTap={{ scale: 0.97 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        borderRadius: "30px",
                                        backgroundColor: "#6AAD47", // 올리브영 스타일 컬러
                                        "&:hover": { backgroundColor: "#5B9E3B" },
                                    }}
                                >
                                    로그인
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
