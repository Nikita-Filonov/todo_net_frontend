import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {PublicRoute} from "./Components/Navigation/PublicRoute";
import {Login} from "./Pages/Login/Login";
import {Registration} from "./Pages/Login/Registration";
import {AuthProvider, useAuth} from "./Providers/AuthProvider";
import {NavigationNavbar} from "./Components/Navigation/Navbar";
import {PrivateRoute} from "./Components/Navigation/PrivateRoute";
import Tasks from "./Pages/Tasks/Tasks";
import {TasksProvider} from "./Providers/TasksProvider";

const CustomRoutes = () => {
  const {token} = useAuth();

  return (
    <Router>
      {token && <NavigationNavbar/>}
      <div>
        <Switch>
          <PublicRoute exact path="/login" component={Login}/>
          <PublicRoute exact path="/registration" component={Registration}/>
          <PrivateRoute exact path="/" component={Tasks}/>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <CustomRoutes/>
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
