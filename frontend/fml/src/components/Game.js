import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import EventList from "./EventList";
import GameSection from "./GameSection";
import InfoDrawer from "./InfoDrawer";

const styles = () => ({
  root: {
    display: "flex"
  }
});

class Game extends Component {
  state = {
    profile: {},
    marblelympics: {},
    teams: [],
    events: {},
    currentEvent: {},
    eventEntries: {},
    saveActivated: false,
    saveError: ""
  };

  teamsSorted = false;

  arrayToObject = (array, specificKey) =>
    array.reduce((obj, item) => {
      const keyname = specificKey ? item.node[specificKey].id : item.node.id;
      obj[keyname] = item.node;
      return obj;
    }, {});

  componentDidMount() {
    const data = this.props.data;
    const { id, email, username } = data.me.user;
    const { points, rank } = data.me.marblelympicsParticipated.edges[0].node;
    const profile = { id, email, username, points, rank };
    const marblelympics =
      data.me.marblelympicsParticipated.edges[0].node.marblelympics;
    const teams = marblelympics.teams.edges;
    const events = this.arrayToObject(marblelympics.events.edges);
    delete marblelympics["teams"];
    delete marblelympics["events"];
    const currentEvent = events[Object.keys(events)[0]];
    const eventEntries = this.arrayToObject(
      data.me.marblelympicsParticipated.edges[0].node.eventEntries.edges,
      "event"
    );
    this.setState({
      profile,
      marblelympics,
      teams,
      events,
      currentEvent,
      eventEntries
    });
  }

  componentDidUpdate() {
    this.sortTeamsFromEntries();
  }

  sortTeamsFromEntries = () => {
    const entry = this.state.eventEntries[this.state.currentEvent.id];
    if (!this.teamsSorted && entry) {
      const selectedTeams = entry.selections.map(
        selection => selection.team.id
      );
      let teams = this.state.teams;
      teams.map((team, index) => {
        const foundIndex = selectedTeams.indexOf(team.node.id);
        if (foundIndex !== -1) {
          [teams[index], teams[foundIndex]] = [teams[foundIndex], teams[index]];
        }
        return teams[index];
      });
      this.setState({ teams });
      this.teamsSorted = true;
    }
  };

  switchEvent = key => {
    const currentEvent = this.state.events[key];
    this.teamsSorted = false;
    this.setState({ currentEvent, saveActivated: false, saveError: "" });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const teams = this.reorder(
      this.state.teams,
      result.source.index,
      result.destination.index
    );

    this.setState({
      teams,
      saveActivated: true
    });
  };

  saveEntry = (eventId, entry) => {
    const eventEntries = { ...this.state.eventEntries };
    eventEntries[eventId] = entry;
    this.setState({
      eventEntries,
      saveActivated: false,
      saveError: ""
    });
  };

  setSaveError = error => {
    const saveError = error.message
      .split(": ")
      .slice(1)
      .join("");
    this.setState({ saveError });
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
            enteredEvents={Object.keys(this.state.eventEntries)}
            switchEvent={this.switchEvent}
          />
          <GameSection
            currentEvent={this.state.currentEvent}
            teams={this.state.teams}
            onDragEnd={this.onDragEnd}
            saveActivated={this.state.saveActivated}
            saveEntry={this.saveEntry}
            saveError={this.state.saveError}
            setSaveError={this.setSaveError}
          />
          <InfoDrawer
            profile={this.state.profile}
            marblelympics={this.state.marblelympics}
            currentEvent={this.state.currentEvent}
            currentEventEntry={
              this.state.eventEntries[this.state.currentEvent.id]
            }
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
