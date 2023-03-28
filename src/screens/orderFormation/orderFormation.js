import React, { useState } from "react";
import { BasketsProducts } from "../../components/basketsProducts/basketsProducts";
import { InputContainer, TextArea } from "../../components/inputContainer/inputContainer";
import "./orderFormation.css";



export const OrderFormation = () => {
  const [checked, setChecked] = useState(false);

  return (
    <main className="order_formation_parent">
      <div className="order_formation_header">
        <h2>КОРЗИНА</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>КОРЗИНА</li>
        </ul>
      </div>

      <div className="order_formation_input_container">
        <div>
          <h3 className="address_shipping_order_formation">
            ВАШ ЗАКАЗ ВЫ СМОЖЕТЕ ЗАБРАТЬ В НАШЕМ МАГАЗИНЕ ПО АДРЕСУ: УЛ.
            КРАХМАЛЕВА, 37
          </h3>
          <form className="form_inputs">
            <InputContainer inputTitle={"Ф. И. О.*"} />
            <InputContainer inputTitle={"E-MAIL*"} />
            <InputContainer inputTitle={"ТЕЛЕФОН*"} />
            <InputContainer inputTitle={"ПРОМОКОД"} />
            <TextArea inputTitle={"КОММЕНТАРИЙ К ЗАКАЗУ"} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 30,
              }}
            >
              <p>ПОЛУЧЕНИЕ: САМОВЫВОЗ</p>
              <p>ОПЛАТА: НАЛИЧНЫМИ/КАРТОЙ В МАГАЗИНЕ</p>
            </div>
          </form>
        </div>
        <div className="control_order">
          <div className="top_box_checkout">
            <div>
              <h3 className="your_order">ВАШ ЗАКАЗ</h3>
              <span className="edit_text">ИЗМЕНИТЬ</span>
            </div>
            <p className="order_price">ТОВАРОВ НА СУММУ: {1900}₽ </p>
            <button className="checkout_button">ОФОРМИТЬ ЗАКАЗ</button>
          </div>
          <div className="switch_parent">
            <input
              type={"checkbox"}
              className="switch_checkbox"
              onChange={() => {
                setChecked(!checked);
              }}
              checked={checked}
            />
            <p>Я СОГЛАСЕН НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</p>
          </div>
        </div>
      </div>

      <div className="baskets_render_box">
        <BasketsProducts />
        <BasketsProducts />
      </div>
    </main>
  );
};
