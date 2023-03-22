import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screens/homeScreen/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./screens/fixElements/header/Header";
import { Navbar } from "./screens/fixElements/navBar/Navbar";
import { Footer } from "./screens/fixElements/footer/Footer";
import { Catalog } from "./screens/catalog/catalog";
import { FilterCatalog } from "./screens/filterCatalog/filterCatalog";
import { SingleProduct } from "./screens/singleProduct/SingleProduct";
import { Basket } from "./screens/basket/basket";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/filter-catalog" element={<FilterCatalog />} />
          <Route path="/single-catalog" element={<SingleProduct />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
