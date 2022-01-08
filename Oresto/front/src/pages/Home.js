import {
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import RoomIcon from "@material-ui/icons/Room";
import React from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/home-bg.png"})`,
    backgroundSize: "cover",
    backgroundPosition: "0% 30%",
  },
  gradient: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(110deg, rgba(250,250,250,1) 32%, rgba(255,255,255,0.2528361686471463) 100%)",
    height: "inherit",
    paddingLeft: "7vw",
  },
  slogon: {
    color: theme.palette.primary.main,
    fontFamily: "Rebellion Knight Personal Use O , Montserrat",
  },
  buttonContainer: {
    margin: "1% 0",
  },
  mapSection: {
    height: "90vh",
  },
  seperator: {
    height: "90vh",
    // padding: "4rem 2rem",
    color: "white",
    // backgroundColor: theme.palette.primary.main,
    backgroundImage: "linear-gradient(110deg, #CC2121 32%, #800909 100%)",
  },
  imagesContainer: {
    paddingTop: "2rem",
  },
  imgs: {
    height: 275,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
  },
  card: {
    maxWidth: 350,
  },
  buttons: {
    color: theme.palette.primary.main,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
  },
  bgMotifs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/backgroundtiles.svg"
    })`,
    backgroundSize: "200%",
    backgroundPosition: "center",
    height: "inherit",
    width: "100vw",
  },
}));

const scrollToMap = (ref) =>
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: "smooth",
  });

function Home() {
  const classes = useStyles();

  // React.useEffect(() => {
  //   // const fetchEvents = async () => {
  //   //   setLoading(true);
  //   //   const resto = await res.json();
  //   //   console.log(resto.msg);
  //   //   setRestoData(resto.msg);
  //   //   setLoading(false);
  //   // };
  //   // const res = await fetch("http://localhost:5000/restaurant/map");
  //   // fetchEvents();

  //   fetch("http://localhost:5000/restaurant/map")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setRestoData(data.msg);
  //       setIsLoaded(true);
  //     });
  // }, []);

  const myRef = React.useRef(null);
  const executeScrollToMap = () => scrollToMap(myRef);

  return (
    <>
      <Header />

      <div className={classes.root}>
        <div className={classes.gradient}>
          <div>
            <Typography variant="h2" component="h1" className={classes.slogon}>
              Manger devient plus simple
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Le guide essentiel de restaurants à votre disposition partout où
              vous vous trouvez
            </Typography>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              onClick={executeScrollToMap}
            >
              <RoomIcon></RoomIcon>
              &nbsp;Commencer maintenant
            </Button>
          </div>
        </div>
        <div className={classes.seperator}>
          <div className={classes.bgMotifs}>
            <Typography variant="h4" style={{ margin: "40px 0px" }}>
              Découvrez nos offres
            </Typography>
            {/* <Typography variant="p"></Typography> */}
            <Grid
              className={classes.imagesContainer}
              direction="row"
              justify="space-evenly"
              container
              spacing={6}
            >
              <Grid item>
                <Card elevation={10} className={classes.card}>
                  <CardMedia
                    className={classes.imgs}
                    image={process.env.PUBLIC_URL + "/assets/food-delivery.jpg"}
                    title="En toute securité"
                  />
                  <CardContent>
                    <Typography variant="body1" component="p">
                      N'attendez plus la fin de la pandémie, béneficiez des
                      délices de nos partenaires maintenant.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      disableElevation
                      onClick={executeScrollToMap}
                      // size="small"
                      // classes={{ containedPrimary: classes.buttons }}
                    >
                      Restaurants près de chez moi
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card elevation={6} className={classes.card}>
                  <CardMedia
                    className={classes.imgs}
                    image={process.env.PUBLIC_URL + "/assets/restaurant.jpg"}
                    title="Oresto pro"
                  />
                  <CardContent>
                    <Typography variant="body1" component="p">
                      Gérer votre restaurant plus facilement et gagner plus de
                      clients en toute sécurité
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      disableElevation
                      to="/partenaire"
                      component={RouterLink}
                      // size="small"
                      // classes={{ containedPrimary: classes.buttons }}
                    >
                      Devenir partenaire
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            {/* <Grid
                  direction="column"
                  alignItems="center"
                  justify="center"
                  spacing={1}
                  container
                  style={{ maxWidth: "350px" }}
                >
                  <Grid item>
                    <div
                      className={classes.imgs}
                      style={{
                        backgroundImage: `url(${
                          process.env.PUBLIC_URL + "/assets/restaurant.jpg"
                        })`,
                      }}
                    ></div>
                    <Grid item>
                      <Typography
                        variant="body1"
                        style={{ paddingTop: "1rem" }}
                      >
                        Gérer votre restaurant plus facilement avec notre
                        interface
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        to="/partenaire"
                        component={RouterLink}
                        size="small"
                        classes={{ containedPrimary: classes.buttons }}
                      >
                        Devenir partenaire
                      </Button>
                    </Grid>
                  </Grid>
                </Grid> */}
          </div>
        </div>
        <div ref={myRef} className={classes.mapSection}>
          <Map />
        </div>
      </div>
    </>
  );
}

export default Home;
