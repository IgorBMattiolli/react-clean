import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HTTP_STATUS_CODE,
  HttpGetClient,
  HttpGetParams,
} from "@/data/protocols/http";
import faker from "faker";

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HTTP_STATUS_CODE.OK,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return this.response;
  }
}

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string;
  response: HttpResponse<R> = {
    statusCode: HTTP_STATUS_CODE.OK,
  };
  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    return this.response;
  }
}
