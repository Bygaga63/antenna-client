import React, {Component} from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import AuthService from "./service/AuthService";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import Settings from "./components/Settings";
import SecureRoute from "./hoc/SecureRoute";

let jwtToken = localStorage.jwtToken;

if (jwtToken) {
  AuthService.setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header/>
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>

            {
              //Private Routes
            }
            <Switch>
              <SecureRoute
                exact
                path="/settings"
                component={Settings}
              />
              {/*<SecuredRoute*/}
                {/*exact*/}
                {/*path="/updateProjectTask/:backlog_id/:pt_id"*/}
                {/*component={UpdateProjectTask}*/}
              {/*/>*/}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
