import Styles from "./header-styles.scss";
import { Logo } from "@/presentation/components";

import React, { memo } from "react";

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">Rodrigo</span>
          <a data-testid="logout" href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
