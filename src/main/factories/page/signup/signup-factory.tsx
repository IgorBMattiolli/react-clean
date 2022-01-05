import React from "react";
import { Signup } from "@/presentation/pages";
import { makeRemoteAddAccount } from "@/main/factories/useCases/add-account/remote-add-account-factory";
import { makeLocalSaveAccessToken } from "@/main/factories/useCases/save-access-token/locals-save-access-toke";
import { makeSignupValidation } from "./signup-validation-factory";

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
