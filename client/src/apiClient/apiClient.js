import axios from "axios";

// let authToken = localStorage.getItem("token")
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

//inerceptor
apiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        let getRefreshToken = localStorage.getItem("refreshtoken");

        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND}/auth/refreshaccess`,
          { refreshToken: getRefreshToken },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        );
        localStorage.setItem("refreshtoken", data.refreshToken);
        localStorage.setItem("token", data.token);
        error.response.config.headers["Authorization"] = `Bearer ${data.token}`;
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;
        return apiClient.request(originalRequest);
      } catch (err) { }
    }
    throw error;
  }
);

export default apiClient;
