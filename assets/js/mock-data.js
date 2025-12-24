//Mục đích của mock-data,là sao chép dữ liệu từ đây lên localStorage
// Dữ liệu sản phẩm gốc (mock data)
// Chỉ dùng để khởi tạo localStorage lần đầu
// Không được chỉnh sửa trong quá trình chạy app
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 37890000,
    category: "iphone",
    image: "assets/img/feature/iphone-16-pro-max.webp",
    featured: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    price: 26990000,
    category: "samsung",
    image: "assets/img/feature/dien-thoai-samsung-galaxy-s25-utra.webp",
    featured: true,
  },
  {
    id: 3,
    name: "iPhone 17 Pro Max",
    price: 6690000,
    category: "iPhone",
    image: "assets/img/feature/iphone-17-pro-max_3.webp",
    featured: true,
  },
  {
    id: 4,
    name: "Samsung Galaxy A17",
    price: 5890000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a17-xanh.jpg",
    featured: true,
  },
  {
    id: 5,
    name: "Xiaomi Redmi Note 14",
    price: 6690000,
    category: "xiaomi",
    image: "assets/img/feature/dien-thoai-xiaomi-redmi-note-14.1.webp",
    featured: true,
  },
  {
    id: 6,
    name: "iPhone 14",
    price: 16290000,
    category: "iphone",
    image: "assets/img/feature/iphone-14.webp",
    featured: true,
  },
  {
    id: 7,
    name: "Realme C67",
    price: 4290000,
    category: "realme",
    image: "assets/img/feature/realme-c67-1_1.webp",
    featured: true,
  },
  {
    id: 8,
    name: "Xiaomi Poco F8 Pro",
    price: 15199000,
    category: "xiaomi",
    image: "assets/img/feature/poco-f8-pro-2_1.webp",
    featured: true,
  },

  //Sản phẩm thêm vô để làm trang A2
  {
    id: 9,
    name: "iPhone 13 Pro Max",
    price: 22875000,
    category: "iphone",
    image: "assets/img/feature/iphone-13-pro-max.webp",
    featured: false,
  },
  {
    id: 10,
    name: "Samsung Galaxy S20",
    price: 6190000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-s20.webp",
    featured: false,
  },
  {
    id: 11,
    name: "Xiaomi Redmi Note 12",
    price: 2871000,
    category: "xiaomi",
    image: "assets/img/feature/redmi-note-12.webp",
    featured: false,
  },
  {
    id: 12,
    name: "Realme GT Neo",
    price: 5450000,
    category: "realme",
    image: "assets/img/feature/realme-gt-neo-3.webp",
    featured: false,
  },
  {
    id: 13,
    name: "iPhone 12",
    price: 7990000,
    category: "iphone",
    image: "assets/img/feature/iphone-12.webp",
    featured: false,
  },
  {
    id: 14,
    name: "Samsung Galaxy A52",
    price: 9290000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a52.webp",
    featured: false,
  },
  {
    id: 15,
    name: "Xiaomi Poco X4",
    price: 4490000,
    category: "xiaomi",
    image: "assets/img/feature/xiaomi-poco-x4.webp",
    featured: false,
  },
  {
    id: 16,
    name: "Samsung Galaxy A56",
    price: 9100000,
    category: "samsung",
    image: "assets/img/feature/samsung-galaxy-a56.webp",
    featured: false,
  },
];

// Danh sách user mẫu để test chức năng đăng nhập

const USERS = [
  { email: "user1@example.com", password: "123456", fullName: "Nguyễn Văn A" },
  { email: "user2@example.com", password: "password", fullName: "Lê Văn B" },
];
