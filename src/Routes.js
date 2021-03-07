import React, {useContext} from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";
import Jobs from "./Jobs";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Home from "./Home";
import UserContext from "./UserContext";


function Routes({ loginFunc, signupFunc }) {
  const { currentUser } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/companies" exact>
        {currentUser ? <Companies /> : <Redirect to="/" />}
      </Route>
      <Route path="/companies/:handle" exact>
        {currentUser ? <CompanyDetails /> : <Redirect to="/" />}
      </Route>
      <Route path="/jobs" exact>
        {currentUser ? <Jobs /> : <Redirect to="/" />}
      </Route>
      <Route path="/profile" exact>
        {currentUser ? <Profile /> : <Redirect to="/" />}
      </Route>
      <Route path="/login" exact>
        <Login loginFunc={(f) => loginFunc(f)} />
      </Route>
      <Route path="/signup" exact>
        <Signup signupFunc={(f) => signupFunc(f)} />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
