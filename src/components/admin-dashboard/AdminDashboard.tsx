import { useState } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import { FiBox, FiTag, FiUsers, FiLogOut } from "react-icons/fi";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import CustomerManagement from "./CustomerManagement";
import {logout} from "../../service/AuthService.ts";

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate("/login");
        window.location.reload();
    }
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "categories"
    );

    const tabs = [
        { id: "categories", label: "Flower Categories", icon: FiTag },
        { id: "products", label: "Flowers", icon: FiBox },
        { id: "customers", label: "Customers", icon: FiUsers },
    ];

    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label;

    return (
        <div className="min-h-screen flex bg-[#F4C2C2]">
            <aside className="w-64 bg-white border-r shadow-lg">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-[#C21E56]">
                        Admin Dashboard
                    </h1>
                </div>

                <nav className="p-4 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition 
                                cursor-pointer font-medium
                                ${
                                    activeTab === tab.id
                                        ? "bg-[#C21E56] text-white shadow-md"
                                        : "text-gray-800 hover:bg-[#C21E56] hover:text-white"
                                }`}>
                                <Icon className="text-lg" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b px-6 py-6 flex justify-between items-center shadow-sm">
                    <h2 className="text-2xl font-semibold text-[#C21E56]">
                        {activeTabLabel}
                    </h2>

                    <button onClick={logoutHandler} className="flex items-center gap-2 text-lg text-[#C21E56] cursor-pointer
                     hover:text-[#a81b4b] transition-colors">
                        <FiLogOut />
                        Logout
                    </button>
                </header>

                <main className="p-6">
                    <div className="bg-white rounded-xl shadow p-6 min-h-[70vh]">
                        {activeTab === "categories" && <CategoryManagement />}
                        {activeTab === "products" && <ProductManagement />}
                        {activeTab === "customers" && <CustomerManagement />}
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AdminDashboard;
