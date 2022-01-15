import React from "react";
import { SurveyList } from "@/presentation/pages";
import { makeRemoteLoadSurveyList } from "../../useCases/load-survey-list/remote-load-survey-list";

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
};
