import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {getRoleName, isLoggedIn, logout} from "../service/AuthService.ts";
import {FaShoppingCart} from "react-icons/fa";
import {CartContext} from "../context/CartContext.ts";

export default function NavbarComponent() {
  const [open, setOpen] = useState(false);

  const isLogin = isLoggedIn();
  const userRole = getRoleName();
  const isCustomer = userRole === "ROLE_CUSTOMER";
  const { items } = useContext(CartContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
    window.location.reload();
  }

  return (
      <header className="bg-[#F4C2C2] w-full sticky top-0 z-50">
        <nav className="max-w-9xl flex items-center justify-between px-4 sm:px-6 lg:px-16 py-4">
          <div style={{ fontFamily: "Times New Roman, serif" }} className="text-[#C21E56] flex items-baseline gap-4 mx-4">
            <Link to="/" className="flex">
              <span className="text-5xl sm:text-6xl font-bold pb-4">S</span>
              <div className="flex items-center">
                <span className="text-2xl sm:text-3xl">now</span>
                <span className="text-3xl sm:text-4xl font-bold">;</span>
                <span className="text-2xl sm:text-3xl">Flowery</span>
              </div>
            </Link>
          </div>

          <button
              className="lg:hidden flex flex-col justify-between w-8 h-6 cursor-pointer"
              onClick={() => setOpen(!open)}>
            <span className="block h-0.5 bg-[#C21E56] rounded"></span>
            <span className="block h-0.5 bg-[#C21E56] rounded"></span>
            <span className="block h-0.5 bg-[#C21E56] rounded"></span>
          </button>

          <ul className={`
          flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 text-lg w-full lg:w-auto lg:flex lg:static 
          absolute left-0 bg-[#F4C2C2] lg:bg-transparent transition-all duration-300 
          ${open ? "top-20 opacity-100" : "top-[-500px] opacity-0 lg:opacity-100"}
          `}>
            <li className="lg:text-left text-center">
              <Link to="/">
                <span className="text-[#C21E56] border-b-2 border-transparent hover:border-b-[#C21E56] duration-300">
                  Home
                </span>
              </Link>
            </li>

            <li className="lg:text-left text-center">
              <Link to="/products">
                <span className="text-[#C21E56] border-b-2 border-transparent hover:border-b-[#C21E56] duration-300">
                  Products
                </span>
              </Link>
            </li>

            <li className="lg:text-left text-center">
              <Link to="/services">
                <span className="text-[#C21E56] border-b-2 border-transparent hover:border-b-[#C21E56] duration-300">
                  Services
                </span>
              </Link>
            </li>

            <li className="lg:text-left text-center">
              <Link to="/about">
                <span className="text-[#C21E56] border-b-2 border-transparent hover:border-b-[#C21E56] duration-300">
                  About
                </span>
              </Link>
            </li>

            <li className="lg:text-left text-center">
              <Link to="/contact">
                <span className="text-[#C21E56] border-b-2 border-transparent hover:border-b-[#C21E56] duration-300">
                  Contact
                </span>
              </Link>
            </li>

            {
                !isLogin && (
                    <li className="text-center lg:text-left">
                      <Link to="/login">
                        <span className="inline-block text-white bg-[#C21E56] border-2 border-transparent px-6 py-2 rounded
                          transition duration-300 hover:bg-transparent hover:border-[#C21E56] hover:text-[#C21E56]">
                          Login
                        </span>
                      </Link>
                    </li>
                )
            }

            {
              isLogin && isCustomer && (
                <li className="flex justify-center lg:justify-start">
                  <Link to="/cart-view">
                    <span className="flex items-center justify-center w-15 h-16 text-[#C21E56] relative">
                      <FaShoppingCart size={50} className="pe-3 ms-2" />
                      <span className="text-xl absolute top-0 right-0">
                        {items.length}
                      </span>
                    </span>
                  </Link>
                </li>
                )
            }

            {
                isLogin && (
                    <li className="text-center lg:text-left">
                      <Link to="/logout">
                        <span onClick={logoutHandler} className="inline-block text-white bg-[#C21E56] border-2 border-transparent px-6 py-2 rounded
                          transition duration-300 hover:bg-transparent hover:border-[#C21E56] hover:text-[#C21E56]">
                          Logout
                        </span>
                      </Link>
                    </li>
                )
            }
          </ul>
        </nav>
      </header>
  );
}
