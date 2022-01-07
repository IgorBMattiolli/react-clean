import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";
// ADAPTER
export class AxiosHttpClient implements HttpPostClient<any> {
  async post(params: HttpPostParams): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
