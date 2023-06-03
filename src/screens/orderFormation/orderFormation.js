import React, { useEffect, useState } from "react";
import { BasketsProducts } from "../../components/basketsProducts/basketsProducts";
import {
  InputContainer,
  PhoneInputFunc,
  TextArea,
} from "../../components/inputContainer/inputContainer";
import "./orderFormation.css";
import { useDispatch, useSelector } from "react-redux";
import { checkoutProductRequest } from "../../store/authReducer/checkoutProductsSlice";
import { useNavigate } from "react-router-dom";
import { authUserInfoRequest } from "./../../store/authReducer/authUserInfoSlice";

export const OrderFormation = ({}) => {
  const [checked, setChecked] = useState(true);
  const [noChecked, setNoChecked] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data } = state.getBasketSlice;
  const { BasketCount, BasketSum, userInfo, bonus_count } = state.authUserInfo;
  const {
    email_error,
    phone_error,
    order_type_error,
    name_error,
    order_is_added,
    empty_error,
  } = state.checkoutProductsSlice;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [order_type, setOrderType] = useState("Shops");
  const [promo_code, setPromoCode] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, []);

  useEffect(() => {
    if (order_is_added) {
      dispatch(authUserInfoRequest(localStorage.getItem("userToken")));
      return navigate("/order-is-generated");
    }
  }, [order_is_added]);

  return (
    <main className="order_formation_parent">
      <div className="order_formation_header">
        <h2>ОФОРМЛЕНИЕ ЗАКАЗА</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>ОФОРМЛЕНИЕ ЗАКАЗА</li>
        </ul>
      </div>

      <div className="order_formation_input_container">
        <div>
          {/*<h3 className="address_shipping_order_formation">*/}
          {/*  ВАШ ЗАКАЗ ВЫ СМОЖЕТЕ ЗАБРАТЬ В НАШЕМ МАГАЗИНЕ ПО АДРЕСУ: УЛ.*/}
          {/*  КРАХМАЛЕВА, 37*/}
          {/*</h3>*/}
          <form className="form_inputs">
            <InputContainer
              inputTitle={"Ф. И. О.*"}
              inputValue={name}
              onChange={(e) => setName(e.target.value)}
              error={name_error}
            />
            <InputContainer
              inputTitle={"E-MAIL*"}
              inputValue={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email_error}
            />
            <PhoneInputFunc
              inputTitle={"ТЕЛЕФОН*"}
              inputStyle={{ width: "100%", background: "#E6E6E6" }}
              phoneValue={phone}
              onChange={(e) => setPhone(e)}
              error={phone_error}
            />
            <InputContainer
              inputTitle={"ПРОМОКОД"}
              onChange={(e) => setPromoCode(e.target.value)}
              inputValue={promo_code}
            />

            <TextArea
              inputTitle={"КОММЕНТАРИЙ К ЗАКАЗУ"}
              onChange={(e) => setComment(e.target.value)}
              inputValue={comment}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 30,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {/*<p>ПОЛУЧЕНИЕ: САМОВЫВОЗ</p>*/}
              {/*<div*/}
              {/*  style={{*/}
              {/*    display: "flex",*/}
              {/*    alignItems: "center",*/}
              {/*    flexWrap: "wrap",*/}
              {/*  }}*/}
              {/*>*/}
              <p>ОПЛАТА:</p>
              <div
                style={{
                  background: "#E6E6E6",
                  borderRadius: 10,
                  // height: 35,
                  borderColor: order_type_error && "red",
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  gap: 10,
                }}
                onChange={(e) => {
                  setOrderType(e.target.value);
                }}
              >
                <label value={"Shops"}>
                  <input
                    value={"Shops"}
                    type="radio"
                    name={"radio11"}
                    checked={order_type == "Shops"}
                  />{" "}
                  НАЛИЧНЫМИ ИЛИ КАРТОЙ В МАГАЗИНЕ
                </label>
                <label>
                  <input
                    value={"Drugoi"}
                    type="radio"
                    name={"radio11"}
                    checked={order_type == "Drugoi"}
                  />{" "}
                  Другой
                </label>
              </div>
              {/*</div>*/}
            </div>
          </form>
        </div>
        <div className="control_order">
          <div className="top_box_checkout">
            {/*<div>*/}
            {/*  <h3 className="your_order">ВАШ ЗАКАЗ</h3>*/}
            {/*  <span className="edit_text">ИЗМЕНИТЬ</span>*/}
            {/*</div>*/}
            <p className="order_price">ТОВАРОВ НА СУММУ: {BasketSum} ₽</p>
            {bonus_count > 0 && (
              <h3
                className="bonus_price"
                style={{ marginBottom: 30, color: "red" }}
              >
                Ваша скидка {bonus_count} %
              </h3>
            )}
            <button
              className="checkout_button"
              onClick={() => {
                if (checked) {
                  setNoChecked(false);
                  dispatch(
                    checkoutProductRequest({
                      name: name,
                      email: email,
                      phone: phone,
                      order_type: order_type,
                      promo_code: promo_code,
                      comment: comment,
                    })
                  );
                } else {
                  setNoChecked(true);
                }
              }}
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
            <p style={{ color: "red" }}>{empty_error}</p>
          </div>
          <div className="switch_parent">
            <input
              type={"checkbox"}
              className="switch_checkbox"
              name="checkbox"
              id="checkbox"
              onChange={() => {
                setChecked(!checked);
              }}
              checked={checked}
            />
            <label
              htmlFor="checkbox"
              style={{ color: noChecked ? "red" : "black", cursor: "pointer" }}
            >
              Я СОГЛАСЕН НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </label>
          </div>
        </div>
      </div>

      <div className="baskets_render_box">
        {data.map((item, index) => (
          <BasketsProducts key={index} item={item} />
        ))}
      </div>
    </main>
  );
};
