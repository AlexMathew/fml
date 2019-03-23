import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

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
  render() {
    const { classes } = this.props;

    return (
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
    );
  }
}

SaveAction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SaveAction);
