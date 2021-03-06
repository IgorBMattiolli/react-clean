import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-factory";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set("account", account);
};

export const getCurrentAccountAdapter = (): any => {
  return makeLocalStorageAdapter().get("account");
};
