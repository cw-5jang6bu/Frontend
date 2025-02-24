import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, CircularProgress, Button, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import Confetti from "react-confetti"; // 🎉 빵빠레 효과 추가
import api from "../services/api";

const Coupon = ({ onLogout }) => {
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const userId = localStorage.getItem("userid");
                if (!userId) {
                    throw new Error("로그인이 필요합니다.");
                }

                const response = await api.get(`/coupons/me?userid=${userId}`);
                console.log("API 응답 데이터:", response.data);
                setCoupon(response.data);

                if (response.data.issued) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }
            } catch (error) {
                console.error("쿠폰 정보를 불러오는 중 오류 발생", error);
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
            {showConfetti && <Confetti numberOfPieces={300} />} {/* 🎊 더 풍성한 빵빠레 효과 */}

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
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#78be20" }}> 🎟 내 쿠폰 </Typography>

                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Stack spacing={3} alignItems="center">
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#222" }}>
                                    {coupon?.userid} 님
                                </Typography>

                                {coupon?.issued ? (
                                    <>
                                        {/* 🎊 "축하합니다!" 애니메이션 */}
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

                                        {/* 🎉 쿠폰 발급 효과 */}
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

                                        {/* 🎈 풍선 애니메이션 추가 */}
                                        <motion.div
                                            animate={{ y: [10, -10, 10] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            🎈🎈🎈
                                        </motion.div>
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
                                        localStorage.removeItem("userid");
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