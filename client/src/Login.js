import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import styles from "./styles";
import Background from "./Background";

const useStyles = makeStyles(() => styles);

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.main}>
      <Background />
      <Grid
        item
        xs
        container
        alignItems="center"
        direction="column"
        className={classes.signInUpContext}
      >
        <Grid item xs container justifyContent="flex-end" alignItems="center">
          <Grid item xs={3}>
            <Typography className={classes.question} color="secondary">
              Don’t have an account?
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.routerButtonContainer}>
            <Button
              className={classes.routerButton2}
              onClick={() => history.push("/register")}
            >
              Create account
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs className={classes.titleContainer}>
            <Typography className={classes.title} variant={"h4"}>
              Welcome back!
            </Typography>
          </Grid>
          <Grid item xs>
            <form onSubmit={handleLogin}>
              <Grid>
                <Grid>
                  <FormControl margin="normal">
                    <TextField
                      className={classes.input}
                      aria-label="username"
                      label="E-mail address"
                      name="username"
                      size="medium"
                      type="text"
                      margin="normal"
                      InputProps={{ classes: { root: classes.inputRoot } }}
                      InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                          focused: classes.labelFocused,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <FormControl fullWidth={true} margin="normal" required>
                  <TextField
                    className={classes.input}
                    label="Password"
                    aria-label="password"
                    type="password"
                    size="small"
                    name="password"
                    margin="normal"
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                </FormControl>
                <Grid className={classes.submitButtonContainer}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButton}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
