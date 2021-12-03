import { HttpPostClientSpy } from "./../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};
describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", () => {
    const url = "any_url";
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
