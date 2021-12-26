import React, { useEffect, useState } from "react";
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import Styles from "./signup-styles.scss";
import Context from "@/presentation/contexts/form/form-context";
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation: Validation;
};
const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    nameError: "Campo obrigatório",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    passwordConfirmationError: "Campo obrigatório",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate("name", state.name),
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
      passwordConfirmationError: validation.validate(
        "passwordConfirmation",
        state.passwordConfirmation
      ),
    });
  }, [state.email, state.password, state.name, state.passwordConfirmation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar sua conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <button data-testid="submit" disabled className={Styles.submit}>
            Entrar
          </button>
          <span className={Styles.link}>Voltar para o login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
