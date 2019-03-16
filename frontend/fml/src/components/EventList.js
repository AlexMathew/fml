import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import EventListIcons from "./EventListIcons";

const drawerWidth = 320;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class EventList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {Object.keys(this.props.events).map(key => (
            <ListItem key={key}>
              <ListItemAvatar>
                <Avatar>{this.props.events[key].number}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={this.props.events[key].name}
                secondary={
                  <EventListIcons
                    event={this.props.events[key]}
                    enteredEvents={this.props.enteredEvents}
                  />
                }
              />

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
      </Drawer>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
