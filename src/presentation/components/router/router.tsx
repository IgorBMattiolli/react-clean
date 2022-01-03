import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

type Props = {
  makeLogin: React.FC;
  makeSignup: React.FC;
};
const Router: React.FC<Props> = ({ makeLogin, makeSignup }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
