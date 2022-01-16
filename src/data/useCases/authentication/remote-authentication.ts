import { Authentication } from "@/domain/useCases";
import { HTTP_STATUS_CODE, HttpPostClient } from "@/data/protocols/http";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
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
        throw new UnexpectedError();
    }
  }
}
export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
