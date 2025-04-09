import { useNavigate } from "react-router-dom";
import decode from "./tokenDecode";

const Isuser = async () => {
    const navigator = useNavigate();
    const token: any = localStorage.getItem("token");
    const data = await decode(token);
    if (data) {
        return
    }
    navigator("/");
}

export default Isuser