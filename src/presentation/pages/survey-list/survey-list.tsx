import Styles from "./survey-list-styles.scss";
import React from "react";
import { Footer, Header, Icon, Logo } from "@/presentation/components";
import { IconName } from "@/presentation/components/icon/icon";

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
