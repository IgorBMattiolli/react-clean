import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", () => {
    const url = "any_url";
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
