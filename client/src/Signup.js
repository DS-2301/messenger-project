import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import styles from "./styles";
import Background from "./Background";

const useStyles = makeStyles(() => styles);

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
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
          <Grid item xs={4}>
            <Typography className={classes.question} color="secondary">
              Already have an account?
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.routerButtonContainer}>
            <Button
              className={classes.routerButton1}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs className={classes.titleContainer}>
            <Typography className={classes.title} variant={"h4"}>
              Create an account.
            </Typography>
          </Grid>
          <Grid item xs>
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid>
                  <FormControl margin="normal">
                    <TextField
                      className={classes.input}
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      size="medium"
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
                <Grid>
                  <FormControl margin="normal">
                    <TextField
                      className={classes.input}
                      aria-label="e-mail address"
                      label="E-mail address"
                      name="email"
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
                <Grid>
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
                </Grid>
                <Grid className={classes.submitButtonContainer}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButton}
                  >
                    Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
