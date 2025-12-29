import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent.tsx";
import FooterComponent from "./components/FooterComponent.tsx";

const UserLayout = () => {
    return (
        <>
            <NavbarComponent />
            <Outlet />
            <FooterComponent />
        </>
    );
};
export default UserLayout;
