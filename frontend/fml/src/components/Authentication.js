import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN_FIELD } from "../constants";
import { LOGIN_QUERY } from "../queries";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  error: {
    color: red[500]
  }
});

class Authentication extends React.Component {
  state = {
    username: "",
    password: "",
    error: false
  };

  componentDidMount() {
    const auth_token = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (auth_token) {
      this.props.history.push("/");
    }
  }

  _confirm = data => {
    const token = data.tokenAuth.token;
    localStorage.setItem(AUTH_TOKEN_FIELD, token);
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  };

  render() {
    const { classes } = this.props;
    const { username, password, error } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error ? (
            <Typography component="h4" variant="h6" className={classes.error}>
              Invalid credentials
            </Typography>
          ) : (
            ""
          )}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Username</InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormControl>
          <Mutation
            mutation={LOGIN_QUERY}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
            onError={() => this.setState({ error: true })}
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
                Sign in
              </Button>
            )}
          </Mutation>
        </Paper>
      </main>
    );
  }
}

Authentication.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Authentication);
