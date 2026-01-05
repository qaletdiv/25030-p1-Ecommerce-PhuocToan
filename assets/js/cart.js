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
const cartKey = `cart_${currentUser.email}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const cartList = document.querySelector("#cart-list");
const totalPrice = document.querySelector("#total-price");

// ===== RENDER CART =====
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Giỏ hàng của bạn đang trống</p>`;
    totalPrice.textContent = "0đ";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartList.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" />
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Màu: ${item.color}</p>
          <p>Dung lượng: ${item.storage}</p>
          <p>Giá: ${item.price.toLocaleString()}đ</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
        <div class="cart-right">
          <p>${itemTotal.toLocaleString()}đ</p>
          <button class="btn-remove" data-index="${index}">Xóa</button>
        </div>
      </div>
    `;
  });

  totalPrice.textContent = total.toLocaleString() + "đ";
}

// ===== XÓA =====
cartList.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn-remove")) return;

  const index = Number(e.target.dataset.index);
  cart.splice(index, 1);

  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
});

// ===== UPDATE CART =====
function updateCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

// ===== INIT =====
renderCart();

const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Giỏ hàng trống, không thể thanh toán");
    return;
  }

  window.location.href = "checkout.html";
});
