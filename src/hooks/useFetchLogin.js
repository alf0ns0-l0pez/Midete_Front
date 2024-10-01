import { useState } from "react";

const useFetchLogIn = (url, options, successHandle) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleRequest = async () =>{
        try{
            setLoading(true);
            const response = await fetch(url,options);
            if(!response.ok){
                setError("Error. Server NOT OK");
            }
            else{
                const result = await response.json();
                setError(null);
                localStorage.setItem("userSession", JSON.stringify(result));
                successHandle(result);
            }
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }
    return { loading, error, handleRequest};
}

export default useFetchLogIn;