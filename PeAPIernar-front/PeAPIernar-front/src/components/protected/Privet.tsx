import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    Componnet: React.FC;
};

const Privet: React.FC<Props> = ({ Componnet }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
        } else {
            setIsAuth(false);
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const validateToken = async () => {
            try {
                const response = await fetch("http://peapirineV2.test/api/token/validate", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                });
                setIsAuth(response.ok);
            } catch (error) {
                console.error("Validation error:", error);
                setIsAuth(false);
            }
        };

        validateToken();
    }, [token]);

    if (isAuth === null) return <div>Loading...</div>;

    return isAuth ? <Componnet /> : <Navigate to="/" />;
};

export default Privet;
