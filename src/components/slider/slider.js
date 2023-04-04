import React, { useEffect } from "react";
import styles from "./slider.module.css";
import Carousel from "./carousel.js";
import { useDispatch, useSelector } from "react-redux";
import { getSliderRequest } from "../../store/getSliderSlice";

export const Slider = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.slider.data);

  useEffect(() => {
    dispatch(getSliderRequest());
  }, [dispatch]);

  return (
    <div className={styles.SliderParent}>
      <Carousel>
        {state.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles.RenderedBox}>
              <h2 className={styles.RenderedText}>{item.title}</h2>
              <h3 className={styles.RenderedDate}>{item.sub_title}</h3>
              <h4 className={styles.RenderedInfo}>{item.description}</h4>
            </div>
            {item.photo ? (
              <img
                src={"https://admin.shayba.store/uploads/" + item.photo}
                alt={`Shape${index + 1}`}
                key={index}
                className={styles.SliderImages}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  );
};
