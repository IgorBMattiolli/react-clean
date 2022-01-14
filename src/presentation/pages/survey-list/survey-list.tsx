import Styles from "./survey-list-styles.scss";
import React, { useEffect } from "react";
import { Footer, Header } from "@/presentation/components";
import { SurveyItemEmpty, SurveyItem } from "./components";
import { LoadSurveyList } from "@/domain/useCases";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
