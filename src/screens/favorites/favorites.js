import React, { useEffect } from "react";
import "./favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteProducts } from "../../components/favoriteProducts/favoriteProducts";
import getMyFavoriteSlice, {
  getMyFavoriteRequest,
} from "../../store/authReducer/getMyFavoriteSlice";

export const Favorites = ({}) => {
  const state = useSelector((state) => state);
  const { my_favorites } = state.getMyFavoriteSlice;
  const { added_remove_favorite } = state.addOrDelateFavoritesSlice;
  const dispatch = useDispatch();
  console.log(my_favorites);
  useEffect(() => {
    dispatch(getMyFavoriteRequest({}));
  }, []);


  return (
    <main className="full_basket_layout">
      <div className="basket_header">
        <h2>ИЗБРАННОЕ</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>ИЗБРАННОЕ</li>
        </ul>
      </div>
      <div className="full_text_container"></div>

      {my_favorites.map((item, index) => (
        <FavoriteProducts key={index} item={item} />
      ))}
    </main>
  );
};
