import axios from "axios";
import FileApiClient from "./file/FileApiClient";
import { config } from "@/config";

const http = axios.create({
  baseURL: config.API_URL,
  withCredentials: false,
});

export default class ApiClient {
  static files = new FileApiClient(http);
}
