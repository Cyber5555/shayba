import React from "react";
import { Slider } from "../../slider/slider";
import "./layout.css";

import { VariousProducts } from "../../variousProducts/VariousProducts";
import { GetAgeModal } from "../getAgeModal/GetAgeModal";
import { PurchaseField } from "../../purchaseField/PurchaseField";
import { RenderPurchase } from "../../purchaseField/renderPurchase";
import { data } from "./../../globalTestData";
import { BottomBar } from "./../fixElements/bottomBar/bottomBar";

export default function Layout() {
  return (
    <React.Fragment>
      <main className="layout_home_screen">
        <GetAgeModal />
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
