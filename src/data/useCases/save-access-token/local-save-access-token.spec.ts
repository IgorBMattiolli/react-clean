import { UnexpedctedError } from "@/domain/errors";
import { SetStorageMock } from "@/data/test";
import faker from "faker";
import { LocalSaveAccessToken } from "./local-save-access-token";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};
describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.words();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("Should throw if accessTokein is falsy", async () => {
    const { sut } = makeSut();
    await expect(sut.save(undefined)).rejects.toBeInstanceOf(UnexpedctedError);
  });
});
