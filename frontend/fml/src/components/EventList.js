import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 640
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
});

class EventList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              {Object.keys(this.props.events).map(key => (
                <ListItem key={key}>
                  <ListItemAvatar>
                    <Avatar>{this.props.events[key].number}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.events[key].name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="go-to-event"
                      onClick={() => this.props.switchEvent(key)}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
