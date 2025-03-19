const db = require("../models");
const KhuVuc = db.khuvuc;
class KhuVucController {
  async getAll(req, res){
    try {
      const khuvuc = await KhuVuc.findAll();
      res.json(khuvuc);
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
}
module.exports = new KhuVucController();
