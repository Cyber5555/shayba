import React from "react";
import { Slider } from "../../slider/slider";
import "./layout.css";
import { PurchaseField } from "../../purchaseField/PurchaseField";
import { VariousProducts } from "../../variousProducts/VariousProducts";
import { GetAgeModal } from "../getAgeModal/GetAgeModal";

export default function Layout() {
  return (
    <main className="layout_home_screen">
      <GetAgeModal />
      <Slider />
      <VariousProducts />
      <PurchaseField />
    </main>
  );
}
