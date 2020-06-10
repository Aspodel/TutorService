import React, { Component } from "react";
import UI from "./Component/ui";
import Login from "./Component/login";

class App extends Component {
  state = { isLogin: false };

  // checkLogin=(login)=>{


  // }

  render() {
    return (
      <React.Fragment>{this.state.isLogin ? <UI /> : <Login />}</React.Fragment>
    );
  }
}

export default App;
