const Tour = require("../../models/tour.model");
const City = require("../../models/city.model");
const moment = require("moment");

module.exports.cart = async (req, res) => {
  res.render("client/pages/cart", {
    pageTitle: "Giỏ hàng"
  });
}

module.exports.detailPost = async (req, res) => {
  try {
    const cart = req.body;
    const cartDetail = [];

    for (const item of cart) {
      const tourInfo = await Tour
        .findOne({
          _id: item.tourId,
          status: "active",
          deleted: false
        })
      if(tourInfo) {
        const cityInfo = await City.findOne({
          _id: item.locationFrom
        });

        const itemDetail = {
          ...item,
          avatar: tourInfo.avatar,
          name: tourInfo.name,
          slug: tourInfo.slug,
          departureDate: moment(tourInfo.departureDate).format("DD/MM/YYYY"),
          cityName: cityInfo.name,
          priceNewAdult: tourInfo.priceNewAdult,
          priceNewChildren: tourInfo.priceNewChildren,
          priceNewBaby: tourInfo.priceNewBaby,
          stockAdult: tourInfo.stockAdult,
          stockChildren: tourInfo.stockChildren,
          stockBaby: tourInfo.stockBaby,
        };
        cartDetail.push(itemDetail);
      }
    }

    res.json({
      code: "success",
      message: "Thành công!",
      cart: cartDetail
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}