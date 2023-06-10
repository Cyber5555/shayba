import React, { useEffect, useState } from "react";
import "./header.css";
import { FaPhoneVolume } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { TitleIcon } from "./../../../assets/svgIcons/SvgIcons";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../../store/reducer/logoutSlice";
import { setPopupRegister } from "../../../store/reducer/registerSlice";
import { authUserInfoRequest } from "./../../../store/authReducer/authUserInfoSlice";
import { headerFooterInfoRequest } from "../../../store/authReducer/headerFooterInfoSlice";
import { Search } from "../../../components/inputContainer/inputContainer";
import { getBasketRequest } from "../../../store/authReducer/getBasketSlice";

export const Header = ({}) => {
  const value = useContext(Context);
  const [user_token, setUserToken] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { logout } = state.logout;
  const { success } = state.login || state.verify || state.register;
  const { BasketCount, BasketSum, Favorite_Count } = state.authUserInfo;
  const { data } = state.headerFooterInfo;
  const { count, added_in_basket } = state.addInBasketSlice;
  const { reduce_in_basket } = state.reduceInBasketSlice;
  const { delate } = state.delateAllBasketsSlice;
  const [isOpen, setIsOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    setUserToken(token);
  }, []);

  useEffect(() => {
    if (logout || success) {
      window.location.reload();
    }
  }, [logout, success]);

  useEffect(() => {
    if (user_token) {
      dispatch(authUserInfoRequest(localStorage.getItem("userToken")));
      dispatch(getBasketRequest(localStorage.getItem("userToken")));
    }
  }, [user_token, added_in_basket, reduce_in_basket, count, delate]);

  useEffect(() => {
    dispatch(headerFooterInfoRequest());
  }, []);

  const openBurgerMenu = () => {
    document.querySelector(".burger_menu_aside").classList.add("active");
  };
  document.body.onclick = (e) => {
    if (e.target.className !== "catalog_lists") setIsOpen(false);
  };

  document.body.onkeydown = (e) => {
    if (isFocus) {
      if (e.key == "Enter") {
        navigate("/filter-catalog");
      }
    }
  };

  return (
    <header className="header_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="burger_menu" onClick={openBurgerMenu}>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
        </button>

        <Link className="shayba_icon" to={"/"}>
          <TitleIcon />
        </Link>
      </div>

      <span className="search_on_header">
        <Search
          value={value.search}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => {
            setIsFocus(true);
            value.setSearch(e.target.value);
          }}
        />
      </span>

      <div className="tell_number_parent">
        <FaPhoneVolume style={{ transform: "rotateZ(-45deg)" }} />
        <a className="tell_number" href={`tel:${data?.header_phone}`}>
          {data?.header_phone}
        </a>
      </div>

      {user_token ? (
        <div className="budget_container">
          <Link to={"/favorites"} className="bug_header">
            <img
              src={require("../../../assets/icons/favorite.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <p style={{ marginRight: "30px" }}>{Favorite_Count}</p>
          </Link>
          <div
            className="bug_header smile"
            onMouseEnter={(e) => {
              // e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <img
              src={require("../../../assets/icons/smile.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "30px" }}
            />
            {isOpen && (
              <ul
                className={"sub_smile_lists"}
                // onClick={(event) => event.stopPropagation()}
              >
                <Link to={"/single/profile"}>МОЙ КАБИНЕТ</Link>
                <Link to={"/single/change_password"}>СМЕНИТЬ ПАРОЛЬ</Link>
                <Link to={"/single/history"}>ИСТОРИЯ ЗАКАЗОВ</Link>
              </ul>
            )}
          </div>
          <Link to={"/basket"} className="bug_header">
            <img
              src={require("../../../assets/icons/box.png")}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <p className="counter">{BasketCount > 0 && BasketCount}</p>
          </Link>
          <Link to={"/basket"} className="budget">
            {BasketSum} ₽
          </Link>
          <BiExit
            style={{ marginLeft: 20, cursor: "pointer" }}
            size={20}
            onClick={() => {
              dispatch(
                logoutRequest({
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "userToken"
                    )}`,
                    "Content-Type": "application/json",
                  },
                })
              );
            }}
          />
        </div>
      ) : (
        <div className="budget_container">
          <button
            className="reg_button"
            onClick={() => value.setLoginPopup(true)}
          >
            войти
          </button>
          <button
            className="reg_button"
            onClick={() => dispatch(setPopupRegister())}
          >
            Регистрация
          </button>
        </div>
      )}
    </header>
  );
};
