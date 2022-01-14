import { SurveyModel } from "@/domain/models";
import faker from "faker";

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.words(),
  question: faker.random.words(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(4),
    },
    { answer: faker.random.words(4) },
  ],
  date: faker.date.recent(),
  didAnswer: faker.random.boolean(),
});

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
