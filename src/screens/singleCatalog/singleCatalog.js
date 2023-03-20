import React from "react";
import { PurchaseField } from "../../purchaseField/PurchaseField";
import { RenderPurchase } from "../../renderPurchase/renderPurchase";
import "./singleCatalog.css";

export const SingleCatalog = () => {
  return (
    <main className="single_catalog_parent">
      <PurchaseField />
    </main>
  );
};
