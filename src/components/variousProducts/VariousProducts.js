import React, { useEffect } from "react";
import "./variousProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryRequest } from "../../store/reducer/getAllCategorySlice";

export const VariousProducts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allCategory);
  const { data, loading } = state;
  useEffect(() => {
    dispatch(getAllCategoryRequest());
  }, []);

  return (
    <section className="various_products">
      {data.map(
        (item, index) =>
          item.photo &&
          item.name && (
            <div
              className="rendered_item_parent"
              key={item.id}
              style={
                index % 2 === 1
                  ? { borderRadius: "50%" }
                  : { borderRadius: "10px" }
              }
            >
              <img
                src={"https://admin.shayba.store/uploads/" + item.photo}
                alt=""
                className="rendered_images"
              />

              <h4>{item.name}</h4>
            </div>
          )
      )}
    </section>
  );
};
