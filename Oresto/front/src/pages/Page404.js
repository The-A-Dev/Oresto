import { Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Page404() {
  return (
    <div className="page404">
      <img src={process.env.PUBLIC_URL + "/assets/404page.jpg"} width="700" />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        component={RouterLink}
        to="/"
      >
        Retourner à l'accueil
      </Button>
    </div>
  );
}

export default Page404;
