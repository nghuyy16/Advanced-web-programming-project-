const mongoose = require("mongoose");
// tạo schema cho thông tin website
const schema = new mongoose.Schema(
  {
    websiteName: String,
    phone: String,
    email: String,
    address: String,
    logo: String,
    favicon: String,
    categoryIdSection4: String,
  }
);

const SettingWebsiteInfo = mongoose.model('SettingWebsiteInfo', schema, "setting-website-info");

module.exports = SettingWebsiteInfo;