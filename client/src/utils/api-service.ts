import { Configuration, ApplicationApi } from "api";

const configOptions = new Configuration();
const apiService = new ApplicationApi(configOptions);

export default apiService;
