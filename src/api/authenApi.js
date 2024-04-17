import axiosClient from "@/config/axiosClient";

const login = (usernameOrEmail, password) => {
  return axiosClient.post("/v1/auth/login", { usernameOrEmail, password });
};

const getInfoUser = () => {
  return axiosClient.get("/v1/auth/user/info");
};

export { login, getInfoUser };
