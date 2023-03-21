import React, { Children, useMemo } from "react";
import "./PurchaseField.css";

export const PurchaseField = ({ children }) => {
  const purchase = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ));

      return [...items];
    }
    return children;
  });

  return <section className="purchase_field">{purchase}</section>;
};
