import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  main: {
    height: "100vh",
  },
  signInUpBackground: {
    background: "linear-gradient(#3A8DFF, #86B9FF)",
    position: "relative",
  },
  signInUpImage: {
    opacity: "15%",
    width: "41.6vw",
  },
  signInUpBox: {
    textAlign: "center",
    position: "absolute",
    top: "37%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
  },
  signInUpText: {
    color: "white",
    paddingTop: "1em",
    fontSize: "2.3em",
  },
  bubble: {
    height: "20",
  },
  signInUpContext: {
    placeSelf: "flex-start",
    marginTop: "2em",
  },
  routerButton: {
    boxShadow:
      "0px 2px 5px 0px rgba(216, 206, 206, 0.14) , 0px 1px 10px 0px rgba(110, 89, 89, 0.12) , 0px 2px 4px -1px rgba(230, 230, 230, 0.2) ",
    color: "#3A8DFF",
    padding: "1em 2em 1em 2em",
    fontSize: "1.2em",
    borderRadius: "0.3em",
  },
  routerButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  question: {
    fontSize: "1.2em",
  },
  title: {
    fontWeight: 600,
  },
  titleContainer: {
    marginTop: "7em",
    alignSelf: "flex-start",
    marginBottom: "2em",
  },
  input: {
    width: "35vw",
  },
  submitButton: {
    marginTop: "3em",
    padding: "1em 4em 1em 4em",
    fontSize: "1.2em",
    fontWeight: 600,
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  inputRoot: {
    fontSize: "1.3em",
  },
  labelRoot: {
    fontSize: "1.3em",
  },
}));

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
      <Grid item xs={5} className={classes.signInUpBackground}>
        <img
          alt="bg"
          className={classes.signInUpImage}
          src="https://i.postimg.cc/MTB4r551/bg-img.png/"
        />
        <Box className={classes.signInUpBox}>
          <img
            className="bubble"
            alt="bubble"
            src={process.env.PUBLIC_URL + "/bubble.svg"}
          />
          <Typography className={classes.signInUpText}>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Grid>
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
              className={classes.routerButton}
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
