import {useEffect, useState} from "react";
import type {HomeFlower} from "../model/HomeFlower.ts";

import {listAllHomeProducts} from "../service/ProductService.ts";
import {Link} from "react-router-dom";

export default function HomeComponent() {

    const [flowers, setFlowers] = useState<HomeFlower[]>([]);

    useEffect(() => {
        listAllHomeProducts()
            .then(res => {
                setFlowers(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div className="container mx-auto mt-10 mb-10">
                <h1 className="text-3xl text-[#C21E56] font-bold text-center mb-8">
                    Most Popular Flowers
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4
                sm:px-6 md:px-10 lg:px-16">

                    {flowers.map((flower) => (
                        <div key={flower.id} className="card w-full rounded-xl flex flex-col items-center p-6
                        border-2 border-[#C21E56] shadow-md bg-white">

                            <div className="w-full">
                                <img src={
                                            flower.image && flower.image !== "" ? flower.image : "/images/no-image.png"
                                        }
                                    alt={flower.name}
                                    className="rounded-xl w-full h-48 object-contain"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-center mb-5 text-[#C21E56]">
                                {flower.name}
                            </h2>

                            <div className="flex flex-row items-center justify-around mb-2 w-full">
                                <p className="text-lg font-bold text-[#C21E56]">
                                    {flower.price.toLocaleString()} MMK
                                </p>

                                <Link to="/products">
                                    <button className="text-white bg-[#C21E56] border-2 border-transparent
                                    px-3 py-2 rounded whitespace-nowrap transition duration-300 hover:bg-transparent
                                    hover:border-[#C21E56] hover:text-[#C21E56] cursor-pointer">
                                        Find More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
