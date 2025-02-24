import axios from "axios";

const API_BASE_URL = "http://member-service.member.svc.cluster.local:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;