import { useEffect, useState } from "react";
import type { HomeFlower } from "../model/HomeFlower";
import { listAllHomeProducts } from "../service/ProductService";

export default function HomeComponent() {
    const [flowers, setFlowers] = useState<HomeFlower[]>([]);

    useEffect(() => {
        listAllHomeProducts()
            .then(res => setFlowers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mx-auto mt-10 mb-10">
            <h1 className="text-3xl text-[#C21E56] font-bold text-center mb-8">
                Most Popular Flowers
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6 md:px-10 lg:px-16">
                {flowers.map(flower => (
                    <div
                        key={flower.id}
                        className="rounded-xl border-2 border-[#C21E56] shadow-md bg-white p-6 flex flex-col items-center"
                    >
                        <img
                            src={flower.image || "/images/no-images.png"}
                            alt={flower.name}
                            className="rounded-xl w-full h-48 object-contain mb-4"
                        />

                        <h2 className="text-xl font-bold text-center text-[#C21E56] mb-2">
                            {flower.name}
                        </h2>

                    </div>
                ))}
            </div>
        </div>
    );
}
