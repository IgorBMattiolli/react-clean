import { AccountModel } from "@/domain/models";
import { AddAccount } from "@/domain/useCases/add-account";
import faker from "faker";
import { Authentication } from "../useCases";

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.words(),
  name: faker.name.findName(),
});

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
