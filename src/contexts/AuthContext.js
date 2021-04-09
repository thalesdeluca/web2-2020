import React, { useCallback, useEffect, useState } from 'react';
import api from '../config/api';

export const AuthContext = React.createContext();

const INITIAL_VALUES = {
  authenticated: false,

  user: null,
  loading: false,
  success: false,
  error: null
}

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_VALUES)

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("@song-search");

    if(token) {
      setState(prevState => ({
        ...prevState,
        authenticated: true
      }));
    }
  }, [])

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const logout = useCallback(() => { 
    localStorage.removeItem('@song-search');

    setState(INITIAL_VALUES);
  }, []);

  const login = useCallback(async (params) => {
    try{
      setState(prevState => ({
        ...prevState,
        user: null,
        loading: true,
        success: false,
        loginError: null
      }));

      const { data, status } = await api.post("/auth/login", params);
      console.log(data, status)
      if(data && status === 200) {
        localStorage.setItem("@song-search", data?.access_token)
        setState(prevState => ({
          ...prevState,
          authenticated: true,
          user: data?.user,
          loading: false,
          success: false,
          loginError: null
        }))
      } else {
        throw data;
      }
      
    } catch(err) {
      setState(prevState => ({
        ...prevState,
        authenticated: false,
        loading: false,
        success: false,
        loginError: err?.response?.data?.message || err?.message || err
      }))
    } 
  }, [])

  const register = useCallback(async (params) => {
    try{
      setState(prevState => ({
        ...prevState,
        user: null,
        loading: true,
        success: false,
        loginError: null
      }));

      const { data, status } = await api.post("/auth/signup", params);

      if(data && status === 200) {
        localStorage.setItem("@song-search", data?.access_token)
        setState(prevState => ({
          ...prevState,
          authenticated: true,
          user: data?.user,
          loading: false,
          success: false,
          loginError: null
        }))
      } else {
        throw data;
      }
      
    } catch(err) {
      setState(prevState => ({
        ...prevState,
        authenticated: false,
        loading: false,
        success: false,
        loginError: err?.response?.data?.message || err?.message || err
      }))
    } 
  }, []);

  return (
    <AuthContext.Provider value={{ logout, login, register, auth: state }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;

