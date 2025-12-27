import axios from "axios";
import type {CartItem} from "../model/CartItem.ts";
import type {HomeFlower} from "../model/HomeFlower.ts";

const HOME_FLOWER_BACKEND_URL = "http://localhost:3000/home-flowers";
const PRODUCTS_BACKEND_URL = "http://localhost:8080/products";
const API_URL = "http://localhost:8080/api/cart";

export const listAllHomeProducts = () =>
    axios.get<HomeFlower[]>(HOME_FLOWER_BACKEND_URL);

export const listAllProducts = () =>
    axios.get<CartItem[]>(PRODUCTS_BACKEND_URL);

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

