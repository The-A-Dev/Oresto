import { React, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
// import avisData from "../util/avisData";

import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { avisDeleteAction } from "../services/actions/clientActions";

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

const AvisClient = ({ avisData }) => {
  const [avis, setAvis] = useState([...avisData]);

  const dispatch = useDispatch();
  const handleDelete = (id) => () => {
    console.log(id);
    dispatch(avisDeleteAction(avis, setAvis, id));
  };

  const classes = useStyles();
  return (
    <Grid container justify="space-evenly" alignItems="flex-start" spacing={2}>
      {avis.map((element, index) => (
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
              action={
                <Button onClick={handleDelete(element._id)}>
                  <DeleteForeverIcon />
                </Button>
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
              <div>{element.commentaire}</div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvisClient;
