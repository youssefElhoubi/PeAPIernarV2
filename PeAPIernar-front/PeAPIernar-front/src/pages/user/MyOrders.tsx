import React from 'react';
import { useState, useEffect } from 'react';
import decode from '../../helpr/tokenDecode';
import Header from '../../components/layout/Header';
import OrderCard from '../../components/comman/OrderCard';

type payload = {
    sub: number,
    role: string,
    iat: number,
    exp: number
}
type orders = {
    id: number
    qauntity: string
    totale: string
    plant_id: number
    client_id: number
    status: string
    created_at: string
    updated_at: string
    plants: Plant
}
type Plant = {
    id: number
    name: string
    description: string
    price: string
    slug: string
    category_id: number
    created_at: string
    updated_at: string
}


const MyOrders: React.FC = () => {
    const [token, setToken] = useState<string>("");

    const [Orders, setOrders] = useState<orders[] | null>(null);

    const [data, setdata] = useState<payload>({
        sub: 1,
        role: "string",
        iat: 1,
        exp: 1
    });


    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {

            setToken(localToken)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const decoded = await decode(token);
                setdata(decoded);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch("http://peapirineV2.test/api/order/orders", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token,
                }
            });
            const result = await response.json();

            setOrders(Array.isArray(result) ? result : result.orders);


        }
        fetchOrders()
    }, [token])

    return (
        <>
            <Header />
            <section id="our-team" className="bg-gray-100 py-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {
                            Orders?.map((ele) => {
                                return (
                                    <div key={ele.id}>
                                        <OrderCard order={{
                                            id: ele.id,
                                            plant_name: ele.plants.name,
                                            total: ele.totale,
                                            status: ele.status
                                        }} token={token} />
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )
}

export default MyOrders
