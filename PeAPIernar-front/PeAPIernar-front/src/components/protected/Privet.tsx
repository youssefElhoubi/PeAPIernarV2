import React, { JSX, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    Componnet: React.FC;
};

const Privet: React.FC<Props> = ({ Componnet }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsAuth(false);
                return;
            }

            setToken(localStorage.getItem("token"));

            try {
                const response = await fetch("http://peapirine.test/api/token/validate", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": token,
                    },
                });
                setIsAuth(response.ok);
            } catch (error) {
                console.log(error);
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    return isAuth ? <Componnet /> : <Navigate to="/login" />
};

export default Privet;
