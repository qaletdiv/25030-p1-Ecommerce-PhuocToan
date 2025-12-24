//Hàm khởi tạo dữ liệu cho localStorage
//mục đích là để sao chép dữ liệu từ mock-data lên localStorage
//nếu check LocalStorage bằng getItem không có,thì sẽ setItem
//Tức là : nạp dữ liệu từ mock-data khi localStorage chưa có
//Không ghi đè dữ liệu người dùng trong quá trình chạy
function initData() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(USERS));
  }
}
initData();
