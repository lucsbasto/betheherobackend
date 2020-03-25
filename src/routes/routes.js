const { Router } = require("express");
const OngController = require("../controllers/OngController");
const IncidentController = require("../controllers/IncidentController");
const OngIncident = require("../controllers/OngIncident");
const SessionController = require("../controllers/SessionController");
const routes = Router();

routes.post("/login", SessionController.store);

routes.get("/ong/incidents", OngIncident.index);

routes.post("/ongs", OngController.store);

routes.get("/ongs", OngController.index);

routes.put("/ongs", (req, res) => {
  return res.json({ ok: true });
});

routes.delete("/ongs", (req, res) => {
  return res.json({ ok: true });
});

routes.post("/incidents", IncidentController.store);

routes.get("/incidents", IncidentController.index);

routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
