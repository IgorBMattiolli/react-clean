import { AccountModel } from "../models/account-models";

type AuthenticationParams = {
  emai: string;
  password: string;
};
export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
}
