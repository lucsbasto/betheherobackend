const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 5 } = req.query;

    const [count] = await connection("ongs").count();
    const ong_id = req.headers.authorization;
    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .limit(limit)
      .offset(page)
      .select("*");

    res.header("X-Total", count["count(*)"]);
    return res.status(200).json({ incidents });
  }
};
