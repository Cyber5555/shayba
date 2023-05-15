import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "../profile/profile.module.css";
import { InputContainer } from "../../../components/inputContainer/inputContainer";
import { SyncLoader } from "react-spinners";
import {changePasswordRequest} from "../../../store/authReducer/cangePasswordSlice";

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userInfo } = state.authUserInfo;
  const {
    old_password_error,
    password_error,
    password_confirmation_error,
    loading,
  } = state.cangePasswordSlice;
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // grum en api n
    dispatch(changePasswordRequest(formData));
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
        id={formData.old_password}
        inputTitle={"старый пароль*"}
        inputType={"password"}
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
        name="old_password"
        onChange={handleInputChange}
        inputValue={formData.old_password}
        error={old_password_error}
      />

      <InputContainer
        inputTitle={"НОВЫЙ ПАРОЛЬ*"}
        inputType={"password"}
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
        name="password"
        onChange={handleInputChange}
        inputValue={formData.password}
        error={password_error}
      />

      <InputContainer
        inputTitle={"НОВЫЙ ПАРОЛЬ ЕЩЕ РАЗ*"}
        inputType={"password"}
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
        name="password_confirmation"
        onChange={handleInputChange}
        inputValue={formData.password_confirmation}
        error={password_confirmation_error}
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
