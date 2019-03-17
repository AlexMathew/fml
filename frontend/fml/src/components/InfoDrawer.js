import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 320;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
});

class InfoDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" component="h2" align="center">
              {this.props.profile.username}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
              <strong>Overall points: </strong>
              {this.props.profile.points}
            </Typography>
            <Typography>
              <strong>Overall rank: </strong>
              {this.props.profile.rank !== -1
                ? this.props.profile.rank
                : this.props.marblelympics.playerCount}
            </Typography>
            <Typography>
              <strong>Total players: </strong>
              {this.props.marblelympics.playerCount}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h5" align="center">
              EVENT DETAILS
            </Typography>
            <Typography variant="h6" component="h6" align="center">
              {`#${this.props.currentEvent.number}`}
            </Typography>
            <Typography variant="h6" component="h6" align="center">
              {`${this.props.currentEvent.name}`}
            </Typography>
            <Typography>
              <strong>Event points: </strong>
              {this.props.currentEventEntry
                ? this.props.currentEventEntry.points
                : "0"}
            </Typography>
            <Typography>
              <strong>Event rank: </strong>
              {this.props.currentEventEntry &&
              this.props.currentEventEntry.rank !== -1
                ? this.props.currentEventEntry.rank
                : this.props.currentEvent.entryCount}
            </Typography>
            <Typography>
              <strong>Total entries for event: </strong>
              {this.props.currentEvent.entryCount}
            </Typography>
          </CardContent>
        </Card>
      </Drawer>
    );
  }
}

InfoDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoDrawer);
