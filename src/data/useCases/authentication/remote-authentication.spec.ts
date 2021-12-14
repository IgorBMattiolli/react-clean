import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test";
import { InvalidCredentialsError, UnexpedctedError } from "@/domain/errors";
import { HTTP_STATUS_CODE } from "@/data/protocols/http";
import { AccountModel } from "@/domain/models";
import { AuthenticationParams } from "@/domain/useCases";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
import faker from "faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
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
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw UnexpedctedError if HttpPostClient return 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpedctedError());
  });

  test("Should throw UnexpedctedError if HttpPostClient return 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.SERVER_ERROR,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpedctedError());
  });

  test("Should throw UnexpedctedError if HttpPostClient return 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpedctedError());
  });

  test("Should return an AccountModel if HttpPostClient return 200", async () => {
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
