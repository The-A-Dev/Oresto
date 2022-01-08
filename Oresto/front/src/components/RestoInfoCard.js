import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    maxWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 600,
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  iconFilled: {
    color: theme.palette.primary.main,
  },
}));

export default function RestoInfoCard({ restoInfo }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {restoInfo.nom}
        </Typography>
        <Grid container>
          <Grid item>
            <Rating
              classes={{
                iconFilled: classes.iconFilled,
              }}
              value={restoInfo.noteMoyenne}
              readOnly
              name="informatique"
            />
          </Grid>
          <Grid item>
            <Typography color="textSecondary" component="p">
              ({restoInfo.nbrAvis})
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.tags}>
          {restoInfo.tags.map((value, index) => (
            <Chip
              key={index}
              label={value}
              variant="default"
              size="small"
              color="primary"
            />
          ))}
        </div>
        <CardActions style={{ padding: "10px 0px" }}>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            component={RouterLink}
            to={`/restaurant/${restoInfo._id}`}
            size="small"
          >
            Plus d'information
          </Button>
        </CardActions>
        {/* <Chip label="Calme" variant="outlined" size="small" color="primary" />
          <Chip
            label="Alcool"
            variant="outlined"
            size="small"
            color="primary"
          />
          <Chip
            label="Restaurant touristique"
            variant="outlined"
            size="small"
            color="primary"
          /> */}
      </CardContent>
    </Card>
  );
}
