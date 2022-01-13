import { Icon } from "@/presentation/components";
import React from "react";
import Styles from "./survey-item-styles.scss";
import { IconName } from "@/presentation/components/icon/icon";

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItem}>
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
  );
};

export default SurveyItem;
