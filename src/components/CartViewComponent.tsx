import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import type { OrderInfo } from "../model/OrderInfo";
import { getToken } from "../service/AuthService";
import { checkout } from "../service/ProductService";

export default function CartViewComponent() {
    const cart = useContext(CartContext);
    const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();

    if (!cart) return null;
    const { items, increaseQuantity, decreaseQuantity } = cart;

    const itemsWithSubTotal = items.map(item => ({
        ...item,
        subTotal: Number(item.price ?? 0) * item.quantity
    }));

    const totalPrice = itemsWithSubTotal.reduce((sum, item) => sum + item.subTotal, 0);

    const checkoutHandler = () => {
        if (items.length === 0) return;

        setError("");

        setOrderInfo({
            subTotal: 0,
            id: Date.now(),
            orderNumber: `TEMP-${Date.now()}`,
            orderDate: new Date().toISOString(),
            products: itemsWithSubTotal.map(item => ({
                id: item.id,
                productName: item.name,
                quantity: item.quantity,
                subTotal: item.subTotal
            })),
            totalPrice
        });
    };

    const confirmOrder = async () => {
        const token = getToken();
        if (!token) {
            setError("You must be logged in to confirm order.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await checkout(
                itemsWithSubTotal.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                token
            );

            if (response.data?.products?.length) {
                setOrderInfo({
                    ...response.data,
                    orderNumber:
                        response.data.orderNumber ??
                        response.data.order_number ??
                        response.data.id,
                });
                setConfirmed(true);
                setTimeout(() => {
                    navigate("/");
                    cart.clearCart();
                }, 5000);
            } else {
                setError("Failed to save order.");
            }
        } catch (err) {
            console.error("Confirm order failed!", err);
            setError("Could not confirm order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#C21E56] mb-8 text-center">
                Your Shopping Cart
            </h1>

            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

            {/* Cart Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#C21E56] text-white">
                    <tr className="text-center">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {itemsWithSubTotal.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-10 text-center text-gray-400 text-lg">
                                Your cart is empty!
                            </td>
                        </tr>
                    ) : (
                        itemsWithSubTotal.map((item, index) => (
                            <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                                <td className="text-center text-[#C21E56] py-2">{item.id}</td>
                                <td className="flex justify-center py-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain border"
                                    />
                                </td>
                                <td className="text-center py-2">
                                        <span className="px-3 py-1 rounded-full bg-[#F4C2C2] text-[#C21E56] font-semibold text-sm sm:text-base">
                                            {item.name}
                                        </span>
                                </td>
                                <td className="text-center py-2">
                                        <span className="px-3 py-1 text-[#C21E56] font-semibold text-sm sm:text-base">
                                            ${item.price.toFixed(2)}
                                        </span>
                                </td>
                                <td className="py-2">
                                    <div className="flex justify-center gap-3 items-center">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="w-7 h-7 rounded-full bg-[#F4C2C2] text-[#C21E56] text-lg flex items-center justify-center cursor-pointer"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-1 rounded-full bg-[#F4C2C2] text-[#C21E56] font-semibold">
                                                {item.quantity}
                                            </span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="w-7 h-7 rounded-full bg-[#F4C2C2] text-[#C21E56] text-lg flex items-center justify-center cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="text-center font-semibold py-2 text-[#C21E56]">
                                    ${item.subTotal.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    )}
                    {itemsWithSubTotal.length > 0 && (
                        <tr className="font-bold border-t">
                            <td colSpan={5} className="px-4 py-2 text-right text-[#C21E56]">
                                Total
                            </td>
                            <td className="px-4 py-2 text-center text-[#C21E56]">
                                ${totalPrice.toFixed(2)}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Checkout Button */}
            {items.length > 0 && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={checkoutHandler}
                        className="mt-4 px-6 py-3 font-semibold rounded-full shadow-lg transition cursor-pointer bg-[#C21E56] text-white hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]"
                    >
                        Checkout
                    </button>
                </div>
            )}

            {/* Order Summary */}
            {orderInfo && (
                <div className="mt-10 p-6 bg-[#C21E56] rounded-xl shadow-lg text-white">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Order Summary</h2>

                    <div className="text-center mb-4">
                        <p>Order ID: {orderInfo.id}</p>
                        <p>Order Number: {orderInfo.orderNumber}</p>
                        <p>Date: {new Date(orderInfo.orderDate).toLocaleString()}</p>
                    </div>

                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-auto bg-white rounded-lg">
                            <thead className="bg-[#C21E56] text-white">
                            <tr className="text-center">
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">SubTotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itemsWithSubTotal.map((p, idx) => (
                                <tr key={p.id ?? idx} className="text-center hover:bg-gray-50">
                                    <td className="px-4 py-2 text-[#C21E56]">{p.name}</td>
                                    <td className="px-4 py-2 text-[#C21E56]">{p.quantity}</td>
                                    <td className="px-4 py-2 text-[#C21E56]">${p.subTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="font-bold border-t">
                                <td colSpan={2} className="px-4 py-2 text-right text-[#C21E56]">
                                    Total Amount
                                </td>
                                <td className="px-4 py-2 text-center text-[#C21E56]">
                                    ${totalPrice.toFixed(2)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Confirm Order Button */}
                    {!confirmed && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={confirmOrder}
                                disabled={loading}
                                className="px-6 py-3 font-semibold rounded-full bg-white text-[#C21E56] shadow-lg transition cursor-pointer hover:bg-[#C21E56] hover:text-white hover:border hover:border-white"
                            >
                                {loading ? "Confirming..." : "Confirm Order"}
                            </button>
                        </div>
                    )}

                    {confirmed && (
                        <p className="text-center text-white font-semibold text-lg mt-4">
                            Your order has been placed successfully! Redirecting to home...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
