import React, { useEffect, useState } from "react";
import "./basket.css";
import { BasketEmpty } from "./basketEmpty";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { BasketFull } from "./basketFull";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { useDispatch, useSelector } from "react-redux";
import { getBasketRequest } from "./../../store/authReducer/getBasketSlice";
import { authUserInfoRequest } from "../../store/authReducer/authUserInfoSlice";

export const Basket = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, random_product } = state.getBasketSlice;
  const { delate } = state.delateAllBasketsSlice;
  const { count_plus, added_in_basket } = state.addInBasketSlice;
  const { reduce_in_basket, count_minus } = state.reduceInBasketSlice;
  const [first_render, setFirstRender] = useState(true);
  const [random, setRandom] = useState();

  useEffect(() => {
    dispatch(getBasketRequest(localStorage.getItem("userToken")));
  }, []);

  useEffect(() => {
    dispatch(getBasketRequest(localStorage.getItem("userToken")));
    dispatch(authUserInfoRequest(localStorage.getItem("userToken")));
    if (first_render || random.length == 0) {
      setRandom(random_product);
      setFirstRender(false);
    }
    // window.location.reload();
  }, [
    added_in_basket,
    reduce_in_basket,
    count_minus,
    count_plus,
    delate,
    first_render,
  ]);

  window.on = () => {
    dispatch(getBasketRequest(localStorage.getItem("userToken")));
    setRandom(random_product);
    setFirstRender(true);
  };

  return (
    <React.Fragment>
      {data?.length ? <BasketFull res={data} /> : <BasketEmpty res={null} />}
      <div style={{ marginBottom: 20 }}>
        <PurchaseField>
          <RenderPurchase data={random?.length > 0 ? random : random_product} />
        </PurchaseField>
      </div>
    </React.Fragment>
  );
};
