import React from "react";
import "./variousProducts.css";

const data = [
  {
    id: 1,
    text: "ЖЕВАТЕЛЬНЫЙ ТАБАК",
    image: require("../../../components/images/IMG_5860 1.png"),
  },
  {
    id: 2,
    text: "ТАБАК ДЛЯ КАЛЬЯНА",
    image: require("../../../components/images/IMG_5860 2.png"),
  },
  {
    id: 3,
    text: "УГОЛЬ",
    image: require("../../../components/images/IMG_5860 3.png"),
  },
  {
    id: 4,
    text: "АКСЕССУАРЫ",
    image: require("../../../components/images/IMG_5860 4.png"),
  },
  {
    id: 5,
    text: "ОДНОРАЗОВЫЕ ИСПАРИТЕЛИ",
    image: require("../../../components/images/IMG_5860 5.png"),
  },
  {
    id: 6,
    text: "МНОГОРАЗОВЫЕ POD",
    image: require("../../../components/images/IMG_5860 6.png"),
  },
  {
    id: 7,
    text: "ЖИДКОСТИ ДЛЯ POD",
    image: require("../../../components/images/IMG_5860 7.png"),
  },
];

export const VariousProducts = () => {
  return (
    <section className="various_products">
      {data.map((item, index) => (
        <div
          className="rendered_item_parent"
          key={item.id}
          style={
            index % 2 === 1 ? { borderRadius: "50%" } : { borderRadius: "10px" }
          }
        >
          <img src={item.image} alt="" className="rendered_images" />

          <h4>{item.text}</h4>
        </div>
      ))}
    </section>
  );
};
