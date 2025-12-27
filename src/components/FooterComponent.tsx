import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <>
      <footer className="bg-[#F4C2C2] text-[#C21E56] p-10 flex flex-col items-center gap-6">

        <nav className="grid grid-flow-col gap-6 text-lg">
          <div className="border-b-2 border-transparent hover:border-b-[#C21E56] duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </div>
          <div className="border-b-2 border-transparent hover:border-b-[#C21E56] duration-300 cursor-pointer">
            <Link to="/products">Products</Link>
          </div>
          <div className="border-b-2 border-transparent hover:border-b-[#C21E56] duration-300 cursor-pointer">
            <Link to="/services">Services</Link>
          </div>
          <div className="border-b-2 border-transparent hover:border-b-[#C21E56] duration-300 cursor-pointer">
            <Link to="/about">About</Link>
          </div>
          <div className="border-b-2 border-transparent hover:border-b-[#C21E56] duration-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <nav>
          <div className="grid grid-flow-col gap-6 text-2xl">
            <FaFacebook className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaYoutube className="cursor-pointer hover:scale-110 transition" />
            <FaTiktok className="cursor-pointer hover:scale-110 transition" />
          </div>
        </nav>

        <p className="text-lg">
          Copyright &copy; {new Date().getFullYear()} - All rights reserved.
        </p>

      </footer>
    </>
  )
}
