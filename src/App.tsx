import React, { useEffect, useMemo, useState } from "react";

const ZALO_PHONE = '84766666133';

const foods = [
  {
    id: 1,
    name: 'Cơm Gà Xào Hành Tây',
    desc: 'Ức gà xào hành tây, cơm trắng, rau củ.',
    price: 45000,
    category: 'Cơm',
    image:
      'https://cdn2.fptshop.com.vn/unsafe/800x0/ga_xao_hanh_tay_10_0d26f590a4.jpg',
  },
  {
    id: 2,
    name: 'Cơm Bò Xào Rau',
    desc: 'Bò xào rau củ tổng hợp, cơm trắng.',
    price: 45000,
    category: 'Cơm',
    tag: "Best Seller",
    image:
      'https://namviethathanh.com/wp-content/uploads/2019/05/11.C%C6%A1m-b%C3%B2-x%C3%A0o-70k-scaled.jpg',
  },
  {
    id: 3,
    name: 'Cơm Canh Khổ Qua',
    desc: 'Canh khổ qua nhồi thịt, cơm trắng.',
    price: 45000,
    category: 'Canh',
    image:
      'https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/Uploaded/psixbp_dpcweiz3/2020_12_28/canh_kho_qua_don_thit.jpg?width=260&s=qUp7HbClYB9V9yi22WT0cw',
  },
  {
    id: 4,
    name: 'Cơm Cá Hồi Áp Chảo',
    desc: 'Cá hồi áp chảo, cơm trắng, rau củ.',
    price: 100000,
    category: 'Cơm',
    tag: "Best Seller",
    image:
      'https://images.squarespace-cdn.com/content/v1/5a4e8d74e9bfdf1654dbeddc/1519067852101-H0CERNVMYTL3IL0OFVGT/pan+sear+salmon+cast+iron.jpg',
  },
  {
    id: 5,
    name: 'Cơm Trứng Chiên Thịt Bằm',
    desc: 'Trứng chiên thịt bằm, cơm trắng, rau củ.',
    price: 35000,
    category: 'Cơm',
    image:
      'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173813/Originals/cach-lam-trung-chien-thit-bam-5.jpg',
  },
  {
    id: 6,
    name: 'Cơm Thịt Heo Luộc',
    desc: 'Thịt heo luộc, cơm trắng, rau sống, chấm mắm.',
    price: 45000,
    category: 'Cơm',
    image:
      'https://cdn.tgdd.vn/2021/02/CookProduct/1-1200x676-51.jpg',
  },
  {
    id: 7,
    name: 'Bún Bò',
    desc: 'Chỉ bán vào chủ nhật hằng tuần.',
    price: 50000,
    category: 'Bún',
    image:
      'https://monngonmoingay.com/wp-content/uploads/2018/08/bun-bo-gio-heo-500-min.jpg',
  },
  {
    id: 8,
    name: 'Nước Cam Ép Tươi',
    desc: 'Nước cam ép nguyên chất 100%.',
    price: 15000,
    category: 'Nước',
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop',
  },
];

