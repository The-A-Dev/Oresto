const express = require("express");
const config = require("config");
//routes
const clientRoute = require("./routes/client");
const gerantRoute = require("./routes/gerant");
const restauRoute = require("./routes/restaurant");
const authRoute = require("./routes/auth");
const avisRoute = require("./routes/avis");
const commandeRoute = require("./routes/commande");
const reservRoute = require("./routes/reservation");
const evenementRoute = require("./routes/evenement");
const adminRoute = require("./routes/admin");

const connectDB = require("./db.js");

const cors = require("cors");

const app = express();
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.use(express.json());

app.use(cors({ origin: "*", exposedHeaders: ["x-login-token"] }));

connectDB();

//To add additional latency to test loadings
app.use(function (req, res, next) {
  setTimeout(next, 200);
});

app.use("/client", clientRoute);
app.use("/gerant", gerantRoute);
app.use("/restaurant", restauRoute);
app.use("/auth", authRoute);
app.use("/evenement", evenementRoute);
app.use("/reservation", reservRoute);
app.use("/avis", avisRoute);
app.use("/commande", commandeRoute);
app.use("/admin", adminRoute);

app.get("/api/array", (req, res) => {
  res.status(200).send("Helloo");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
