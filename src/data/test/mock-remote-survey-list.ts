import { RemoteLoadSurveyList } from "@/data/useCases/load-survey-list/remote-load-survey-list";
import faker from "faker";

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.words(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.random.boolean(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
