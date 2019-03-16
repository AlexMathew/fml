import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Remove from "@material-ui/icons/Remove";
import Red from "@material-ui/core/colors/red";
import Team from "./Team";

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  winnersAvatar: {
    color: "#fff",
    backgroundColor: Red[500]
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class SelectionBoard extends React.Component {
  state = {};
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              {this.props.teams.map((team, index) => (
                <ListItem key={team.node.id}>
                  <ListItemAvatar>
                    <Avatar className={index < 3 ? classes.winnersAvatar : ""}>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  {index !== 0 ? (
                    <IconButton aria-label="move-team-up" onClick={() => {}}>
                      <ArrowDropUp />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="move-team-none" onClick={() => {}}>
                      <Remove />
                    </IconButton>
                  )}
                  {index !== Object.keys(this.props.teams).length - 1 ? (
                    <IconButton aria-label="move-team-up" onClick={() => {}}>
                      <ArrowDropDown />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="move-team-none" onClick={() => {}}>
                      <Remove />
                    </IconButton>
                  )}
                  <Team team={team.node} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SelectionBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectionBoard);
