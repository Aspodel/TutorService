import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Component/style/style.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UI from "./Component/ui";
import Register from "./Component/register/register";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Test from "./Component/test";
import CreateRequest from "./Component/create_request";
import RequestDetail from "./Component/request_detail";
import Menu from "./Component/menu";
import Navbar from "./Component/nav_bar";
import Explore from "./Component/explore";
import DetailExplore from "./Component/detail_explore";

const routs = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/ui" component={UI} />
      <Route path="/register" component={Register} />
      <Route path="/test" component={Test} />
      <Route path="/newrequest" component={CreateRequest} />
      <Route path="/requestdetail" component={RequestDetail} />
      <Route path="/menu" component={Menu} />
      <Route path="/nav" component={Navbar} />
      <Route path="/explore" component={Explore} />
      <Route path="/detailexplore" component={DetailExplore} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routs, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
