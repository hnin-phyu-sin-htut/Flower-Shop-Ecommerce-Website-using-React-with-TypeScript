import { useContext } from "react";
import { CartContext } from "../context/CartContext.ts";

export default function CartViewComponent() {
    const { items } = useContext(CartContext);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-lighter text-[#C21E56] mt-4 mb-8">
                Your Shopping Cart
            </h1>

            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
                <table className="min-w-full">
                    <thead className="bg-[#C21E56] text-white text-md">
                    <tr>
                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="px-6 py-4 text-left">Image</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Quantity</th>
                        <th className="px-6 py-4 text-left">SubTotal</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y">
                    {items.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-12 text-center text-gray-400 text-lg">
                                Your cart is empty!
                            </td>
                        </tr>
                    )}

                    {items.map(item => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-gray-600">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-xl object-contain border"/>
                            </td>

                            <td className="px-6 py-4">
                              <span className="px-4 py-1 rounded-full bg-[#F4C2C2] text-[#C21E56] font-semibold text-sm">
                                {item.name}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                                ${item.price.toFixed(2)}
                            </td>

                            <td className="px-6 py-4">
                              <span className="px-4 py-1 rounded-full bg-[#F4C2C2] text-[#C21E56] font-semibold text-sm">
                                {item.quantity}
                              </span>
                            </td>

                            <td className="px-6 py-4 font-semibold text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
