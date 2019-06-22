import React, {Component} from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, HashRouter} from "react-router-dom";
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
import SecuredRoute from "./hoc/SecureRoute";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddTask from "./components/ProjectBoard/ProjectTasks/AddTask";
import UpdateTask from "./components/ProjectBoard/ProjectTasks/UpdateTask";
import history from "./global/history"
import EditUser from "./components/UserManagement/EditUser";
import ReportSettings from "./components/ReportSettings";
import Report from "./components/Report";
import ClosedTasks from "./components/ClosedTasks";
import Addresses from "./components/Addresses";


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
        <HashRouter history={history}>
          <div className="App">
            <Header/>
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing}/>

            <Route exact path="/login" component={Login}/>

            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute
                exact
                path="/dashboard"
                component={ProjectBoard}
              />

              <SecuredRoute
                exact
                path="/dashboard/closed"
                component={ClosedTasks}
              />

              <SecuredRoute
                exact
                path="/settings"
                component={Settings}
              />
              <SecuredRoute
                exact
                path="/settings/addUser"
                component={Register}
              />
              <SecuredRoute
                exact
                path="/settings/editUser/:id"
                component={EditUser}
              />

              <SecuredRoute
                exact
                path="/report"
                component={ReportSettings}
              />

              <SecuredRoute
                exact
                path="/report/:reportId"
                component={Report}
              />

              <SecuredRoute
                exact
                path="/addTask"
                component={AddTask}
              />

              <SecuredRoute
                exact
                path="/updateTask/:id"
                component={UpdateTask}
              />

              <SecuredRoute
                exact
                path="/adresses"
                component={Addresses}
              />

            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
