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

// ================== 1. LẤY DATA ==================
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((p) => p.id === productId);

if (!product) {
  alert("Sản phẩm không tồn tại");
  window.location.href = "index.html";
}

// ================== 2. STATE ==================
let selectedColor = null;
let selectedStorage = null;

// ================== 3. RENDER ==================
function renderProductDetail() {
  document.querySelector(".main-image").src = product.images[0];
  document.querySelector(".product-name").textContent = product.name;
  document.querySelector(".product-price").textContent =
    product.price.toLocaleString() + "đ";
  document.querySelector(".product-desc").textContent = product.description;
}

function renderColors() {
  const box = document.querySelector(".color-options");
  box.innerHTML = "";

  product.colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = color;

    btn.addEventListener("click", function () {
      selectedColor = color;

      document
        .querySelectorAll(".color-options .option-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
    });

    box.appendChild(btn);
  });
}

function renderStorages() {
  const box = document.querySelector(".storage-options");
  box.innerHTML = "";

  product.storages.forEach((storage) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = storage;

    btn.addEventListener("click", function () {
      selectedStorage = storage;

      document
        .querySelectorAll(".storage-options .option-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
    });

    box.appendChild(btn);
  });
}

function renderGallery() {
  const mainImage = document.querySelector(".main-image");
  const list = document.querySelector(".thumbnail-list");

  list.innerHTML = "";
  mainImage.src = product.images[0];

  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    if (index === 0) img.classList.add("active");

    img.addEventListener("click", function () {
      mainImage.src = src;
      document
        .querySelectorAll(".thumbnail-list img")
        .forEach((i) => i.classList.remove("active"));
      img.classList.add("active");
    });

    list.appendChild(img);
  });
}

// ================== 4. QUANTITY ==================
const quantityInput = document.getElementById("quantityInput");

document.getElementById("decreaseBtn").addEventListener("click", function () {
  const value = Number(quantityInput.value);
  if (value > 1) quantityInput.value = value - 1;
});

document.getElementById("increaseBtn").addEventListener("click", function () {
  quantityInput.value = Number(quantityInput.value) + 1;
});

// ================== 5. ADD TO CART ==================
// Nút thêm vào giỏ hàng
const addCartBtn = document.querySelector(".add-cart-btn");

addCartBtn.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Vui lòng đăng nhập!");
    window.location.href = "login.html";
    return;
  }

  // Kiểm tra đã chọn màu và dung lượng chưa
  if (!selectedColor || !selectedStorage) {
    alert("Vui lòng chọn màu và dung lượng");
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const quantity = Number(document.getElementById("quantityInput").value);

  // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
  const existItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.color === selectedColor &&
      item.storage === selectedStorage
  );

  if (existItem) {
    existItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0], // lấy ảnh đầu tiên
      color: selectedColor,
      storage: selectedStorage,
      quantity: quantity,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng 🛒");
});

// ================== INIT ==================
renderProductDetail();
renderColors();
renderStorages();
renderGallery();
