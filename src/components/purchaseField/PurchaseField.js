import React, {
  Children,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./PurchaseField.css";
import {
  getAllProductsRequest,
  nextPage,
  prevPage,
} from "../../store/reducer/getAllProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../context/Context";
import {
  nextPageFilter,
  prevPageFilter,
} from "../../store/reducer/filterSlice";

export const PurchaseField = ({ children }) => {
  const dispatch = useDispatch();
  const value = useContext(Context);
  const state = useSelector((state) => state);
  const { data, current_page, leftButton, rightButton } = state.allProducts;
  const { leftButtonFilter, rightButtonFilter } = state.filterSlice;

  useEffect(() => {
    if (window.location.pathname !== "/filter-catalog") {
      dispatch(getAllProductsRequest(current_page));
    } else {
    }
  }, [current_page]);

  const purchase = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ));

      return [...items];
    }
    return children;
  });

  return (
    <section className="purchase_field">
      {purchase}
      {children?.props?.data?.length > 0 &&
        window.location.pathname !== "/basket" && (
          <div className="next_prev_buttons_parent">
            <button
              className="next_prev"
              disabled={
                window.location.pathname === "/filter-catalog"
                  ? leftButtonFilter
                  : leftButton
              }
              onClick={(e) => {
                e.stopPropagation();
                if (window.location.pathname === "/filter-catalog") {
                  if (!leftButtonFilter) {
                    dispatch(prevPageFilter());
                  }
                } else {
                  if (!leftButton) {
                    dispatch(prevPage());
                  }
                }
              }}
            >
              назад
            </button>
            <button
              className="next_prev"
              disabled={
                window.location.pathname === "/filter-catalog"
                  ? rightButtonFilter
                  : rightButton
              }
              onClick={(e) => {
                e.stopPropagation();
                if (window.location.pathname === "/filter-catalog") {
                  if (!rightButtonFilter) {
                    dispatch(nextPageFilter());
                  }
                } else {
                  if (!rightButton) {
                    dispatch(nextPage());
                  }
                }
              }}
            >
              далье
            </button>
          </div>
        )}
    </section>
  );
};
