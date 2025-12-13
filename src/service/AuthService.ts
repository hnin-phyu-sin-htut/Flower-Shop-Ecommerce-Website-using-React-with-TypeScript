import type {RegisterDto} from "../model/RegisterDto.ts";
import axios from "axios";

const FLOWER_SHOP_BACKEND_URL = "http://localhost:8080/api/auth";

export const register = (registerDto: RegisterDto) =>
    axios.post(FLOWER_SHOP_BACKEND_URL + "/register", registerDto);