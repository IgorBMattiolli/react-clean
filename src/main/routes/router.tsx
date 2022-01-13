import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeLogin } from "@/main/factories/page/login/login-factory";
import { makeSignup } from "@/main/factories/page/signup/signup-factory";
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "@/main/adapters/current-account-adapter";
import { ApiContext } from "@/presentation/contexts";
import { SurveyList } from "@/presentation/pages";
import { PrivateRoute } from "@/presentation/components";

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
          <PrivateRoute path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
