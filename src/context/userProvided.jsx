import { createContext, useState, useContext } from "react";
const userContext = createContext();
const userToggleContext = createContext();

export function useUserContext(){
    return useContext(userContext)
}
export function useUserToggleContext(){
    return useContext(userToggleContext)
}

export function UserProvided({children}){
    const [ user, setUser] = useState(JSON.parse(localStorage.getItem("userSession")));
    const changeLogin = (userInfo) =>{
        setUser(userInfo);
    }
    return(
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={changeLogin}>
                {children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}