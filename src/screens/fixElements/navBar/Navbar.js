import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar_ul">
        <li>
          <Link to={"/filter-catalog"} className="navbar_links">
            КАТАЛОГ
          </Link>
        </li>
        <li>
          <Link to={"/history"} className="navbar_links">
            ИСТОРИЯ
          </Link>
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
