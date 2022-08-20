import Axios from "axios";
import { Configuration, ApplicationApi } from "api";
import Storage from "./storage";

const configOptions = new Configuration();
const apiService = new ApplicationApi(configOptions);

export default apiService;

Axios.interceptors.request.use((config) => {
  const token = Storage.get(import.meta.env.VITE_AUTH_TOKEN);
  if (token) {
    return { ...config, headers: { Authorization: `Bearer ${token}` } };
  }
  return config;
});
