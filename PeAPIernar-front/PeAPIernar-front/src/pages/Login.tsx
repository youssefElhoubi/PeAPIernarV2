import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginForm = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [formResult, setFormResult]: any = useState();
    const [token, setToken]: any = useState(null);

    const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>();

    const submitData = async (data: LoginForm) => {
        const response: any = await fetch('http://peapirineV2.test/api/auth/singin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return setFormResult(result.message);
        }

        setFormResult(null);
        setToken(result.token);
        localStorage.setItem('token', result.token);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-red-100 to-yellow-100 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign In</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Enter your email and password to continue</p>

                <form onSubmit={handleSubmit(submitData)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Error message */}
                    {formResult && <div className="text-red-500 text-sm">{formResult}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-xl"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Not registered yet?{' '}
                    <a href="/signup" className="text-blue-500 font-medium hover:underline">
                        Create an Account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
