import React, { useEffect } from "react";
import { Slider } from "../../components/slider/slider";
import "./layout.css";
import { VariousProducts } from "../../components/variousProducts/VariousProducts";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { BottomBar } from "./../fixElements/bottomBar/bottomBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsRequest } from "../../store/reducer/getAllProductsSlice";

export default function Layout() {
  const state = useSelector((state) => state);
  const { data } = state.allProducts;
  const dispatch = useDispatch();
  let location = window.location.pathname;
  let new_location;

  useEffect(() => {
    if (location === "/" || location === "/catalog") {
      dispatch(getAllProductsRequest());
    } else if (location === "/filter-catalog") {
      new_location = "/single-product";
    }
  }, []);

  return (
    <React.Fragment>
      <main className="layout_home_screen">
        {/* <GetAgeModal /> */}
        <Slider />
        <VariousProducts />
        <PurchaseField>
          <RenderPurchase data={data} />
        </PurchaseField>
      </main>
      <BottomBar />
    </React.Fragment>
  );
}
