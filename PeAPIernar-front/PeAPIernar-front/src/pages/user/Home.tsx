import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import PlantCard from '../../components/layout/PlantCard';
type plants = {
    id: number,
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
    }, []);
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
                            return <div key={ele.id}>
                                <PlantCard id={ele.id} name={ele.name} description={ele.description} price={ele.price} slug={ele.slug} category_id={ele.category_id} />
                            </div>
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home
