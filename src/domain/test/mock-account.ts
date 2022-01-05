import { AddAccountParams, AuthenticationParams } from "@/domain/useCases";
import { AccountModel } from "@/domain/models";
import faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.words(),
});

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
