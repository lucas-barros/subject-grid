import axios from "axios";
import { config } from "./config";

export const serverApi = axios.create({
  baseURL: config.serverHost,
});
