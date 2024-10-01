import { useState } from "react";

const useFetchSelector = (url, options) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const handleRequest = async () =>{
        console.log(options)
        console.log(url)
        try{
            const response = await fetch(url,options);
            if(!response.ok){
                setError("Error. Server NOT OK")
            }
            else{
                const result = await response.json();
                setError(null);
                setData(result)
            }
        }catch(err){
            setError(err);
            setData([]);
        }
    }
    return { data, error, handleRequest};
}

export default useFetchSelector;