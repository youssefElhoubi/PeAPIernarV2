import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";

type SignUpForm = {
    name: string;
    email: string;
    password: string;
};

const SignUp: React.FC = () => {
    const [formResult, setFormResult] = useState<string | undefined>();
    const [token, setToken] = useState<string | null>(null);

    const { register, formState: { errors }, handleSubmit } = useForm<SignUpForm>();

    const submitData = async (data: SignUpForm) => {
        try {
            console.log({...data,role:"client"});
            
            const response = await fetch("http://peapirineV2.test/api/auth/singup", {
                method: "POST",
                body: JSON.stringify({...data,role:"client"}),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result.message);
                return setFormResult(result.message);
            }

            setFormResult(undefined);
            setToken(result.token);
            localStorage.setItem("token", result.token);
            console.log(result.token);
        } catch (error) {
            console.error("Signup failed:", error);
            setFormResult("An error occurred during sign up.");
        }
    };

    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form onSubmit={handleSubmit(submitData)} className={styles.form}>
                <h3>Sign Up</h3>

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span>{errors.name.message}</span>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    placeholder="Email"
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
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <button type="submit">Sign Up</button>
                {formResult && <span>{formResult}</span>}

                <div className={styles.social}>
                    <div className={styles.go}><i className="fab fa-google"></i> Google</div>
                    <div className={styles.fb}><i className="fab fa-facebook"></i> Facebook</div>
                </div>
            </form>
        </>
    );
};

export default SignUp;
