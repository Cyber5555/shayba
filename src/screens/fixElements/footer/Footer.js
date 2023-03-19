import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <React.Fragment>
      <div className="top_footer">
        <div></div>
      </div>
      <footer>
        <div>
          <div>
            <h2>О НАС</h2>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
            <h4>Текстовый блок о компании в несколько строчек.</h4>
          </div>
          <div className="middle_box">
            <img
              src={require("../../../components/icons/certificate.png")}
              alt=""
              style={{ width: "20px", height: "25px", marginRight: "10px" }}
            />
            <p style={{ color: "#fff" }}>
              ПОЛИТИКА
              <br /> КОНФИДЕНЦИАЛЬНОСТИ
            </p>
          </div>
          <div className="info_box">
            <div>
              <img
                src={require("../../../components/icons/vk.png")}
                alt="vk"
                style={{ width: "26px", height: "26px" }}
              />
              <img
                src={require("../../../components/icons/instagram.png")}
                alt="instagram"
                style={{ width: "26px", height: "26px" }}
              />
              <img
                src={require("../../../components/icons/whatsapp.png")}
                alt="whatsapp"
                style={{ width: "26px", height: "26px" }}
              />
              <img
                src={require("../../../components/icons/telegram.png")}
                alt="telegram"
                style={{ width: "26px", height: "26px" }}
              />
            </div>
            <h4>SHAYBA32@YANDEX.RU</h4>
            <h4>378 (900) 999 88 99</h4>
            <h4>БРЯНСК, КРАХМАЛЕВА, </h4>
          </div>
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
