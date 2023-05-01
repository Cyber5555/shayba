import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduceInBasketRequest } from "../../store/authReducer/reduceInBasketSlice";
import { addInBasketRequest } from "./../../store/authReducer/addInBasketSlice";

export const BasketsProducts = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <h2 style={{ marginBottom: 20, textTransform: "uppercase" }}>
        {item.name}
      </h2>
      {item.product.map((element, index) => (
        <div className="baskets_products" key={index}>
          <div className={"baskets_products_left_parent"}>
            {console.log(element)}
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
            <p className="baskets_products_price">
              {element.basket_count * element.price} ₽
            </p>
            <div className="add_price">
              <button
                className="buttons"
                name="minus"
                onClick={() =>
                  dispatch(reduceInBasketRequest({ product_id: element.id }))
                }
              >
                <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" />
              </button>
              <p className="price_count">{element.basket_count}</p>
              <button
                className="buttons"
                name="plus"
                onClick={() =>
                  dispatch(addInBasketRequest({ product_id: element.id }))
                }
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
