import React, { useState } from "react";
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import Styles from "./login-styles.scss";
import Context from "@/presentation/contexts/form/form-context";

type StateProps = {
  isLoading: boolean;
};

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: "",
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite sue e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            type="submit"
            className={Styles.submit}
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
