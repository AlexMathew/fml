import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {};

class Team extends React.Component {
  render() {
    // const { classes } = this.props;

    return <ListItemText primary={this.props.team.name} />;
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);
