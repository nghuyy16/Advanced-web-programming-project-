const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateRandomNumber } = require("../../helpers/generate.helper");
const ForgotPassword = require("../../models/forgot-password.model");
const mailHelper = require("../../helpers/mail.helper");

module.exports.login = async (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Đăng nhập"
  });
}

module.exports.loginPost = async (req, res) => {
  const { email, password, rememberPassword } = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email
  })

  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    })
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, existAccount.password);

  if(!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!"
    })
    return;
  }

  if(existAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt!"
    })
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: rememberPassword ? "7d" : "1d"
    }
  );

  res.cookie("token", token, {
    maxAge: rememberPassword ? (7 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!"
  })
}

module.exports.register = async (req, res) => {
  res.render("admin/pages/register", {
    pageTitle: "Đăng ký"
  });
}

module.exports.registerPost = async (req, res) => {
  const existAccount = await AccountAdmin.findOne({
    email: req.body.email
  })

  if(existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    })
    return;
  }

  req.body.status = "initial";

  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!"
  })
}

module.exports.registerInitial = async (req, res) => {
  res.render("admin/pages/register-initial", {
    pageTitle: "Tài khoản đã được khởi tạo"
  });
}

module.exports.forgotPassword = async (req, res) => {
  res.render("admin/pages/forgot-password", {
    pageTitle: "Quên mật khẩu"
  });
}

module.exports.forgotPasswordPost = async (req, res) => {
  const { email } = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email,
    status: "active"
  })

  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    })
    return;
  }

  const existEmailInForgotPassword = await ForgotPassword.findOne({
    email: email
  })

  if(existEmailInForgotPassword) {
    res.json({
      code: "error",
      message: "Vui lòng gửi lại yêu cầu sau 5 phút!"
    })
    return;
  }

 
  const otp = generateRandomNumber(6);


  const newRecord = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: Date.now() + 5*60*1000
  });
  await newRecord.save();

  const title = `Mã OTP lấy lại mật khẩu`;
  const content = `Mã OTP của bạn là <b style="color: green; font-size: 20px;">${otp}</b>. Mã OTP có hiệu lực trong 5 phút, vui lòng không cung cấp cho bất kỳ ai.`;
  mailHelper.sendMail(email, title, content);

  res.json({
    code: "success",
    message: "Đã gửi mã OTP qua email!"
  })
}

module.exports.otpPassword = async (req, res) => {
  res.render("admin/pages/otp-password", {
    pageTitle: "Nhập mã OTP"
  });
}

module.exports.otpPasswordPost = async (req, res) => {
  const { email, otp } = req.body;


  const existAccount = await AccountAdmin.findOne({
    email: email,
    status: "active"
  })

  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    })
    return;
  }


  const existRecordInForgotPassword = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  })

  if(!existRecordInForgotPassword) {
    res.json({
      code: "error",
      message: "Mã OTP không hợp lệ!"
    })
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({
    code: "success",
    message: "Xác thực thành công!"
  })
}

module.exports.resetPassword = async (req, res) => {
  res.render("admin/pages/reset-password", {
    pageTitle: "Đổi mật khẩu"
  });
}

module.exports.resetPasswordPost = async (req, res) => {
  const { password } = req.body;

  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await AccountAdmin.updateOne({
    _id: req.account.id
  }, {
    password: hashPassword
  });

  res.json({
    code: "success",
    message: "Đã đổi mật khẩu thành công!"
  })
}

module.exports.logoutPost = async (req, res) => {
  res.clearCookie("token");
  res.json({
    code: "success",
    message: "Đã đăng xuất!"
  })
}