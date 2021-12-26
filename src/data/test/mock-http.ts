import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HTTP_STATUS_CODE,
} from "@/data/protocols/http";
import faker from "faker";

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
    return this.response;
  }
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});