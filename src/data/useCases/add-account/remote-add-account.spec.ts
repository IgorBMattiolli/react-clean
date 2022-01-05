import { HTTP_STATUS_CODE } from "@/data/protocols/http";
import { HttpPostClientSpy } from "@/data/test";
import { UnexpedctedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-use-error";
import { AccountModel } from "@/domain/models";
import { mockAccountModel, mockAddAccount } from "@/domain/test";
import { AddAccountParams } from "@/domain/useCases";
import faker from "faker";
import { RemoteAddAccount } from "./remote-add-account";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccount();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test("Should throw EmailInUseError if HttpPostClient return 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.FORBIDDEN,
    };
    await expect(sut.add(mockAddAccount())).rejects.toBeInstanceOf(
      EmailInUseError
    );
  });

  test("Should throw UnexpedctedError if HttpPostClient return 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    };
    await expect(sut.add(mockAddAccount())).rejects.toBeInstanceOf(
      UnexpedctedError
    );
  });

  test("Should throw UnexpedctedError if HttpPostClient return 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.SERVER_ERROR,
    };
    await expect(sut.add(mockAddAccount())).rejects.toBeInstanceOf(
      UnexpedctedError
    );
  });

  test("Should throw UnexpedctedError if HttpPostClient return 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    };
    await expect(sut.add(mockAddAccount())).rejects.toBeInstanceOf(
      UnexpedctedError
    );
  });

  test("Should return an AccountModel if HttpPostClient return 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.OK,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccount());
    expect(account).toEqual(httpResult);
  });
});
