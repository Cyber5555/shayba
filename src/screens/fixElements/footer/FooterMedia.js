import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";

export const FooterMedia = () => {
  const state = useSelector((state) => state);
  const { data } = state.headerFooterInfo;

  return (
    <React.Fragment>
      <footer className="footer_media">
        <div>
          <div className="socialLinks">
            <a href={data?.vk_url} target="_blank">
              <img
                src={require("../../../assets/icons/vk.png")}
                alt="vk"
                style={{ width: "26px", height: "26px" }}
              />
            </a>
            <a href={data?.instagram_url} target="_blank">
              <img
                src={require("../../../assets/icons/instagram.png")}
                alt="instagram"
                style={{ width: "26px", height: "26px" }}
              />
            </a>
            <a href={data?.watsap_url} target="_blank">
              <img
                src={require("../../../assets/icons/whatsapp.png")}
                alt="whatsapp"
                style={{ width: "26px", height: "26px" }}
              />
            </a>
            <a href={data?.telegram_url} target="_blank">
              <img
                src={require("../../../assets/icons/telegram.png")}
                alt="telegram"
                style={{ width: "26px", height: "26px" }}
              />
            </a>
          </div>

          <div className="middle_box">
            <img
              src={require("../../../assets/icons/certificate.png")}
              alt=""
              style={{ width: "20px", height: "25px", marginRight: "10px" }}
            />
            <a
              href={data?.policy_file_url}
              target="_blank"
              style={{ color: "#fff" }}
            >
              ПОЛИТИКА
              <br />
              КОНФИДЕНЦИАЛЬНОСТИ
            </a>
          </div>
        </div>
        <div className="info_box">
          <a
            href={"mailto:" + data?.footer_email}
            style={{
              textTransform: "uppercase",
              userSelect: "text",
              color: "white",
            }}
          >
            {data?.footer_email}
          </a>
          <h4>{data?.footer_phone}</h4>
          <h4 style={{ textTransform: "uppercase" }}>{data?.footer_address}</h4>
        </div>
        <hr color="grey" />
        <p style={{ color: "#fff", marginTop: "10px" }}>
          Информация, содержащаяся на этом сайте, не является рекламой, так как
          представляет собой каталог для ограниченного круга лиц, —
          совершеннолетних потребителей табачной продукции, для предоставления
          им достоверной информации об основных потребительских свойствах и
          качественных характеристик товаров, ассортименте товаров, правилах их
          использования (п. п. 1,2 ст. 10 Закона «О защите прав Потребителя»).
        </p>
      </footer>
    </React.Fragment>
  );
};
