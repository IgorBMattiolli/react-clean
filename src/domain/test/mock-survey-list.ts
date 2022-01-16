import faker from "faker";
import { LoadSurveyList } from "../useCases";

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.words(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.random.boolean(),
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
