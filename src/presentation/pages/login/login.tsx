import React, { useState, useEffect, useContext } from "react";
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import Styles from "./login-styles.scss";
import { FormContext, ApiContext } from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/useCases";
import { Link, useHistory } from "react-router-dom";
import SubmitButton from "@/presentation/components/submit-button/submit-button";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFomInvalid: true,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    validate("email");
  }, [state.email]);

  useEffect(() => {
    validate("password");
  }, [state.password]);

  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
    setState((old) => ({
      ...old,
      isFomInvalid: !!old.emailError || !!old.passwordError,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFomInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      setCurrentAccount(account);
      history.replace("/");
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton label="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
