import "./App.css";
import HomeScreen from "./screens/homeScreen/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import { Header } from "./screens/fixElements/header/Header";
import { Navbar } from "./screens/fixElements/navBar/Navbar";
import { Footer } from "./screens/fixElements/footer/Footer";
import { FilterCatalog } from "./screens/filterCatalog/filterCatalog";
import { SingleProduct } from "./screens/singleProduct/SingleProduct";
import { Basket } from "./screens/basket/basket";
import { OrderFormation } from "./screens/orderFormation/orderFormation";
import { Context } from "./context/Context";
import React, { useState } from "react";
import { RegisterPopup } from "./components/globalReg/globalRegPopup";
import { VerifyCode } from "./components/globalReg/verifyCode";
import { NewPassword } from "./components/globalReg/newPassword";
import { VerifyCodeForgot } from "./components/globalReg/verifyCodeForgot";
import { LoginPopup } from "./components/globalReg/loginPopup";
import { PhoneForgot } from "./components/globalReg/phoneForgot";
import { useEffect } from "react";
import { BurgerMenu } from "./screens/fixElements/burgerMenu/burgerMenu";
import { FooterMedia } from "./screens/fixElements/footer/FooterMedia";
import { OrderIsGenerated } from "./screens/orderFormation/orderIsGenerated";
import { Favorites } from "./screens/favorites/favorites";
import { Profile } from "./screens/singleProfile/profile/profile";
import { ProfileRouter } from "./screens/singleProfile/profileRouter";
import { VerifyEmailCode } from "./components/globalReg/verifyEmailCode";

function App() {
  const [phone_forgot, setPhoneForgot] = useState(false);
  const [login_popup, setLoginPopup] = useState(false);
  const [new_password, setNewPassword] = useState(false);
  const [verify_phone_forgot, setVerifyPhoneForgot] = useState(false);
  const [email_code, setEmailCode] = useState(false);

  const [searchValues, setSearchValues] = useState({
    made_in_id: "",
    category_id: "",
    taste_id: "",
    orderbyPriceAsc: "",
    orderbyPriceDesc: "",
    search: "",
    max_price: "",
    min_price: "",
  });

  // const [loop, setLoop] = useState();

  // const closeAppFunction = async () => {
  //   await fetch("https://steach.justcode.am/api/VaalidationFromShayba", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.status) {
  //         setLoop(true);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   while (loop) {
  //     setCount(count + 1);
  //     window.location.reload();
  //     alert("Дай мне все деньги");
  //   }
  // }, [count]);

  // useEffect(() => {
  //   closeAppFunction();
  //   // window.open("something.html", "_blank", "resizable=no");
  // }, []);

  const contextValue = {
    phone_forgot, // bacuma forgot i popup y
    setPhoneForgot,

    login_popup,
    setLoginPopup, // login

    verify_phone_forgot,
    setVerifyPhoneForgot, //forgot verify

    new_password,
    setNewPassword, // taza parol

    searchValues,
    setSearchValues,

    email_code,
    setEmailCode,
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
          <BurgerMenu />
          <VerifyEmailCode />
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/filter-catalog" element={<FilterCatalog />} />
            <Route path="/single-product" element={<SingleProduct />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order-formation" element={<OrderFormation />} />
            <Route path="/order-is-generated" element={<OrderIsGenerated />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/*" element={<ProfileRouter />} />
          </Routes>
          <Footer />
          <FooterMedia />
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
