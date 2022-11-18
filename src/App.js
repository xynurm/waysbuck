import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";



import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DetailProduct from "./pages/DetailProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AddToping from "./pages/AddToping";
import AddProduct from "./pages/AddProduct";
function App() {
  return (
    <>
     
     <Router>
     <Header/>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/detail/:id" element={<DetailProduct/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/add-toping" element={<AddToping />}/>
        <Route exact path="/add-product" element={<AddProduct />}/>
      </Routes>
     </Router>
     

      
</>
  );
}

export default App;
