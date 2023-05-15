import { Link, NavLink } from "react-router-dom";

export const ProfileBar = () => {
  return (
    <div className={"profile_bar_parent"}>
      <h2>МОЙ КАБИНЕТ</h2>
      <ul className={"profile_navbar"}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "profile_navbar_links active" : "profile_navbar_links"
          }
          to={"/profile"}
        >
          МОЙ КАБИНЕТ
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "profile_navbar_links active" : "profile_navbar_links"
          }
          to={"/change_password"}
        >
          СМЕНИТЬ ПАРОЛЬ
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "profile_navbar_links active" : "profile_navbar_links"
          }
          to={"/history"}
        >
          ИСТОРИЯ ЗАКАЗОВ
        </NavLink>
      </ul>
    </div>
  );
};
