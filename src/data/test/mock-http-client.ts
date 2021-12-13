import {
  HttpPostClient,
  HttpPostParams,
} from "@/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HTTP_STATUS_CODE,
} from "@/data/protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HTTP_STATUS_CODE.OK,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
