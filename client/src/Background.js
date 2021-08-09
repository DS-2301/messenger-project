import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import styles from "./styles";
import bubble from "./bubble.svg";
import bg from "./bg-img.png";

const useStyles = makeStyles(() => styles);

const Background = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={5} className={classes.signInUpBackground}>
      <img alt="bg" className={classes.signInUpImage} src={bg} />
      <Box className={classes.signInUpBox}>
        <img className="bubble" alt="bubble" src={bubble} />
        <Typography className={classes.signInUpText}>
          Converse with anyone with any language
        </Typography>
      </Box>
    </Grid>
  );
};

export default Background;
