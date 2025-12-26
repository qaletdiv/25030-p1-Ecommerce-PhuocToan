// ======================= HEADER =======================
function renderHeaderActions() {
  const actions = document.querySelector("#headerActions");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  actions.innerHTML = "";

  if (!currentUser) {
    actions.innerHTML = `
      <a href="login.html" class="account">
        <i class="fa-solid fa-user"></i> Đăng nhập
      </a>

      <a href="#" class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </a>
    `;
  } else {
    actions.innerHTML = `
      <a href="account.html" class="account">
        <i class="fa-solid fa-user"></i> ${currentUser.fullName}
      </a>

      <a href="#" id="logoutBtn">Đăng xuất</a>
      <a href="#" class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </a>
    `;

    const logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      renderHeaderActions();
    });
  }
}

renderHeaderActions();

const allProducts = JSON.parse(localStorage.getItem("products")); // tất cả sản phẩm
const productListContainer = document.querySelector("#productList"); // thẻ chứa sản phẩm

function renderProducts(productArray) {
  // Xóa HTML cũ
  productListContainer.innerHTML = "";

  // Duyệt từng sản phẩm
  productArray.forEach((product) => {
    const productHTML = `
      <div class="product-item">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString()}đ</p>
        <button class="add-to-cart">Thêm vào giỏ hàng</button>
      </div>
    `;
    productListContainer.innerHTML += productHTML;
  });
}

// Render tất cả sản phẩm ngay khi trang load
renderProducts(allProducts);

//Filer
const categoryFilter = document.querySelector("#categoryFilter");
categoryFilter.addEventListener("change", function (event) {
  const selectedCategory = event.target.value;
  if (selectedCategory === "all") {
    renderProducts(allProducts);
    return;
  }
  const filteredProducts = allProducts.filter(
    (product) => product.category === selectedCategory
  );
  renderProducts(filteredProducts);
});

//Sort
const sortSelect = document.querySelector("#sortOption");
sortSelect.addEventListener("change", function (event) {
  const sortValue = event.target.value;
  handleSort(sortValue);
});
function handleSort(sortValue) {
  //gán lại giá trị khác nên ở đây em dùng let
  //copy mảng không thay đổi mảng gốc
  let sortedProducts = [...allProducts];
  if (sortValue === "priceAsc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortValue === "priceDesc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (sortValue === "nameAsc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortValue === "nameAsc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  renderProducts(sortedProducts);
}
