import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
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
    const { teams, eventNumber } = this.props;
    const [team1, team2, team3] = teams.slice(0, 3).map(team => team.node.name);

    return (
      <Mutation
        mutation={EVENT_ENTRY_MUTATION}
        variables={{ eventNumber, team1, team2, team3 }}
        onCompleted={data => this._confirm(data)}
      >
        {mutation => (
          <Button
            variant="contained"
            color="primary"
            disabled={!this.props.saveActivated}
            className={classes.button}
            size="large"
            onClick={mutation}
          >
            Save
            <SaveIcon className={classes.rightIcon} />
          </Button>
        )}
      </Mutation>
    );
  }
}

SaveAction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SaveAction);
