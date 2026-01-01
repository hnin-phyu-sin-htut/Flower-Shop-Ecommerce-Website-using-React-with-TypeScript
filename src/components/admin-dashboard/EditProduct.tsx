import { useEffect, useState } from "react";
import type { ProductDto } from "../../model/ProductDto";
import {fetchAllProducts, editProduct, deleteProductById} from "../../service/ProductService";

export default function EditProduct() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");

    const loadProducts = () => {
        fetchAllProducts()
            .then(res => setProducts(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const openModal = (product: ProductDto) => {
        setSelectedProduct(product);
        setName(product.name);
        setPrice(Number(product.price));
        setImageFile(null);
        setPreview(`http://localhost:8080/api/products/${product.id}/image`);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setPreview(null);
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const submitEdit = () => {
        if (!selectedProduct) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        if (imageFile) formData.append("image", imageFile);

        editProduct(formData, selectedProduct.id)
            .then(() => {
                loadProducts();
                closeModal();
            })
            .catch(console.error);
    };

    const deleteProduct = (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this flower?");
        if (!confirmed) return;

        deleteProductById(id)
            .then(() => {
                setProducts(prev => prev.filter(p => p.id !== id));
            })
            .catch(err => {
                console.error(err);
                alert("Failed to delete flower.!");
            });
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 text-[#C21E56]">
            <h1 className="text-4xl font-bold text-center mb-5">
                Flowers Management
            </h1>

            <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8">
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search by flower name or category..."
                        className="w-full max-w-md px-5 py-3 border-2 rounded-full
                        focus:outline-none focus:ring-2 focus:ring-[#C21E56]"
                    />
                </div>
                <div className="overflow-x-auto border rounded-xl">
                    <table className="min-w-full divide-y">
                        <thead className="bg-[#F4C2C2]">
                        <tr className="text-xs uppercase">
                            <th className="px-6 py-4 text-center">ID</th>
                            <th className="px-6 py-4 text-center">Flower Name</th>
                            <th className="px-6 py-4 text-center">Price</th>
                            <th className="px-6 py-4 text-center">Category</th>
                            <th className="px-6 py-4 text-center">Image</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y">
                        {filteredProducts.map(p => (
                            <tr key={p.id} className="hover:bg-pink-50 transition">
                                <td className="px-6 py-4 text-center">{p.id}</td>
                                <td className="px-6 py-4 font-semibold text-center">{p.name}</td>
                                <td className="px-6 py-4 font-bold text-center">
                                    {Number(p.price).toLocaleString()} MMK
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="px-3 py-1 rounded-full text-xs bg-[#F4C2C2]">
                                        {p.categoryName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex justify-center">
                                    {p.image && (
                                        <img
                                            src={`http://localhost:8080/api/products/${p.id}/image`}
                                            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#C21E56]"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="text-white bg-[#C21E56] border-2 border-transparent
                                        rounded whitespace-nowrap transition duration-300 cursor-pointer
                                        hover:bg-transparent hover:border-[#C21E56] hover:text-[#C21E56]
                                        w-full sm:w-auto px-3 py-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(p.id)}
                                        className="text-white bg-red-700 border-2 border-transparent
                                        rounded whitespace-nowrap transition duration-300 cursor-pointer
                                        hover:bg-transparent hover:border-red-700 hover:text-red-700
                                        w-full sm:w-auto px-3 py-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-[#C21E56]">
                            Edit Flower
                        </h2>

                        <div className="space-y-5">
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl"
                                placeholder="Flower name"
                            />

                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="w-full px-4 py-3 border rounded-xl"
                                placeholder="Price"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    className="h-32 w-32 object-cover rounded-xl mx-auto"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={onImageChange}
                                className="w-full"
                            />
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                onClick={closeModal}
                                className="w-30 p-3 bg-white font-semibold rounded-full shadow-lg
                                 border-2 border-gray-300 cursor-pointer">
                                Cancel
                            </button>
                            <button
                                onClick={submitEdit}
                                className="w-30 p-3 bg-[#C21E56] text-white font-semibold rounded-full shadow-lg
                               hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]
                               duration-300 cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
