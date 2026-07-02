const AccountAdmin = require("../../models/account-admin.model");
const Order = require("../../models/order.model");

module.exports.dashboard = async (req, res) => {
  // Thông số tổng quan
  const overview = {
    totalAdmin: 0,
    totalOrder: 0,
    totalRevenue: 0,
  };

  overview.totalAdmin = await AccountAdmin.countDocuments({
    deleted: false
  })

  const orderList = await Order.find({
    deleted: false
  })
  overview.totalOrder = orderList.length;
  overview.totalRevenue = orderList.reduce((total, item) => total + item.total, 0);
  // Hết Thông số tổng quan

  res.render("admin/pages/dashboard", {
    pageTitle: "Tổng quan",
    overview: overview
  });
}

module.exports.revenueChartPost = async (req, res) => {
  const { currentMonth, currentYear, prevMonth, prevYear, arrayDay } = req.body;

  // Truy vấn tất cả đơn hàng trong tháng hiện tại
  const orderListCurrentMonth = await Order
    .find({
      deleted: false,
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      }
    })

  // Truy vấn tất cả đơn hàng trong tháng trước
  const orderListPrevMonth = await Order
    .find({
      deleted: false,
      createdAt: {
        $gte: new Date(prevYear, prevMonth - 1, 1),
        $lt: new Date(prevYear, prevMonth, 1),
      }
    })

  // Tạo mảng doanh thu theo từng ngày
  const dataCurrentMonth = [];
  const dataPrevMonth = [];

  for (const day of arrayDay) {
    // Tính doanh thu từng ngày của tháng hiện tại
    let revenueCurrent = 0;
    for (const order of orderListCurrentMonth) {
      const orderDay = new Date(order.createdAt).getDate();
      if(day == orderDay) {
        revenueCurrent += order.total;
      }
    }
    dataCurrentMonth.push(revenueCurrent);

    // Tính doanh thu từng ngày của tháng trước
    let revenuePrev = 0;
    for (const order of orderListPrevMonth) {
      const orderDay = new Date(order.createdAt).getDate();
      if(day == orderDay) {
        revenuePrev += order.total;
      }
    }
    dataPrevMonth.push(revenuePrev);
  }

  res.json({
    code: "success",
    message: "Thành công!",
    dataCurrentMonth: dataCurrentMonth,
    dataPrevMonth: dataPrevMonth
  })
}