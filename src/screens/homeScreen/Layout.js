import React from "react";
import { Slider } from "../../components/slider/slider";
import "./layout.css";

import { VariousProducts } from "../../components/variousProducts/VariousProducts";

import { PurchaseField } from "../../components/purchaseField/PurchaseField";
import { RenderPurchase } from "../../components/purchaseField/renderPurchase";
import { data } from "./../../globalTestData";
import { BottomBar } from "./../fixElements/bottomBar/bottomBar";
import { GetAgeModal } from "./../../components/getAgeModal/GetAgeModal";
import { RegisterPopup } from "../../components/globalReg/globalRegPopup";
import { VerifyCode } from "../../components/globalReg/verifyCode";
import { ForgotPassword } from "../../components/globalReg/forgotPassword";
import { LoginPopup } from "../../components/globalReg/loginPopup";
import { PhoneForgot } from "../../components/globalReg/phoneForgot";

export default function Layout() {
  return (
    <React.Fragment>
      <main className="layout_home_screen">
        <GetAgeModal />
        <RegisterPopup />
        <VerifyCode />
        <ForgotPassword />
        <LoginPopup />
        <PhoneForgot />
        <Slider />
        <VariousProducts />
        <PurchaseField>
          <RenderPurchase data={data} />
        </PurchaseField>
      </main>
      <BottomBar />
    </React.Fragment>
  );
}
