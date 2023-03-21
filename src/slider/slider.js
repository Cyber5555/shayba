import React, { Component, useEffect, useRef, useState } from "react";
import styles from "./slider.module.css";
import Carousel from "./carousel.js";

const data = [
  {
    id: 1,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-1.png"),
  },
  {
    id: 2,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-2.png"),
  },
  {
    id: 3,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-3.png"),
  },
  {
    id: 4,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-4.png"),
  },
  {
    id: 5,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-5.png"),
  },
  {
    id: 6,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-6.png"),
  },
  {
    id: 7,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-7.png"),
  },
  {
    id: 8,
    text: "ЖИРРРРНЫЕ СКИДКИ!!!!!",
    info: "НА ВСЕ ОДНОРАЗКИ, ТАБАК, УГОЛЬИ АКСЕССУАРЫ",
    date: "23 ФЕВРАЛЯ-8 МАРТА",
    images: require("../components/3dImages/Shape-8.png"),
  },
];

export const Slider = () => {
  return (
    <div className={styles.SliderParent}>
      <Carousel>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles.RenderedBox}>
              <h2 className={styles.RenderedText}>{item.text}</h2>
              <h3 className={styles.RenderedDate}>{item.date}</h3>
              <h4 className={styles.RenderedInfo}>{item.info}</h4>
            </div>
            <img
              src={item.images}
              alt={`Shape${index + 1}`}
              key={index}
              className={styles.SliderImages}
            />
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  );
};
