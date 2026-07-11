// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if(buttonMenuMobile) {
  const menu = document.querySelector(".header .inner-menu");
  const overlay = document.querySelector(".header .inner-overlay");

  // Click vào button mở menu
  buttonMenuMobile.addEventListener("click", () => {
    menu.classList.add("active");
  })

  // Click vào overlay đóng menu
  overlay.addEventListener("click", () => {
    menu.classList.remove("active");
  })

  // Click vào icon down mở sub menu
  const listButtonSubMenu = menu.querySelectorAll("ul > li > i");
  listButtonSubMenu.forEach(button => {
    button.addEventListener("click", () => {
      const li = button.closest("li");
      li.classList.toggle("active");
    })
  })
}
// End Menu Mobile

// Box Address Section 1
const boxAddressSection1 = document.querySelector(".section-1 .inner-form .inner-address");
if(boxAddressSection1) {
  // Ẩn/Hiện box suggest
  const input = boxAddressSection1.querySelector(".inner-input");
  
  input.addEventListener("focus", () => {
    boxAddressSection1.classList.add("active");
  })

  input.addEventListener("blur", () => {
    boxAddressSection1.classList.remove("active");
  })

  // Sự kiện click vào từng item
  const listItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
  listItem.forEach(item => {
    item.addEventListener("mousedown", () => {
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      if(title) {
        input.value = title;
      }
    })
  })
}
// End Box Address Section 1

// Box User Section 1
const boxUserSection1 = document.querySelector(".section-1 .inner-form .inner-user");
if(boxUserSection1) {
  // Hiện box quantity
  const input = boxUserSection1.querySelector(".inner-input");
  
  input.addEventListener("focus", () => {
    boxUserSection1.classList.add("active");
  })

  // Ẩn box quantity
  document.addEventListener("click", (event) => {
    if(!boxUserSection1.contains(event.target)) {
      boxUserSection1.classList.remove("active");
    }
  })

  // Cập nhật số lượng trong ô input
  const updateQuantityInput = () => {
    const listBoxNumber = boxUserSection1.querySelectorAll(".inner-quantity .inner-number");
    const listNumber = [];
    listBoxNumber.forEach(item => {
      const number = parseInt(item.value);
      listNumber.push(number);
    })
    input.value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
  }

  // Bắt sự kiện click vào nút up
  const listButtonUp = boxUserSection1.querySelectorAll(".inner-quantity .inner-up");
  listButtonUp.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".inner-count");
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.value);
      const numberUpdate = number + 1;
      boxNumber.value = numberUpdate;
      updateQuantityInput();
    })
  })

  // Bắt sự kiện click vào nút down
  const listButtonDown = boxUserSection1.querySelectorAll(".inner-quantity .inner-down");
  listButtonDown.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".inner-count");
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.value);
      if(number > 0) {
        const numberUpdate = number - 1;
        boxNumber.value = numberUpdate;
        updateQuantityInput();
      }
    })
  })
}
// End Box User Section 1

// Clock Expire
const clockExpire = document.querySelector("[clock-expire]");
if(clockExpire) {
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");
  const expireDateTime = new Date(expireDateTimeString);

  const updateClock = () => {
    const now = new Date();
    const remainingTime = expireDateTime - now;
    if(remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor(remainingTime / (60 * 60 * 1000) % 24);
      const minutes = Math.floor(remainingTime / (60 * 1000) % 60);
      const seconds = Math.floor(remainingTime / (1000) % 60);

      const listInnerNumber = clockExpire.querySelectorAll(".inner-number");
      listInnerNumber[0].innerHTML = days > 9 ? days : `0${days}`;
      listInnerNumber[1].innerHTML = hours > 9 ? hours : `0${hours}`;
      listInnerNumber[2].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      listInnerNumber[3].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
    } else {
      clearInterval(intervalClock);
    }
  }

  const intervalClock = setInterval(updateClock, 1000);
}
// End Clock Expire

