import axios from "axios";
import type {CartItem} from "../model/CartItem.ts";
import type {HomeFlower} from "../model/HomeFlower.ts";

const HOME_FLOWER_BACKEND_URL = "http://localhost:3000/home-flowers";
const PRODUCTS_BACKEND_URL = "http://localhost:3001/products";
const API_URL = "http://localhost:8080/api/cart";

export const listAllHomeProducts = () =>
    axios.get<HomeFlower[]>(HOME_FLOWER_BACKEND_URL);

export const listAllProducts = () =>
    axios.get<CartItem[]>(PRODUCTS_BACKEND_URL);

export const saveCart = (items: CartItem[], token: string) =>
    axios.post(API_URL + "/save-cart", items, {
        headers: {
            Authorization: token
        }
    });