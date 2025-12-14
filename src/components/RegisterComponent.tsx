import {type FormEvent, useState} from "react";
import type {RegisterDto} from "../model/RegisterDto.ts";
import {register} from "../service/AuthService.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterComponent() {

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const navigator = useNavigate();

    const [registerDto, setRegisterDto] = useState<RegisterDto>({
        username: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        userType: ""
    });

    const registerHandler = (e: FormEvent) => {
        e.preventDefault();

        const finalDto: RegisterDto = {
            ...registerDto,
            userType: isAdmin ? "ADMIN" : "CUSTOMER"
        };
        console.log("Submitted: " + finalDto);

        register(finalDto)
            .then(res => {
                console.log("API Success", res.data);
                navigator('/login');
            })
            .catch(err => console.log("API Error", err));
        setRegisterDto(finalDto);
    };

    return (
        <>
            <div className="mt-15 mb-15 flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-extrabold text-center text-[#C21E56] mb-6">
                        Create Account
                    </h2>

                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="username"
                            onChange={e => setRegisterDto({...registerDto, username: e.target.value})}
                            placeholder="Username"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"
                        />

                        <input
                            type="email"
                            name="email"
                            onChange={e => setRegisterDto({...registerDto, email: e.target.value})}
                            placeholder="Email"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"
                        />

                        <input
                            type="password"
                            name="password"
                            onChange={e => setRegisterDto({...registerDto, password: e.target.value})}
                            placeholder="Password"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"
                        />

                        <input
                            type="text"
                            name="phone"
                            onChange={e => setRegisterDto({...registerDto, phone: e.target.value})}
                            placeholder="Phone"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"
                        />

                        {
                            isAdmin && (
                                <input
                                    type="text"
                                    name="address"
                                    onChange={e => setRegisterDto({...registerDto, address: e.target.value})}
                                    placeholder="Address"
                                    className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                                   transition-shadow duration-200 shadow-sm"
                                />
                            )
                        }

                        <label className="flex items-center gap-3 cursor-pointer mt-2 select-none">
                            <div className="relative">
                                <input checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#C21E56] transition-colors"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
                            </div>
                            <span className="text-gray-800 font-medium">Register as Admin</span>
                        </label>

                        <button
                            onClick={registerHandler}
                            className="w-full mt-4 p-3 bg-[#C21E56] text-white font-semibold rounded-lg shadow-lg
                           hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]
                           transition-colors duration-300">
                            Register Now
                        </button>
                    </div>

                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-[#C21E56] font-medium hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
