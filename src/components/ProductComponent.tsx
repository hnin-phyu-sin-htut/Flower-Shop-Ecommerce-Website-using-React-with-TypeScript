import { useContext, useEffect, useState } from "react";
import type { CartItem } from "../model/CartItem.ts";
import { CartContext } from "../context/CartContext.ts";
import { fetchAllProducts } from "../service/ProductService.ts";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getRoleName, isLoggedIn } from "../service/AuthService.ts";
import { useNavigate } from "react-router-dom";
import type { ProductDto } from "../model/ProductDto.ts";

const categories = [
    "All",
    "Best Sellers",
    "Bouquets",
    "Roses",
    "Seasonal Flowers",
    "Fresh Flowers",
    "Dried Flowers",
    "Birthday Flowers",
    "Anniversary",
    "Valentine’s Day",
    "Mother’s Day",
    "Wedding Flowers",
    "Sympathy",
    "Congratulations",
    "Wildflower"
];

export default function ProductComponent() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const { addItem } = useContext(CartContext);
    const [addedQuantity, setAddedQuantity] = useState<Record<number, number>>({});
    const navigator = useNavigate();

    const userRole = getRoleName();
    const isCustomer = userRole === "ROLE_CUSTOMER";
    const loggedIn = isLoggedIn();

    useEffect(() => {
        fetchAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    navigator("/login");
                }
            });
    }, [navigator]);

    const addedQuantityHandler = (item: CartItem) => {
        addItem(item);
        setAddedQuantity(prev => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1,
        }));

        setTimeout(() => {
            setAddedQuantity(prev => ({
                ...prev,
                [item.id]: 0,
            }));
        }, 3000);
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || p.categoryName === activeCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto mt-10 mb-16 px-4">
            <h1 className="text-3xl font-bold text-center text-[#C21E56] mb-6">
                Flowers Collection
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search flowers..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full max-w-xl px-4 py-3 rounded-full border-2 border-[#C21E56]
                    focus:outline-none focus:ring-2 focus:ring-[#C21E56] text-black"/>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap border transition
                        ${
                            activeCategory === cat
                                ? "bg-[#C21E56] text-white border-[#C21E56]"
                                : "bg-white text-[#C21E56] border-[#C21E56] hover:bg-[#C21E56] hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(item => (
                    <div
                        key={item.id}
                        className="relative rounded-xl border-2 border-[#C21E56]
                        shadow-md bg-white p-6 flex flex-col items-center">
                        <img
                            src={item.image ? `http://localhost:8080${item.image}` : "/images/no-images.png"}
                            alt={item.name}
                            className="w-full h-48 object-contain rounded-xl mb-4"/>

                        <h2 className="text-xl font-bold text-[#C21E56] text-center mb-2">
                            {item.name}
                        </h2>

                        <p className="text-lg font-bold text-[#C21E56] mb-4">
                            {(item.price ?? 0).toLocaleString()} MMK
                        </p>

                        <button
                            className="w-full bg-[#C21E56] text-white py-2 rounded
                            transition hover:bg-transparent hover:text-[#C21E56] hover:border-2 hover:border-[#C21E56]"
                            onClick={() => {
                                if (!isCustomer || !loggedIn) {
                                    navigator("/login", {
                                        state: { infoMessage: "Please login to purchase flowers." },
                                    });
                                    return;
                                }
                                addedQuantityHandler(item);
                            }}>
                            Add To Cart
                        </button>

                        {addedQuantity[item.id] > 0 && loggedIn && isCustomer && (
                            <div className="absolute bottom-2 flex items-center text-[#C21E56] text-sm">
                                <IoMdCheckmarkCircleOutline size={20} className="mr-1" />
                                Added {addedQuantity[item.id]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}