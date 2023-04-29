import "zoom-loading-detector/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "zoom-loading-detector";
import React, { useEffect, useState } from "react";
import "./PurchaseField.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInBasketRequest } from "../../store/authReducer/addInBasketSlice";

export const RenderPurchase = ({ data }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { count, added_in_basket } = state.addInBasketSlice;
  const [event_id, setEventId] = useState("");
  useEffect(() => {
    document.querySelectorAll(".tooltip").forEach((event, $) => {
      if (event_id === $) {
        event.classList.add("active");
        setTimeout(() => {
          event.classList.remove("active");
        }, 1000);
      }
    });
  }, [added_in_basket, count]);

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
          </div>
          <h3>{item.name}</h3>
          <div className="count_apt">
            <p>{item.art}</p>
            <p>{item.count}</p>
          </div>
          <div className="add_price_parent">
            <p>{item.price} ₽</p>

            <div className="add_price">
              <button
                className="buttons"
                name="minus"
                onClick={(e) => {
                  setEventId(index);
                  dispatch(
                    addInBasketRequest({
                      product_id: item.id,
                    })
                  );
                }}
              >
                {/* <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" /> */}
                +ДОБАВИТЬ
                <span className="tooltip">В корзине {count} штуки</span>
              </button>
              {/* <p className="price_count">{item.changed_count}</p>
              <button className="buttons" name="plus">
                <FontAwesomeIcon icon={faPlus} />
              </button> */}
            </div>
          </div>
        </Link>
      );
    });
  } else {
    return null;
  }
};
