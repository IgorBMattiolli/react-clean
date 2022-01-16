import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HTTP_STATUS_CODE } from "@/data/protocols/http";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
import faker from "faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};
describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw InvalidCredentialError if HttpPostClient return 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
    };
    await expect(sut.auth(mockAuthentication())).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  test("Should throw UnexpectedError if HttpPostClient return 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    };
    await expect(sut.auth(mockAuthentication())).rejects.toBeInstanceOf(
      UnexpectedError
    );
  });

  test("Should throw UnexpectedError if HttpPostClient return 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.SERVER_ERROR,
    };
    await expect(sut.auth(mockAuthentication())).rejects.toBeInstanceOf(
      UnexpectedError
    );
  });

  test("Should throw UnexpectedError if HttpPostClient return 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    };
    await expect(sut.auth(mockAuthentication())).rejects.toBeInstanceOf(
      UnexpectedError
    );
  });

  test("Should return an Authentication.Model if HttpPostClient return 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.OK,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
