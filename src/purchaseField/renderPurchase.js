import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "zoom-loading-detector/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "zoom-loading-detector";
import React from "react";
import "./PurchaseField.css";
import { Link } from "react-router-dom";

export const RenderPurchase = ({ data }) => {
  if (data?.length > 0) {
    return data.map((item, index) => (
      <Link to={"/filter-catalog"} className="rendered_item" key={item.id}>
        <div className="item_image" onClick={(e) => e.preventDefault()}>
          <InnerImageZoom src={item.image} alt="" className="rendered_image" />
        </div>
        <h3>{item.text}</h3>
        <div className="count_apt">
          <p>{item.apt}</p>
          <p>{item.count}</p>
        </div>
        <div className="add_price_parent">
          <p>{item.price} ₽</p>

          <div className="add_price">
            <button className="buttons" name="minus">
              <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" />
            </button>
            <p className="price_count">{item.changed_count}</p>
            <button className="buttons" name="plus">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </Link>
    ));
  }
};
