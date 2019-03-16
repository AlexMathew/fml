import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SelectionBoard from "./SelectionBoard";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class GameSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SelectionBoard
          currentEvent={this.props.currentEvent}
          teams={this.props.teams}
        />
      </main>
    );
  }
}

GameSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameSection);
