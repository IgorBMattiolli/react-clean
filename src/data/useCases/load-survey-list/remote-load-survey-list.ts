import { AccessDeniedError } from "./../../../domain/errors/access-denied-error";
import { HttpGetClient, HTTP_STATUS_CODE } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/useCases/load-survey-list";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        return remoteSurveys.map((remoteSurvey) =>
          Object.assign(remoteSurvey, {
            date: new Date(remoteSurvey.date),
          })
        );
      case HTTP_STATUS_CODE.NO_CONTENT:
        return [];
      case HTTP_STATUS_CODE.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}
