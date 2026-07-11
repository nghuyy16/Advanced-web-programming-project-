const Tour = require("../../models/tour.model");
const City = require("../../models/city.model");
const categoryHelper = require("../../helpers/category.helper");
const moment = require("moment");

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  // Thông tin chi tiết tour
  const tourDetail = await Tour
    .findOne({
      slug: slug,
      deleted: false,
      status: "active"
    })

  if(!tourDetail) {
    res.redirect("/");
    return;
  }
  // Hết Thông tin chi tiết tour

  // Breadcrumb
  const breadcrumb = [];

  if(tourDetail.category) {
    const categoryList = await categoryHelper.getCategoryParent(tourDetail.category);
    for (const item of categoryList) {
      breadcrumb.push(item);
    }
  }

  breadcrumb.push({
    id: tourDetail.id,
    name: tourDetail.name,
    avatar: tourDetail.avatar,
    slug: tourDetail.slug,
  });
  // Hết Breadcrumb

  if(tourDetail.departureDate) {
    tourDetail.departureDateFormat = moment(tourDetail.departureDate).format("DD/MM/YYYY");
  }

  if(tourDetail.locations && tourDetail.locations.length > 0) {
    const cityList = await City
      .find({
        _id: { $in: tourDetail.locations }
      })
      .sort({
        name: "asc"
      })
    
    tourDetail.cityList = cityList;
  }

  res.render("client/pages/tour-detail", {
    pageTitle: tourDetail.name,
    breadcrumb: breadcrumb,
    tourDetail: tourDetail
  });
}