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
    <a href="account.html" class="account">
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
// ================== AUTH CHECK ==================
const authUser = JSON.parse(localStorage.getItem("currentUser"));

if (!authUser) {
  window.location.href = "login.html";
}

// ================== GET FULL USER ==================
const users = JSON.parse(localStorage.getItem("users")) || [];

// tìm user đầy đủ dựa theo email
let currentUser = users.find((user) => user.email === authUser.email);

if (!currentUser) {
  alert("Không tìm thấy thông tin người dùng");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");

const fullNameInput = document.getElementById("fullNameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");

const genderRadios = document.querySelectorAll('input[name="gender"]');

const daySelect = document.getElementById("daySelect");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

const saveProfileBtn = document.getElementById("saveProfileBtn");
const logoutBtn = document.getElementById("logoutBtn");

const orderTableBody = document.getElementById("orderTableBody");

// ================== RENDER PROFILE ==================
function renderProfile() {
  userNameEl.textContent = currentUser.fullName;
  userEmailEl.textContent = currentUser.email;

  fullNameInput.value = currentUser.fullName || "";
  emailInput.value = currentUser.email || "";
  phoneInput.value = currentUser.phone || "";

  genderRadios.forEach((radio) => {
    radio.checked = radio.value === currentUser.gender;
  });

  renderDOB(currentUser.dob);
}

// ================== DOB ==================
function renderDOB(dob) {
  daySelect.innerHTML = "";
  monthSelect.innerHTML = "";
  yearSelect.innerHTML = "";

  for (let d = 1; d <= 31; d++) {
    daySelect.innerHTML += `<option value="${d}">${d}</option>`;
  }

  for (let m = 1; m <= 12; m++) {
    monthSelect.innerHTML += `<option value="${m}">Tháng ${m}</option>`;
  }

  for (let y = 1970; y <= new Date().getFullYear(); y++) {
    yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
  }

  if (dob) {
    const [year, month, day] = dob.split("-").map(Number);
    daySelect.value = day;
    monthSelect.value = month;
    yearSelect.value = year;
  }
}

// ================== SAVE PROFILE ==================
saveProfileBtn.addEventListener("click", () => {
  currentUser.fullName = fullNameInput.value.trim();
  currentUser.phone = phoneInput.value.trim();
  currentUser.gender = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;

  currentUser.dob = `${yearSelect.value}-${monthSelect.value}-${daySelect.value}`;

  const index = users.findIndex((u) => u.email === currentUser.email);

  if (index !== -1) {
    users[index] = currentUser;
  }

  localStorage.setItem("users", JSON.stringify(users));

  // ⚠️ cập nhật lại currentUser login
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      email: currentUser.email,
      password: authUser.password,
      fullName: currentUser.fullName,
    })
  );

  alert("Lưu thông tin thành công ✅");
  renderProfile();
});

// ================== RENDER ORDERS ==================

const statusMap = {
  pending: "Chờ xác nhận",
  success: "Thành công",
  cancel: "Đã hủy",
};

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = orders.filter((o) => o.userEmail === currentUser.email);

  if (userOrders.length === 0) {
    orderTableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">
          Bạn chưa có đơn hàng nào
        </td>
      </tr>
    `;
    return;
  }

  orderTableBody.innerHTML = "";

  userOrders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("vi-VN");

    const statusText = statusMap[order.status] || order.status;

    orderTableBody.innerHTML += `
      <tr>
        <td>#${order.id}</td>
        <td>${date}</td>
        <td>${order.total.toLocaleString("vi-VN")}đ</td>
        <td>
          
          <span class="status ${order.status}">
            ${statusText}
          </span>
        </td>
      </tr>
    `;
  });
}

// ================== LOGOUT ==================
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// ================== INIT ==================
renderProfile();
renderOrders();
