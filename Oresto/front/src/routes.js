import { Route, Redirect, Switch } from "react-router-dom";
import GerantDashboard from "./pages/GerantDashboard";
import DevenirPartenaire from "./components/DevenirPartenaire";
import Home from "./pages/Home";

import Page404 from "./pages/Page404";
import Resto from "./pages/Resto";
import Reservation from "./pages/Reservation";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import Map from "./pages/Map";

function UnauthRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/partenaire" component={DevenirPartenaire} exact />
      <Route path="/restaurant/:id" component={Resto} exact />
      <Route component={Page404} />
    </Switch>
  );
}
function AdminRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/mydashboard" />
      </Route>
      <Route path="/mydashboard" exact>
        <AdminDashboard />
      </Route>
      <Route component={Page404} />
    </Switch>
  );
}
function GerantRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/mydashboard" />
      </Route>
      <Route path="/mydashboard" exact>
        <GerantDashboard />
      </Route>
      <Route component={Page404} />
    </Switch>
  );
}

function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/map" />
      </Route>
      <Route path="/me">
        <ClientDashboard />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/restaurant/:id" component={Resto} exact />
      <Route path="/reservation" component={Reservation} exact />
      <Route component={Page404} />
    </Switch>
  );
}

export default function OrestoRoutes() {
  const { authenticated, userData } = useSelector((state) => state.auth);

  return (
    <>
      {!authenticated && <UnauthRoutes />}
      {authenticated && userData.type === "ROLE_GERANT" && <GerantRoutes />}
      {authenticated && userData.type === "ROLE_CLIENT" && <ClientRoutes />}
      {authenticated && userData.type === "ROLE_ADMIN" && <AdminRoutes />}
    </>
  );
}
