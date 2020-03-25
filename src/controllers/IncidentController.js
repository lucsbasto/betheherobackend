const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const incidents = await connection("incidents").select("*");
    return res.json({ incidents });
  },
  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const incident = {
      title,
      description,
      value,
      ong_id
    };
    const [id] = await connection("incidents").insert(incident);
    return res.json({ incident: id, ong_id });
  },
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(422).json({ error: "Id required" });
    }
    const incidents = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();
    if (!incidents) {
      return res.status(404).json({ error: "Incident not found" });
    }
    const ong_id = req.headers.authorization;
    if (incidents.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operation not allowed" });
    }
    await connection("incidents")
      .where("id", id)
      .delete();
    return res.json({ message: "Incident deleted" });
  }
};
