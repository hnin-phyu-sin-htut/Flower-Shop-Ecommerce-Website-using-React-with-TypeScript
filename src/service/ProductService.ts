import axios from "axios";
import type {HomeFlower} from "../model/HomeFlower.ts";
import type {CategoryDto} from "../model/CategoryDto.ts";
import type {ProductDto} from "../model/ProductDto.ts";
import type {ProductEdit} from "../model/ProductEdit.ts";

const HOME_FLOWER_BACKEND_URL = "http://localhost:3000/home-flowers";
const CATEGORY_BACKEND_URL = "http://localhost:8080/api/category";
const PRODUCTS_BACKEND_URL = "http://localhost:8080/api/products";
const API_URL = "http://localhost:8080/api/cart";

export const listAllHomeProducts = () =>
    axios.get<HomeFlower[]>(HOME_FLOWER_BACKEND_URL);

export const fetchAllProducts = () =>
    axios.get<ProductDto[]>(`${PRODUCTS_BACKEND_URL}/products-list`);

export const listAllProductsByCategory= (categoryName: string) =>
    axios.get<ProductDto[]>(`${PRODUCTS_BACKEND_URL}/${categoryName}`);

export const createProduct = (product: FormData) =>
    axios.post<string>(`${PRODUCTS_BACKEND_URL}/create-product`, product, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const createCategory= (categoryDto: CategoryDto) =>
    axios.post<string>(`${CATEGORY_BACKEND_URL}/create-category`, categoryDto, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const getAllCategories = () =>
    axios.get<CategoryDto[]>(`${CATEGORY_BACKEND_URL}/category-list`);

export const editProduct = (courseEdit: ProductEdit, id:number) =>
    axios.put<ProductDto>(`${PRODUCTS_BACKEND_URL}/edit/${id}`, courseEdit);

export const checkout = (items: { id: number; quantity: number }[], token: string) =>
    axios.post(
        API_URL + "/checkout",
        items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity
        })),
        { headers: { Authorization: token } }
    );

