import React, { Component } from "react";
import { Query } from "react-apollo";
import { ME_QUERY } from "../queries";
import Game from "./Game";
import Header from "./Header";
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
        <Header history={this.props.history} />
        <Query query={ME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>{this.props.history.push("/login")}</div>;
            return <Game data={data} />;
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Home;
