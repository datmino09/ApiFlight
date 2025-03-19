const db = require("../models");
const User = db.user;
const crypto = require("crypto");
class UserController {
  async loginApp(req, res) {
    try {
      const { username, password } = req.body;
      const password_md5 = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      const user = await User.findOne({
        where: {
          username,
          password: password_md5,
        },
      });
      if (user) return res.json({ data: user, success: true });
      return res.json({ success: false });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  async registerApp(req, res) {
    try {
      const { username, password } = req.body;
      const password_md5 = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      const isExist = await UserController.checkAccount(
        username
      );
      if (isExist) {
        return res.status(409).json({ message: "Tài khoản đã tồn tại!",success:false });
      }
      const newUser = await User.create({ username, password: password_md5 });

      return res.json({ success:true, user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  static async checkAccount(username) {
    try {
      const user = await User.findOne({ where: { username } });
      if (user) return true;

      return false;
    } catch (error) {
      console.error("Lỗi: ", error.message);
      return false;
    }
  }
}
module.exports = new UserController();
