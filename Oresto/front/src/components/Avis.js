import { React, useState } from "react";
import { useHistory } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  makeStyles,
  CardActions,
  IconButton,
} from "@material-ui/core";
//import avisData from "../util/avisData";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useSelector, useDispatch } from "react-redux";

import { Rating } from "@material-ui/lab";
import { newAvisAction } from "../services/actions/dataActions";
import Scrollbars from "react-custom-scrollbars";
// let user = { nom: "Hassen Younsi" };

const useStyles = makeStyles((theme) => ({
  iconFilled: {
    color: theme.palette.primary.main,
  },
  iconEmpty: {
    color: theme.palette.secondary.main,
    opacity: "0.5",
  },
  myComment: {
    minWidth: "20rem",
    width: "10vw",
  },
  avis: {
    minWidth: "20rem",
    width: "10vw",
  },
  send: {},
}));

const Avis = ({ avisData, restoID }) => {
  const [clicked, setClicked] = useState(false);
  const { authenticated, userData } = useSelector((state) => state.auth);
  let [avis, setAvis] = useState({ nombreEtoile: "1", commentaire: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(avis);
  const handleChangeComment = (event) => {
    setAvis((prevAvis) => ({
      ...prevAvis,
      commentaire: event.target.value,
    }));
  };
  const handleChangeRatings = (event) => {
    setAvis((prevAvis) => ({
      ...prevAvis,
      nombreEtoile: event.target.value,
    }));
  };
  const handleChangeSend = () => {
    // setAvis((prevAvis) => ({
    //   ...prevAvis,
    //   send: true,
    // }));
    avis = { ...avis, nomAuteur: userData.nom };
    dispatch(newAvisAction(restoID, avis, history));
  };
  const handleClick = () => {
    setClicked(true);
  };
  const classes = useStyles();

  return (
    <>
      {avisData.length === 0 && (
        <Card style={{ marginBottom: 20, padding: 20 }}>
          <Typography
            variant="h6"
            color="primary"
            style={{ position: "relative", maxWidth: "50vw", margin: "0" }}
          >
            Ce restaurant n'a pas encore d'avis
          </Typography>
        </Card>
      )}
      <Grid
        container
        justify="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        {console.log(avisData)}
        {avisData.map((element) => (
          <Grid item>
            <Card className={classes.avis}>
              <CardHeader
                title={
                  <Typography className={classes.nom}>
                    {element.nomAuteur}
                  </Typography>
                }
                subheader={
                  <Typography className={classes.date}>
                    {new Date(element.date).toLocaleString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                }
              />
              <CardContent className={classes.comment}>
                <Rating
                  classes={{
                    iconFilled: classes.iconFilled,
                    iconEmpty: classes.iconEmpty,
                  }}
                  value={element.nombreEtoile}
                  readOnly
                />
                <div style={{ height: "15vh" }}>
                  <Scrollbars>{element.commentaire}</Scrollbars>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {authenticated && (
          <Grid item alignContent="center">
            <Card className={classes.myComment}>
              <CardContent>
                <Typography>{userData.nom}</Typography>
                <Rating
                  defaultValue={1}
                  classes={{
                    iconFilled: classes.iconFilled,
                    iconEmpty: classes.iconEmpty,
                  }}
                  onChange={handleChangeRatings}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  className={classes.myCommentContent}
                  multiline
                  onFocus={handleClick}
                  rows={clicked ? 10 : 2}
                  onChange={handleChangeComment}
                />
              </CardContent>
              <CardActions>
                <IconButton className={classes.send} onClick={handleChangeSend}>
                  <SendRoundedIcon color="primary" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Avis;
