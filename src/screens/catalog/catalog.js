import React from "react";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { VariousProducts } from "../../components/variousProducts/VariousProducts";
import "./catalog.css";
import { useSelector } from "react-redux";

export const Catalog = () => {
  const state = useSelector((state) => state);
  const { data } = state.allProducts;
  return (
    <main className="layout_home_screen">
      <VariousProducts />
      <PurchaseField>
        <RenderPurchase data={data} />
      </PurchaseField>
    </main>
  );
};
