import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-factory";
import { HttpGetClient } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
};
