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
  const [isOpenGrowth, setisOpenGrowth] = useState(false);
  const [rangeValue, setRangeValue] = useState([0, 30000]);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    value.setMinPrice(newValue[0]);
    value.setMaxPrice(newValue[1]);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(
      filterRequest({
        made_in_id: value.made_in_id,
        category_id: value.category_id,
        orderbyPriceAsc: value.orderbyPriceAsc,
        orderbyPriceDesc: value.orderbyPriceDesc,
        search: value.search,
        max_price: value.max_price,
        min_price: value.min_price,
        taste_id: value.taste_id,
        page: current_page_filter,
      })
    );
  }, [
    value.made_in_id,
    value.category_id,
    value.orderbyPriceAsc,
    value.orderbyPriceDesc,
    value.search,
    value.max_price,
    value.min_price,
    value.taste_id,
    current_page_filter,
  ]);

  document.body.onclick = (e) => {
    if (
      e.target.className !== "catalog_lists"
      // e.target.className !== "sub_growth_select"
    ) {
      setIsOpenPrice(false);
      setIsOpen(false);
      setisOpenBrend(false);
      setisOpenGrowth(false);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    document
      .querySelectorAll(".rendered_category")
      .forEach((element, index, i) => {
        if (value?.category_id == category[index].id) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
  }, []);

  return (
    <main className="main_container_filter">
      <ul className="catalog_list_ul">
        {/*<p className="catalog_info">КАТАЛОГ</p>*/}
        {/*<li className="catalog_lists">ОДНОРАЗОВЫЕ POD</li>*/}
        <li
          className="catalog_lists"
          onClick={() => setisOpenGrowth(!isOpenGrowth)}
        >
          ПО ЦЕНЕ (ВОЗРАСТАНИЕ)
          {isOpenGrowth && (
            <ul
              className={"sub_growth_select"}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={"growth_label"}>
                <input
                  type="radio"
                  id={"growth1"}
                  name={"growth"}
                  className={"growth"}
                  onClick={() => {
                    value.setOrderbyPriceAsc("ASC");
                    value.setOrderbyPriceDesc("");
                  }}
                />
                <label htmlFor={"growth1"}>По возрастанию цены</label>
              </div>
              <div className={"growth_label"}>
                <input
                  type="radio"
                  id={"growth2"}
                  name={"growth"}
                  className={"growth"}
                  onChange={() => {
                    value.setOrderbyPriceAsc("");
                    value.setOrderbyPriceDesc("Desc");
                  }}
                />
                <label htmlFor={"growth2"}>По убыванию цены</label>
              </div>
            </ul>
          )}
        </li>
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
                max={30000}
                step={10}
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
                      value.setMadeInId(element.id);
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
                      value.setTasteId(element.id);
                    }}
                  >
                    {element.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
        <li
          className={"catalog_lists"}
          onClick={() => {
            value.setCategoryId("");
            value.setMadeInId("");
            value.setTasteId("");
            value.setOrderbyPriceAsc("");
            value.setOrderbyPriceDesc("");
            value.setSearch("");
            value.setMaxPrice("");
            value.setMinPrice("");
            setRangeValue([0, 30000]);
            document.querySelectorAll(".growth").forEach((e) => {
              e.checked = false;
            });
            document
              .querySelectorAll(".rendered_category")
              .forEach((e) => e.classList?.remove("active"));
          }}
        >
          сбросить фильтр
        </li>
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
                          value.setCategoryId("");
                        }
                      });

                    if (!e.target.classList.contains("active")) {
                      value.setCategoryId(categorys.id);
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