// Box Filter
const buttonFilterMobile = document.querySelector(".section-9 .inner-filter-mobile");
if(buttonFilterMobile) {
  const boxLeft = document.querySelector(".section-9 .inner-left");
  const overlay = document.querySelector(".section-9 .inner-left .inner-overlay");

  buttonFilterMobile.addEventListener("click", () => {
    boxLeft.classList.add("active");
  })

  overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
  })
}
// End Box Filter

// Box Tour Info
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo) {
  const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
  buttonReadMore.addEventListener("click", () => {
    if(boxTourInfo.classList.contains("active")) {
      boxTourInfo.classList.remove("active");
      buttonReadMore.innerHTML = "Xem tất cả";
    } else {
      boxTourInfo.classList.add("active");
      buttonReadMore.innerHTML = "Ẩn bớt";
    }
  })

  // Zoom ảnh
  const boxContent = boxTourInfo.querySelector(".inner-content");
  if(boxContent) {
    new Viewer(boxContent);
  }
}
// End Box Tour Info

// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS

// Swiper Section 2
const swiperSection2 = document.querySelector(".swiper-section-2");
if(swiperSection2) {
  new Swiper(".swiper-section-2", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".swiper-section-3");
if(swiperSection3) {
  new Swiper(".swiper-section-3", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
// End Swiper Section 2

// Box Images
const boxImages = document.querySelector(".box-images");
if(boxImages) {
  const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      576: {
        spaceBetween: 10,
      },
    },
  });
  const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiperBoxImagesThumb,
    },
  });
}
// End Box Images

// Zoom Box Image Main
const boxImageMain = document.querySelector(".box-images .inner-images-main");
if(boxImageMain) {
  new Viewer(boxImageMain);
}
// End Zoom Box Image Main

// Zoom Box Tour Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");
if(boxTourSchedule) {
  const listBoxContent = boxTourSchedule.querySelectorAll(".inner-content");
  listBoxContent.forEach(boxContent => {
    new Viewer(boxContent);
  })
}
// End Zoom Box Tour Schedule

// Email Form
const emailForm = document.querySelector("#email-form");
if(emailForm) {
  const validator = new JustValidate('#email-form');

  validator
    .addField('#email-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập email!"
      },
      {
        rule: 'email',
        errorMessage: "Email không đúng định dạng!"
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      
      const dataFinal = {
        email: email
      };

      fetch(`/contact/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            notify.success(data.message);
            emailForm.email.value = "";
          }
        })
    })
}
// End Email Form

// Coupon Form
const couponForm = document.querySelector("#coupon-form");
if(couponForm) {
  const validator = new JustValidate('#coupon-form');

  validator
    .addField('#coupon-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mã giảm giá!"
      },
    ])
    .onSuccess((event) => {
      const coupon = event.target.coupon.value;
      console.log(coupon);
    })
}
// End Coupon Form

// Order Form
const orderForm = document.querySelector("#order-form");
if(orderForm) {
  const validator = new JustValidate('#order-form');

  validator
    .addField('#fullname-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập họ tên!"
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: "Họ tên phải có ít nhất 5 ký tự!"
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: "Họ tên không được vượt quá 50 ký tự!"
      },
    ])
    .addField('#phone-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập số điện thoại!"
      },
      {
        rule: 'customRegexp',
        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        errorMessage: "Số điện thoại không đúng định dạng!"
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.method.value;

      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter(item => {
        return (item.checked == true) && (item.quantityAdult > 0 || item.quantityChildren > 0 || item.quantityBaby > 0);
      })

      if(cart.length > 0) {
        const dataFinal = {
          fullName: fullName,
          phone: phone,
          note: note,
          paymentMethod: paymentMethod,
          items: cart
        };
        
        fetch(`/order/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataFinal)
        })
          .then(res => res.json())
          .then(data => {
            if(data.code == "error") {
              notify.error(data.message);
            }

            if(data.code == "success") {
              // Cập nhật giỏ hàng
              let cart = JSON.parse(localStorage.getItem("cart"));
              cart = cart.filter(item => item.checked == false);
              localStorage.setItem("cart", JSON.stringify(cart));

              switch (paymentMethod) {
                case "money":
                case "bank":
                  // Chuyển sang trang đặt hàng thành công
                  window.location.href = `/order/success?orderCode=${data.orderCode}&phone=${data.phone}`;
                  break;
                case "zalopay":
                  // Chuyển sang trang thanh toán bằng ZaloPay
                  window.location.href = `/order/payment-zalopay?orderCode=${data.orderCode}&phone=${data.phone}`;
                  break;
                case "vnpay":
                  // Chuyển sang trang thanh toán bằng VNPay
                  window.location.href = `/order/payment-vnpay?orderCode=${data.orderCode}&phone=${data.phone}`;
                  break;
              }
              
            }
          })
      } else {
        notify.error("Vui lòng đặt ít nhất 1 tour!");
      }
    })

  
  // List Input Method
  const listInputMethod = orderForm.querySelectorAll(`input[name="method"]`);
  const innerInfoBank = orderForm.querySelector(".inner-info-bank");

  listInputMethod.forEach(input => {
    input.addEventListener("change", () => {
      if(input.value == "bank") {
        innerInfoBank.classList.add("active");
      } else {
        innerInfoBank.classList.remove("active");
      }
    })
  })
  // End List Input Method
}
// End Order Form

