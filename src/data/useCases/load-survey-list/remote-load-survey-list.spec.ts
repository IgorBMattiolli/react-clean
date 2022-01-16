import { AccessDeniedError } from "./../../../domain/errors/access-denied-error";
import { HTTP_STATUS_CODE } from "@/data/protocols/http";
import { HttpGetClientSpy, mockRemoteSurveyListModel } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import faker from "faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
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

  test("Should throw AccessDeniedError if HttpGetClient returns 403", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.FORBIDDEN,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(AccessDeniedError);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(UnexpectedError);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 500", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.SERVER_ERROR,
    };
    await expect(sut.loadAll()).rejects.toBeInstanceOf(UnexpectedError);
  });

  test("Should return a empty list if HttpGetClient returns 204", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.NO_CONTENT,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });

  test("Should return a list of SurveyModels if HttpGetClient returns 200", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HTTP_STATUS_CODE.OK,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        date: new Date(httpResult[0].date),
        didAnswer: httpResult[0].didAnswer,
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        date: new Date(httpResult[1].date),
        didAnswer: httpResult[1].didAnswer,
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        date: new Date(httpResult[2].date),
        didAnswer: httpResult[2].didAnswer,
      },
    ]);
  });
});
