import { type FormEvent, useEffect, useState } from "react";
import type { CategoryDto } from "../../model/CategoryDto.ts";
import { getAllCategories, createProduct } from "../../service/ProductService.ts";

export default function ProductManagement() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState<File | "">("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        getAllCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    const createProductHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !price || !quantity || !categoryName || !image) {
            setMessage({ type: "error", text: "Please fill all fields." });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("quantity", quantity.toString());
        formData.append("categoryName", categoryName);
        formData.append("image", image);

        try {
            await createProduct(formData);
            setName("");
            setPrice(undefined);
            setQuantity(undefined);
            setCategoryName("");
            setImage("");
            setMessage({ type: "success", text: "Product created successfully!" });
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Failed to create product." });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-[#C21E56] mb-8 text-center">Create Product</h2>

                {message && (
                    <div
                        className={`mb-4 px-4 py-3 rounded-lg ${
                            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={createProductHandler} className="space-y-5">
                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-2">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-2">Price (MMK)</label>
                        <input
                            type="number"
                            value={price ?? ""}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity ?? ""}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm"
                            placeholder="Enter quantity"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-2">Category</label>
                        <select
                            value={categoryName ?? ""}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm bg-white"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-600 mb-2">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] ?? "")}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm bg-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#C21E56] text-white font-semibold rounded-full shadow-lg
                       hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]
                       transition-colors duration-300 cursor-pointer"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
