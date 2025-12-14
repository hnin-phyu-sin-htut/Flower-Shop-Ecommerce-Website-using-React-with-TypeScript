import type {RegisterDto} from "../model/RegisterDto.ts";
import axios from "axios";
import type {LoginDto} from "../model/LoginDto.ts";

const FLOWER_SHOP_BACKEND_URL = "http://localhost:8080/api/auth";

export const register = (registerDto: RegisterDto) =>
    axios.post(FLOWER_SHOP_BACKEND_URL + "/register", registerDto);

export const login = (loginDto: LoginDto) =>
    axios.post(FLOWER_SHOP_BACKEND_URL + "/login", loginDto);

export const logout =() =>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUserName");
}
export const isLoggedIn = () =>
    localStorage.getItem("token") !== null;

export const setToken = (token: string) =>
    localStorage.setItem("token", token);

export const setRoleName = (roleName: string)=>
    sessionStorage.setItem("roleName", roleName);

export const setLoggedInUserName = (username: string) =>
    sessionStorage.setItem("username", username);