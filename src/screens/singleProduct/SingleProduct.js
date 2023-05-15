import { InnerImageZoom } from "zoom-loading-detector";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import "./SingleProduct.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getSingleProductRequest } from "../../store/reducer/getSingleProductSlice";
import PuffLoader from "react-spinners/PuffLoader";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { addInBasketRequest } from "../../store/authReducer/addInBasketSlice";

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, is_random_data, loading } = state.getSingleProduct;
  const [open, setOpen] = useState(true);
  useEffect(() => {
    dispatch(getSingleProductRequest(localStorage.getItem("item_id")));
  }, [localStorage.getItem("item_id")]);
  const { count_plus, maximum_error } = state.addInBasketSlice;
  return data?.photo ? (
    <main className="layout_home_screen">
      <section className="single_product_box_parent">
        <div className="single_product_left_box">
          <h2 className="single_product_title">{data?.name}</h2>
          <div className="single_product_image_parent">
            {/*<Lightbox*/}
            {/*    open={open}*/}
            {/*    close={() => setOpen(false)}*/}
            {/*    slides={*/}
            {/*      data?.photo[inde]*/}
            {/*    }*/}
            {/*/>*/}

            <InnerImageZoom
              src={
                "https://admin.shayba.store/uploads/" + data?.photo[0]?.photo
              }
              className="single_product_image"
            />
          </div>
        </div>
        <div className="single_product_right_box">
          <ul className="single_product_catalog">
            <li>КАТАЛОГ</li>
            <span></span>
            {data?.category?.name && <li>{data?.category?.name}</li>}
            <span></span>
            {data?.made_in?.name && <li>{data?.made_in?.name}</li>}
            {/* <span></span>
            <li>HQD MANGO ICE 3%</li> */}
          </ul>
          <div className="product_info">
            <h2>{data?.name}</h2>
            {/* <div className="net_parent">
              <img
                src={require("../../assets/icons/net.png")}
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <h3 className="net_text">100</h3>
            </div> */}
          </div>
          {data?.art && (
            <p style={{ color: "#707070", fontSize: 20, margin: "20px 0" }}>
              АРТ- {data?.art}
            </p>
          )}
          {data?.count > 0 ? (
            <p style={{ color: "#FD4A27", fontSize: 22, marginBottom: "3rem" }}>
              НАЛИЧИЕ: {data?.count} ШТ
            </p>
          ) : (
            <p
              style={{
                color: "#FD4A27",
                fontSize: 22,
                marginBottom: "3rem",
                textTransform: "uppercase",
                marginTop: 25,
              }}
            >
              Нет в наличии
            </p>
          )}
          {data?.made_in?.name && (
            <p className="info_for_products">
              БРЕНД — <span>{data?.made_in?.name}</span>
            </p>
          )}
          {/*<p className="info_for_products">*/}
          {/*  ЛИНЕЙКА — <span>CUVIE PLUS</span>*/}
          {/*</p>*/}
          {data?.category?.name && (
            <p className="info_for_products">
              ВИД ТОВАРА — <span>{data?.category?.name}</span>
            </p>
          )}
          {data?.taste?.name && (
            <p className="info_for_products">
              ВКУС — <span>{data?.taste?.name}</span>
            </p>
          )}
          {data?.strength && (
            <p className="info_for_products">
              КРЕПОСТЬ (%) — <span>{data?.strength}</span>
            </p>
          )}
          {data?.puffs_count && (
            <p className="info_for_products">
              КОЛИЧЕСТВО ЗАТЯЖЕК — <span>{data?.puffs_count}</span>
            </p>
          )}
          {data?.battery_type && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              тип аккумулятора — <span>{data?.battery_type}</span>
            </p>
          )}
          {data?.battery_capacity && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Емкость аккумулятора — <span>{data?.battery_capacity}</span>
            </p>
          )}
          {data?.capacity && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Емкость — <span>{data?.capacity}</span>
            </p>
          )}
          {data?.cartridge_volume && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              объем картриджа — <span>{data?.cartridge_volume}</span>
            </p>
          )}
          {data?.equipment && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Комплектация — <span>{data?.equipment}</span>
            </p>
          )}
          {data?.evaporator_resistance && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Сопротивление испарителей —{" "}
              <span>{data?.evaporator_resistance}</span>
            </p>
          )}
          {data?.manufacturers_recommended_power && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Рекомендуемая производителем мощность —{" "}
              <span>{data?.manufacturers_recommended_power}</span>
            </p>
          )}
          {data?.marking && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Маркировка — <span>{data?.marking}</span>
            </p>
          )}
          {data?.maximum_power && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Максимальная мощность — <span>{data?.maximum_power}</span>
            </p>
          )}
          {data?.output_power && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Выходная мощность — <span>{data?.output_power}</span>
            </p>
          )}
          {data?.puffs_count && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Количество затяжек — <span>{data?.puffs_count}</span>
            </p>
          )}
          {data?.rechargeable && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Перезаряжаемая или нет — <span>{data?.rechargeable}</span>
            </p>
          )}
          {data?.replacement_coils && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Сменные испарители — <span>{data?.replacement_coils}</span>
            </p>
          )}
          {data?.resistance && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Сопротивление — <span>{data?.resistance}</span>
            </p>
          )}
          {data?.screen && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Экран — <span>{data?.screen}</span>
            </p>
          )}
          {data?.size && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Размер — <span>{data?.size}</span>
            </p>
          )}
          {data?.strength && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Крепкость(%) — <span>{data?.strength}</span>
            </p>
          )}
          {data?.volume && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              Объем картриджа — <span>{data?.volume}</span>
            </p>
          )}
          {data?.which_device_is_suitable_for_this_vaporizer && (
            <p
              className="info_for_products"
              style={{ textTransform: "uppercase" }}
            >
              На какое устройство подойдет данный испаритель —{" "}
              <span>{data?.which_device_is_suitable_for_this_vaporizer}</span>
            </p>
          )}
          {/* <p className="info_for_products">
            ОДНОРАЗОВЫЕ ЭЛЕКТРОННЫЕ ИСПАРИТЕЛИ — <span>ДА</span>
          </p> */}
          <div className="add_price_product_parent">
            <p className="product_price">{data?.price} ₽</p>

            {/* <div className="add_price">
              <button className="buttons" name="minus">
                <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" />
              </button>
              <p className="price_count">{1}</p>
              <button className="buttons" name="plus">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div> */}
            {data?.count > 0 && (
              <button
                className="add_card"
                onClick={(e) => {

                  dispatch(addInBasketRequest({ product_id: data.id }));
                  document.querySelector('.tooltip')?.classList?.add("active");
                  setTimeout(() => {
                    document.querySelector('.tooltip')?.classList?.remove("active");
                  }, 1000);
                }}
              >
                В КОРЗИНУ
                <span className="tooltip">
                  {maximum_error != ""
                    ? maximum_error
                    : `корзине ${count_plus} штуки`}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
      <PurchaseField>
        <RenderPurchase data={is_random_data} />
      </PurchaseField>
    </main>
  ) : (
    <div className="loader">
      <PuffLoader loading={loading} />
    </div>
  );
};
