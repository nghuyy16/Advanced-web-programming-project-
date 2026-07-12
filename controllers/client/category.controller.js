const Category = require("../../models/category.model");
const categoryHelper = require("../../helpers/category.helper");
const moment = require("moment");
const Tour = require("../../models/tour.model");

module.exports.list = async (req, res) => {
  const slug = req.params.slug;

  // Thông tin chi tiết danh mục
  const categoryDetail = await Category
    .findOne({
      slug: slug,
      deleted: false,
      status: "active"
    })

  if(!categoryDetail) {
    res.redirect("/");
    return;
  }
  // Hết Thông tin chi tiết danh mục

  // Breadcrumb
  const breadcrumb = [];

  if(categoryDetail.parent) {
    const categoryParentList = await categoryHelper.getCategoryParent(categoryDetail.parent);
    for (const item of categoryParentList) {
      breadcrumb.push(item);
    }
  }

  breadcrumb.push({
    id: categoryDetail.id,
    name: categoryDetail.name,
    avatar: categoryDetail.avatar,
    slug: categoryDetail.slug,
  });
  // Hết Breadcrumb

  // Danh sách tour
  const categoryId = categoryDetail.id;
  const categoryChild = await categoryHelper.getCategoryChild(categoryId);
  const categoryChildId = categoryChild.map(item => item.id);

  const tourList = await Tour
    .find({
      category: {
        $in: [
          categoryId,
          ...categoryChildId
        ]
      },
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })

  for (const item of tourList) {
    item.discount = Math.floor(((item.priceAdult - item.priceNewAdult) / item.priceAdult) * 100);

    if(item.departureDate) {
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
    }
  }
  // Hết Danh sách tour

  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
    categoryDetail: categoryDetail,
    breadcrumb: breadcrumb,
    tourList: tourList
  });
}