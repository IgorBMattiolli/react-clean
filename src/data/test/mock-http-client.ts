import {
  HttpPostClient,
  HttpPostParams,
} from "@/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HTTP_STATUS_CODE,
} from "@/data/protocols/http/http-response";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HTTP_STATUS_CODE.OK,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
