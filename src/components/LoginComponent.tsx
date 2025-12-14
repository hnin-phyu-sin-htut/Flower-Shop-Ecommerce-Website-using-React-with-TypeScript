import {useState} from "react";
import type {LoginDto} from "../model/LoginDto.ts";
import {login, setLoggedInUserName, setRoleName, setToken} from "../service/AuthService.ts";
import {useNavigate} from "react-router-dom";

export default function LoginComponent() {

    const [loginDto, setLoginDto] = useState<LoginDto>({
        username: "",
        password: ""
    });

    const navigator = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(loginDto).then(res => {
            const {username, roleName} = res.data;
            const token = 'Basic ' + btoa(loginDto.username + ':' + loginDto.password);
            setToken(token);
            setLoggedInUserName(username);
            setRoleName(roleName);
            setLoginDto({...loginDto, username: "", password: ""});
            if('ROLE_ADMIN' === roleName){
                navigator('/admin-dashboard');
            }else if('ROLE_CUSTOMER' === roleName){
                navigator('/');
            }
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <>
            <div className="mt-20 mb-20 flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                    <h2 className="text-3xl font-extrabold text-center text-[#C21E56] mb-6">
                        Login
                    </h2>

                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="username"
                            value={loginDto.username}
                            onChange={e => setLoginDto({...loginDto, username: e.target.value})}
                            placeholder="Username or Email"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"/>

                        <input
                            type="password"
                            name="password"
                            value={loginDto.password}
                            onChange={e => setLoginDto({...loginDto, password: e.target.value})}
                            placeholder="Password"
                            className="w-full p-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#C21E56] focus:border-transparent
                           transition-shadow duration-200 shadow-sm"/>

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-4 p-3 bg-[#C21E56] text-white font-semibold rounded-lg shadow-lg
                           hover:bg-white hover:text-[#C21E56] hover:border hover:border-[#C21E56]
                           transition-colors duration-300">
                            Login
                        </button>

                        {

                        }
                    </div>

                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Don't have an account?{" "}
                        <a href="/register" className="text-[#C21E56] font-medium hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
