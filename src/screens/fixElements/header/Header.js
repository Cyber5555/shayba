import React, { useEffect, useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TitleIcon } from "./../../../assets/svgIcons/SvgIcons";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../../store/reducer/logoutSlice";
import { setPopupRegister } from "../../../store/reducer/registerSlice";
import { authUserInfoRequest } from "./../../../store/authReducer/authUserInfoSlice";
import { headerFooterInfoRequest } from "../../../store/authReducer/headerFooterInfoSlice";
import { Search } from "../../../components/inputContainer/inputContainer";
import { filterRequest } from "../../../store/reducer/filterSlice";

export const Header = ({}) => {
  const value = useContext(Context);
  const [user_token, setUserToken] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { logout } = state.logout;
  const { success } = state.login || state.verify || state.register;
  const { BasketCount, BasketSum, Favorite_Count } = state.authUserInfo;
  const { data } = state.headerFooterInfo;

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
      dispatch(authUserInfoRequest({ token: user_token }));
    }
  }, [user_token]);

  useEffect(() => {
    dispatch(headerFooterInfoRequest({ token: user_token }));
  }, []);

  const openBurgerMenu = () => {
    document.querySelector(".burger_menu_aside").classList.add("active");
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
          value={value.searchValues.search}
          onChange={(e) => value.setSearchValues({ search: e.target.value })}
        />
      </span>

      <div className="tell_number_parent">
        <FontAwesomeIcon icon={faPhoneVolume} />
        <h2 className="tell_number">{data?.header_phone}</h2>
      </div>

      {user_token ? (
        <div className="budget_container">
          <Link to={"/basket"} className="bug_header">
            <img
              src={require("../../../assets/icons/favorite.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <p style={{ marginRight: "30px" }}>{Favorite_Count}</p>
          </Link>
          <Link className="bug_header">
            <img
              src={require("../../../assets/icons/smile.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "30px" }}
            />
          </Link>
          <Link to={"/basket"} className="bug_header">
            <img
              src={require("../../../assets/icons/box.png")}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <p className="counter">{BasketCount > 0 && BasketCount}</p>
          </Link>
          <p className="budget">{BasketSum} ₽</p>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ marginLeft: 20, cursor: "pointer" }}
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
