import React from "react";
import CheckCirle from "@material-ui/icons/CheckCircle";
import Lock from "@material-ui/icons/Lock";

class EventListIcons extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.enteredEvents.indexOf(this.props.event.id) !== -1 ? (
          <CheckCirle />
        ) : (
          ""
        )}
        {this.props.event.status === 4 ? <Lock /> : ""}
      </React.Fragment>
    );
  }
}

export default EventListIcons;
