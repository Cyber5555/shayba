import React, { useContext, useEffect } from "react";
import { Slider } from "../../components/slider/slider";
import "./layout.css";
import { VariousProducts } from "../../components/variousProducts/VariousProducts";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { BottomBar } from "./../fixElements/bottomBar/bottomBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsRequest } from "../../store/reducer/getAllProductsSlice";

export default function Layout() {
  const state = useSelector((state) => state);
  const { data, current_page } = state.allProducts;
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== "/filter-catalog") {
      dispatch(getAllProductsRequest(current_page));
    }
  }, [current_page]);

  return (
    <React.Fragment>
      <main className="layout_home_screen">
        <Slider />
        <VariousProducts />
        <PurchaseField>
          <RenderPurchase data={data.data} />
        </PurchaseField>
      </main>
      <BottomBar />
    </React.Fragment>
  );
}
