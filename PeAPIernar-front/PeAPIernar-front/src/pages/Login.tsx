import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";


type loginFrom = {
    email: string,
    password: string
};

const Login: React.FC = () => {
    const [formResult, setformResult] = useState();
    const [token,setToken] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm<loginFrom>()
    const submitData = async (data: any) => {
        console.log(data);
        const response: any = await fetch("http://peapirineV2.test/api/auth/singin", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
        });
        const result = await response.json();
        console.log(response);
        

    }
    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form onSubmit={handleSubmit(submitData)} className={styles.form}>
                <h3>Login Here</h3>

                <label htmlFor="username">Username</label>
                <input

                    placeholder="Email or Phone"
                    id="username"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <button type="submit">Log In</button>

                <div className={styles.social}>
                    <div className={styles.go}><i className="fab fa-google"></i> Google</div>
                    <div className={styles.fb}><i className="fab fa-facebook"></i> Facebook</div>
                </div>
            </form>
        </>
    );
}

export default Login
