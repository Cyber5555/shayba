import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduceInBasketRequest } from "../../store/authReducer/reduceInBasketSlice";
import { addInBasketRequest } from "./../../store/authReducer/addInBasketSlice";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { addOrDelateFavoritesRequest } from "../../store/authReducer/addOrDelateFavoritesSlice";
import { getMyFavoriteRequest } from "../../store/authReducer/getMyFavoriteSlice";
import { authUserInfoRequest } from "../../store/authReducer/authUserInfoSlice";
import { Context } from "../../context/Context";

export const FavoriteProducts = ({ item }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { added_remove_favorite } = state.addOrDelateFavoritesSlice;
  const [user_token, setUserToken] = useState(null);
  const { count, added_in_basket } = state.addInBasketSlice;
  const { reduce_in_basket } = state.reduceInBasketSlice;
  const [event_id, setEventId] = useState("");
  const { maximum_error } = state.addInBasketSlice;
  const value = useContext(Context);
  useEffect(() => {
    dispatch(getMyFavoriteRequest({}));
    setUserToken(localStorage.getItem("userToken"));
  }, [added_remove_favorite, added_in_basket]);

  useEffect(() => {
    dispatch(authUserInfoRequest(localStorage.getItem("userToken")));

    document.querySelectorAll(".tooltip").forEach((event, $) => {
      if (event_id === $) {
        event.classList.add("active");
        setTimeout(() => {
          event.classList.remove("active");
        }, 1000);
      }
    });
  }, [added_in_basket, reduce_in_basket, count]);
  return (
    item.product && (
      <React.Fragment>
        <div className="baskets_products">
          <div className={"baskets_products_left_parent"}>
            <div
              className="favorite_image"
              onClick={(e) => {
                e.preventDefault();
                console.log(item.product_id);

                dispatch(
                  addOrDelateFavoritesRequest({
                    product_id: item.product_id,
                  })
                );
              }}
            >
              <AiFillStar size={20} />
            </div>
            <img
              src={
                "https://admin.shayba.store/uploads/" +
                item.product.photo[0].photo
              }
              alt=""
              className={"baskets_products_left_image"}
            />
            <div className="baskets_products_left_child">
              <h2 className="baskets_products_name">{item.product?.name}</h2>
              <p className="baskets_products_art">{item.product?.price} ₽</p>
              {item.product?.art && (
                <p className="baskets_products_art">АРТ.: {item.product.art}</p>
              )}
              <span className="baskets_products_all_count">
                НАЛИЧИЕ: {item.product?.count} ШТ
              </span>
            </div>
          </div>
          <div className="baskets_products_right_child">
            <p className="baskets_products_price">
              {
                // item.product?.basket_count *
                item.product?.price
              }{" "}
              ₽
            </p>
            <div className="add_price">
              <button
                className="buttons"
                name="minus"
                onClick={(e) => {
                  e.preventDefault();
                  if (user_token) {
                    setEventId(item.product_id);

                    dispatch(
                      addInBasketRequest({
                        product_id: item.product_id,
                      })
                    );
                  } else {
                    value.setLoginPopup(true);
                  }
                }}
              >
                +ДОБАВИТЬ
                <span className="tooltip">В корзине {count} штуки</span>
              </button>
            </div>
          </div>
        </div>
        {maximum_error && (
          <p style={{ color: "red", marginBottom: 20 }}>{maximum_error}</p>
        )}
      </React.Fragment>
    )
  );
};
