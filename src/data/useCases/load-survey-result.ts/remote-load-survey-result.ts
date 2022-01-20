import { HttpGetClient, HTTP_STATUS_CODE } from "@/data/protocols/http";
import { RemoteSurveyResultModel } from "@/data/models";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyResult } from "@/domain/useCases";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.get({
      url: this.url,
    });
    const remoteSurveyResult = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        throw new AccessDeniedError();
      case HTTP_STATUS_CODE.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
