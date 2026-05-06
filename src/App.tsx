// @ts-nocheck
import React, { useMemo, useState } from 'react';

const ZALO_PHONE = '84766666133';

const foods = [
  {
    id: 1,
    name: 'Cơm Gà Xào Hành Tây',
    desc: 'Ức gà xào hành tây, cơm trắng, rau củ.',
    price: 45000,
    category: 'Cơm',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Cơm Bò Xào Rau',
    desc: 'Bò xào rau củ tổng hợp, cơm trắng.',
    price: 45000,
    category: 'Cơm',
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
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Bún Bò',
    desc: 'Chỉ bán vào thứ 4 hằng tuần.',
    price: 50000,
    category: 'Bún',
    image:
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200&auto=format&fit=crop',
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
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

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
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...old, { ...food, qty: 1 }];
    });

    setOpenCart(true);
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
    const text =
      "Xin chào Gánh Tạp Hoá Chú Hiếu, tôi muốn đặt món:\n\n" +
      cart
        .map(
          (item) =>
            "- " +
            item.name +
            " x" +
            item.qty +
            " = " +
            money(item.price * item.qty)
        )
        .join("\n") +
      "\n\nTổng cộng: " +
      money(total);
  
    navigator.clipboard.writeText(text);
  
    alert(
      "Đã copy đơn hàng. Bấm OK để mở Zalo, sau đó dán đơn hàng vào chat."
    );
  
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

      {openCart && (
        <div style={s.overlay}>
          <div style={s.cart}>
            <div style={s.cartTop}>
              <h2>Giỏ hàng</h2>
              <button style={s.close} onClick={() => setOpenCart(false)}>
                ✕
              </button>
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
                <div style={s.qrBox}>
                  <p style={s.qrTitle}>Quét mã để chuyển khoản</p>

                  <img src="/qr.jpg" alt="QR chuyển khoản" style={s.qrImage} />

                  <p style={s.bankText}>
                    HD Bank - VU MINH HIEU
                    <br />
                    STK: 0982728880
                  </p>
                </div>

                <button style={s.zalo} onClick={sendZalo}>
                  Copy đơn & mở Zalo
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
    background: 'white',
    borderRadius: 22,
    overflow: 'hidden',
    boxShadow: '0 18px 35px rgba(0,0,0,0.18)',
  },
  image: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
  },
  body: {
    padding: 18,
  },
  badge: {
    background: '#ffe2e2',
    color: '#ed1b2f',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 'bold',
  },
  foodName: {
    fontSize: 20,
    margin: '14px 0 8px',
  },
  desc: {
    color: '#666',
    fontSize: 14,
    minHeight: 42,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    color: '#ed1b2f',
    fontSize: 20,
  },
  addButton: {
    background: '#111',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '10px 16px',
    fontWeight: 'bold',
    cursor: 'pointer',
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
    width: 430,
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
    padding: 20,
    overflowY: 'auto',
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
};
