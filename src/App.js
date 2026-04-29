import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./style.css";

// --- 分頁組件 1：首頁 ---
const Home = () => (
  <div className="page-content">
    <h1>✈️ 日本代購服務</h1>
    <p>提供日本商品代購，週週空運回台。</p>
    <div className="feature-grid">
      <div className="feature-card">空運直送</div>
      <div className="feature-card">匯率透明</div>
      <div className="feature-card">快速報價</div>
    </div>
    <Link to="/calculator" className="cta-button">
      立即試算報價
    </Link>
  </div>
);

// --- 分頁組件 2：計算器 (你之前的核心功能) ---
const Calculator = () => {
  const [jpyPrice, setJpyPrice] = useState("");
  const [rate, setRate] = useState(
    () => localStorage.getItem("savedRate") || 0.21
  );
  const [feePercent, setFeePercent] = useState(
    () => localStorage.getItem("savedFee") || 10
  );

  // 新增：客戶資訊狀態
  const [customerInfo, setCustomerInfo] = useState({ name: "", note: "" });
  const [isOrdered, setIsOrdered] = useState(false);

  const twdPrice = Math.ceil(Number(jpyPrice) * rate);
  const totalWithFee = Math.ceil(twdPrice * (1 + feePercent / 100));

  const handleOrder = (e) => {
    e.preventDefault();
    if (!jpyPrice || !customerInfo.name) return alert("請填寫完整資訊！");

    // 模擬提交訂單 (未來這裡會接 API 存到資料庫)
    console.log("收到新訂單：", { ...customerInfo, total: totalWithFee });
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>🎉 感謝委託！</h2>
        <p>您的報價為 NT$ {totalWithFee.toLocaleString()}</p>
        <p>代購專員會儘速透過 LINE 與您聯繫。</p>
        <button onClick={() => setIsOrdered(false)} className="cta-button">
          回上一頁
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>報價計算器</h2>
      <div className="input-group">
        <label>日幣金額 (JPY)</label>
        <input
          type="number"
          value={jpyPrice}
          onChange={(e) => setJpyPrice(e.target.value)}
        />
      </div>

      <div className="result-box">
        <span className="total-label">預估台幣報價</span>
        <span className="total-amount">
          NT$ {totalWithFee.toLocaleString()}
        </span>
      </div>

      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderTop: "1px dashed #ccc",
        }}
      />

      {/* 下單表單 */}
      <form onSubmit={handleOrder}>
        <h3>📝 填寫委託單</h3>
        <div className="input-group">
          <label>姓名 / 暱稱</label>
          <input
            type="text"
            placeholder="如何稱呼您？"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>備註 (規格、顏色、網址)</label>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            rows="3"
            value={customerInfo.note}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, note: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="cta-button"
          style={{ width: "100%", border: "none" }}
        >
          送出委託需求
        </button>
      </form>
    </div>
  );
};

// --- 主 App 組件 ---
export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-logo">My代購</div>
        <div className="nav-links">
          <Link to="/">首頁</Link>
          <Link to="/calculator">計算器</Link>
        </div>
      </nav>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </div>
    </Router>
  );
}
