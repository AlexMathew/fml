import React, { Component } from "react";
import { Query } from "react-apollo";
import { ME_QUERY } from "../queries";
import Game from "./Game";

class Home extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>{this.props.history.push("/login")}</div>;
          return <Game data={data} />;
        }}
      </Query>
    );
  }
}

export default Home;
