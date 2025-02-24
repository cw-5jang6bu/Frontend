import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CouponPage from "./pages/CouponPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate replace to="/coupon" /> : <LoginPage onLogin={handleLogin} />} />
                    <Route path="/coupon" element={isAuthenticated ? <CouponPage onLogout={handleLogout} /> : <Navigate replace to="/" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;

