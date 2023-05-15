import { InputContainer } from "../../../components/inputContainer/inputContainer";
import styles from "./profile.module.css";
import { SyncLoader } from "react-spinners";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEmailRequest } from "../../../store/authReducer/changeEmailSlice";
import { changeFIORequest } from "../../../store/authReducer/changeFIOSlice";
import { Context } from "../../../context/Context";

export const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const value = useContext(Context);
  const { userInfo } = state.authUserInfo;
  const { email_error, loading, success } = state.changeEmailSlice;
  const { name_error, success_fio } = state.changeFIOSlice;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    setFormData({ email: userInfo?.email, name: userInfo?.name });
  }, [userInfo]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (success) {
      value.setEmailCode(true);
    }
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // grum en api n
    dispatch(
      changeEmailRequest({
        email: formData.email,
      })
    );
    dispatch(
      changeFIORequest({
        name: formData.name,
      })
    );
  };

  // useEffect(() => {
  //     if (success) {
  //         value.setNewPassword(false);
  //         localStorage.removeItem("phone");
  //         localStorage.removeItem("phone_verify");
  //         setFormData({
  //             password: "",
  //             password_confirmation: "",
  //         });
  //     }
  // }, [success]);

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <InputContainer
        id={formData.name}
        inputTitle={"Ф. И. О.*"}
        inputType={"text"}
        minimum={6}
        inputParentStyle={{
          width: "60%",
        }}
        TitleStyle={{
          color: "black",
        }}
        inputStyle={{
          background: "#0000000a",
          border: "1px solid white",
          caretColor: "black",
          color: "black",
        }}
        name="name"
        onChange={handleInputChange}
        inputValue={formData.name}
        error={name_error}
      />

      <InputContainer
        inputTitle={"E-MAIL*"}
        inputType={"email"}
        minimum={6}
        TitleStyle={{
          color: "black",
        }}
        inputParentStyle={{
          width: "60%",
        }}
        inputStyle={{
          background: "#0000000a",
          border: "1px solid white",
          caretColor: "black",
          color: "black",
        }}
        name="email"
        onChange={handleInputChange}
        inputValue={formData.email}
        error={email_error}
      />

      <div className={styles.Button_Parent}>
        <SyncLoader
          color={"white"}
          loading={loading}
          cssOverride={{
            borderColor: "black",
            width: 262,
            border: "1px solid",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            background: "black",
            height: 34,
            borderRadius: 5,
          }}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {!loading && (
          <button type="submit" className={styles.Button}>
            СОХРАНИТЬ ИЗМЕНЕНИЯ
          </button>
        )}
      </div>
    </form>
  );
};
