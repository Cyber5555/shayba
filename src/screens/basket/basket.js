import React from "react";
import "./basket.css";
import { BasketEmpty } from "./basketEmpty";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { data } from "./../../globalTestData";
import { BasketFull } from "./basketFull";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";

export const Basket = () => {
  return (
    <React.Fragment>
      {/* <BasketEmpty res={null} /> */}
      <BasketFull res={null} />
      <div style={{ marginBottom: 20 }}>
        <PurchaseField>
          <RenderPurchase data={data} />
        </PurchaseField>
      </div>
    </React.Fragment>
  );
};
