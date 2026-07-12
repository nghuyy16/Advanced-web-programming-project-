const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");

module.exports.edit = async (req, res) => {
  res.render("admin/pages/profile-edit", {
    pageTitle: "Thông tin cá nhân"
  });
}

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.account.id;

    const existEmail = await AccountAdmin.findOne({
      _id: { $ne: id }, // ne: not equal
      email: req.body.email
    })

    if(existEmail) {
      res.json({
        code: "error",
        message: "Email đã tồn tại trong hệ thống!"
      })
      return;
    }

    req.body.updatedBy = id;
    req.body.avatar = req.file ? req.file.path : "";

    await AccountAdmin.updateOne({
      _id: id
    }, req.body)

    res.json({
      code: "success",
      message: "Cập nhật tài khoản thành công!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}

module.exports.changePassword = async (req, res) => {
  res.render("admin/pages/profile-change-password", {
    pageTitle: "Đổi mật khẩu"
  });
}

module.exports.changePasswordPatch = async (req, res) => {
  try {
    const id = req.account.id;

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    req.body.updatedBy = id;

    await AccountAdmin.updateOne({
      _id: id
    }, req.body)

    res.json({
      code: "success",
      message: "Đổi mật khẩu thành công!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}