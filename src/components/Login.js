import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Alert, Container, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import api from "../services/api";

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ userid: "", password: "" });
    const [error, setError] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", credentials);
            alert(response.data.message);
            localStorage.setItem("userid", credentials.userid);
            onLogin();
        } catch (error) {
            setError("로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.");
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
                backgroundColor: "#F9F9F9", // 연한 그레이 배경
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center", // ✅ **가운데 정렬 보장**
                }}
            >
                <Card
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: "16px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                        backgroundColor: "#FFFFFF",
                        width: isMobile ? "90%" : "100%", // ✅ **모바일에서 적절한 너비 조정**
                        maxWidth: "400px", // ✅ **너무 넓어지지 않도록 제한**
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
                                label="아이디"
                                variant="outlined"
                                margin="normal"
                                name="userid"
                                value={credentials.userid}
                                onChange={handleChange}
                                sx={{
                                    borderRadius: "8px",
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
                                    borderRadius: "8px",
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
                                        backgroundColor: "#6AAD47", // ✅ **올리브영 메인 컬러**
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