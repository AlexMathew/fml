import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import { LOGIN_QUERY, SIGNUP_QUERY } from "../queries";
import { AUTH_TOKEN_FIELD } from "../constants";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class AuthenticationMutation extends React.Component {
  login = data => {
    const token = data.tokenAuth.token;
    localStorage.setItem(AUTH_TOKEN_FIELD, token);
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  };

  signup = data => {
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  };

  _confirm = data => {
    this.props.login === 0 ? this.login(data) : this.signup(data);
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.props;

    return (
      <Mutation
        mutation={this.props.login === 0 ? LOGIN_QUERY : SIGNUP_QUERY}
        variables={{ username, password }}
        onCompleted={data => this._confirm(data)}
        onError={() => this.props.onError()}
      >
        {mutation => (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={mutation}
          >
            {this.props.login === 0 ? "Log in" : "Sign up"}
          </Button>
        )}
      </Mutation>
    );
  }
}

AuthenticationMutation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthenticationMutation);
