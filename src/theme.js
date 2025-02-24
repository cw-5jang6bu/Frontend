import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#A5CD39", // 올리브영 연두색
        },
        secondary: {
            main: "#1E3A3A", // 딥 그린
        },
        background: {
            default: "#F9F9F7", // 라이트 베이지 배경
            paper: "#FFFFFF", // 카드 배경
        },
        text: {
            primary: "#2C2C2C", // 다크 그레이
            secondary: "#1E3A3A", // 보조 텍스트
        },
        highlight: {
            main: "#C1F35E", // 네온 라임 (강조)
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Noto Sans KR', sans-serif",
        h5: {
            fontWeight: 700,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
});

export default theme;