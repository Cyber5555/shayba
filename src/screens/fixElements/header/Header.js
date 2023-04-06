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
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../../store/logoutSlice";

export const Header = () => {
  const value = useContext(Context);
  const [user_token, setUserToken] = useState(null);
  const dispatch = useDispatch();

  const getUserToken = async () => {
    let token = await localStorage.getItem("userToken");
    setUserToken(token);
  };

  useEffect(() => {
    getUserToken();
    console.log("=");
  }, [dispatch]);

  return (
    <header className="header_container">
      <Link className="shayba_icon" to={"/"}>
        <TitleIcon />
      </Link>

      <div className="search_parent">
        <input
          type="text"
          name="search"
          className="search_on_header"
          placeholder="Поиск"
        />
        <FontAwesomeIcon
          icon={faSearch}
          color={"grey"}
          className="search_icon"
        />
      </div>

      <div className="tell_number_parent">
        <FontAwesomeIcon icon={faPhoneVolume} />
        <h2 className="tell_number">8 800 999 88 99</h2>
      </div>

      {user_token ? (
        <div className="budget_container">
          <img
            src={require("../../../assets/icons/smile.png")}
            alt=""
            style={{ width: "20px", height: "20px", marginRight: "30px" }}
          />
          <Link to={"/basket"} className="bug_header">
            <img
              src={require("../../../assets/icons/box.png")}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <p className="counter">20</p>
          </Link>
          <p className="budget">17 000 ₽</p>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ marginLeft: 20, cursor: "pointer" }}
            onClick={() => {
              // console.log(user_token);
              dispatch(
                logoutRequest({
                  // user_token,
                  headers: {
                    Authorization: `Bearer ${user_token}`,
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
            onClick={() => value.setPopupRegister(true)}
          >
            Регистрация
          </button>
        </div>
      )}
    </header>
  );
};
