import React from "react";
import "../footer/Footer.css";

export const BottomBar = () => {
  return (
    <div className="top_footer">
      <img
        src={require("../../../components/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../components/bottom2.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../components/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
      <img
        src={require("../../../components/bottom2.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />{" "}
      <img
        src={require("../../../components/bottom1.png")}
        alt=""
        style={{ width: "150px",height: '60px' }}
      />
    </div>
  );
};
