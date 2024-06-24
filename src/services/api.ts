import axios from "axios";

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

const getNewToken = async () => {
  const response = await api.get("/token");
  return response.data.token;
};

api.interceptors.request.use(
  async (config) => {
    if (config.url === "/users" && config.method === "post") {
      const token = await getNewToken();
      config.headers["Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUsers = (page: number, count: number) => {
  return api.get(`/users?page=${page}&count=${count}`);
};

export const getPositions = () => {
  return api.get("/positions");
};

export const registerUser = (formData: FormData) => {
  return api.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
