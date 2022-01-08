import { React, useEffect, useState } from "react";

import GerantsAdmin from "../components/GerantsAdmin";

import {
  Box,
  Drawer,
  Tab,
  Tabs,
  Typography,
  AppBar,
  Button,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useHistory } from "react-router";
import Cookie from "js-cookie";
import { SET_USER } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { getGerantsActions } from "../services/actions/dataActions";

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
const AdminDashboard = () => {
  const { gerantData, loadingGerants } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleLogout = () => {
    Cookie.remove("jwt");
    dispatch({ type: SET_USER, payload: null });
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getGerantsActions());
  }, []);

  return (
    <>
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
            width: "100%",
            height: "100vh",
            position: "relative",
          }}
        >
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={handleLogout}
            style={{ marginTop: "10px" }}
          >
            Deconnexion
          </Button>
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            aria-label="simple tabs example"
            style={{ width: "100%", position: "relative", top: "38vh" }}
          >
            <Tab label="Gerants" style={{ width: "100%" }} />
          </Tabs>
        </AppBar>
      </Drawer>

      <div style={{ width: `80vw`, marginLeft: `2vw` }}>
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
            {!loadingGerants && <GerantsAdmin gerantsData={gerantData} />}
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
};

export default AdminDashboard;
