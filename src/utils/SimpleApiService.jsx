import axios from "axios";
import { base_url, headerConfig } from "./ApiService";


const SimpleAxiosService = axios.create({
  baseURL: base_url,
  headerConfig,
});

export default SimpleAxiosService;