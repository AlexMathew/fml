import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { ME_QUERY } from "../queries";

class Game extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>{this.props.history.push("/login")}</div>;
          return <div>{JSON.stringify(data)}</div>;
        }}
      </Query>
    );
  }
}

export default Game;
