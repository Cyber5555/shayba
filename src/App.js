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
import { RegisterPopup } from "./components/globalReg/globalRegPopup";
import { VerifyCode } from "./components/globalReg/verifyCode";
import { NewPassword } from "./components/globalReg/newPassword";
import { VerifyCodeForgot } from "./components/globalReg/verifyCodeForgot";
import { LoginPopup } from "./components/globalReg/loginPopup";
import { PhoneForgot } from "./components/globalReg/phoneForgot";

function App() {
  const [phone_forgot, setPhoneForgot] = useState(false);
  const [login_popup, setLoginPopup] = useState(false);
  const [new_password, setNewPassword] = useState(false);
  const [verify_phone_forgot, setVerifyPhoneForgot] = useState(false);

  const contextValue = {
    

    phone_forgot, // bacuma forgot i popup y
    setPhoneForgot,

    login_popup,
    setLoginPopup, // login

    verify_phone_forgot,
    setVerifyPhoneForgot, //forgot verify

    new_password,
    setNewPassword, // taza parol
  };

  return (
    <Context.Provider value={contextValue}>
      <Router>
        <div className="App">
          <RegisterPopup />
          <VerifyCode />
          <NewPassword />
          <VerifyCodeForgot />
          <LoginPopup />
          <PhoneForgot />
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
