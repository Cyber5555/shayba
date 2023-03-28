import React from "react";
import "../footer/Footer.css";

export const BottomBar = () => {
  return (
    <div className="top_footer">
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../assets/bottom2.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../assets/bottom2.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />{" "}
      <img
        src={require("../../../assets/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
    </div>
  );
};
