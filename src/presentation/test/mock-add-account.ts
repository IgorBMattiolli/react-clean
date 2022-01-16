import { mockAccountModel } from "@/domain/test";
import { AddAccount } from "@/domain/useCases";
import faker from "faker";

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccount.Params;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
