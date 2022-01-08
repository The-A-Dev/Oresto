import { React, useState, useEffect } from "react";
import Header from "../components/Header";

import CommandesClient from "../components/CommandesClient";
//les reservation avec etat e change etat
import ReservationsClient from "../components/ReservationsClient";
import { Box, Drawer, Tab, Tabs, Typography, AppBar } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import AvisClient from "../components/AvisClient";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientAvisAction,
  getClientCommandesAction,
  getClientReservationAction,
} from "../services/actions/clientActions";

const drawerWidth = "20vw";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={index === 0 ? 0 : 3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const ClientDashboard = () => {
  const { commandes, loadingCommandes, reservations, avis } = useSelector(
    (state) => state.client
  );
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getClientCommandesAction());
    dispatch(getClientReservationAction());
    dispatch(getClientAvisAction());
  }, []);
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Header />
      <Drawer
        variant="permanent"
        style={{
          width: drawerWidth,
          top: "10vh",
          height: "0vh",
          position: "relative",
          zIndex: "0",
        }}
      >
        <AppBar
          style={{
            width: "auto",
            height: "90vh",
            position: "relative",
            top: "10vh",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            aria-label="simple tabs example"
            style={{ width: drawerWidth, position: "relative", top: "38vh" }}
          >
            <Tab label="Commandes" />
            <Tab label="Reservations" />
            <Tab label="Avis" />
          </Tabs>
        </AppBar>
      </Drawer>

      <div style={{ width: `80vw`, marginLeft: `11vw` }}>
        <SwipeableViews
          axis="x-reverse"
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{
            width: `80vw`,
            marginLeft: `11vw`,
          }}
        >
          <TabPanel value={value} index={0}>
            {!loadingCommandes && <CommandesClient commandes={commandes} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ReservationsClient reservations={reservations} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <AvisClient avisData={avis} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
};

export default ClientDashboard;