function money(n) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export default function App() {
  const [category, setCategory] = useState('Tất cả');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [openCart, setOpenCart] = useState(false);
  const [notice, setNotice] = useState("");
  const [distance, setDistance] = useState("duoi5");
  const [customerName, setCustomerName] = useState(
    localStorage.getItem("customerName") || ""
  );
  const [customerPhone, setCustomerPhone] = useState(
    localStorage.getItem("customerPhone") || ""
  );
  const [customerAddress, setCustomerAddress] = useState(
    localStorage.getItem("customerAddress") || ""
  );
  const [customerNote, setCustomerNote] = useState(
    localStorage.getItem("customerNote") || ""
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("customerPhone", customerPhone);
    localStorage.setItem("customerAddress", customerAddress);
    localStorage.setItem("customerNote", customerNote);
  }, [customerName, customerPhone, customerAddress, customerNote]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
  
    const hour = new Date().getHours();

const isOpen = hour >= 10 && hour < 16;
    return () => clearTimeout(timer);
  }, []);
  

  const categories = ['Tất cả', 'Cơm', 'Canh', 'Bún', 'Nước'];

  const shownFoods =
    category === 'Tất cả'
      ? foods
      : foods.filter((food) => food.category === category);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  function addToCart(food) {
    setCart((old) => {
      const found = old.find((item) => item.id === food.id);
  
      if (found) {
        return old.map((item) =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
  
      return [...old, { ...food, qty: 1 }];
    });
  
    setNotice("✅ Đã thêm " + food.name + " vào giỏ hàng");
  
    setTimeout(() => {
      setNotice("");
    }, 2000);
  
  }

    

  function changeQty(id, amount) {
    setCart((old) =>
      old.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item
      )
    );
  }

  function removeItem(id) {
    setCart((old) => old.filter((item) => item.id !== id));
  }

  function sendZalo() {
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Vui lòng dán thông tin đơn hàng được lưu sẵn khi tự động chuyển Zalo.");
      return;
    }
    const text =
  "====== ĐƠN HÀNG ======\n\n" +

  "THÔNG TIN KHÁCH\n" +
  "----------------------\n" +
  "TÊN: " + customerName + "\n" +
  "SĐT: " + customerPhone + "\n" +
  "ĐỊA CHỈ: " + customerAddress + "\n" +
  "GHI CHÚ: " +
  (customerNote || "Khong co") +
  "\n\n" +

  "MÓN ĐÃ CHỌN\n" +
  "----------------------\n" +

  cart
    .map(
      (item, index) =>
        (index + 1) +
        ". " +
        item.name +
        "\n   x" +
        item.qty +
        " - " +
        money(item.price * item.qty)
    )
    .join("\n\n") +

  "\n\nTONG CONG\n" +
  "----------------------\n" +
  money(total) +

  "\n\nVui long xac nhan don hang.";
    navigator.clipboard.writeText(text);
    window.open('https://zalo.me/' + ZALO_PHONE, '_blank');
    alert('Đã copy đơn hàng. Hãy dán vào Zalo và gửi cho quán nhé!');
  }
  if (loading) {
    return (
      <div style={s.page}>
        <header style={s.header}>
          <div>
            <div style={s.skeletonLogo}></div>
            <div style={s.skeletonSmall}></div>
          </div>
          <div style={s.skeletonButton}></div>
        </header>
  
        <main style={s.grid}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={s.skeletonCard}>
              <div style={s.skeletonImage}></div>
              <div style={s.skeletonLine}></div>
              <div style={s.skeletonLineShort}></div>
              <div style={s.skeletonPrice}></div>
            </div>
          ))}
        </main>
      </div>
    );
  }
  const hour = new Date().getHours();

