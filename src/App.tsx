// @ts-nocheck
import React, { useMemo, useState } from "react";

const ZALO_PHONE = "0766666133";

const foods = [
  {
    id: 1,
    name: "Cơm Gà Xào Hành Tây",
    desc: "Ức gà xào hành tây, cơm trắng, rau củ.",
    price: 45000,
    category: "Cơm",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Cơm Bò Xào Rau",
    desc: "Bò xào rau củ tổng hợp, cơm trắng.",
    price: 45000,
    category: "Cơm",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Cơm Canh Khổ Qua",
    desc: "Canh khổ qua nhồi thịt, cơm trắng.",
    price: 45000,
    category: "Canh",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Cơm Cá Hồi Áp Chảo",
    desc: "Cá hồi áp chảo, cơm trắng, rau củ.",
    price: 100000,
    category: "Cơm",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Cơm Trứng Chiên Thịt Bằm",
    desc: "Trứng chiên thịt bằm, cơm trắng, rau củ.",
    price: 35000,
    category: "Cơm",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Cơm Thịt Heo Luộc",
    desc: "Thịt heo luộc, cơm trắng, rau sống, chấm mắm.",
    price: 45000,
    category: "Cơm",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Bún Bò",
    desc: "Chỉ bán vào thứ 4 hằng tuần.",
    price: 50000,
    category: "Bún",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Nước Cam Ép Tươi",
    desc: "Nước cam ép nguyên chất 100%.",
    price: 15000,
    category: "Nước",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop",
  },
];

