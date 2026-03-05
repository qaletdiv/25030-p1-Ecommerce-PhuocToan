function renderHeaderActions() {
  const actions = document.querySelector("#headerActions");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //xóa HTML cũ khi render lại
  actions.innerHTML = "";

  //Chưa đăng nhập
  if (!currentUser) {
    //cái chỗ cart thì ít bữa làm cái trang giỏ hàng
    actions.innerHTML = `
    <a href="login.html" class="account">
      <i class="fa-solid fa-user"></i>Đăng nhập
    </a>
    
    <a href="#" class="cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </a>
    `;
  }
  //Trường hợp đã đăng nhập
  else {
    actions.innerHTML = `
    <a href="#" class="account">
      <i class="fa-solid fa-user"></i> ${currentUser.fullName}
    </a>
    
    <a href="#" id="logoutBtn">Đăng xuất</a>
    <a href="cart.html" class="cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </a>
    `;

    const logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      //Xóa trạng thái đăng nhập
      localStorage.removeItem("currentUser");

      //Render lại header về trang thái guest
      renderHeaderActions();
    });
  }
}

renderHeaderActions();

//GỢI Ý KHI GÕ (SEARCH DROPDOWN GIỐNG TRANG WEB BÁN HÀNG)
//Lấy element kết quả search
const searchResult = document.querySelector("#searchResult");

//lắng nghe user ng dùng gõ phím
searchInput.addEventListener("input", function () {
  //lấy giá trị người dùng nhập vào,chuyển sang chữ thường,xóa khoảng cách đầu cuối
  const keyword = searchInput.value.toLowerCase().trim();

  //xóa kết quả cũ mỗi lần gõ
  searchResult.innerHTML = "";

  //nếu input rỗng(tức là người dùng không nhập -> ẩn dropdown)
  if (!keyword) {
    searchResult.style.display = "none";
    return;
  }
  //Lọc sản phẩm theo tên
  const matchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );

  // Nếu không tìm thấy sản phẩm nào
  if (matchedProducts.length === 0) {
    searchResult.innerHTML = `<p style="padding:12px">Không tìm thấy sản phẩm</p>`;
    searchResult.style.display = "block";
    return;
  }
  // Render từng sản phẩm tìm được

  matchedProducts.slice(0, 5).forEach((product) => {
    const itemHTML = `
      <div class="search-item">
        <img src="${product.image}" alt="${product.name}" />
        <div class="info">
          <p class="name">${product.name}</p>
          <p class="price">${product.price.toLocaleString()}đ</p>
        </div>
      </div>
    `;

    searchResult.innerHTML += itemHTML;
  });

  // Hiện dropdown kết quả
  //Vì CSS đang là display :none
  searchResult.style.display = "block";
});

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("Vui lòng đăng nhập");
  window.location.href = "login.html";
}

// ===== 2. LẤY CART =====
const cartKey = `cart_${currentUser.email}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

if (cart.length === 0) {
  alert("Giỏ hàng trống");
  window.location.href = "index.html";
}

const orderList = document.querySelector(".checkout-right");
const confirmBtn = document.querySelector(".btn-confirm");

function renderOrder() {
  const orderItemsEl = document.getElementById("order-items");
  const totalPriceEl = document.getElementById("total-price");

  orderItemsEl.innerHTML = "";
  let total = 0;

  // 1️⃣ Render sản phẩm
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    orderItemsEl.innerHTML += `
    <div class="order-item">
      <img src="${item.image}" />
      <div class="info">
        <h3>${item.name}</h3>
        <p>Màu: ${item.color}</p>
        <p>Dung lượng: ${item.storage}</p>
        <p>Số lượng: ${item.quantity}</p>
      </div>
      <div class="price">${itemTotal.toLocaleString()}đ</div>
    </div>
  `;
  });

  totalPriceEl.textContent = total.toLocaleString() + "đ";
}

function handleConfirm() {
  // ===== LẤY INPUT =====
  const nameInput = document.getElementById("fullnameInput");
  const phoneInput = document.querySelector("#phoneInput");
  const addressInput = document.querySelector("#addressInput");

  const genderChecked = document.querySelector('input[name="gender"]:checked');
  const deliveryChecked = document.querySelector(
    'input[name="delivery"]:checked'
  );

  const name = nameInput.value.trim();

  if (!name) {
    alert("Vui lòng nhập họ và tên");
    nameInput.focus();
    return;
  }

  if (name.split(/\s+/).length < 2) {
    alert("Vui lòng nhập đầy đủ họ và tên");
    nameInput.focus();
    return;
  }

  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();

  // ===== VALIDATE =====
  if (!genderChecked) {
    alert("Vui lòng chọn Anh hoặc Chị");
    return;
  }

  if (!name) {
    alert("Vui lòng nhập họ và tên");
    nameInput.focus();
    return;
  }

  if (name.length < 3) {
    alert("Họ và tên phải có ít nhất 3 ký tự");
    nameInput.focus();
    return;
  }

  if (!phone) {
    alert("Vui lòng nhập số điện thoại");
    phoneInput.focus();
    return;
  }

  // check số điện thoại VN cơ bản
  if (!/^0\d{9}$/.test(phone)) {
    alert("Số điện thoại không hợp lệ");
    phoneInput.focus();
    return;
  }

  if (!deliveryChecked) {
    alert("Vui lòng chọn hình thức nhận hàng");
    return;
  }

  if (!address) {
    alert("Vui lòng nhập địa chỉ");
    addressInput.focus();
    return;
  }

  //Tạo đơn hàng
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    id: Date.now(),
    userEmail: currentUser.email,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString(),

    status: "pending",

    fullName: name,
    phone: phone,
    address: address,
  };

  orders.unshift(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // ===== XỬ LÝ ĐƠN HÀNG (CƠ BẢN) =====
  localStorage.removeItem(cartKey);

  // ===== CHUYỂN SANG TRANG THÀNH CÔNG =====
  window.location.href = "order-success.html";
}

renderOrder();
confirmBtn.addEventListener("click", handleConfirm);
const districtsByCity = {
  hcm: ["Quận 1", "Quận 3", "Bình Thạnh", "Gò Vấp", "Thủ Đức"],
  hn: ["Ba Đình", "Hoàn Kiếm", "Đống Đa", "Cầu Giấy", "Hai Bà Trưng"],
  dn: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn"],
};

const citySelect = document.getElementById("city");
const districtSelect = document.getElementById("district");

citySelect.addEventListener("change", function () {
  const city = this.value;

  // reset quận/huyện
  districtSelect.innerHTML = `<option value="">Chọn Quận / Huyện</option>`;
  districtSelect.disabled = true;

  if (!city) return;

  // render quận/huyện theo tỉnh
  districtsByCity[city].forEach((district) => {
    const option = document.createElement("option");
    option.textContent = district;
    districtSelect.appendChild(option);
  });

  districtSelect.disabled = false;
});
