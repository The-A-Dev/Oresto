import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";

import { React, useState, useEffect } from "react";
//edition formulaire de reservation
import FormulaireReservationGerant from "../components/FormulaireReservationGerant";
//les commandes avec etat e change etat DONE
import CommandesGerant from "../components/CommandesGerant";
//les reservation avec etat e change etat
import ReservationsGerant from "../components/ReservationsGerant";
import { Box, Drawer, Tab, Tabs, Typography, AppBar } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
//les avis
import AvisGerant from "../components/AvisGerant";
//les evenment
import EventsGerant from "../components/EventsGerant";
import MenuGerant from "../components/MenuGerant";
import {
  getCommandesGerantAction,
  getReservationsGerantAction,
  getFormReservationAction,
  getAvisGerantAction,
  getEventsGerantAction,
  getMenuGerantAction,
} from "../services/actions/gerantActions";
//cree un evenment
//configure menu
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
const GerantDashboard = () => {
  //redux
  const {
    commandes,
    reservations,
    avis,
    events,
    formReservation,
    loadingCommande,
    menu,
  } = useSelector((state) => state.gerant);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //react
  useEffect(() => {
    dispatch(getCommandesGerantAction());
    dispatch(getReservationsGerantAction());
    dispatch(getFormReservationAction(userData.restaurant));
    dispatch(getAvisGerantAction(userData.restaurant));
    dispatch(getEventsGerantAction(userData.restaurant));
    dispatch(getMenuGerantAction(userData.restaurant));
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          backgroundColor: "#cc2121",
          position: "relative",
          zIndex: "0",
        }}
      >
        <div style={{ maxWidth: "auto" }}>
          <AppBar
            style={{
              width: "auto",
              height: "90vh",
              top: "10vh",
              position: "relative",
              bottom: "0%",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              indicatorColor="secondary"
              style={{ width: drawerWidth, position: "relative", top: "30vh" }}
            >
              <Tab label="Commandes" />
              <Tab label="Reservations" />
              <Tab label="Formulaire de Reservation" />
              <Tab label="Avis" />
              <Tab label="Évènements" />
              <Tab label="Menu" />
            </Tabs>
          </AppBar>
        </div>
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
            {!loadingCommande && <CommandesGerant commandes={commandes} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ReservationsGerant reservations={reservations} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FormulaireReservationGerant formReservation={formReservation} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AvisGerant avisData={avis} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EventsGerant eventsData={events} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <MenuGerant menuData={menu} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
};

export default GerantDashboard;
