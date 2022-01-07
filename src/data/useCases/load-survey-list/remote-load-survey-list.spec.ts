import { HTTP_STATUS_CODE } from "@/data/protocols/http";
import { HttpGetClientSpy } from "@/data/test";
import { UnexpedctedError } from "@/domain/errors";
import { SurveyModel } from "@/domain/models";
import { mockSurveyListModel } from "@/domain/test";
import faker from "faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return {
    httpGetClientSpy,
    sut,
  };
};

describe("RemoteLoadSurveyList", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 403", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.FORBIDDEN,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(UnexpedctedError);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(UnexpedctedError);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 500", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.SERVER_ERROR,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(UnexpedctedError);
  });

  test("Should return a empty list if HttpGetClient returns 204", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NO_CONTENT,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });

  test("Should return a list of SurveyModels if HttpGetClient returns 200", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.OK,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual(httpResult);
  });
});
