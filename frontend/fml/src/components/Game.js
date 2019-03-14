import React, { Component } from "react";
import EventList from "./EventList";

class Game extends Component {
  state = {
    profile: {},
    marblelympics: {},
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
    const marblelympics =
      data.me.marblelympicsParticipated.edges[0].node.marblelympics;
    const teams = this.arrayToObject(marblelympics.teams.edges);
    const events = this.arrayToObject(marblelympics.events.edges);
    delete marblelympics["teams"];
    delete marblelympics["events"];
    this.setState({ profile, marblelympics, teams, events });
  }

  render() {
    return (
      <React.Fragment>
        <EventList events={this.state.events} />
      </React.Fragment>
    );
  }
}

export default Game;
