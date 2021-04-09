import React, { useState } from 'react'
import api from '../config/api';

export const SongContext = React.createContext();

const INITIAL_VALUES = {
  data: null,
  
  loading: false,
  error: null,
  success: false
}

const INITIAL_VALUES_LIST = {
  data: [],
  page: 0,
  size: 10,
  
  loading: false,
  error: null,
  success: false
}

const SongProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_VALUES);
  const [stateList, setStateList] = useState(INITIAL_VALUES_LIST);


  const getSongs = async ({ page = 0, size = 10, ...params } = {}) => {
    try {
      setStateList({
        ...stateList,
        size,
        loading: true,
        error: null,
        success: false
      })

      const { data, status } = await api.get("/songs", {
        params: {
          ...params,
          page,
          size,
        }
      });
      if(data && status === 200) {
        setStateList({
          ...stateList,
          page,
          size,
          data: data?.results,
          loading: false,
          error: null,
          success: true
        })
      }
    } catch(err) {
      setStateList({
        ...stateList,
        page: 0,
        size: 10,
        
        loading: false,
        error: err?.response?.data?.message || err?.data?.message || err?.message,
        success: false
      })
    }
  }

  const saveSong = async (params) => {
    try {
      setState({
        ...state,
        loading: true,
        error: null,
        success: false
      })

      const { data, status } = await api.post("/songs", params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(data && status === 200) {
        setState({
          ...state,
          data,
          loading: false,
          error: null,
          success: true
        })
      }
    } catch(err) {
      setState({
        ...state,
        page: 0,
        size: 10,
        
        loading: false,
        error: err?.response?.data?.message || err?.data?.message || err?.message,
        success: false
      })
    }
  }


  return (
    <SongContext.Provider value={{ song: state, songs: stateList, getSongs, saveSong }}>
      {children}
    </SongContext.Provider>
  )
}

export default SongProvider;
