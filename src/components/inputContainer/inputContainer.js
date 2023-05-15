import React from "react";
import styles from "./inputContainer.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export const InputContainer = ({
  inputType,
  inputTitle,
  minimum,
  maximum,
  maxLength,
  onChange,
  inputStyle,
  TitleStyle,
  inputParentStyle,
  inputValue,
  autoFocus,
  name,
  error,
  id,
}) => {
  return (
    <div style={inputParentStyle} className={styles.InputParent}>
      <label htmlFor={id} style={TitleStyle} className={styles.InputTitle}>
        {inputTitle}
      </label>
      <input
        id={id}
        name={name}
        type={inputType}
        min={minimum}
        max={maximum}
        maxLength={maxLength}
        onChange={onChange}
        className={styles.Input}
        style={inputStyle}
        value={inputValue}
        autoFocus={autoFocus}
      />
      <p className={styles.ErrorMessage}>{error}</p>
    </div>
  );
};

export const TextArea = ({
  inputTitle,
  maxLength,
  onChange,
  TitleStyle,
  inputValue,
}) => {
  return (
    <div>
      <h3 style={TitleStyle} className={styles.InputTitle}>
        {inputTitle}
      </h3>
      <textarea
        className={styles.TextArea}
        maxLength={maxLength}
        onChange={onChange}
        value={inputValue}
      />
    </div>
  );
};

export const PhoneInputFunc = ({
  phoneValue,
  inputTitle,
  TitleStyle,
  inputStyle,
  dropdownStyle,
  onChange,
  error,
}) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={TitleStyle} className={styles.InputTitle}>
        {inputTitle}
      </label>
      <PhoneInput
        country={"ru"}
        value={phoneValue}
        onChange={onChange}
        inputStyle={inputStyle}
        dropdownStyle={dropdownStyle}
        containerStyle={{
          width: "100%",
          position: "relative",
          marginTop: 10,
        }}
      />
      <p className={styles.ErrorMessage}>{error}</p>
    </div>
  );
};

export const Search = ({ onChange, value, margin }) => {
  const navigate = useNavigate();
  document.body.onkeydown = (e) => {
    if (e.key === "Enter") {
      navigate("/filter-catalog");
    }
  };
  return (
    <div className={styles.SearchParent} style={{ margin: margin }}>
      <input
        type="search"
        name="search"
        className={styles.SearchOnHeader}
        placeholder="Поиск"
        onChange={onChange}
        value={value}
      />
      <Link to={"/filter-catalog"}>
        <AiOutlineSearch color={"grey"} className={styles.SearchIcon} />
      </Link>
    </div>
  );
};
