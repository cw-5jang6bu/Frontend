import axios from "axios";

//const API_BASE_URL = "http://ac26a7732cb91416fbd6cea6edc0da4f-650605713.ap-northeast-2.elb.amazonaws.com";

const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;