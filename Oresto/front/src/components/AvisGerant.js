import { React } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";

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

const AvisGerant = ({ avisData }) => {
  const classes = useStyles();
  return (
    <Grid container justify="space-evenly" alignItems="flex-start" spacing={2}>
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
              <div>{element.commentaire}</div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvisGerant;
