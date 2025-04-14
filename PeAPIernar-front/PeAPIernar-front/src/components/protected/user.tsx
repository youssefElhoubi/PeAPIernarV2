import React, { useState, useEffect } from 'react'
import decode from '../../helpr/tokenDecode';
import Privet from './Privet';
import { useNavigate , Navigate } from 'react-router-dom';

type props = {
    component : React.FC
}

const Admine: React.FC<props> = ({component}) => {
    const navigator = useNavigate();

    type Root = {
        success: boolean,
        data: Data
    }

    type Data = {
        sub: number
        role: string
        iat: number
        exp: number
    }

    const [Token, setToken] = useState<string>("");
    const [Role, setRole] = useState<string>("");

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    useEffect(() => {
        const decodeToken = async () => {
            const payload: Root = await decode(Token);
            setRole(payload.data.role);
        }
        decodeToken();
    }, [Token])

    return (
        Role == "user" ? <Privet Componnet={component}/> : <Navigate to={"/"}/>
    )
}

export default Admine
