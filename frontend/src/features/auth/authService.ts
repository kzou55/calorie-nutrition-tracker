import api from "../../utils/api";

const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; 
};

const register = async (data: { username: string; email: string; password: string }) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

const fetchCurrentUser = async (token: string) => {
    const response = await api.get(
        "auth/me", 
        {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

const authService = { login, register, fetchCurrentUser };
export default authService;