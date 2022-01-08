import { makeStyles } from "@material-ui/core/styles";
import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Appbar({ title }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={handleClick}
          className={classes.menuButton}
          color="inherit"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
