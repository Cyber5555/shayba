import React from "react";
import { Slider } from "../../slider/slider";
import "./layout.css";

import { VariousProducts } from "../../variousProducts/VariousProducts";
import { GetAgeModal } from "../getAgeModal/GetAgeModal";
import { PurchaseField } from "../../purchaseField/PurchaseField";
import { RenderPurchase } from "../../purchaseField/renderPurchase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { data } from './../../globalTestData';


export default function Layout() {
  return (
    <main className="layout_home_screen">
      <GetAgeModal />
      <Slider />
      <VariousProducts />
      <PurchaseField>
        <RenderPurchase data={data} />
      </PurchaseField>
    </main>
  );
}
