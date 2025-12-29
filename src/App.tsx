import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent.tsx";
import RegisterComponent from "./components/RegisterComponent.tsx";
import LoginComponent from "./components/LoginComponent.tsx";
import ProductComponent from "./components/ProductComponent.tsx";
import CartViewComponent from "./components/CartViewComponent.tsx";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard.tsx";
import CategoryManagement from "./components/admin-dashboard/CategoryManagement.tsx";
import CustomerManagement from "./components/admin-dashboard/CustomerManagement.tsx";
import AdminLayout from "./AdminLayout.tsx";
import UserLayout from "./UserLayout.tsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/products" element={<ProductComponent />}></Route>
            <Route path="/cart-view" element={<CartViewComponent />}></Route>
          </Route>
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />}></Route>
            <Route path="category-management" element={<CategoryManagement />}></Route>
            <Route path="product-management" element={<ProductComponent />}></Route>
            <Route path="customer-management" element={<CustomerManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