const isOpen = hour >= 8 && hour < 16;
  return (
    <div style={s.page}>
      <header style={s.header}>
      <div>
  <h1 style={s.logo}>Gánh Tạp Hoá Chú Hiếu</h1>
  <p style={s.subLogo}>Healthy Food</p>

  <div
  style={{
    ...s.status,
    color: isOpen ? "#7CFC00" : "#ffb3b3",
  }}
>
  {isOpen
    ? "🟢 Đang mở cửa • 10:00 - 16:00"
    : "🔴 Đã đóng cửa • Mở lại lúc 10:00"}
</div>
</div>

        <button style={s.cartButton} onClick={() => setOpenCart(true)}>
          🛒 Giỏ hàng ({cart.reduce((sum, item) => sum + item.qty, 0)})
        </button>
      </header>

      <section style={s.hero}>
        <h2 style={s.title}>CHỌN MÓN ĂN</h2>
        <p style={s.subtitle}>Đồ ăn healthy ngon - sạch - giao nhanh</p>
      </section>

      <div style={s.tabs}>
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            style={{
              ...s.tab,
              ...(category === item ? s.activeTab : {}),
            }}
          >
            {item}
          </button>
        ))}
      </div>

      
      <main style={s.grid}>
        {shownFoods.map((food) => (
          <div key={food.id} style={s.card}>
            <img src={food.image} alt={food.name} style={s.image} />

            <div style={s.body}>
            <div style={s.badgeRow}>
  <span style={s.badge}>{food.category}</span>

  {food.tag && (
    <span style={s.hotBadge}>
      🔥 {food.tag}
    </span>
  )}
</div>
              <h3 style={s.foodName}>{food.name}</h3>
              <p style={s.desc}>{food.desc}</p>

              <div style={s.bottom}>
                <strong style={s.price}>{money(food.price)}</strong>

                <button style={s.addButton} onClick={() => addToCart(food)}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {notice && (
  <div style={s.notice}>
    {notice}
  </div>
)}
      {openCart && (
        <div style={s.overlay}>
          <div style={s.cart}>
            <div style={s.cartTop}>
              <h2>Giỏ hàng</h2>
              <button style={s.close} onClick={() => setOpenCart(false)}>
                ✕
              </button>
            </div>
          
<div style={s.form}>
  <h3 style={s.formTitle}>Thông tin giao hàng</h3>

  <input
    style={s.input}
    placeholder="Tên khách hàng"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
  />

  <input
    style={s.input}
    placeholder="Số điện thoại"
    value={customerPhone}
    onChange={(e) => setCustomerPhone(e.target.value)}
  />

  <input
    style={s.input}
    placeholder="Địa chỉ giao hàng"
    value={customerAddress}
    onChange={(e) => setCustomerAddress(e.target.value)}
  />
  <div style={s.distanceBox}>
  <p style={s.distanceTitle}>Khoảng cách giao hàng</p>

  <select
    style={s.select}
    value={distance}
    onChange={(e) => setDistance(e.target.value)}
  >
    <option value="duoi5">Dưới 5km - Free Ship</option>
    <option value="tren5">Trên 5km - Xác nhận qua Zalo</option>
  </select>
</div>

  <textarea
    style={s.textarea}
    placeholder="Ghi chú thêm..."
    value={customerNote}
    onChange={(e) => setCustomerNote(e.target.value)}
  />
</div>
            <div style={s.cartList}>
              {cart.length === 0 && <p>Giỏ hàng đang trống.</p>}

              {cart.map((item) => (
                <div key={item.id} style={s.cartItem}>
                  <img src={item.image} alt={item.name} style={s.cartImg} />

                  <div style={{ flex: 1 }}>
                    <h4 style={s.cartName}>{item.name}</h4>
                    <p style={s.cartPrice}>{money(item.price)}</p>

                    <div style={s.qty}>
                      <button onClick={() => changeQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                  </div>

                  <button style={s.remove} onClick={() => removeItem(item.id)}>
                    Xóa
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={s.cartBottom}>
                <div style={s.total}>
                  <span>Tổng cộng</span>
                  <b>{money(total)}</b>
                </div>
                <div style={{ marginTop: 20, textAlign: "center" }}>
  <p style={{ marginBottom: 12 }}>
    Sau khi kiểm tra đơn hàng, bấm nút bên dưới để gửi đơn qua Zalo.
  </p>
</div>

<a
  href="https://zalo.me/0766666133"
  target="_blank"
  rel="noreferrer"
  onClick={sendZalo}
  style={s.zalo}
>
  Copy đơn & mở Zalo
</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  skeletonLogo: {
    width: 220,
    height: 24,
    borderRadius: 8,
    background: "rgba(255,255,255,0.18)",
  },
  
  skeletonSmall: {
    width: 130,
    height: 14,
    borderRadius: 8,
    background: "rgba(255,255,255,0.14)",
    marginTop: 10,
  },
  
  skeletonButton: {
    width: 130,
    height: 42,
    borderRadius: 999,
    background: "rgba(255,255,255,0.16)",
  },
  
  skeletonCard: {
    background: "white",
    borderRadius: 26,
    overflow: "hidden",
    paddingBottom: 20,
  },
  
  skeletonImage: {
    height: 220,
    background: "#eee",
  },
  
  skeletonLine: {
    width: "70%",
    height: 22,
    borderRadius: 10,
    background: "#eee",
    margin: "20px 20px 0",
  },
  
  skeletonLineShort: {
    width: "45%",
    height: 16,
    borderRadius: 10,
    background: "#eee",
    margin: "14px 20px 0",
  },
  
  skeletonPrice: {
    width: 100,
    height: 28,
    borderRadius: 10,
    background: "#eee",
    margin: "28px 20px 0",
  },
  badgeRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  hotBadge: {
    background: "#111",
    color: "white",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 1,
  },
  status: {
    marginTop: 8,
    fontSize: 13,
    color: "#9ef01a",
    fontWeight: 600,
  },
  form: {
    padding: "14px 18px",
    display: "grid",
    gap: 8,
    borderBottom: "1px solid #eee",
    background: "#fafafa",
  },
  
  formTitle: {
    margin: "0 0 4px",
    fontSize: 18,
    color: "#111",
  },
  
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
  },
  
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    minHeight: 58,
    resize: "vertical",
  },
  hero: {
    height: 220,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 28,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  
  heroOverlay: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  
  heroTitle: {
    color: "white",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 10,
    textAlign: "center",
  },
  
  heroText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  page: {
    minHeight: '100vh',
    background: '#ed1b2f',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    background: '#111',
    color: 'white',
    padding: '18px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    margin: 0,
    fontSize: 24,
    textTransform: 'uppercase',
  },
  subLogo: {
    margin: '4px 0 0',
    color: '#ffb3b3',
    letterSpacing: 3,
  },
  cartButton: {
    background: '#ed1b2f',
    color: 'white',
    border: 'none',
    borderRadius: 999,
    padding: '12px 18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  hero: {
    textAlign: 'center',
    color: 'white',
    padding: '55px 20px 30px',
  },
  title: {
    fontSize: 46,
    letterSpacing: 8,
    margin: 0,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  tab: {
    border: '2px solid white',
    background: 'transparent',
    color: 'white',
    borderRadius: 999,
    padding: '10px 18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  activeTab: {
    background: 'white',
    color: '#ed1b2f',
  },
  grid: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 22,
  },
  card: {
    background: "#fff",
    borderRadius: 26,
    overflow: "hidden",
    boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
    transition: "0.25s",
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
  },
  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
  },
  body: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  badge: {
    background: "#ffe5e5",
    color: "#d90429",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "700",
    width: "fit-content",
  },
  foodName: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.25,
    margin: '14px 0 10px',
    color: '#111',
    letterSpacing: '-0.5px',
  },
  desc: {
    color: '#666',
    fontSize: 16,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  price: {
    color: "#d90429",
    fontSize: 26,
    fontWeight: "900",
  },
  addButton: {
    border: "none",
    background: "#111",
    color: "white",
    padding: "12px 22px",
    borderRadius: 14,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.5)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 99,
  },
  cart: {
    width: "min(430px, 100vw)",
    maxWidth: '100%',
    background: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  
  cartTop: {
    background: '#111',
    color: 'white',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    background: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
  },
  cartList: {
    flex: 1,
    padding: 18,
    overflowY: "auto",
    maxHeight: "45vh",
  },
  cartItem: {
    display: 'flex',
    gap: 12,
    borderBottom: '1px solid #eee',
    paddingBottom: 16,
    marginBottom: 16,
  },
  cartImg: {
    width: 72,
    height: 72,
    objectFit: 'cover',
    borderRadius: 14,
  },
  cartName: {
    margin: 0,
  },
  cartPrice: {
    color: '#ed1b2f',
    fontWeight: 'bold',
  },
  qty: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  remove: {
    background: 'transparent',
    color: '#ed1b2f',
    border: 'none',
    cursor: 'pointer',
  },
  cartBottom: {
    padding: 20,
    borderTop: '1px solid #eee',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 20,
    marginBottom: 16,
  },
  zalo: {
    width: '100%',
    padding: 15,
    borderRadius: 999,
    border: 'none',
    background: '#ed1b2f',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  qrBox: {
    background: '#fff',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    textAlign: 'center',
  },

  qrTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },

  qrImage: {
    width: '100%',
    maxWidth: '150px',
    borderRadius: 12,
  },

  bankText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.6,
  },
  notice: {
    position: "fixed",
    top: 20,
    right: 20,
    background: "#111",
    color: "white",
    padding: "14px 18px",
    borderRadius: 16,
    zIndex: 9999,
    fontWeight: "bold",
    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  
};