// Box Filter
const boxFilter = document.querySelector(".box-filter");
if(boxFilter) {
  const url = new URL(`${window.location.origin}/search`);
  const button = boxFilter.querySelector(".inner-button");

  const filterList = [
    "locationFrom",
    "locationTo",
    "departureDate",
    "stockAdult",
    "stockChildren",
    "stockBaby",
    "price"
  ];

  button.addEventListener("click", () => {
    for (const item of filterList) {
      const value = document.querySelector(`[name="${item}"]`).value;
      if(value) {
        url.searchParams.set(item, value);
      } else {
        url.searchParams.delete(item);
      }
    }
    window.location.href = url.href;
  })

  // Hiển thị giá trị mặc định
  const urlCurrent = new URL(window.location.href);
  for (const item of filterList) {
    const valueCurrent = urlCurrent.searchParams.get(item);
    if(valueCurrent) {
      boxFilter.querySelector(`[name="${item}"]`).value = valueCurrent;
    }
  }
}
// End Box Filter

// Form Search
const formSearch = document.querySelector("[form-search]");
if(formSearch) {
  const url = new URL(`${window.location.origin}/search`);

  const filterList = [
    "locationTo",
    "departureDate",
    "stockAdult",
    "stockChildren",
    "stockBaby",
  ];

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định là load lại trang

    for (const item of filterList) {
      const value = formSearch.querySelector(`[name="${item}"]`).value;
      if(value) {
        url.searchParams.set(item, value);
      } else {
        url.searchParams.delete(item);
      }
    }
    window.location.href = url.href;
  })
}
// End Form Search

// Initial Cart
const cart = localStorage.getItem("cart");
if(!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}
// End Initial Cart

// Mini Cart
const drawMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
drawMiniCart();
// End Mini Cart

