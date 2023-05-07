import "zoom-loading-detector/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "zoom-loading-detector";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "./PurchaseField.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInBasketRequest } from "../../store/authReducer/addInBasketSlice";
import { authUserInfoRequest } from "../../store/authReducer/authUserInfoSlice";
import { Context } from "../../context/Context";
import { addOrDelateFavoritesRequest } from "../../store/authReducer/addOrDelateFavoritesSlice";
import { filterRequest } from "../../store/reducer/filterSlice";
import { getBasketRequest } from "../../store/authReducer/getBasketSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getMyFavoriteRequest } from "../../store/authReducer/getMyFavoriteSlice";

export const RenderPurchase = ({ data }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { count, added_in_basket } = state.addInBasketSlice;
  const { reduce_in_basket } = state.reduceInBasketSlice;
  const { added_remove_favorite } = state.addOrDelateFavoritesSlice;
  const { my_favorites } = state.getMyFavoriteSlice;
  const [isFavorite, setIsFavorite] = useState(false);
  const [event_id, setEventId] = useState("");
  const [user_token, setUserToken] = useState(null);
  const value = useContext(Context);

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    dispatch(getMyFavoriteRequest({}));
  }, []);

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

  useEffect(() => {
    dispatch(getMyFavoriteRequest({}));
    dispatch(filterRequest(value.searchValues));
    dispatch(getBasketRequest(localStorage.getItem("userToken")));
  }, [added_remove_favorite]);

  if (data?.length > 0) {
    return data.map((item, index) => {
      return (
        <Link
          to={"/single-product"}
          onClick={() => localStorage.setItem("item_id", item.id)}
          className="rendered_item"
          key={item.id}
        >
          <div className="item_image" onClick={(e) => e.preventDefault()}>
            <InnerImageZoom
              src={
                "https://admin.shayba.store/uploads/" + item?.photo[0]?.photo
              }
              alt=""
              className="rendered_image"
            />
            <div
              className="favorite_image"
              onClick={(e) => {
                const handleChangeFavorite = (e) => {
                  e.preventDefault();

                  dispatch(
                    addOrDelateFavoritesRequest({
                      product_id: item.id,
                    })
                  );
                };
              }}
            >
              {my_favorites[index]?.product_id == item.id ? (
                <AiFillStar size={30} />
              ) : (
                <AiOutlineStar size={30} />
              )}
            </div>
            {/* {item?.auth_user_favorite || favorite_id[item.id] ? (
              <img
                src={require("../../assets/icons/isFavorite.png")}
                alt=""
                className="favorite_image"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addOrDelateFavoritesRequest({
                      product_id: item.id,
                    })
                  );
                }}
              />
            ) : (
              <img
                src={require("../../assets/icons/favorite.png")}
                alt=""
                className="favorite_image"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addOrDelateFavoritesRequest({
                      product_id: item.id,
                    })
                  );
                }}
              />
            )} */}
          </div>
          <h3>{item.name}</h3>
          <div className="count_apt">
            <p>{item.art}</p>
            <p>{item.count}</p>
          </div>
          {item.count > 0 && (
            <div className="add_price_parent">
              <p>{item.price} ₽</p>

              <div className="add_price">
                <button
                  className="buttons"
                  name="minus"
                  onClick={(e) => {
                    e.preventDefault();
                    if (user_token) {
                      setEventId(index);
                      dispatch(
                        addInBasketRequest({
                          product_id: item.id,
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
          )}
        </Link>
      );
    });
  } else {
    return null;
  }
};
