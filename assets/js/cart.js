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

// ===== LẤY USER HIỆN TẠI =====
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Vui lòng đăng nhập");
  window.location.href = "login.html";
}

// ===== CART =====
const cartKey = `cart_${currentUser.id}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const cartList = document.querySelector("#cart-list");
const totalPrice = document.querySelector("#total-price");

// ===== RENDER CART =====
function renderCart() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Vui lòng đăng nhập để xem giỏ hàng");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartList = document.querySelector("#cart-list");
  const totalPrice = document.querySelector("#total-price");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Giỏ hàng của bạn đang trống</p>`;
    totalPrice.textContent = "0 đ";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartList.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Màu: ${item.color}</p>
          <p>Dung lượng: ${item.storage}</p>
          <p>Giá: ${item.price.toLocaleString()}đ</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
        <div class="cart-right">
          <p class="item-total">${itemTotal.toLocaleString()}đ</p>
          <button class="btn-remove" data-id="${item.id}">Xóa</button>
        </div>
      </div>
    `;
  });

  totalPrice.textContent = total.toLocaleString() + "đ";

  // Gắn sự kiện xóa
  document.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
      }
    });
  });
}

// ===== XỬ LÝ CLICK =====
cartList.addEventListener("click", function (event) {
  const id = Number(event.target.dataset.id);
  if (!id) return;

  const item = cart.find((p) => p.id === id);
  if (!item) return;

  if (event.target.className === "btn-increase") {
    item.quantity++;
  }
  if (event.target.className === "btn-decrease") {
    if (item.quantity > 1) item.quantity--;
  }
  if (event.target.className === "btn-remove") {
    cart = cart.filter((p) => p.id !== id);
  }

  updateCart();
});

// ===== UPDATE CART =====
function updateCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

// ===== INIT =====
renderCart();
