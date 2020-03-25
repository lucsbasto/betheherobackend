const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async store(req, res) {
    const { name, email, whatsapp, city, UF } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");
    const ong = {
      id,
      name,
      email,
      whatsapp,
      city,
      UF
    };
    await connection("ongs").insert(ong);
    return res.json({ id: id });
  },

  async index(req, res) {
    const ongs = await connection("ongs").select("*");
    return res.json(ongs);
  }
};
