import { useState } from "react";

const useFetch = (url, options, successHandle, defaultLoading=true) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(defaultLoading);
    const [error, setError] = useState(null);

    const handleRequest = async () =>{
        try{
            setLoading(true);
            const response = await fetch(url,options);
            if(!response.ok){
                setError("Error. Server NOT OK")
            }
            else{
                const result = await response.json();
                setError(null);
                setData(result)
                successHandle();
            }
        }catch(err){
            setError(err);
            setData([]);
        }finally{
            setLoading(false);
        }
    }
    return { data, loading, error, handleRequest};
}

export default useFetch;