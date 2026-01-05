const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.querySelector("#fullName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (fullName.length < 3) {
    alert("Họ tên phải có ít nhất 3 kí tự");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 kí tự");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((u) => u.email === email)) {
    alert("Email đã tồn tại");
    return;
  }

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  window.location.href = "login.html";
});
