import React, { useContext, useEffect } from "react";
import { Slider } from "../../components/slider/slider";
import "./layout.css";
import { VariousProducts } from "../../components/variousProducts/VariousProducts";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { BottomBar } from "./../fixElements/bottomBar/bottomBar";
import { useSelector } from "react-redux";

export default function Layout() {
  const state = useSelector((state) => state);
  const { data } = state.allProducts;

  return (
    <React.Fragment>
      <main className="layout_home_screen">
        {/* <GetAgeModal /> */}
        <Slider />
        <VariousProducts />
        <PurchaseField>
          <RenderPurchase data={data.data} />
        </PurchaseField>
      </main>
      <BottomBar />
    </React.Fragment>
  );
}
