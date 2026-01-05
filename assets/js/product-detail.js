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
//window.location.search là thuộc tính của trình duyệt window.location
/* 
Nó chứa phần query String của URL tức là những gì sau dấu ?
VD: product-detail.html?id=1
là window.location.search sẽ trả về (?id=1 bao gồm ?)

new URLSearchParams(...) là 1 đối tượng giúp tách key,value
từ query string dễ dàng
Với query string "?id=1",params sẽ là 1 đối tượng có key "id" và value là 1

params.get("id") //dễ dàng lấy giá trị của key
nhưng nó trả về chuỗi nên ép nó sang số
vì trong localStorage id là 1 số nên ép so sánh cho đúng

*/
// ================== 1. LẤY PRODUCT TỪ URL ==================
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const products = JSON.parse(localStorage.getItem("products"));
const product = products.find((product) => product.id === productId);

// State chọn màu và dung lượng
let selectedColor = null;
let selectedStorage = null;

// Kiểm tra productId hợp lệ
if (!productId) {
  alert("Sản phẩm không tồn tại");
  window.location.href = "index.html";
}

// ================== 2. RENDER THÔNG TIN SẢN PHẨM ==================
function renderProductDetail() {
  document.querySelector(".main-image").src = product.images[0];
  document.querySelector(".product-name").textContent = product.name;
  document.querySelector(".product-price").textContent =
    product.price.toLocaleString() + "đ";
  document.querySelector(".product-desc").textContent = product.description;
}
renderProductDetail();

// ================== 3. RENDER MÀU SẮC ==================
function renderColors() {
  const colorContainer = document.querySelector(".color-options");
  colorContainer.innerHTML = "";

  product.colors.forEach((colorName) => {
    const colorButton = document.createElement("button");
    colorButton.className = "option-btn";
    colorButton.textContent = colorName;
    colorContainer.appendChild(colorButton);

    // Khi click vào nút chọn màu
    colorButton.addEventListener("click", function () {
      selectedColor = colorName; // cập nhật màu chọn
      //chỗ này dùng để push vô trong giỏ hàng đó

      // Xóa class active của tất cả nút
      const allButtons = colorContainer.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm active cho nút vừa click
      colorButton.classList.add("active");
    });
  });
}
renderColors();

// ================== 4. RENDER DUNG LƯỢNG ==================
function renderStorages() {
  const storageContainer = document.querySelector(".storage-options");
  storageContainer.innerHTML = "";

  product.storages.forEach((storageName) => {
    const storageButton = document.createElement("button");
    storageButton.className = "option-btn";
    storageButton.textContent = storageName;
    storageContainer.appendChild(storageButton);

    // Khi click vào nút chọn dung lượng
    storageButton.addEventListener("click", function () {
      selectedStorage = storageName; // cập nhật dung lượng chọn

      // Xóa class active của tất cả nút
      const allButtons = storageContainer.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm active cho nút vừa click
      storageButton.classList.add("active");
    });
  });
}
renderStorages();

// ================== 5. RENDER GALLERY ẢNH ==================
function renderGallery() {
  const mainImage = document.querySelector(".main-image");
  const thumbnailList = document.querySelector(".thumbnail-list");

  thumbnailList.innerHTML = "";

  mainImage.src = product.images[0];

  product.images.forEach((imgSrc, index) => {
    const thumb = document.createElement("img");
    thumb.src = imgSrc;

    if (index === 0) {
      thumb.classList.add("active");
    }
    thumbnailList.appendChild(thumb);
    // Click vào thumbnail -> thay ảnh chính
    thumb.addEventListener("click", function () {
      mainImage.src = imgSrc;

      const allThumbs = thumbnailList.querySelectorAll("img");
      allThumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}
renderGallery();

// ================== 6. QUANTITY ==================
const quanityInput = document.querySelector("#quantityInput");
const decreaseBtn = document.querySelector("#decreaseBtn");
const increaseBtn = document.querySelector("#increaseBtn");

// Nút giảm
decreaseBtn.addEventListener("click", function () {
  let currentValue = Number(quanityInput.value);
  if (currentValue > 1) {
    quanityInput.value = currentValue - 1;
  }
});

// Nút tăng
increaseBtn.addEventListener("click", function () {
  let currentValue = Number(quanityInput.value);
  quanityInput.value = currentValue + 1;
});

// ================== 7. ADD TO CART ==================
const addCartBtn = document.querySelector(".add-cart-btn");
addCartBtn.addEventListener("click", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Chưa đăng nhập
  if (!currentUser) {
    alert("Vui lòng đăng nhập");
    window.location.href = "login.html";
    return;
  }

  // Kiểm tra đã chọn màu + dung lượng
  if (!selectedColor || !selectedStorage) {
    alert("Vui lòng chọn màu và dung lượng");
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || []; //đoạn này nếu có mới lấy

  const quantity = Number(document.querySelector("#quantityInput").value);

  // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
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
      image: product.images[0],
      color: selectedColor,
      storage: selectedStorage,
      quantity: quantity,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng 🛒");
});
console.log(selectedColor);
console.log();

// ================== 8. SẢN PHẨM LIÊN QUAN ==================
function renderRelatedProducts() {
  const relatedContainer = document.querySelector("#relatedProducts");
  relatedContainer.innerHTML = "";

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  relatedProducts.forEach((p) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">${p.price.toLocaleString()}đ</p>
      <a href="product-detail.html?id=${
        p.id
      }" class="view-detail">Xem chi tiết</a>
    `;
    relatedContainer.appendChild(productItem);
  });
}
renderRelatedProducts();
