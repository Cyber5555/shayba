import React, { useContext, useEffect, useState } from "react";
import "./filterCatalog.css";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { useDispatch, useSelector } from "react-redux";
import { filterRequest } from "../../store/reducer/filterSlice";
import { Context } from "../../context/Context";
import Select from "react-select/base";

export const FilterCatalog = () => {
  const state = useSelector((state) => state);
  const { data, category, taste } = state.filterSlice;
  const value = useContext(Context);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [changed, setChanged] = useState("");

  useEffect(() => {
    dispatch(filterRequest(value.searchValues));
  }, [value.searchValues]);

  document.body.onclick = (e) => {
    if (
      e.target.className !== "catalog_lists" &&
      e.target.className !== "bug_header"
    )
      setIsOpen(false);
  };

  return (
    <main className="main_container_filter">
      <ul className="catalog_list_ul">
        <p className="catalog_info">КАТАЛОГ</p>
        <li className="catalog_lists">ОДНОРАЗОВЫЕ POD</li>
        <li className="catalog_lists">ПО ЦЕНЕ (ВОЗРАСТАНИЕ)</li>
        <li className="catalog_lists">ЦЕНА</li>
        <li className="catalog_lists">БРЕНД</li>
        <li className="catalog_lists"></li>
        <li className="catalog_lists" onClick={() => setIsOpen(!isOpen)}>
          ВКУС
          {isOpen && (
            <ul
              className={"sub_catalog_lists"}
              onClick={(event) => event.stopPropagation()}
            >
              {taste.map((element, $) => (
                <li key={$}>{element.name}</li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      <div className={"rendered_parent"}>
        <article className="brand_name_menu">
          {/*<h2 className="brand_title">ОДНОРАЗОВЫЕ POD</h2>*/}
          <div className="brand_box">
            {category.map((brand, index) => (
              <div
                key={index}
                className="rendered_brand"
                onClick={(e) => {
                  document
                    .querySelectorAll(".rendered_brand")
                    .forEach((element) => {
                      element.classList.remove("active");
                    });
                  e.target.classList.add("active");
                }}
              >
                {brand.name}
                {/*<h3>{}</h3>*/}
              </div>
            ))}
          </div>
        </article>

        <section className="container_filter">
          <div className="component_whit_catalog">
            <PurchaseField>
              <RenderPurchase data={data} />
            </PurchaseField>
          </div>
        </section>
      </div>
    </main>
  );
};
