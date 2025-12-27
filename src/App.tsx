import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent.tsx";
import RegisterComponent from "./components/RegisterComponent.tsx";
import LoginComponent from "./components/LoginComponent.tsx";
import ProductComponent from "./components/ProductComponent.tsx";
import CartViewComponent from "./components/CartViewComponent.tsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/products" element={<ProductComponent />}></Route>
          <Route path="/cart-view" element={<CartViewComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}
