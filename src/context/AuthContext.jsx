import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}){
  const [token, setToken] = useState(()=> localStorage.getItem('mock_jwt') || null);
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(()=>{
    if(token) localStorage.setItem('mock_jwt', token);
    else localStorage.removeItem('mock_jwt');
  },[token]);

  const login = ({username, password}) => {
    return new Promise((res, rej) => {
      setTimeout(()=>{
        if(password === 'test123'){
          const mt = 'mock-jwt-' + Math.random().toString(36).slice(2);
          setToken(mt);
          const u = { name: username || 'User' };
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          res(mt);
        } else {
          rej(new Error('Invalid credentials. Use password: test123'));
        }
      }, 500);
    })
  }

  const logout = ()=>{
    setToken(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('mock_jwt');
  }

  return <AuthContext.Provider value={{token, user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
