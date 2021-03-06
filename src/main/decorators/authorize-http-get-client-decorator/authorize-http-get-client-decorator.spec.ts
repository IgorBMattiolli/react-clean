import { mockAccountModel } from "@/domain/test";
import { HttpGetParams } from "./../../../data/protocols/http/http-get-client";
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/test";
import { AuthorizeHttpGetClientDecorator } from "./authorize-http-get-client-decorator";
import faker from "faker";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  );
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
};

describe("AuthorizeHttpGetClientDecorator", () => {
  test("Should call GetStorage with correct value", async () => {
    const { getStorageSpy, sut } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });

  test("Should not add headers if GetStorage is invalid", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words(),
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  test("Should add headers to HttpGetClient", async () => {
    const { httpGetClientSpy, getStorageSpy, sut } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("Should merge headers to HttpGetClient", async () => {
    const { httpGetClientSpy, getStorageSpy, sut } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field,
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("Should return the same result as HttpGetClient", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResponse = await sut.get(mockGetRequest());
    expect(httpResponse).toEqual(httpGetClientSpy.response);
  });
});
