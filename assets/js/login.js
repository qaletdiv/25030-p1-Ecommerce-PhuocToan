const users = JSON.parse(localStorage.getItem("users"));
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(123);

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  // Kiểm tra dữ liệu rỗng
  if (!email || !password) {
    alert("Vui lòng nhập đủ email và mật khẩu!");
    return;
  }
  // Tìm user trong mock-data
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert("Đăng nhập thành công!");
    // Lưu user vào localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    // Chuyển trang sau login (ví dụ)
    window.location.href = "index.html";
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
});
