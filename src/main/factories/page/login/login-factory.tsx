import React from "react";
import { Login } from "@/presentation/pages";
import { makeRemoteAuthentication } from "@/main/factories/useCases/authentication/remote-authenticaiton-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
