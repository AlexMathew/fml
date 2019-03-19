import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Red from "@material-ui/core/colors/red";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  winnersAvatar: {
    color: "#fff",
    backgroundColor: Red[500]
  },
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  }
};

class Team extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.team.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Avatar
                className={this.props.index < 3 ? classes.winnersAvatar : ""}
              >
                {this.props.index + 1}
              </Avatar>
            </Typography>
          </CardContent>
        </div>
        <CardMedia className={classes.cover} image="" title="" />
      </Card>
    );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);
