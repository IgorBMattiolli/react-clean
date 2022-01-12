import { HttpGetClient, HTTP_STATUS_CODE } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/useCases/load-survey-list";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HTTP_STATUS_CODE.OK:
        return httpResponse.body;
      case HTTP_STATUS_CODE.NO_CONTENT:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
