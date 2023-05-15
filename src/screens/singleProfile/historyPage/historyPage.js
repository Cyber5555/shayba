import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHistoryRequest } from "../../../store/authReducer/getAllHistorySlice";
import "./historyPage.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getSingleProductRequest } from "../../../store/reducer/getSingleProductSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export const HistoryPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data } = state.getAllHistorySlice;
  const [isOpen, setIsOpen] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllHistoryRequest({}));
  }, []);

  // const togleItem = (e) => {
  //   let history_items = document.querySelectorAll(".history_items");
  //   history_items.forEach((item, ind) => {
  //     if (item.closed) {
  //       item.open = true;
  //     } else if (item.open) {
  //       item.close = true;
  //     }
  //
  //     // if (item.open === true) {
  //     //   item.close = true;
  //     // }
  //   });
  // };

  return (
    <div className={"history_parent"}>
      <ul className={"history_product_details"}>
        {data?.map((item, index) => {
          return (
            <details
              className={"history_items"}
              key={index}
              onClick={() => setIsOpen(item.id)}
            >
              <summary>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/*{isOpen != item.id && <AiFillCaretDown />}*/}
                  {/*{isOpen == item.id && <AiFillCaretUp />}*/}
                  {item?.order_product?.length > 0 && <AiFillCaretDown />}
                  <p style={{ marginLeft: 20 }}>
                    <p style={{ marginBottom: 10 }}>
                      ЗАКАЗ №{item.order_id} ОТ{" "}
                      {moment(item.created_at).format("MM. DD. YYYY")}
                    </p>
                    {item.order_product_sum_count} ТОВАРОВ НА СУММУ:{" "}
                    {item.all_price} ₽{" "}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      textTransform: "uppercase",
                      textAlign: "right",
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ marginRight: 10 }}>способ оплаты :</span>
                    {item.order_type == "Shops"
                      ? "НАЛИЧНЫМИ ИЛИ КАРТОЙ В МАГАЗИНЕ"
                      : "Другой"}
                  </p>
                  <p className={"status_history"}>
                    СТАТУС{" "}
                    {item.order_type == "Shops" && item.status == 1
                      ? "Ожидаем подтверждения"
                      : ""}
                    {item.order_type == "Shops" && item.status == 2
                      ? "Готов к получению"
                      : ""}
                    {item.order_type == "Shops" && item.status == 3
                      ? "Получено"
                      : ""}
                    {item.order_type == "Drugoi" && item.status == 1
                      ? "Ожидаем подтверждения"
                      : ""}
                    {item.order_type == "Drugoi" && item.status == 2
                      ? "Ожидает Доставки"
                      : ""}
                    {item.order_type == "Drugoi" && item.status == 3
                      ? "В пути"
                      : ""}
                    {item.order_type == "Drugoi" && item.status == 4
                      ? "Получено"
                      : ""}
                  </p>
                </div>
              </summary>
              {item?.order_product?.map((product, id) => (
                <fieldset
                  className={"fieldset_items"}
                  key={id}
                  onClick={() => {
                    localStorage.setItem("item_id", product.product.id);
                    navigate("/single-product");
                  }}
                >
                  <legend className={"legend"}>{product?.shop.name}</legend>
                  <img
                    src={
                      "https://admin.shayba.store/uploads/" +
                      product.product.photo[0].photo
                    }
                    className={"history_images"}
                    alt=""
                  />
                  <div className={"history_elements"}>
                    <h2>{product.product.name}</h2>
                    <p>Количество в заказе{product.count}</p>
                    <p>ЦЕНА {product.product.price} ₽</p>
                    <p style={{ color: "rgb(253, 74, 39)" }}>
                      {product.product.count <= 0
                        ? "НЕТ В НАЛИЧИИ"
                        : `НАЛИЧИЕ: ${product.product.count} ШТ`}
                    </p>
                  </div>
                </fieldset>
              ))}
            </details>
          );
        })}
      </ul>
    </div>
  );
};
