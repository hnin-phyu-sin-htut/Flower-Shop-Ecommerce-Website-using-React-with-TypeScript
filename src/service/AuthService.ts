import type {RegisterDto} from "../model/RegisterDto.ts";
import axios from "axios";
import type {LoginDto} from "../model/LoginDto.ts";

const FLOWER_SHOP_BACKEND_URL = "http://localhost:8080/api/auth";

export const register = (registerDto: RegisterDto) =>
    axios.post(FLOWER_SHOP_BACKEND_URL + "/register", registerDto);

export const login = (loginDto: LoginDto) =>
    axios.post(FLOWER_SHOP_BACKEND_URL + "/login", loginDto);

export const logout =() =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUserName");
}

export const setToken = (token: string) =>
    localStorage.setItem("token", token);

export const getToken = () =>
    localStorage.getItem("token");

export const isLoggedIn = () =>
    localStorage.getItem("token") !== null;

export const setRoleName = (roleName: string)=>
    sessionStorage.setItem("roleName", roleName);

export const getRoleName = () =>
    sessionStorage.getItem("roleName");

export const setLoggedInUserName = (username: string) =>
    sessionStorage.setItem("username", username);

export const getLoggedInUserName = () =>
    sessionStorage.getItem("username");

export const isAdmin = () =>
    getRoleName() === "ROLE_ADMIN";

export const isCustomer = () =>
    getRoleName() === "ROLE_CUSTOMER";