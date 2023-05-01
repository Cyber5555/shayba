import React, { useEffect, useState } from "react";
import "./orderFormation.css";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

export const OrderIsGenerated = ({}) => {
  const state = useSelector((state) => state);
  const { success_message } = state.checkoutProductsSlice;

  return (
    <main className="order_formation_parent">
      <div className="order_formation_header">
        <h2>ЗАКАЗ СФОРМИРОВАН</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>ЗАКАЗ СФОРМИРОВАН</li>
        </ul>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <img src={require("../../assets/icons/grom.png")} alt="" />
        <h3
          className="address_shipping_order_formation"
          style={{ margin: "0 20px" }}
        >
          {success_message}
        </h3>
        <img src={require("../../assets/icons/grom.png")} alt="" />
      </div>
    </main>
  );
};
