import React from "react";
import "./basket.css";
import { BasketEmpty } from "./basketEmpty";
import { PurchaseField } from "./../../purchaseField/PurchaseField";
import { RenderPurchase } from "./../../purchaseField/renderPurchase";
import { data } from "./../../globalTestData";
import { BasketFull } from "./basketFull";

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
