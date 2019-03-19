import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Red from "@material-ui/core/colors/red";

const styles = {
  winnersAvatar: {
    color: "#fff",
    backgroundColor: Red[500]
  }
};

class Team extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ListItem key={this.props.team.id}>
        <ListItemAvatar>
          <Avatar className={this.props.index < 3 ? classes.winnersAvatar : ""}>
            {this.props.index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={this.props.team.name} />
      </ListItem>
    );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);
