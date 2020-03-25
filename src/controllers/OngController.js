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
    const { page = 1, limit = 5 } = req.query;
    const [count] = await connection("ongs").count();
    res.header("X-Total", count["count(*)"]);

    const ongs = await connection("ongs")
      .limit(limit)
      .offset((page - 1) * 5)
      .select("*");
    return res.json(ongs);
  }
};
