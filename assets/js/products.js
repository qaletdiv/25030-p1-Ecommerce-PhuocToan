// BUG_003 FIX: Hàm lấy số lượng sản phẩm trong giỏ hàng
function getCartCount() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return 0;
  const cartKey = `cart_${currentUser.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}

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
      <a href="cart.html" class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
        ${getCartCount() > 0 ? `<span class="cart-count">${getCartCount()}</span>` : ""}
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

//GỢI Ý KHI GÕ (SEARCH DROPDOWN GIỐNG TRANG WEB BÁN HÀNG)
//Lấy element kết quả search
const searchResult = document.querySelector("#searchResult");
// BUG_001 FIX: Khai báo searchInput (bị thiếu ở trang products)
const searchInput = document.querySelector("#searchInput");

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
    product.name.toLowerCase().includes(keyword),
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

const allProducts = JSON.parse(localStorage.getItem("products")); // tất cả sản phẩm
const productListContainer = document.querySelector("#productList"); // thẻ chứa sản phẩm

function renderProducts(productArray) {
  // Xóa HTML cũ
  productListContainer.innerHTML = "";

  // Duyệt từng sản phẩm
  productArray.forEach((product) => {
    const productHTML = `
      <div class="product-item">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString()}đ</p>
        <a 
          href="product-detail.html?id=${product.id}" 
          class="view-detail"
        >
          Xem chi tiết
        </a>
      </div>
    `;
    productListContainer.innerHTML += productHTML;
  });
}

// Render tất cả sản phẩm ngay khi trang load
renderProducts(allProducts);

// Thêm 2 biến để theo dõi trạng thái hiện tại
let currentCategory = "all";
let currentSort = "default";

// Hàm thực thi việc lọc và sắp xếp kết hợp
function applyFilterAndSort() {
  // BƯỚC 1: LỌC
  let filteredData = [...allProducts];
  if (currentCategory !== "all") {
    filteredData = filteredData.filter(
      (product) => product.category === currentCategory,
    );
  }

  // BƯỚC 2: SẮP XẾP trên kết quả đã lọc
  if (currentSort === "priceAsc") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (currentSort === "priceDesc") {
    filteredData.sort((a, b) => b.price - a.price);
  } else if (currentSort === "nameAsc") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === "nameDesc") {
    filteredData.sort((a, b) => b.name.localeCompare(a.name));
  }

  // BƯỚC 3: RENDER
  renderProducts(filteredData);
}

// BUG_005/BUG_006 FIX: Khai báo đúng tên biến (HTML dùng id="sortOption")
const sortSelect = document.querySelector("#sortOption");
const categoryFilter = document.querySelector("#categoryFilter");

// Lắng nghe sự kiện Filter
categoryFilter.addEventListener("change", function (event) {
  currentCategory = event.target.value;
  applyFilterAndSort(); // Gọi hàm dùng chung
});

// Lắng nghe sự kiện Sort
sortSelect.addEventListener("change", function (event) {
  currentSort = event.target.value;
  applyFilterAndSort(); // Gọi hàm dùng chung
});
