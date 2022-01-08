import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

import Login from "./Login";
import SignUp from "./SignUp";

function LoginPopUp({ open, setOpen }) {
  const [signUpUI, setSignUpUI] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    //Reinitialiser l'interface
    setTimeout(() => {
      setSignUpUI(false);
    }, 500);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        {signUpUI ? (
          <SignUp setDialogOpen={setOpen} />
        ) : (
          <Login setSignUpUI={setSignUpUI} setDialogOpen={setOpen} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPopUp;
