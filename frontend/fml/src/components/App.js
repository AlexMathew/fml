import React, { Component } from "react";
import "../styles/App.css";
import { Query } from "react-apollo";
import { ME_QUERY } from "../queries";

class App extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
          return <div>{JSON.stringify(data)}</div>;
        }}
      </Query>
    );
  }
}

export default App;
