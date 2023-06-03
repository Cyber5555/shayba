import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduceInBasketRequest } from "../../store/authReducer/reduceInBasketSlice";
import { addInBasketRequest } from "./../../store/authReducer/addInBasketSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const BasketsProducts = ({ item }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { maximum_error, count_plus, added_in_basket } = state.addInBasketSlice;
  const { count_minus, reduce_in_basket } = state.reduceInBasketSlice;
  const { bonus_count } = state.authUserInfo;

  const tooltipOpen = (id, event) => {
    // const event = document.querySelectorAll(".tooltip");
    item?.product?.map((e, $) => {
      if (id == e.id) {
        event.target?.parentElement?.parentElement?.lastChild?.classList?.add(
          "active"
        );
        setTimeout(() => {
          event.target?.parentElement?.parentElement?.lastChild?.classList?.remove(
            "active"
          );
        }, 1500);
      }
    });
  };

  return (
    <React.Fragment>
      <h2 style={{ marginBottom: 20, textTransform: "uppercase" }}>
        {item.name}
      </h2>
      {item?.product?.map((element, index) => (
        <div className="baskets_products" key={index}>
          <div className={"baskets_products_left_parent"}>
            <img
              src={
                "https://admin.shayba.store/uploads/" + element.photo[0].photo
              }
              alt=""
              className={"baskets_products_left_image"}
            />
            <div className="baskets_products_left_child">
              <h2 className="baskets_products_name">{element.name}</h2>
              <p className="baskets_products_art">{element.price} ₽</p>
              {element?.art && (
                <p className="baskets_products_art">АРТ.: {element.art}</p>
              )}
              <span className="baskets_products_all_count">
                НАЛИЧИЕ: {element.count} ШТ
              </span>
            </div>
          </div>
          <div className="baskets_products_right_child">
            <div style={{ textAlign: "right" }}>
              <p
                className="baskets_products_price"
                style={{ textDecoration: bonus_count > 0 && "line-through" }}
              >
                {element.basket_count * element.price} ₽ <br />
              </p>
              {bonus_count > 0 && (
                <p
                  style={{
                    fontSize: 14,
                    color: "red",
                    textDecoration: "initial",
                    fontFamily: "Black_",
                  }}
                >
                  Скидка на {bonus_count} %
                </p>
              )}
              {bonus_count > 0 && (
                <p
                  style={{
                    fontSize: 25,
                    fontFamily: "Black_",
                    color: "red",
                  }}
                >
                  {element.basket_count * element.bonus_price} ₽ <br />
                </p>
              )}
            </div>
            {window.location.pathname !== "/order-formation" && (
              <div className="add_price">
                <button
                  className="buttons"
                  name="minus"
                  onClick={() => {
                    dispatch(reduceInBasketRequest({ product_id: element.id }));

                    // if (count ?? count) {
                    //   item?.product?.splice(index, 1);
                    // }
                  }}
                >
                  <AiOutlineMinus fill="#fff" color="white" />
                </button>
                <p className="price_count">{element.basket_count}</p>
                <button
                  className="buttons"
                  name="plus"
                  onClick={(e) => {
                    dispatch(addInBasketRequest({ product_id: element.id }));
                    maximum_error && tooltipOpen(element.id, e);
                  }}
                >
                  <AiOutlinePlus fill="#fff" color="white" />
                </button>

                <span className="tooltip" style={{ color: "white" }}>
                  {maximum_error != "" ? maximum_error : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      {/*{maximum_error && <p style={{ color: "red" }}>{maximum_error}</p>}*/}
    </React.Fragment>
  );
};
