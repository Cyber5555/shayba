import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./burgerMenu.css";
import { Search } from "./../../../components/inputContainer/inputContainer";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../../context/Context";

export function BurgerMenu() {
  const state = useSelector((state) => state);
  const { data } = state.headerFooterInfo;
  const value = useContext(Context);
  const dispatch = useDispatch();
  const { BasketCount, BasketSum, Favorite_Count } = state.authUserInfo;

  const closeBurgerMenu = (e) => {
    if (e.target.className === "burger_menu_aside active") {
      document.querySelector(".burger_menu_aside").classList.remove("active");
    }
  };
  return (
    <aside className="burger_menu_aside" onClick={closeBurgerMenu}>
      <ul className="burger_ul">
        <Search
          margin={"20px auto"}
          value={value.searchValues.search}
          onChange={(e) => value.setSearchValues({ search: e.target.value })}
        />
        <li>
          <Link to={"/filter-catalog"} className="burger_links">
            КАТАЛОГ
          </Link>
        </li>
        <li>
          <Link to={"/history"} className="burger_links">
            ИСТОРИЯ
          </Link>
        </li>
        {/*<li>*/}
        {/*  <Link to={"/service"} className="burger_links">*/}
        {/*    КАК ПОЛУЧИТЬ*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li>
          <Link to={"/contact"} className="burger_links">
            КОНТАКТЫ
          </Link>
        </li>
        <li>
          <Link to={"/profile"} className="burger_links">
            <img
              src={require("../../../assets/icons/smileWhite.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            ЛИЧНЫЙ КАБИНЕТ
          </Link>
        </li>
        <li>
          <Link to={"/basket"} className="burger_links">
            <img
              src={require("../../../assets/icons/boxWhite.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            КОРЗИНА
            <span className="counters">{BasketCount}</span>
          </Link>
        </li>
        <li>
          <Link to={"/favorites"} className="burger_links">
            <img
              src={require("../../../assets/icons/favoriteWhite.png")}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            ИЗБРАННОЕ
            <span className="counters">{Favorite_Count}</span>
          </Link>
        </li>
      </ul>
      <div className="socialBurger">
        <a href={data?.vk_url} target="_blank">
          <img
            src={require("../../../assets/icons/vkDark.png")}
            alt="vk"
            style={{ width: "26px", height: "26px" }}
          />
        </a>
        <a href={data?.instagram_url} target="_blank">
          <img
            src={require("../../../assets/icons/instaDark.png")}
            alt="instagram"
            style={{ width: "26px", height: "26px" }}
          />
        </a>
        <a href={data?.watsap_url} target="_blank">
          <img
            src={require("../../../assets/icons/whatsappDark.png")}
            alt="whatsapp"
            style={{ width: "26px", height: "26px" }}
          />
        </a>
        <a href={data?.telegram_url} target="_blank">
          <img
            src={require("../../../assets/icons/telegramDark.png")}
            alt="telegram"
            style={{ width: "26px", height: "26px" }}
          />
        </a>
      </div>
    </aside>
  );
}
