import axios from "axios";

export default axios.create({
    baseURL:
        process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL + "/api/v1/" : `http://localhost:5000/api/v1/`,
    withCredentials: true,
});
