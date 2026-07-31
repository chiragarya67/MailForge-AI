import React from 'react'
import { useEffect, useContext, useCallback } from 'react';
import { useState } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      const userInfo = localStorage.getItem("userInfo");
      if(userInfo){
        try {
            setUser(JSON.parse(userInfo));
        } catch (error) {
            localStorage.removeItem("userInfo");
        }
      }
      setLoading(false)
    }, []);
  
    const login = useCallback((userData) =>{
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("token", userData.token)
        setUser(userData.user || userData);
    }, [])
    
    const logout = useCallback(() =>{
        localStorage.removeItem("userInfo");
         localStorage.removeItem("token");
            setUser(null);
    }, [])

    return(
        <AuthContext.Provider value={{user, loading, login, logout}}>
             {children}
        </AuthContext.Provider>
    )
}


