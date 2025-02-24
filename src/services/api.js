import axios from "axios";

const API_BASE_URL = "http://a2f3b47d8b1b9400ca2981031f0b9995-134946597.ap-northeast-2.elb.amazonaws.com:8080";

//const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;