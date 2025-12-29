import {useContext, useEffect, useState} from "react";
import type { CartItem } from "../model/CartItem.ts";
import { CartContext } from "../context/CartContext.ts";
import {fetchAllProducts} from "../service/ProductService.ts";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getRoleName, isLoggedIn } from "../service/AuthService.ts";
import { useNavigate } from "react-router-dom";
import type {ProductDto} from "../model/ProductDto.ts";

export default function ProductComponent() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const { addItem } = useContext(CartContext);
    const [addedQuantity, setAddedQuantity] = useState<Record<number, number>>({});
    const userRole = getRoleName();
    const isCustomer = userRole === "ROLE_CUSTOMER";
    const navigator = useNavigate();
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

    return (
        <div className="container mx-auto mt-10 mb-10">
            <h1 className="text-3xl text-[#C21E56] font-bold text-center mb-8">
                All Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8
            px-4 sm:px-6 md:px-10 lg:px-16">
                {products.map(item => (
                    <div
                        key={item.id}
                        className="card relative w-full rounded-xl flex flex-col items-center p-6
                        border-2 border-[#C21E56] shadow-md bg-white"
                    >
                        <div className="w-full">
                            <img
                                src={item.image ?? "/images/no-image.png"}
                                alt={item.name}
                                className="rounded-xl w-full h-48 object-contain"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-center mb-5 text-[#C21E56]">
                            {item.name}
                        </h2>

                        <div className="flex flex-wrap flex-col sm:flex-row items-center sm:justify-around gap-2 w-full mb-2">

                            <p className="text-lg font-bold text-[#C21E56]">
                                {item.price.toLocaleString() ?? 0} MMK
                            </p>

                            <button
                                className="text-white bg-[#C21E56] border-2 border-transparent
                                rounded whitespace-nowrap transition duration-300 cursor-pointer
                                hover:bg-transparent hover:border-[#C21E56] hover:text-[#C21E56]
                                w-full sm:w-auto px-3 py-2"
                                onClick={() => {
                                    if (!isCustomer || !loggedIn) {
                                        navigator("/login", {
                                            state: { infoMessage: "Please login to purchase flowers." }
                                        });
                                        return;
                                    }
                                    addedQuantityHandler(item);
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>

                        {addedQuantity[item.id] > 0 && loggedIn && isCustomer && (
                            <div className="absolute flex items-center bottom-0 text-[#C21E56] px-4 py-2 rounded text-md">
                                <IoMdCheckmarkCircleOutline size={24} className="mr-1" />
                                Added {addedQuantity[item.id]} product(s)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
