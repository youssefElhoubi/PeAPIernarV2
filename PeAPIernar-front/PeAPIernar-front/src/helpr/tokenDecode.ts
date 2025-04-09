const decode = async (token : string) => {
    try {
        const response = await fetch("http://peapirineV2.test/api/token/validate", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data
        }
        return false;
    } catch (error) {
        console.error("Validation error:", error);
    }
}
export default decode;