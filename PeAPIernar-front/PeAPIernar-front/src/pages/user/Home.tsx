import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import PlantCard from '../../components/layout/PlantCard';
type plants = {
    id : number,
    name: string,
    description: string,
    price: number,
    slug: string,
    category_id: number,
}


const Home: React.FC = () => {
    const [palnts, setPalnts] = useState<plants[] | null>(null);
    useEffect(() => {
        const fetchPlants = async () => {
            const response = await fetch("http://peapirineV2.test/api/plants");
            const result = await response.json();
            const data = result.data;
            setPalnts(data);
            
        }
        fetchPlants();
    }, [])
    console.log(palnts);
    return (
        <>
            <Header />
            <section id="our-team" className="bg-gray-100 py-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {palnts?.map((ele) => {
                            return <div key={ele.id}  className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                    <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="" />
                                </div>
                                <div className="p-4">
                                    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                        {ele.name}
                                    </h6>
                                    <p className="text-slate-600 leading-normal font-light">
                                        {ele.description}
                                    </p>
                                    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                        {ele.price}
                                    </h6>
                                </div>
                                <div className="px-4 pb-4 pt-0 mt-2">
                                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                        buy
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home
