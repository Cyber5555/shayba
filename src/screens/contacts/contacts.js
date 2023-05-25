import React, { useEffect, useState } from "react";
import { Map, Placemark, RouteButton, YMaps } from "@pbe/react-yandex-maps";
import "./contacts.css";
import {
  InputContainer,
  PhoneInputFunc,
} from "../../components/inputContainer/inputContainer";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { feedbackRequest } from "../../store/authReducer/feedbackSlice";

export const Contacts = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    name: "",
  });
  const state = useSelector((state) => state);
  const {
    loading,
    name_error,
    address_error,
    phone_error,
    email_error,
    success_feedback,
  } = state.feedbackSlice;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (success_feedback) {
      setFormData({
        address: "",
        email: "",
        name: "",
      });
      setPhone("");
    }
  }, [success_feedback]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      feedbackRequest({
        address: formData.address,
        phone: phone,
        email: formData.email,
        name: formData.name,
      })
    );
  };
  return (
    <div className={"map_parent"}>
      <YMaps>
        <Map
          defaultState={{ center: [53.250226, 34.403722], zoom: 11 }}
          className={"map_view"}
        >
          <RouteButton options={{ float: "right" }} />
          <Placemark
            geometry={[53.260726, 34.339692]}
            options={{ iconColor: "red" }}
          />
          <Placemark
            geometry={[53.215844, 34.406985]}
            options={{ iconColor: "red" }}
          />
          <Placemark
            geometry={[53.255878, 34.44545]}
            options={{ iconColor: "red" }}
          />
        </Map>
      </YMaps>
      <form
        className="feedback_form"
        onSubmit={handleSubmit}
        autoCapitalize="off"
      >
        <h2 style={{ textTransform: "uppercase", marginBottom: 10 }}>
          Обратная связь
        </h2>
        <InputContainer
          id={formData.name}
          inputTitle={"ИМЯ *"}
          inputType={"text"}
          TitleStyle={{
            color: "black",
          }}
          inputStyle={{
            background: "#E6E6E6",
            border: "1px solid black",
            caretColor: "black",
            color: "black",
          }}
          name="name"
          onChange={handleInputChange}
          inputValue={formData.name}
          error={name_error}
        />

        <InputContainer
          id={formData.email}
          inputTitle={"E-MAIL *"}
          inputType={"text"}
          TitleStyle={{
            color: "black",
          }}
          inputStyle={{
            background: "#E6E6E6",
            border: "1px solid black",
            caretColor: "black",
            color: "black",
          }}
          name="email"
          onChange={handleInputChange}
          inputValue={formData.email}
          error={email_error}
        />

        <PhoneInputFunc
          inputTitle={"ТЕЛЕФОН *"}
          phoneValue={phone}
          onChange={(e) => setPhone(e)}
          TitleStyle={{
            color: "black",
          }}
          inputStyle={{
            width: "100%",
            height: 40,
            background: "#E6E6E6",
            border: "1px solid black",
            borderRadius: 10,
            fontSize: 16,
            color: "black",
            marginTop: 8,
            caretColor: "black",
            fontFamily: "Regular",
          }}
          dropdownStyle={{
            top: "100%",
            overflow: "scroll",
            height: 300,
            left: 0,
            zIndex: 10,
            background: "white",
          }}
          error={phone_error}
        />

        <InputContainer
          id={formData.address}
          inputTitle={"Адрес *"}
          inputType={"address"}
          minimum={6}
          TitleStyle={{
            color: "black",
          }}
          inputStyle={{
            background: "#E6E6E6",
            border: "1px solid black",
            caretColor: "black",
            color: "black",
          }}
          name="address"
          onChange={handleInputChange}
          inputValue={formData.address}
          error={address_error}
        />

        <div className="feedback_button_parent">
          <SyncLoader
            color={"black"}
            loading={loading}
            cssOverride={{
              borderColor: "black",
            }}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {!loading && (
            <button type="submit" className="feedback_button">
              Отправить
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
