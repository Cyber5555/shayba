import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import { Context } from "../../../context/Context";

export function Navbar() {
  const [token, setToken] = useState(null);
  const value = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar_ul">
        <li>
          <Link to={"/filter-catalog"} className="navbar_links">
            КАТАЛОГ
          </Link>
        </li>
        <li>
          {token ? (
            <Link to={"/single/history"} className="navbar_links">
              ИСТОРИЯ
            </Link>
          ) : (
            <Link
              // to={"/history"}
              className="navbar_links"
              onClick={() => value.setLoginPopup(true)}
            >
              ИСТОРИЯ
            </Link>
          )}
        </li>
        {/*<li>*/}
        {/*  <Link to={"/service"} className="navbar_links">*/}
        {/*    КАК ПОЛУЧИТЬ*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/* <li>
          <Link to={"/feedback"} className="navbar_links">
            ОПТ
          </Link>
        </li> */}
        <li>
          <Link to={"/contact"} className="navbar_links">
            КОНТАКТЫ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
