import React from "react";
import "./filterCatalog.css";
import { data } from "./../../globalTestData";
import { PurchaseField } from "./../../purchaseField/PurchaseField";
import { RenderPurchase } from "./../../purchaseField/renderPurchase";

const brands = [
  "BRANDNAME #1",
  "BRANDNAME #2",
  "BRANDNAME #3",
  "BRANDNAME #4",
  "BRANDNAME #5",
  "BRANDNAME #6",
  "BRANDNAME #7",
];

export const FilterCatalog = () => {
  return (
    <main className="main_container_filter">
      <article className="brand_name_menu">
        <h2 className="brand_title">ОДНОРАЗОВЫЕ POD</h2>
        <div className="brand_box">
          {brands.map((brand) => (
            <div className="rendered_brand">
              <h3>{brand}</h3>
            </div>
          ))}
        </div>
      </article>

      <section className="container_filter">
        <ul className="catalog_list_ul">
          <p className="catalog_info">КАТАЛОГ</p>
          <li className="catalog_lists">ОДНОРАЗОВЫЕ POD</li>
          <li className="catalog_lists">ПО ЦЕНЕ (ВОЗРАСТАНИЕ)</li>
          <li className="catalog_lists">ЦЕНА</li>
          <li className="catalog_lists">БРЕНД</li>
          <li className="catalog_lists">ВИД ТОВАРА</li>
        </ul>
        <div className="component_whit_catalog">
          <PurchaseField>
            <RenderPurchase data={data} />
          </PurchaseField>
        </div>
      </section>
    </main>
  );
};
