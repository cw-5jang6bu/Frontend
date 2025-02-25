import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, CircularProgress, Button, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import Confetti from "react-confetti";
import api from "../services/api";  // ✅ API 설정 가져오기

const Coupon = ({ onLogout }) => {
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const fetchCoupon = async () => {
            const email = localStorage.getItem("email");

            if (!email) {
                console.warn("🚨 로그인이 필요합니다.");
                setLoading(false);
                return;
            }

            try {
                console.log(`🔍 API 요청: /coupons/me?email=${email}`);

                const response = await api.get("/coupons/me", {
                    params: { email },
                });

                console.log("✅ API 응답 데이터:", response.data);
                setCoupon(response.data || null);

                if (response.data?.issued) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }
            } catch (error) {
                console.error("🚨 쿠폰 정보를 불러오는 중 오류 발생:", error);

                if (error.response) {
                    console.error("🔴 서버 응답 오류:", error.response);
                } else if (error.request) {
                    console.error("🟡 요청은 갔으나 응답이 없음:", error.request);
                } else {
                    console.error("🟢 설정 오류:", error.message);
                }

                setCoupon(null); // ✅ 쿠폰 정보가 없을 경우 명확한 상태 설정

                if (error.response?.status === 403) {
                    alert("⏳ 인증이 만료되었습니다. 다시 로그인해주세요.");
                    localStorage.removeItem("email");
                    onLogout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCoupon();
    }, []);

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {showConfetti && <Confetti numberOfPieces={300} />}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Card
                    sx={{
                        p: 4,
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#78be20" }}>
                            🎟 내 쿠폰
                        </Typography>

                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Stack spacing={3} alignItems="center">
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#222" }}>
                                    {coupon?.email || "사용자"} 님
                                </Typography>

                                {coupon?.issued ? (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                color: "#ff9800",
                                                fontWeight: "bold",
                                                fontSize: "1.8rem",
                                                textShadow: "0px 0px 10px rgba(255, 152, 0, 0.5)",
                                            }}
                                        >
                                            🎈 축하합니다! 🎈
                                        </motion.div>

                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 150, damping: 10 }}
                                            style={{
                                                color: "#78be20",
                                                fontWeight: "bold",
                                                fontSize: "1.4rem",
                                                textShadow: "0px 0px 10px rgba(120, 190, 32, 0.5)",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            🎊 쿠폰이 발급되었습니다! 🎊
                                        </motion.div>

                                        <Chip
                                            label="✅ 사용 가능 쿠폰"
                                            sx={{
                                                fontSize: "1rem",
                                                padding: "5px",
                                                fontWeight: "bold",
                                                backgroundColor: "#78be20",
                                                color: "white",
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Chip
                                        label="❌ 쿠폰 없음"
                                        sx={{
                                            fontSize: "1rem",
                                            padding: "5px",
                                            fontWeight: "bold",
                                            backgroundColor: "#ff3d00",
                                            color: "white",
                                        }}
                                    />
                                )}

                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#78be20",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#5a9e1a" },
                                    }}
                                    fullWidth
                                    onClick={() => {
                                        localStorage.removeItem("email");
                                        onLogout();
                                    }}
                                >
                                    로그아웃
                                </Button>
                            </Stack>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </Container>
    );
};

export default Coupon;



