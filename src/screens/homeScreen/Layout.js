import React from "react";
import { Slider } from "./slider/slider";
import "./layout.css";
import { PurchaseField } from "./purchaseField/PurchaseField";
import { VariousProducts } from "./variousProducts/VariousProducts";
import { GetAgeModal } from "../getAgeModal/GetAgeModal";
import { useSelector } from "react-redux";



export default function Layout() {
  const check_age = useSelector((state) => state.toolkit.getAgeBool);
  function closeWindow() {

    window.close();
  }
  if (check_age) {
    document.querySelector(".popup_parent").style.display = "none";
  } else if (!check_age) {
    closeWindow();
    // document.querySelector(".popup_parent").style.display = "none";
  }

  return (
    <main className="layout_home_screen">
      <GetAgeModal />
      <Slider />
      <VariousProducts />
      <PurchaseField />
    </main>
  );
}
