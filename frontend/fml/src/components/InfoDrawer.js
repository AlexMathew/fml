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
            <Typography variant="h5" component="h2" align="center">
              {this.props.profile.username}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
              <b>Overall points: </b>
              {this.props.profile.points}
            </Typography>
            <Typography>
              <b>Overall rank: </b>
              {this.props.profile.rank === -1
                ? this.props.marblelympics.playerCount
                : this.props.profile.rank}
            </Typography>
            <Typography>
              <b>Total player: </b>
              {this.props.marblelympics.playerCount}
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
