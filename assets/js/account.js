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
