
import React from "react";
import { data } from "../../globalTestData";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { VariousProducts } from "../../components/variousProducts/VariousProducts";
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
