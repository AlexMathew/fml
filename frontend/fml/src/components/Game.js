import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import EventList from "./EventList";
import GameSection from "./GameSection";

const styles = () => ({
  root: {
    display: "flex"
  }
});

class Game extends Component {
  state = {
    profile: {},
    marblelympics: {},
    teams: {},
    events: {},
    currentEvent: {}
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
    const currentEvent = events[Object.keys(events)[0]];
    this.setState({ profile, marblelympics, teams, events, currentEvent });
  }

  switchEvent = key => {
    const currentEvent = this.state.events[key];
    this.setState({ currentEvent });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header
          history={this.props.history}
          year={this.state.marblelympics.year}
        />
        <div className={classes.root}>
          <EventList
            events={this.state.events}
            switchEvent={this.switchEvent}
          />
          <GameSection
            currentEvent={this.state.currentEvent}
            teams={this.state.teams}
          />
        </div>
      </React.Fragment>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
