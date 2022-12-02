import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import AddToping from "./pages/AddToping";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import IncomeTransaction from "./pages/IncomeTransaction";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/admin" element={<IncomeTransaction />} />
          <Route exact path="/product/:id" element={<DetailProduct />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/add-toping" element={<AddToping />} />
          <Route exact path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
