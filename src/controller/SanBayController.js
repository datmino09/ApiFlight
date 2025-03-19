const db = require("../models");
const SanBay = db.sanbay;
class SanBayController {
  async getByKhuVuc(req, res){
    try {
        const {MaKhuVuc} = req.params; 
      const sanbay = await SanBay.findAll({
        where:{
            MaKhuVuc
        }
      });
      res.json(sanbay);
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
}
module.exports = new SanBayController();
