import axios from "axios";

// ✅ 백엔드 API 주소를 직접 하드코딩 (EKS 내부 DNS 사용)
const API_BASE_URL = "http://member-service.member.svc.cluster.local:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,  // ✅ CORS 설정
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;

