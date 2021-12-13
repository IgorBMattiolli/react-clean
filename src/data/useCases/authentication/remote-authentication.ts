import { InvalidCredentialsError } from "./../../../domain/errors/invalid-credentails-error";
import { AuthenticationParams } from "@/domain/useCases/authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import {
  HttpResponse,
  HTTP_STATUS_CODE,
} from "@/data/protocols/http/http-response";
import { UnexpedctedError } from "@/domain/errors/unexpected-error";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        break;
      case HTTP_STATUS_CODE.UNATHORIZED:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpedctedError();
    }
  }
}
