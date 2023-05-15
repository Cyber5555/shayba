import React, { useContext, useEffect } from "react";
import "./variousProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryRequest } from "../../store/reducer/getAllCategorySlice";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

export const VariousProducts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, loading } = state.allCategory;
  const value = useContext(Context);
  useEffect(() => {
    dispatch(getAllCategoryRequest());
  }, []);
  const navigate = useNavigate();

  return (
    <section className="various_products">
      {data.map(
        (item, index) =>
          item.photo &&
          item.name && (
            <div
              className="rendered_item_parent"
              key={item.id}
              onClick={() => {
                value.setSearchValues({ category_id: item.id });
                navigate("/filter-catalog");
              }}
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
