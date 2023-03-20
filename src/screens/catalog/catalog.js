
import React from "react";
import { VariousProducts } from "../../variousProducts/VariousProducts";
import "./catalog.css";
// import { PurchaseField } from '../../purchaseField/PurchaseField';

export const Catalog = () => {
  return (
    <main className="layout_home_screen">
      <VariousProducts />
      {/* <PurchaseField /> */}
    </main>
  );
};
