import React, { Component } from "react";

class Game extends Component {
  state = {
    profile: {},
    teams: {},
    events: {}
  };

  arrayToObject = array =>
    array.reduce((obj, item) => {
      obj[item.node.id] = item.node;
      return obj;
    }, {});

  componentDidMount() {
    const data = this.props.data;
    const { id, email, username } = data.me.user;
    const profile = { id, email, username };
    const teams = this.arrayToObject(
      data.me.marblelympicsParticipated.edges[0].node.marblelympics.teams.edges
    );
    const events = this.arrayToObject(
      data.me.marblelympicsParticipated.edges[0].node.marblelympics.events.edges
    );
    this.setState({ profile, teams, events });
  }

  render() {
    return <div />;
  }
}

export default Game;
