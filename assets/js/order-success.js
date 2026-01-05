// ===== CHECK LOGIN =====
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

// ===== GET ORDERS =====
const orders = JSON.parse(localStorage.getItem("orders")) || [];

// Lấy đơn mới nhất của user
const userOrders = orders.filter((o) => o.userEmail === currentUser.email);

if (userOrders.length === 0) {
  alert("Không tìm thấy đơn hàng");
  window.location.href = "index.html";
}

const latestOrder = userOrders[0];

// ===== RENDER CUSTOMER INFO =====
document.getElementById("cus-name").textContent = latestOrder.fullName || "";

document.getElementById("cus-phone").textContent = latestOrder.phone || "";

document.getElementById("cus-address").textContent = latestOrder.address || "";

// ===== RENDER ITEMS =====
const itemsEl = document.getElementById("summary-items");
itemsEl.innerHTML = "";

latestOrder.items.forEach((item) => {
  itemsEl.innerHTML += `
    <div class="summary-item">
      <span>
        ${item.name} (${item.color} - ${item.storage}) x${item.quantity}
      </span>
      <strong>
        ${(item.price * item.quantity).toLocaleString()}đ
      </strong>
    </div>
  `;
});

// ===== TOTAL =====
document.getElementById("summary-total").textContent =
  latestOrder.total.toLocaleString() + "đ";
