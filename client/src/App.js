import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "scenes/homepage";
import Layout from "scenes/layout";
import LoginPage from "scenes/loginPage";
import RegisterPage from "scenes/registerPage";
import CartPage from "scenes/cart";
import PrimarySearchAppBar from "scenes/navbar";
import AdminPage from "scenes/adminPage";
import MyPage from "scenes/myPage";
import PurchaseDetailPage from "scenes/purchaseDetailPage";
import AdminPurchaseDetailPage from "scenes/adminPurchaseDetailPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}/>
            <Route path="/nav" element={<PrimarySearchAppBar />}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/purchaseDetail" element={<PurchaseDetailPage/>}/>
            <Route path="/adminPurchaseDetail" element={<AdminPurchaseDetailPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
