import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./PurchaseField.css";

const data = [
  {
    id: 1,
    text: "HQD MANGO ICE 3% + ВТОРОЙ ЭТАЖ ЗАПАСНОЙ",
    price: 950,
    count: "НАЛИЧИЕ: 1000 ШТ",
    apt: "АРТ.: ART-6 945",
    changed_count: 1,
    image: require("../../../components/images/puff1.png"),
  },
  {
    id: 2,
    text: "HQD MANGO ICE 3% + ВТОРОЙ ЭТАЖ ЗАПАСНОЙ",
    price: 950,
    count: "НАЛИЧИЕ: 1000 ШТ",
    apt: "АРТ.: ART-6 945",
    changed_count: 1,
    image: require("../../../components/images/puff1.png"),
  },
  {
    id: 3,
    text: "HQD MANGO ICE 3% + ВТОРОЙ ЭТАЖ ЗАПАСНОЙ",
    price: 950,
    count: "НАЛИЧИЕ: 1000 ШТ",
    apt: "АРТ.: ART-6 945",
    changed_count: 1,
    image: require("../../../components/images/puff3.png"),
  },
  {
    id: 4,
    text: "HQD MANGO ICE 3% + ВТОРОЙ ЭТАЖ ЗАПАСНОЙ",
    price: 950,
    count: "НАЛИЧИЕ: 1000 ШТ",
    apt: "АРТ.: ART-6 945",
    changed_count: 1,
    image: require("../../../components/images/puff4.png"),
  },
];

export const PurchaseField = () => {
  return (
    <section className="purchase_field">
      {data.map((item, index) => (
        <div className="rendered_item" key={item.id}>
          <div className="item_image">
            <img src={item.image} alt="" className="rendered_image" />
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
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="price_count">{item.changed_count}</p>
              <button className="buttons" name="plus">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
