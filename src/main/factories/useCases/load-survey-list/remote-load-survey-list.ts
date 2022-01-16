import { makeAuthorizeHttpGetClientDecorator } from "@/main/factories/decorators/authorize-http-get-client-decorator-factorie";
import { LoadSurveyList } from "@/domain/useCases";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { RemoteLoadSurveyList } from "@/data/useCases/load-survey-list/remote-load-survey-list";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl("/surveys"),
    makeAuthorizeHttpGetClientDecorator()
  );
};
