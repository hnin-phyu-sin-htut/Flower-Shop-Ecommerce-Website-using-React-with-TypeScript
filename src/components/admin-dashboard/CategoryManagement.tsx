import { type FormEvent, useEffect, useState } from "react";
import type { CategoryDto } from "../../model/CategoryDto.ts";
import { createCategory, getAllCategories } from "../../service/ProductService.ts";

export default function CategoryManagement() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDto, setCategoryDto] = useState<CategoryDto[]>([]);

    const fetchAllCategories = () => {
        getAllCategories()
            .then((res) => setCategoryDto(res.data))
            .catch((err) => console.log(err));
    };

    const createCategoryHandler = (e: FormEvent) => {
        e.preventDefault();
        const categoryDto: CategoryDto = { categoryName };
        createCategory(categoryDto)
            .then(() => {
                setCategoryName("");
                fetchAllCategories();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 mt-[-20%]">
                <h2 className="text-3xl font-bold text-[#C21E56] mb-8 text-center">
                    Create Category
                </h2>

                <form onSubmit={createCategoryHandler} className="space-y-5">
                    <div>
                        <label
                            htmlFor="categoryName"
                            className="block text-md font-medium text-gray-600 mb-2">
                            Category Name
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none
                            focus:ring-2 focus:ring-[#C21E56] focus:border-transparent shadow-sm"
                            placeholder="Enter category"
                            required/>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#C21E56] text-white font-semibold rounded-full shadow-lg
                           hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]
                           transition-colors duration-300 cursor-pointer">
                        Add Category
                    </button>
                </form>

                <div className="mt-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Existing Categories
                    </h3>

                    {categoryDto.length === 0 ? (
                        <p className="text-sm text-gray-500">No categories yet</p>
                    ) : (
                        <ul className="space-y-3 max-h-60 overflow-y-auto">
                            {categoryDto.map((category, index) => (
                                <li
                                    key={category.id}
                                    className="flex items-center justify-between bg-[#ffe6ee] px-4 py-2 rounded-xl
                                    border border-[#C21E56]">
                                  <span className="text-gray-700 font-medium">
                                    {`${index + 1}. ${category.categoryName}`}
                                  </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
