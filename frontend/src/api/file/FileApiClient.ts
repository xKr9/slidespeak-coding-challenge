import { AxiosInstance } from "axios";

export default class FileApiClient {
  private http;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async convertToPdf({ file }: { file: File }): Promise<{
    message: string;
    url: string;
  }> {
    const result = await this.http.post(
      "/convert/",
      {
        file: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  }
}
