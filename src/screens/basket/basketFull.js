import React from "react";
import { Link } from "react-router-dom";
import "./basket.css";
import { BasketsProducts } from "./../../components/basketsProducts/basketsProducts";
import { delateAllBasketsRequest } from "../../store/authReducer/delateAllBasketsSlice";
import { useDispatch, useSelector } from "react-redux";

export const BasketFull = ({ res }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { BasketCount, BasketSum, Favorite_Count } = state.authUserInfo;
  return (
    <main className="full_basket_layout">
      <div className="basket_header">
        <h2>КОРЗИНА</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>КОРЗИНА</li>
        </ul>
      </div>
      <div className="full_text_container">
        {/* <h3 className="full_address_shipping">
          ВАШ ЗАКАЗ ВЫ СМОЖЕТЕ ЗАБРАТЬ В НАШЕМ <br />
          МАГАЗИНЕ ПО АДРЕСУ: УЛ. КРАХМАЛЕВА, 37
        </h3> */}
        <h3 className="total_price">ИТОГО: {BasketSum} ₽ </h3>
        <Link to={"/order-formation"} className="checkout_button">
          ОФОРМИТЬ ЗАКАЗ
        </Link>
      </div>
      <ul className="delate_or_add">
        <li>
          В КОРЗИНЕ {BasketCount} ТОВАР(А){" "}
          <img
            src={require("../../assets/icons/arrow_down.png")}
            alt=""
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </li>
        <li
          onClick={() =>
            dispatch(delateAllBasketsRequest(localStorage.getItem("userToken")))
          }
        >
          ОЧИСТИТЬ{" "}
          <img
            src={require("../../assets/icons/cross.png")}
            alt=""
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </li>
      </ul>
      {res.map((item, index) => (
        <BasketsProducts key={index} item={item} />
      ))}
      <p className="recommendation_full">ПЕРСОНАЛЬНЫЕ РЕКОМЕНДАЦИИ</p>
    </main>
  );
};
