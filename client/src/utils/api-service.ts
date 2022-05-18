import { Configuration, ListsApi } from "api";

const configOptions = new Configuration();
const apiService = new ListsApi(configOptions);

export default apiService;
