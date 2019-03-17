import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/Lock";
import SelectionBoard from "./SelectionBoard";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  title: {
    margin: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 2}px`
  },
  toolbar: theme.mixins.toolbar
});

class GameSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          {this.props.currentEvent
            ? `Event #${this.props.currentEvent.number} - ${
                this.props.currentEvent.name
              }`
            : ""}
          {this.props.currentEvent && this.props.currentEvent.locked ? (
            <Lock />
          ) : (
            ""
          )}
        </Typography>
        <SelectionBoard teams={this.props.teams} />
      </main>
    );
  }
}

GameSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameSection);