// Box Tour Detail
const boxTourDetail = document.querySelector(".box-tour-detail");
if(boxTourDetail) {
  const listInputQuantity = boxTourDetail.querySelectorAll("[input-quantity]");
  const elementTotalPrice = boxTourDetail.querySelector("[total-price]");

  const drawBoxDetail = () => {
    let totalPrice = 0;
    listInputQuantity.forEach(input => {
      let quantity = parseInt(input.value);
      const fieldName = input.getAttribute("input-quantity");
      const price = parseInt(input.getAttribute("data-price"));
      const min = parseInt(input.getAttribute("min"));
      const max = parseInt(input.getAttribute("max"));

      if(quantity < min) {
        notify.error(`Số lượng phải >= ${min}`);
        input.value = min;
        quantity = min;
      }

      if(quantity > max) {
        notify.error(`Số lượng phải <= ${max}`);
        input.value = max;
        quantity = max;
      }

      const labelQuantity = boxTourDetail.querySelector(`[label-quantity="${fieldName}"]`);
      labelQuantity.innerHTML = quantity;

      totalPrice += price * quantity;
    })
    elementTotalPrice.innerHTML = totalPrice.toLocaleString("vi-VN");
  };

  listInputQuantity.forEach(input => {
    input.addEventListener("input", () => {
      drawBoxDetail();
    });
  })

  const buttonAddToCart = boxTourDetail.querySelector(".inner-button-add-cart");
  const tourId = buttonAddToCart.getAttribute("tour-id");

  buttonAddToCart.addEventListener("click", () => {
    const locationFrom = boxTourDetail.querySelector(`[name="locationFrom"]`).value;
    const quantityAdult = parseInt(boxTourDetail.querySelector(`[name="quantityAdult"]`).value);
    const quantityChildren = parseInt(boxTourDetail.querySelector(`[name="quantityChildren"]`).value);
    const quantityBaby = parseInt(boxTourDetail.querySelector(`[name="quantityBaby"]`).value);

    if(quantityAdult > 0 || quantityChildren > 0 || quantityBaby > 0) {
      const item = {
        tourId: tourId,
        locationFrom: locationFrom,
        quantityAdult: quantityAdult,
        quantityChildren: quantityChildren,
        quantityBaby: quantityBaby,
        checked: true
      };
      const cart = JSON.parse(localStorage.getItem("cart"));
      const existIndexItem = cart.findIndex(itemCart => itemCart.tourId == tourId);
      if(existIndexItem != -1) {
        cart[existIndexItem] = item;
      } else {
        cart.unshift(item);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      notify.success("Đã thêm sản phẩm vào giỏ!");
      drawMiniCart();
    } else {
      notify.error("Số lượng phải > 0");
    }
  })

  // Hiển thị giá trị mặc định
  const cart = JSON.parse(localStorage.getItem("cart"));
  const existItem = cart.find(item => item.tourId == tourId);
  if(existItem) {
    boxTourDetail.querySelector(`[name="locationFrom"]`).value = existItem.locationFrom;
    boxTourDetail.querySelector(`[name="quantityAdult"]`).value = existItem.quantityAdult;
    boxTourDetail.querySelector(`[name="quantityChildren"]`).value = existItem.quantityChildren;
    boxTourDetail.querySelector(`[name="quantityBaby"]`).value = existItem.quantityBaby;
  }
}
// End Box Tour Detail

// Page Cart
const drawCart = () => {
  const cart = localStorage.getItem("cart");

  fetch(`/cart/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: cart
  })
    .then(res => res.json())
    .then(data => {
      if(data.code == "error") {
        notify.error(data.message);
      }

      if(data.code == "success") {
        // Hiển thị các item ra giao diện
        let subTotal = 0;

        const htmlArray = data.cart.map(item => {
          if(item.checked) {
            subTotal += (item.quantityAdult * item.priceNewAdult + item.quantityChildren * item.priceNewChildren + item.quantityBaby * item.priceNewBaby);
          }
          return `
            <div class="inner-tour-item">
              <div class="inner-actions">
                <button class="inner-delete" button-delete tour-id="${item.tourId}">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <input class="inner-check" type="checkbox" ${item.checked ? "checked" : ""} input-check tour-id="${item.tourId}">
              </div>
              <div class="inner-product">
                <div class="inner-image">
                  <a href="/tour/detail/${item.slug}">
                    <img alt="${item.name}" src="${item.avatar}">
                  </a>
                </div>
                <div class="inner-content">
                  <div class="inner-title">
                    <a href="/tour/detail/${item.slug}">
                      ${item.name}
                    </a>
                  </div>
                  <div class="inner-meta">
                    <div>Ngày Khởi Hành: <b>${item.departureDate}</b></div>
                    <div>Khởi Hành Tại: <b>${item.cityName}</b></div>
                  </div>
                </div>
              </div>
              <div class="inner-quantity">
                <div class="inner-label">Số Lượng Hành Khách</div>
                  <div class="inner-list">
                    <div class="inner-item">
                      <div class="inner-item-label">Người lớn:</div>
                      <div class="inner-item-input">
                        <input value="${item.quantityAdult}" min="0" max="${item.stockAdult}" type="number" name="quantityAdult" tour-id="${item.tourId}">
                      </div>
                      <div class="inner-item-price">
                        <span>${item.quantityAdult}</span>
                        <span>x</span>
                        <span class="inner-hl">${item.priceNewAdult.toLocaleString("vi-VN")}</span>
                      </div>
                    </div>
                    <div class="inner-item">
                      <div class="inner-item-label">Trẻ em:</div>
                      <div class="inner-item-input">
                        <input value="${item.quantityChildren}" min="0" max="${item.stockChildren}" type="number" name="quantityChildren" tour-id="${item.tourId}">
                      </div>
                      <div class="inner-item-price">
                        <span>${item.quantityChildren}</span>
                        <span>x</span>
                        <span class="inner-hl">${item.priceNewChildren.toLocaleString("vi-VN")}</span>
                      </div>
                    </div>
                    <div class="inner-item">
                      <div class="inner-item-label">Em bé:</div>
                      <div class="inner-item-input">
                        <input value="${item.quantityBaby}" min="0" max="${item.stockBaby}" type="number" name="quantityBaby" tour-id="${item.tourId}">
                      </div>
                      <div class="inner-item-price">
                        <span>${item.quantityBaby}</span>
                        <span>x</span>
                        <span class="inner-hl">${item.priceNewBaby.toLocaleString("vi-VN")}</span>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          `;
        })

        const discount = 0;
        const total = subTotal - discount;

        const elementCartList = pageCart.querySelector("[cart-list]");
        if(htmlArray.length > 0) {
          elementCartList.innerHTML = htmlArray.join("");
        } else {
          elementCartList.innerHTML = `
            <div class="inner-no-data">Giỏ hàng rỗng.</div>
          `;
        }
        const elementSubTotal = pageCart.querySelector("[cart-sub-total]");
        elementSubTotal.innerHTML = subTotal.toLocaleString("vi-VN");
        const elementTotal = pageCart.querySelector("[cart-total]");
        elementTotal.innerHTML = total.toLocaleString("vi-VN");

        // Sự kiện cập nhật số lượng
        const listInputQuantity = elementCartList.querySelectorAll(`.inner-tour-item .inner-quantity input`);
        listInputQuantity.forEach(input => {
          input.addEventListener("input", () => {
            const tourId = input.getAttribute("tour-id");
            const fieldName = input.name;
            let quantity = parseInt(input.value);
            const min = parseInt(input.getAttribute("min"));
            const max = parseInt(input.getAttribute("max"));

            if(quantity < min) {
              notify.error(`Số lượng phải >= ${min}`);
              input.value = min;
              quantity = min;
            }

            if(quantity > max) {
              notify.error(`Số lượng phải <= ${max}`);
              input.value = max;
              quantity = max;
            }

            const cart = JSON.parse(localStorage.getItem("cart"));
            const indexItem = cart.findIndex(item => item.tourId == tourId);
            if(indexItem != -1) {
              cart[indexItem][fieldName] = quantity;
              localStorage.setItem("cart", JSON.stringify(cart));
              drawCart();
            }
          })
        })

        // Sự kiện xóa tour khỏi giỏ hàng
        const listButtonDelete = elementCartList.querySelectorAll(`[button-delete]`);
        listButtonDelete.forEach(button => {
          button.addEventListener("click", () => {
            const tourId = button.getAttribute("tour-id");
            let cart = JSON.parse(localStorage.getItem("cart"));
            cart = cart.filter(item => item.tourId != tourId);
            localStorage.setItem("cart", JSON.stringify(cart));
            notify.success("Đã xóa tour khỏi giỏ hàng!");
            drawCart();
            drawMiniCart();
          })
        })

        // Sự kiện check tour
        const listInputCheck = elementCartList.querySelectorAll(`[input-check]`);
        listInputCheck.forEach(input => {
          input.addEventListener("change", () => {
            const tourId = input.getAttribute("tour-id");
            const checked = input.checked;
            const cart = JSON.parse(localStorage.getItem("cart"));
            const indexItem = cart.findIndex(item => item.tourId == tourId);
            if(indexItem != -1) {
              cart[indexItem]["checked"] = checked;
              localStorage.setItem("cart", JSON.stringify(cart));
              drawCart();
            }
          })
        })
      }
    })
}

const pageCart = document.querySelector("[page-cart]");
if(pageCart) {
  drawCart();
}
// End Page Cart