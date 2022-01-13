import { render, screen } from "@testing-library/react";
import React from "react";
import { SurveyList } from "@/presentation/pages";
import { LoadSurveyList } from "@/domain/useCases";
import { SurveyModel } from "@/domain/models";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount += 1;
    return [];
  }
}

type SutType = {
  loadSurveyListSpy: LoadSurveyListSpy;
};
const makeSut = (): SutType => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return {
    loadSurveyListSpy,
  };
};
describe("SurveyList Component", () => {
  test("Should present 4 empty items on start", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });

  test("Should call LoadSurveyList", () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
