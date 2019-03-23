import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { red } from "@material-ui/core/colors";
import { Mutation } from "react-apollo";
import { EVENT_ENTRY_MUTATION } from "../queries";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    verticalAlign: "center",
    fontSize: 25
  },
  error: {
    color: red[500]
  }
});

class SaveAction extends React.Component {
  _confirm = data => {
    const entry = data.upsertPlayerEntry.entry;
    const eventId = entry.event.id;
    this.props.saveEntry(eventId, entry);
  };

  render() {
    const { classes } = this.props;
    const { teams, currentEvent } = this.props;
    const eventNumber = currentEvent.number;
    const [team1, team2, team3] = teams.slice(0, 3).map(team => team.node.name);

    return (
      <Mutation
        mutation={EVENT_ENTRY_MUTATION}
        variables={{ eventNumber, team1, team2, team3 }}
        onCompleted={data => this._confirm(data)}
        onError={error => this.props.setSaveError(error)}
      >
        {mutation => (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              disabled={currentEvent.status === 4 || !this.props.saveActivated}
              className={classes.button}
              size="large"
              onClick={mutation}
            >
              Save
              <SaveIcon className={classes.rightIcon} />
            </Button>
            <Typography component="h4" variant="h6" className={classes.error}>
              {this.props.saveError || ""}
            </Typography>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

SaveAction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SaveAction);
