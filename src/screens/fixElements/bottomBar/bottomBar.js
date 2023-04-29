import React from "react";
import "../footer/Footer.css";

export const BottomBar = () => {
  return (
    <div className="top_footer">
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        className="bottom_bar_images"
      />
      <img
        src={require("../../../assets/bottom2.png")}
        alt=""
        className="bottom_bar_images"
      />
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        className="bottom_bar_images"
      />
      <img
        src={require("../../../assets/bottom2.png")}
        alt=""
        className="bottom_bar_images"
      />{" "}
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        className="bottom_bar_images"
      />
    </div>
  );
};
