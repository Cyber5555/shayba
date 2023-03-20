import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screens/homeScreen/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./screens/fixElements/header/Header";
import { Navbar } from "./screens/fixElements/navBar/Navbar";
import { Footer } from "./screens/fixElements/footer/Footer";
import { Catalog } from "./screens/catalog/catalog";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
