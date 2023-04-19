import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InnerImageZoom } from "zoom-loading-detector";
import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import "./SingleProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProductRequest } from "../../store/reducer/getSingleProductSlice";

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, is_random_data } = state.getSingleProduct;

  useEffect(() => {
    dispatch(getSingleProductRequest(localStorage.getItem("item_id")));
  }, []);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <main className="layout_home_screen">
      <section className="single_product_box_parent">
        <div className="single_product_left_box">
          <h2 className="single_product_title">{data?.name}</h2>
          <div className="single_product_image_parent">
            <InnerImageZoom
              src={'https://admin.shayba.store/uploads/'+ data?.photo[0]?.photo}
              className="single_product_image"
            />
          </div>
        </div>
        <div className="single_product_right_box">
          <ul className="single_product_catalog">
            <li>КАТАЛОГ </li>
            <span></span>
            <li>ОДНОРАЗОВЫЕ POD</li>
            <span></span>
            <li>HQD</li>
            <span></span>
            <li>HQD MANGO ICE 3%</li>
          </ul>
          <div className="product_info">
            <h2>{data?.name}</h2>
            <div className="net_parent">
              <img
                src={require("../../assets/icons/net.png")}
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <h3 className="net_text">100</h3>
            </div>
          </div>
          <p style={{ color: "#707070", fontSize: 20, margin: "20px 0" }}>
            АРТ.: ART-6 945
          </p>
          <p style={{ color: "#FD4A27", fontSize: 22, marginBottom: "3rem" }}>
            НАЛИЧИЕ: 1000 ШТ
          </p>
          <p className="info_for_products">
            БРЕНД — <span>HQD</span>
          </p>
          <p className="info_for_products">
            ЛИНЕЙКА — <span>CUVIE PLUS</span>
          </p>
          <p className="info_for_products">
            ВИД ТОВАРА — <span>ОДНОРАЗОВЫЙ POD</span>
          </p>
          <p className="info_for_products">
            ВКУС — <span>КЛУБНИКА И ПИТАЙЯ</span>
          </p>
          <p className="info_for_products">
            КРЕПОСТЬ (%) — <span>2</span>
          </p>
          <p className="info_for_products">
            КОЛИЧЕСТВО ЗАТЯЖЕК — <span>1200</span>
          </p>
          <p className="info_for_products">
            ОДНОРАЗОВЫЕ ЭЛЕКТРОННЫЕ ИСПАРИТЕЛИ — <span>ДА</span>
          </p>
          <div className="add_price_product_parent">
            <p className="product_price">{data?.price} ₽</p>

            <div className="add_price">
              <button className="buttons" name="minus">
                <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" />
              </button>
              <p className="price_count">{1}</p>
              <button className="buttons" name="plus">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button className="add_card">В КОРЗИНУ</button>
          </div>
        </div>
      </section>
      <PurchaseField>
        <RenderPurchase data={is_random_data} />
      </PurchaseField>
    </main>
  );
};
