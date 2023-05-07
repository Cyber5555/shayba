import React, {
  Children,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./PurchaseField.css";
import { getAllProductsRequest } from "../../store/reducer/getAllProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../context/Context";

export const PurchaseField = ({ children }) => {
  const [rightButton, setRightButton] = useState(false);
  const [leftButton, setLeftButton] = useState(false);
  const dispatch = useDispatch();
  const value = useContext(Context);
  const state = useSelector((state) => state);
  const { data } = state.allProducts;

  useEffect(() => {
    data?.next_page_url !== null &&
      data?.prev_page_url !== null &&
      dispatch(getAllProductsRequest(value.countRequest));

    data?.next_page_url === null && setRightButton(true);

    data?.prev_page_url === null && setLeftButton(true);
  }, [value.countRequest]);

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
      {children?.props?.data?.length !== 0 && (
        <div className="next_prev_buttons_parent">
          <button
            className="next_prev"
            disabled={leftButton}
            onClick={(e) => {
              e.stopPropagation();
              value.setCountRequest(value.countRequest - 1);
            }}
          >
            назад
          </button>
          <button
            className="next_prev"
            disabled={rightButton}
            onClick={(e) => {
              e.stopPropagation();
              value.setCountRequest(value.countRequest + 1);
            }}
          >
            далье
          </button>
        </div>
      )}
    </section>
  );
};
