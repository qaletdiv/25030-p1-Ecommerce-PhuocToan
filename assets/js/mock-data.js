//Mục đích của mock-data,là sao chép dữ liệu từ đây lên localStorage
// Dữ liệu sản phẩm gốc (mock data)
// Chỉ dùng để khởi tạo localStorage lần đầu
// Không được chỉnh sửa trong quá trình chạy app
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 31034000,
    category: "iphone",
    image: "assets/img/feature/iphone-16-pro-max.webp",
    featured: true,

    images: [
      "assets/img/feature/iphone-16-pro-max.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-pro-max-titan-tu-nhien.png",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-pro-max-titan-den.png",
    ],
    colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Đen"],
    storages: ["256GB", "512GB", "1TB"],
    shipping: "Giao nhanh 2h tại TP Đà Nẵng",
    description:
      "iPhone 16 Pro Max được trang bị chip A18 Pro mạnh mẽ, mang lại hiệu năng vượt trội cho mọi tác vụ. Màn hình ProMotion 120Hz cho trải nghiệm vuốt chạm mượt mà, hệ thống camera cải tiến giúp chụp ảnh và quay video sắc nét trong mọi điều kiện ánh sáng.",
  },

  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    price: 26800000,
    category: "samsung",
    image: "assets/img/feature/dien-thoai-samsung-galaxy-s25-utra.webp",
    featured: true,

    images: [
      "assets/img/feature/dien-thoai-samsung-galaxy-s25-utra.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-utra_7_.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-utra_19_.png",
    ],
    colors: ["Đen", "Xám", "Trắng"],
    storages: ["256GB", "512GB"],
    shipping: "Miễn phí giao hàng toàn quốc",
    description:
      "Samsung Galaxy S25 Ultra sở hữu màn hình Dynamic AMOLED cao cấp, độ sáng cao và màu sắc sống động. Camera zoom quang học ấn tượng, pin dung lượng lớn đáp ứng nhu cầu sử dụng cả ngày dài.",
  },

  {
    id: 3,
    name: "iPhone 17 Pro Max",
    price: 6690000,
    category: "iphone",
    image: "assets/img/feature/iphone-17-pro-max_3.webp",
    featured: true,

    images: [
      "assets/img/feature/iphone-17-pro-max_3.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max-2.jpg",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max-1.jpg",
    ],
    colors: ["Cam", "Bạc", "Xanh Đậm"],
    storages: ["256GB", "512GB", "1TB"],
    shipping: "Giao hàng tiêu chuẩn 1–2 ngày",
    description:
      "iPhone 17 Pro Max mang đến thiết kế cao cấp cùng hiệu năng ổn định, phù hợp cho người dùng yêu thích sự mượt mà và hệ sinh thái Apple. Thiết bị đáp ứng tốt các nhu cầu giải trí, học tập và làm việc.",
  },

  {
    id: 4,
    name: "Samsung Galaxy A17",
    price: 5890000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a17-xanh.jpg",
    featured: true,

    images: [
      "assets/img/feature/samsung-galaxy-a17-xanh.jpg",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a17-5g-back-4.jpg",
      ,
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a17-5g-gray-4.jpg",
    ],
    colors: ["Xanh", "Đen", "Xám"],
    storages: ["128GB"],
    shipping: "Miễn phí giao hàng",
    description:
      "Samsung Galaxy A17 là lựa chọn phù hợp trong phân khúc phổ thông với màn hình lớn, pin bền bỉ và hiệu năng ổn định cho các tác vụ hằng ngày như lướt web, xem phim và mạng xã hội.",
  },

  {
    id: 5,
    name: "Xiaomi Redmi Note 14",
    price: 6690000,
    category: "xiaomi",
    image: "assets/img/feature/dien-thoai-xiaomi-redmi-note-14.1.webp",
    featured: true,

    images: [
      "assets/img/feature/dien-thoai-xiaomi-redmi-note-14.1.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14_1.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14_2__2.png",
    ],
    colors: ["Tím", "Đen", "Xanh lá"],
    storages: ["128GB", "256GB"],
    shipping: "Miễn phí giao hàng",
    description:
      "Xiaomi Redmi Note 14 nổi bật với hiệu năng tốt trong tầm giá, màn hình sắc nét và pin dung lượng lớn. Máy phù hợp cho người dùng cần một thiết bị ổn định để học tập, làm việc và giải trí.",
  },

  {
    id: 6,
    name: "iPhone 14",
    price: 16290000,
    category: "iphone",
    image: "assets/img/feature/iphone-14.webp",
    featured: true,

    images: [
      "assets/img/feature/iphone-14.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2022-09-28_21-58-48_1.jpg",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2022-09-28_21-58-54_1.jpg",
    ],
    colors: ["Đen", "Trắng", "Đỏ"],
    storages: ["128GB", "256GB"],
    shipping: "Miễn phí giao hàng",
    description:
      "iPhone 14 sở hữu thiết kế sang trọng, hiệu năng ổn định và camera chất lượng cao. Đây là lựa chọn lý tưởng cho người dùng muốn trải nghiệm iOS mượt mà với mức giá hợp lý.",
  },

  {
    id: 7,
    name: "Realme C67",
    price: 4290000,
    category: "realme",
    image: "assets/img/feature/realme-c67-1_1.webp",
    featured: true,

    images: [
      "assets/img/feature/realme-c67-1_1.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_4__6_6.png",
    ],
    colors: ["Xanh", "Đen"],
    storages: ["128GB"],
    shipping: "Giao hàng tiết kiệm",
    description: "",
  },

  {
    id: 8,
    name: "Xiaomi Poco F8 Pro",
    price: 15199000,
    category: "xiaomi",
    image: "assets/img/feature/poco-f8-pro-2_1.webp",
    featured: true,

    images: [
      "assets/img/feature/poco-f8-pro-2_1.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/o/poco-f8-pro-1.jpg",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/o/poco-f8-pro.jpg",
    ],
    colors: ["Xanh dương", "Xám", "Đen"],
    storages: ["256GB", "512GB"],
    shipping: "Miễn phí giao hàng toàn quốc",
    description:
      "Xiaomi Poco F8 Pro được trang bị cấu hình mạnh mẽ, phù hợp cho chơi game và đa nhiệm. Màn hình lớn, pin khỏe giúp người dùng thoải mái sử dụng trong thời gian dài.",
  },

  // ===== A2 =====
  {
    id: 9,
    name: "iPhone 13 Pro Max",
    price: 22875000,
    category: "iphone",
    image: "assets/img/feature/iphone-13-pro-max.webp",
    featured: false,

    images: [
      "assets/img/feature/iphone-13-pro-max.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/2/_/2_61_8_2_1_6.jpg",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/r/tr_ng_1_4.jpg",
    ],
    colors: ["Xanh dương", "Xám", "Bạc"],
    storages: ["128GB", "256GB", "512GB"],
    shipping: "Giao hàng nhanh 1–2 ngày",
    description:
      "iPhone 13 Pro Max vẫn giữ được sức hút nhờ hiệu năng mạnh mẽ, camera chất lượng cao và màn hình ProMotion mượt mà. Máy phù hợp cho người dùng muốn trải nghiệm cao cấp với mức giá tốt.",
  },

  {
    id: 10,
    name: "Samsung Galaxy S20",
    price: 6190000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-s20.webp",
    featured: false,

    images: [
      "assets/img/feature/samsung-galaxy-s20.webp",
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/6/3/637170935875912528_ss-s20-ultra-den-1_2.png",
    ],
    colors: ["Xanh", "Đen"],
    storages: ["128GB", "256GB"],
    shipping: "Giao hàng tiêu chuẩn toàn quốc",
    description:
      "Samsung Galaxy S20 sở hữu thiết kế cao cấp, màn hình AMOLED sắc nét và hiệu năng ổn định. Phù hợp cho nhu cầu giải trí, xem phim và chụp ảnh hằng ngày.",
  },

  {
    id: 11,
    name: "Xiaomi Redmi Note 12",
    price: 2871000,
    category: "xiaomi",
    image: "assets/img/feature/redmi-note-12.webp",
    featured: false,

    images: [
      "assets/img/feature/redmi-note-12.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/f/dfg89_2_.jpg",
    ],
    colors: ["Xanh lá", "Đen"],
    storages: ["128GB"],
    shipping: "Giao hàng tiết kiệm 2–3 ngày",
    description:
      "Xiaomi Redmi Note 12 mang lại trải nghiệm tốt trong phân khúc giá rẻ với màn hình đẹp, pin ổn định và hiệu năng đủ dùng cho các tác vụ cơ bản.",
  },

  {
    id: 12,
    name: "Realme GT Neo 3",
    price: 5450000,
    category: "realme",
    image: "assets/img/feature/realme-gt-neo-3.webp",
    featured: false,

    images: [
      "assets/img/feature/realme-gt-neo-3.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/realme-gt-neo-3_2_.png",
    ],
    colors: ["Xám", "Tím"],
    storages: ["128GB"],
    shipping: "Giao hàng nhanh trong 1–2 ngày",
    description:
      "Realme GT Neo là mẫu smartphone có hiệu năng tốt, thiết kế hiện đại và màn hình mượt. Phù hợp cho người dùng yêu thích chơi game và trải nghiệm tốc độ cao.",
  },

  {
    id: 13,
    name: "iPhone 12",
    price: 7990000,
    category: "iphone",
    image: "assets/img/feature/iphone-12.webp",
    featured: false,

    images: [
      "assets/img/feature/iphone-12.webp",
      "https://trangthienlong.com.vn/wp-content/uploads/2024/11/iphone-12-thuong-vs-iphone-12-mini-64gb-128gb-256gb-mau-xanh-duong-768x768.jpg",

      "https://trangthienlong.com.vn/wp-content/uploads/2024/11/iphone-12-thuong-vs-iphone-12-mini-64gb-128gb-256gb-mau-den-768x768.jpg",
    ],
    colors: ["Đỏ", "Xanh", "Đen"],
    storages: ["128GB"],
    shipping: "Giao hàng tiêu chuẩn toàn quốc",
    description:
      "iPhone 12 sở hữu thiết kế vuông vức hiện đại, hiệu năng ổn định và hỗ trợ 5G. Máy đáp ứng tốt nhu cầu sử dụng lâu dài với hệ điều hành iOS.",
  },

  {
    id: 14,
    name: "Samsung Galaxy A52",
    price: 9290000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a52.webp",
    featured: false,

    images: [
      "assets/img/feature/samsung-galaxy-a52.webp",
      "https://down-vn.img.susercontent.com/file/8a3fffd3d0b1dcf2963334e696aa42a1.webp",
    ],
    colors: ["Đen", "Xanh"],
    storages: ["128GB"],
    shipping: "Miễn phí giao hàng",
    description:
      "Samsung Galaxy A52 nổi bật với màn hình AMOLED mượt mà, camera chụp ảnh đẹp và khả năng kháng nước nhẹ. Phù hợp cho người dùng cần sự cân bằng giữa hiệu năng và trải nghiệm.",
  },

  {
    id: 15,
    name: "Xiaomi Poco X4",
    price: 4490000,
    category: "xiaomi",
    image: "assets/img/feature/xiaomi-poco-x4.webp",
    featured: false,

    images: [
      "assets/img/feature/xiaomi-poco-x4.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/f/dfg89_2_.jpg",
    ],
    colors: ["Xám", "Đen"],
    storages: ["128GB"],
    shipping: "Giao hàng tiêu chuẩn 1–3 ngày",
    description:
      "Xiaomi Poco X4 mang đến hiệu năng ổn định, pin dung lượng lớn và thiết kế trẻ trung. Phù hợp cho người dùng phổ thông và giải trí nhẹ.",
  },

  {
    id: 16,
    name: "Samsung Galaxy A56",
    price: 9100000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a56.webp",
    featured: false,

    images: [
      "assets/img/feature/samsung-galaxy-a56.webp",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-a56.1_1.png",
    ],
    colors: ["Xanh", "Xám"],
    storages: ["128GB"],
    shipping: "Miễn phí giao hàng toàn quốc",
    description:
      "Samsung Galaxy A56 là lựa chọn phù hợp trong phân khúc tầm trung với thiết kế hiện đại, hiệu năng ổn định và camera đáp ứng tốt nhu cầu chụp ảnh hằng ngày.",
  },
];

// Danh sách user mẫu để test chức năng đăng nhập

const USERS = [
  { email: "user1@example.com", password: "123456", fullName: "Nguyễn Văn A" },
  { email: "user2@example.com", password: "password", fullName: "Lê Văn B" },
];
