//1.Sau khi nó hàm initData trong storage dữ liệu từ mock-data
//thì ta sẽ có dữ liệu

//I. HEADER
/* 1.1.LẤY CÁC THẺ VÀ DỮ LIỆU CẦN DÙNG
Lấy danh sách sản phẩm từ localStorage 

*/
const products = JSON.parse(localStorage.getItem("products"));
console.log(products);

// Lọc ra các sản phẩm nổi bật để hiển thị ở trang chủ

const featuredProducts = products.filter((product) => product.featured);

// Container hiển thị danh sách sản phẩm nổi bật
const container = document.querySelector("#featuredProducts");

// Ô input tìm kiếm sản phẩm theo tên,dùng nó để render ra
const searchInput = document.querySelector("#searchInput");

//1.2.THÌ TRANG WEB HIỆN CÁI NÀO TRƯỚC THÌ LÀM CÁI ĐÓ
//1.3. Render Header

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

//1.4. HÀM RENDER SẢN PHẨM NỔI BẬT

console.log(featuredProducts);

function renderFeaturedProducts() {
  //Xóa toàn bộ HTML cũ trước khi render
  //Tránh trường hợp render bị trùng lặp khi gọi lại hàm

  container.innerHTML = "";

  //Duyệt qua từng sản phẩm trong mảng featuredProducts

  featuredProducts.forEach((product) => {
    //Tạo HTML cho 1 sản phẩm
    //Dùng template string để nhúng dữ liệu động

    const productHTML = `
    <div class="product-item">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()}đ</p>

      <button class="add-to-cart">Thêm vào giỏ hàng</button>

    </div>
`;

    //Đưa HTML của sản phẩm vào container
    container.innerHTML += productHTML;
  });
}
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      handleAddToCart(products[index]);
    });
  });
}
//Hàm handle to Cart
function handleAddToCart(product) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //chưa đăng nhập
  if (!currentUser) {
    alert("Vui lòng đăng nhập");
    window.location.href = "login.html";
    return;
  } else {
    //lúc sau thì nên code sau khi Làm trang giỏ hang
  }
}

//THANH INPUT
// searchInput.addEventListener("input", function () {
//   const keyword = searchInput.value.toLowerCase().trim();
//   //Lọc sản phẩm theo tên
//   const filteredProducts = featuredProducts.filter((product) =>
//     product.name.toLowerCase().includes(keyword)
//   );

//   renderFeaturedProducts(filteredProducts);
// });

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

//Gọi hàm để render sp khi trang vừa reload
renderFeaturedProducts();
attachAddToCartEvents();
