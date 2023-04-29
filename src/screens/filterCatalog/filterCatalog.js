import React, { useContext, useEffect } from "react";
import "./filterCatalog.css";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { useDispatch, useSelector } from "react-redux";
import { filterRequest } from "../../store/reducer/filterSlice";
import { Context } from "../../context/Context";

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
  const state = useSelector((state) => state);
  const { data } = state.filterSlice;
  const value = useContext(Context);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(filterRequest(value.searchValues));
  // }, []);
  
  useEffect(() => {
    dispatch(filterRequest(value.searchValues));
  }, [value.searchValues]);

  return (
    <main className="main_container_filter">
      <article className="brand_name_menu">
        <h2 className="brand_title">ОДНОРАЗОВЫЕ POD</h2>
        <div className="brand_box">
          {brands.map((brand, index) => (
            <div key={index} className="rendered_brand">
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
