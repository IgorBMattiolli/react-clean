import { InvalidCredentialsError } from "./../../../domain/errors/invalid-credentails-error";
import { AuthenticationParams } from "@/domain/useCases/authentication";
import { HTTP_STATUS_CODE } from "@/data/protocols/http/http-response";
import { UnexpedctedError } from "@/domain/errors/unexpected-error";
import { AccountModel } from "@/domain/models/account-models";
import { HttpPostClient } from "@/data/protocols/http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
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
