const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //Lấy input
  const fullName = document.querySelector("#fullName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  //fullName
  if (fullName.length < 3) {
    alert("Họ tên phải có ít nhất 3 kí tự");
    return;
  }

  //email

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (!isValidEmail(email)) {
    alert("Email không hợp lệ");
    return;
  }

  //password
  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 kí tự");
    return;
  }

  //Mật khẩu không khớp với nhập lại mật khẩu
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  //Lấy users
  const users = JSON.parse(localStorage.getItem("users"));
  const foundUser = users.find((user) => user.email === email);
  if (foundUser) {
    alert("Email đã tồn tại");
    return;
  }

  //Hợp lệ hết rồi thì nhảy tạo user;
  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
    role: "user",
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
});
