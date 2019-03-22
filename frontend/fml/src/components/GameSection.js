import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DraggableSelection from "./DraggableSelection";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  title: {
    margin: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 2}px`
  },
  toolbar: theme.mixins.toolbar,
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
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
          {this.props.currentEvent && this.props.currentEvent.status === 4 ? (
            <Lock
              style={{ fontSize: 20, verticalAlign: "center", paddingLeft: 5 }}
            />
          ) : (
            ""
          )}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={!this.props.saveActivated}
          className={classes.button}
          size="large"
        >
          Save
          <SaveIcon className={classes.rightIcon} />
        </Button>
        <DraggableSelection
          teams={this.props.teams}
          onDragEnd={this.props.onDragEnd}
        />
      </main>
    );
  }
}

GameSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameSection);
