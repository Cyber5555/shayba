import React, { useContext, useEffect, useState } from "react";
import "./filterCatalog.css";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { useDispatch, useSelector } from "react-redux";
import { filterRequest } from "../../store/reducer/filterSlice";
import { Context } from "../../context/Context";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const FilterCatalog = () => {
  const state = useSelector((state) => state);
  const { data, category, taste, made_in, current_page_filter } =
    state.filterSlice;
  const value = useContext(Context);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenBrend, setisOpenBrend] = useState(false);
  const [changed, setChanged] = useState("");
  const [rangeValue, setRangeValue] = useState([20, 100]);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    value.setSearchValues({
      min_price: newValue[0],
      max_price: newValue[1],
    });
  };

  useEffect(() => {
    dispatch(
      filterRequest({ value: value.searchValues, page: current_page_filter })
    );
    console.log(value.searchValues)
  }, [value.searchValues, current_page_filter]);

  document.body.onclick = (e) => {
    if (
      e.target.className !== "catalog_lists" &&
      e.target.className !== "bug_header"
    ) {
      setIsOpenPrice(false);
      setIsOpen(false);
      setisOpenBrend(false);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    document
      .querySelectorAll(".rendered_category")
      .forEach((element, index, i) => {
        if (value.searchValues?.category_id == category[index].id) {
          element.classList.add("active");
        }
      });
  }, []);

  return (
    <main className="main_container_filter">
      <ul className="catalog_list_ul">
        {/*<p className="catalog_info">КАТАЛОГ</p>*/}
        {/*<li className="catalog_lists">ОДНОРАЗОВЫЕ POD</li>*/}
        <li className="catalog_lists">ПО ЦЕНЕ (ВОЗРАСТАНИЕ)</li>
        <li
          className="catalog_lists"
          onClick={() => setIsOpenPrice(!isOpenPrice)}
        >
          ЦЕНА
          {isOpenPrice && (
            <ul
              className={"sub_price_range"}
              onClick={(event) => event.stopPropagation()}
            >
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={rangeValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={999999}
              />
            </ul>
          )}
        </li>
        {made_in?.length > 0 && (
          <li
            className="catalog_lists"
            onClick={() => setisOpenBrend(!isOpenBrend)}
          >
            БРЕНД
            {isOpenBrend && (
              <ul className={"sub_catalog_lists"}>
                {made_in.map((element, $) => (
                  <li
                    key={$}
                    onClick={() => {
                      value.setSearchValues({ made_in_id: element.id });
                    }}
                  >
                    {element.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
        {taste.length > 0 && (
          <li className="catalog_lists" onClick={() => setIsOpen(!isOpen)}>
            ВКУС
            {isOpen && (
              <ul
                className={"sub_catalog_lists"}
                onClick={(event) => event.stopPropagation()}
              >
                {taste.map((element, $) => (
                  <li
                    key={$}
                    onClick={() => {
                      value.setSearchValues({ taste_id: element.id });
                    }}
                  >
                    {element.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>

      <div className={"rendered_parent"}>
        {category.length > 0 && (
          <article className="brand_name_menu">
            {/*<h2 className="brand_title">ОДНОРАЗОВЫЕ POD</h2>*/}
            <div className="brand_box">
              {category.map((categorys, index) => (
                <div
                  key={index}
                  className="rendered_category"
                  onClick={(e) => {
                    document
                      .querySelectorAll(".rendered_category")
                      .forEach((element, i) => {
                        if (e.target.textContent !== element.textContent) {
                          element.classList.remove("active");
                          value.setSearchValues({ category_id: "" });
                        }
                      });

                    if (!e.target.classList.contains("active")) {
                      value.setSearchValues({ category_id: categorys.id });
                    }
                    e.target.classList.toggle("active");
                  }}
                >
                  {categorys.name}
                </div>
              ))}
            </div>
          </article>
        )}

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
