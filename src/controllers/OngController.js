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
  },

  async update(req, res) {
    const ong_id = req.headers.authorization;
    const { name, email, whatsapp, city, UF } = req.body;
    if (!ong_id) {
      return res
        .status(401)
        .json({ error: "You need to be logged to do this action" });
    }
    let ong = await connection("ongs")
      .where("id", ong_id)
      .select("*")
      .first();
    const new_ong = {
      name: name || ong.name,
      email: email || ong.email,
      whatsapp: whatsapp || ong.whatsapp,
      city: city || ong.city,
      UF: UF || ong.uf
    };
    await connection("ongs")
      .where("id", ong_id)
      .update(new_ong);
    ong = await connection("ongs")
      .where("id", ong_id)
      .select("*")
      .first();
    return res.json({ ong });
  },

  async delete(req, res) {
    const ong_id = req.headers.authorization;
    if (ong_id) {
      return res
        .status(401)
        .json({ error: "You need to be logged to do this action" });
    }
    const ong = await connection("ongs")
      .where("id", ong_id)
      .delete();

    if (!ong) {
      return res.status(404).json({ error: " not found" });
    }
  }
};
