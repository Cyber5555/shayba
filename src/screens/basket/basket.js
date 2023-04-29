import React, { useEffect } from "react";
import "./basket.css";
import { BasketEmpty } from "./basketEmpty";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { BasketFull } from "./basketFull";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { useDispatch, useSelector } from "react-redux";
import { getBasketRequest } from "./../../store/authReducer/getBasketSlice";

export const Basket = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, random_product } = state.getBasketSlice;

  useEffect(() => {
    dispatch(getBasketRequest());
  },[]);

  return (
    <React.Fragment>
      {data.length > 0 ? <BasketFull res={null} /> : <BasketEmpty res={null} />}
      <div style={{ marginBottom: 20 }}>
        <PurchaseField>
          <RenderPurchase data={random_product} />
        </PurchaseField>
      </div>
    </React.Fragment>
  );
};
