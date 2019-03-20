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
    maxWidth: 400,
    maxHeight: 250,
    textAlign: "center",
    align: "center"
  },
  media: {
    height: 150
  }
};

class Team extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.team.cdnImage}
          title={this.props.team.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.index < 3 ? (
              <Avatar className={classes.winnersAvatar}>
                {this.props.index + 1}
              </Avatar>
            ) : (
              <Avatar />
            )}
            {this.props.team.name}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);
