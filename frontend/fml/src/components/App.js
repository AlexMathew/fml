import React, { Component } from "react";
import Home from "./Home";
import Authentication from "./Authentication";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Authentication} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
