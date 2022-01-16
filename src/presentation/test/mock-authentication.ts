import faker from "faker";
import { mockAccountModel } from "@/domain/test";
import { Authentication } from "@/domain/useCases";

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();
export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
