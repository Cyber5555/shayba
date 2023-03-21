
import React from "react";
import { data } from "../../globalTestData";
import { PurchaseField } from "../../purchaseField/PurchaseField";
import { RenderPurchase } from "../../purchaseField/renderPurchase";
import { VariousProducts } from "../../variousProducts/VariousProducts";
import "./catalog.css";

export const Catalog = () => {
  return (
    <main className="layout_home_screen">
      <VariousProducts />
      <PurchaseField>
        <RenderPurchase data={data} />
      </PurchaseField>
    </main>
  );
};
