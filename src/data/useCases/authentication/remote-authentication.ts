import { Authentication, AuthenticationParams } from "@/domain/useCases";
import { HTTP_STATUS_CODE, HttpPostClient } from "@/data/protocols/http";
import { UnexpedctedError, InvalidCredentialsError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        return httpResponse.body;
      case HTTP_STATUS_CODE.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpedctedError();
    }
  }
}
