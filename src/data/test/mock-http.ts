import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HTTP_STATUS_CODE,
  HttpGetClient,
  HttpGetParams,
} from "@/data/protocols/http";
import faker from "faker";

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
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

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement(),
});

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HTTP_STATUS_CODE.OK,
  };
  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return this.response;
  }
}
