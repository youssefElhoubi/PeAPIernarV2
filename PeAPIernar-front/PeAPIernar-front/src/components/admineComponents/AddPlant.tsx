import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';



export interface Category {
    id: number
    name: string
    created_at: string
    updated_at: string
}

const AddPlant: React.FC = () => {
    const [token, setToken] = useState<string>("");
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    const [Catigorys, setCatigorys] = useState<Category[]>();

    useEffect(() => {
        const fetchCatigorys = async () => {
            try {
                if (!token) return
                const response = await fetch("http://peapirineV2.test/api/category/all", {
                    headers: {
                        "Authorization": token
                    }
                });
                console.log(token);

                console.log(response);
                const result = await response.json();
                setCatigorys(result.categories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCatigorys()
    }, [token])

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'electronics'
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsOpen(false); // Close modal on submit
    };
    console.log(Catigorys);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 flex items-center gap-2"
            >
                <span>Add New Product</span>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
                    {/* Modal Content */}
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                            <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit(submit)} className="p-6">
                            <div className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: "plant name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Plant name must be at least 3 characters",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Plant name must be less than or equal to 20 characters",
                                            },
                                        })}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        placeholder="Enter product description"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                                        {...register("description", {
                                            required: "plant description is required"
                                        })}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                    )}
                                </div>

                                {/* Price Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <span className="text-gray-500">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            {...register("price", {
                                                required: "plant price is required",
                                            })}
                                            placeholder="0.00"
                                            className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                        {errors.price && (
                                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Category Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
                                        >
                                            {

                                                Catigorys?.map(ele => {
                                                    return <option key={ele.id} value={ele.id}>{ele.name}</option>
                                                })
                                            }
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow-sm transition-colors duration-200"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPlant
