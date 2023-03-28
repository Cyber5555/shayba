import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screens/homeScreen/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./screens/fixElements/header/Header";
import { Navbar } from "./screens/fixElements/navBar/Navbar";
import { Footer } from "./screens/fixElements/footer/Footer";
import { Catalog } from "./screens/catalog/catalog";
import { FilterCatalog } from "./screens/filterCatalog/filterCatalog";
import { SingleProduct } from "./screens/singleProduct/SingleProduct";
import { Basket } from "./screens/basket/basket";
import { OrderFormation } from "./screens/orderFormation/orderFormation";
import { Context } from "./context/Context";
import { useState } from "react";

function App() {
  const [popup_register, setPopupRegister] = useState(false);
  const [popup_verify_phone, setPopupVerifyPhone] = useState(false);
  const [phone_forgot, setPhoneForgot] = useState(false);
  const [login_popup, setLoginPopup] = useState(false);
  const [forgot_password, setForgotPassword] = useState(false);

  const contextValue = {
    popup_register,
    setPopupRegister,
    popup_verify_phone,
    setPopupVerifyPhone,
    forgot_password,
    setForgotPassword,
    phone_forgot,
    setPhoneForgot,
    login_popup,
    setLoginPopup,
  };

  return (
    <Context.Provider value={contextValue}>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/filter-catalog" element={<FilterCatalog />} />
            <Route path="/single-product" element={<SingleProduct />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order-formation" element={<OrderFormation />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
