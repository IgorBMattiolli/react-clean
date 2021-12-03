import { AuthenticationParams } from "@/domain/useCases/authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    return this.httpPostClient.post({
      url: this.url,
      body: params,
    });
  }
}
