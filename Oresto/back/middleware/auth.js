const jwt = require("jsonwebtoken");
const config = require("config");

exports.client = (req, res, next) => {
  const token = req.header("x-login-token");
  if (!token) return res.status(401).send("Accés refusé. Pas de token");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    if (decode.type !== "ROLE_CLIENT")
      return res.status(403).send("Accés refusé.");
    req.compte = decode;
    next();
  } catch (err) {
    res.status(400).send("Token invalide");
  }
};

exports.gerant = (req, res, next) => {
  const token = req.header("x-login-token");
  if (!token) return res.status(401).send("Accés refusé. Pas de token");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    if (decode.type !== "ROLE_GERANT")
      return res.status(403).send("Accés refusé.");
    req.compte = decode;
    next();
  } catch (err) {
    res.status(400).send("Token invalide");
  }
};

exports.admin = (req, res, next) => {
  const token = req.header("x-login-token");
  if (!token) return res.status(401).send("Accés refusé. Pas de token");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    if (decode.type !== "ROLE_ADMIN")
      return res.status(403).send("Accés refusé.");
    req.compte = decode;
    next();
  } catch (err) {
    res.status(400).send("Token invalide");
  }
};