function money(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export default function App() {
  const [category, setCategory] = useState("Tất cả");
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [notice, setNotice] = useState("");

  const categories = ["Tất cả", "Cơm", "Canh", "Bún", "Nước"];

  const shownFoods =
    category === "Tất cả"
      ? foods
      : foods.filter((food) => food.category === category);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  function addToCart(food) {
    setCart((old) => {
      const found = old.find((item) => item.id === food.id);

      if (found) {
        return old.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...old, { ...food, qty: 1 }];
    });

    setNotice("Đã thêm " + food.name + " vào giỏ hàng");

    setTimeout(() => {
      setNotice("");
    }, 1600);
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
    const lines = [
      "Xin chào Gánh Tạp Hoá Chú Hiếu, tôi muốn đặt món:",
      "",
      ...cart.map(
        (item) =>
          "- " +
          item.name +
          " x" +
          item.qty +
          ": " +
          money(item.price * item.qty)
      ),
      "",
      "Tổng cộng: " + money(total),
      "",
      "Thanh toán chuyển khoản:",
      "HD Bank - VU MINH HIEU",
      "STK: 0982728880",
      "Vui lòng gửi bill sau khi chuyển khoản."
    ];
  
    const text = lines.join("\n");
  
    navigator.clipboard.writeText(text);
  
    alert("Đã copy đơn hàng. Bấm OK để mở Zalo.");
  
    window.location.href = "https://zalo.me/0766666133";
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div>
          <h1 style={s.logo}>Gánh Tạp Hoá Chú Hiếu</h1>
          <p style={s.subLogo}>Healthy Food</p>
        </div>

        <button style={s.cartButton} onClick={() => setOpenCart(true)}>
          🛒 Giỏ hàng ({totalQty})
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
            style={{ ...s.tab, ...(category === item ? s.activeTab : {}) }}
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
              <span style={s.badge}>{food.category}</span>
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

      {notice && <div style={s.notice}>{notice}</div>}

      {openCart && (
        <div style={s.overlay}>
          <div style={s.cart}>
            <div style={s.cartTop}>
              <h2 style={{ margin: 0 }}>Giỏ hàng</h2>
              <button style={s.close} onClick={() => setOpenCart(false)}>
                ✕
              </button>
            </div>

            <div style={s.cartList}>
              {cart.length === 0 && (
                <div style={s.emptyCart}>
                  <p>Giỏ hàng đang trống.</p>
                  <button style={s.backButton} onClick={() => setOpenCart(false)}>
                    Tiếp tục chọn món
                  </button>
                </div>
              )}

              {cart.map((item) => (
                <div key={item.id} style={s.cartItem}>
                  <img src={item.image} alt={item.name} style={s.cartImg} />

                  <div style={{ flex: 1 }}>
                    <h4 style={s.cartName}>{item.name}</h4>
                    <p style={s.cartPrice}>{money(item.price)}</p>

                    <div style={s.qtyRow}>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, -1)}>
                        -
                      </button>
                      <span style={s.qtyText}>{item.qty}</span>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, 1)}>
                        +
                      </button>
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

                <button style={s.zalo} onClick={sendZalo}>
                  Đặt qua Zalo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#ed1b2f",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#111",
    color: "white",
    padding: "18px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    margin: 0,
    fontSize: 24,
    textTransform: "uppercase",
  },
  subLogo: {
    margin: "4px 0 0",
    color: "#ffb3b3",
    letterSpacing: 3,
  },
  cartButton: {
    background: "#ed1b2f",
    color: "white",
    border: "none",
    borderRadius: 999,
    padding: "12px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  hero: {
    textAlign: "center",
    color: "white",
    padding: "55px 20px 30px",
  },
  title: {
    fontSize: 46,
    letterSpacing: 8,
    margin: 0,
  },
  subtitle: {
    fontWeight: "bold",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 30,
    padding: "0 16px",
  },
  tab: {
    border: "2px solid white",
    background: "transparent",
    color: "white",
    borderRadius: 999,
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  activeTab: {
    background: "white",
    color: "#ed1b2f",
  },
  grid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px 60px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 22,
  },
  card: {
    background: "white",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
  },
  image: {
    width: "100%",
    height: 160,
    objectFit: "cover",
  },
  body: {
    padding: 18,
  },
  badge: {
    background: "#ffe2e2",
    color: "#ed1b2f",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },
  foodName: {
    fontSize: 20,
    margin: "14px 0 8px",
  },
  desc: {
    color: "#666",
    fontSize: 14,
    minHeight: 42,
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  price: {
    color: "#ed1b2f",
    fontSize: 20,
  },
  addButton: {
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "10px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  notice: {
    position: "fixed",
    left: "50%",
    bottom: 24,
    transform: "translateX(-50%)",
    background: "#111",
    color: "white",
    padding: "12px 18px",
    borderRadius: 999,
    zIndex: 200,
    fontWeight: "bold",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.55)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 99,
  },
  cart: {
    width: 430,
    maxWidth: "100%",
    background: "white",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cartTop: {
    background: "#111",
    color: "white",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  close: {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
  },
  cartList: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },
  emptyCart: {
    textAlign: "center",
    paddingTop: 60,
    color: "#555",
  },
  backButton: {
    marginTop: 12,
    border: "none",
    borderRadius: 999,
    background: "#ed1b2f",
    color: "white",
    padding: "12px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cartItem: {
    display: "flex",
    gap: 12,
    borderBottom: "1px solid #eee",
    paddingBottom: 16,
    marginBottom: 16,
  },
  cartImg: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 14,
  },
  cartName: {
    margin: 0,
  },
  cartPrice: {
    color: "#ed1b2f",
    fontWeight: "bold",
    margin: "6px 0",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    border: "1px solid #ddd",
    borderRadius: 8,
    background: "white",
    cursor: "pointer",
  },
  qtyText: {
    minWidth: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  remove: {
    background: "transparent",
    color: "#ed1b2f",
    border: "none",
    cursor: "pointer",
  },
  cartBottom: {
    padding: 20,
    borderTop: "1px solid #eee",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    marginBottom: 14,
  },
  qrBox: {
    background: "#fff4f4",
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
    textAlign: "center",
  },
  qrTitle: {
    margin: "0 0 10px",
    fontWeight: "bold",
  },
  qrImage: {
    width: "100%",
    maxWidth: "150px",
    borderRadius: 12,
  },
  bankText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.6,
  },
  zalo: {
    width: "100%",
    padding: 15,
    borderRadius: 999,
    border: "none",
    background: "#ed1b2f",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

