import { HttpPostClient, HTTP_STATUS_CODE } from "@/data/protocols/http";
import { UnexpedctedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-use-error";
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/useCases/add-account";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        return httpResponse.body;
      case HTTP_STATUS_CODE.FORBIDDEN:
        throw new EmailInUseError();
      default:
        throw new UnexpedctedError();
    }
  }
}
