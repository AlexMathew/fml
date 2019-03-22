import React, { Component } from "react";
import { Query } from "react-apollo";
import { ME_QUERY } from "../queries";
import Game from "./Game";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AUTH_TOKEN_FIELD } from "../constants";

class Home extends Component {
  componentDidMount() {
    const auth_token = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (!auth_token) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Query query={ME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <LinearProgress style={{ height: 10 }} />;
            if (error) return <div>{this.props.history.push("/login")}</div>;
            return <Game history={this.props.history} data={data} />;
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Home;
