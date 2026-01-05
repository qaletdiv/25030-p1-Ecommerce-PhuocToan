const users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    alert("Vui lòng nhập đủ email và mật khẩu!");
    return;
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alert("Đăng nhập thành công!");

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: user.email,
        password: user.password,
        fullName: user.fullName,
      })
    );

    window.location.href = "index.html";
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
});
