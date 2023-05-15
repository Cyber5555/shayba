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
import { getBasketRequest } from "../../store/authReducer/getBasketSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getMyFavoriteRequest } from "../../store/authReducer/getMyFavoriteSlice";
import { getSingleProductRequest } from "../../store/reducer/getSingleProductSlice";

export const RenderPurchase = ({ data }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { count_plus, added_in_basket, maximum_error } = state.addInBasketSlice;
  const { reduce_in_basket, count_minus } = state.reduceInBasketSlice;
  const { added_remove_favorite } = state.addOrDelateFavoritesSlice;
  const { my_favorites } = state.getMyFavoriteSlice;
  const [isFavorite, setIsFavorite] = useState([]);
  const [user_token, setUserToken] = useState(null);

  const value = useContext(Context);

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    dispatch(getMyFavoriteRequest({}));
  }, []);

  useEffect(() => {
    dispatch(authUserInfoRequest(localStorage.getItem("userToken")));
  }, [
    added_in_basket,
    reduce_in_basket,
    maximum_error,
    count_plus,
    count_minus,
  ]);

  useEffect(() => {
    dispatch(authUserInfoRequest(localStorage.getItem("userToken")));
    dispatch(getMyFavoriteRequest({}));
    dispatch(getBasketRequest(localStorage.getItem("userToken")));
  }, [added_remove_favorite]);

  let new_data = [];

  for (let i of my_favorites) {
    new_data.push(i.product.id);
  }

  const takeFavorite = (id) => {
    let filterSort = new_data;
    let find = false;

    filterSort.find((item) => {
      if (item == id) {
        find = true;
      }
    });

    if (find) {
      const index = filterSort.indexOf(id);
      filterSort.splice(index, 1);
    } else {
      filterSort.push(id);
    }
    setIsFavorite(filterSort);
    dispatch(
      addOrDelateFavoritesRequest({
        product_id: id,
      })
    );
  };

  const verifyFavorite = (id) => {
    let filterSort = new_data;
    let find = false;
    filterSort.find((item) => {
      if (item == id) {
        find = true;
      }
    });
    return find;
  };

  const tooltipOpen = (id, event) => {
    // const event = document.querySelectorAll(".tooltip");
    data?.map((e, $) => {
      if (id == e.id) {
        console.log(e, "e.id");
        event.target?.children[0]?.classList?.add("active");
        setTimeout(() => {
          event.target?.children[0]?.classList?.remove("active");
        }, 1500);
      }
    });
  };

  if (data?.length > 0) {
    return data.map((item, index) => {
      return (
        <Link
          to={"/single-product"}
          onClick={() => {
            localStorage.setItem("item_id", item.id);
            if (window.location.pathname === "/single-product") {
              dispatch(
                getSingleProductRequest(localStorage.getItem("item_id"))
              );
            }
          }}
          className="rendered_item"
          key={item.id}
        >
          <div
            className="item_image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
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
                e.stopPropagation();
                e.preventDefault();
                takeFavorite(item.id);
              }}
            >
              {verifyFavorite(item.id) === true ? (
                <AiFillStar size={30} />
              ) : (
                <AiOutlineStar size={30} />
              )}
            </div>
          </div>
          <h3>{item.name}</h3>
          <div className="count_apt">
            <p>{item.art}</p>
            <p>{item.count}</p>
          </div>
          <div className="add_price_parent">
            <p>{item.price} ₽</p>

            <div className="add_price">
              {item.count > 0 ? (
                <button
                  className="buttons"
                  name="minus"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (user_token) {
                      console.log(item);
                      tooltipOpen(item.id, e);
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
                  <span className="tooltip">
                    {maximum_error != ""
                      ? maximum_error
                      : `корзине ${count_plus} штуки`}
                  </span>
                </button>
              ) : (
                <p
                  className={"buttons"}
                  style={{ cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  НЕТ В НАЛИЧИИ
                </p>
              )}
            </div>
          </div>
        </Link>
      );
    });
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        НЕТ ПРОДУКТИ
      </div>
    );
  }
};
