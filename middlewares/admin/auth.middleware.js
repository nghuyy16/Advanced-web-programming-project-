const jwt = require('jsonwebtoken');
const AccountAdmin = require('../../models/account-admin.model');
const Role = require('../../models/role.model');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if(!token) {
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    const existAccount = await AccountAdmin.findOne({
      _id: id,
      email: email
    })

    if(!existAccount) {
      res.clearCookie("token");
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }

    if(existAccount.role) {
      const roleInfo = await Role.findOne({
        _id: existAccount.role
      })
      if(roleInfo) {
        existAccount.roleName = roleInfo.name;
        res.locals.permissions = roleInfo.permissions;
        req.permissions = roleInfo.permissions;
      }
    }

    req.account = existAccount;
    res.locals.account = existAccount;

    next();
  } catch (error) {
    res.clearCookie("token");
    res.redirect(`/${pathAdmin}/account/login`);
  }
}