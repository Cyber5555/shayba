import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TitleIcon } from "./../../../assets/svgIcons/SvgIcons";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { Context } from "../../../context/Context";

export const Header = () => {
  const value = useContext(Context);
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
        <button
          style={{
            marginLeft: 20,
            border: "none",
            color: "white",
            background: "black",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => value.setLoginPopup(true)}
        >
          войти
        </button>
        <button
          style={{
            marginLeft: 20,
            border: "none",
            color: "white",
            background: "black",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => value.setPopupRegister(true)}
        >
          Регистрация
        </button>
      </div>
    </header>
  );
};
