import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceSmileWink,
  faPhoneVolume,
  fas,
  faS,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { TitleIcon } from "../../../components/svgIcons/SvgIcons";
import { Link } from "react-router-dom";

export const Header = () => {
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
          src={require("../../../components/icons/smile.png")}
          alt=""
          style={{ width: "20px", height: "20px", marginRight: "30px" }}
        />
        <img
          src={require("../../../components/icons/box.png")}
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
        <p className="counter">20</p>

        <p className="budget">17 000 ₽</p>
      </div>
    </header>
  );
};
