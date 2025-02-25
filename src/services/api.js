import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",  // ✅ 백엔드 주소
    withCredentials: true,  // ✅ 쿠키 포함 (인증 필요할 경우)
});

export default api;
