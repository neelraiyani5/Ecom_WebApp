import React, { useEffect, useState } from 'react'
import globalState from './globalState'
import ProductAPI from '../api/ProductAPI'
import axios from 'axios'
import UserAPI from '../api/UserAPI'

const GlobalStateProvider = ({children}) => {
    const [token, setToken] = useState(false)
    const refreshToken = async () => {
      const res = await axios.post("/user/refreshtoken")
      setToken(res.data.accessToken)
    }
    useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin")
      if(firstLogin){
        refreshToken()
      }
    }, [])
    
    const state = {
        token : token,
        ProductAPI : ProductAPI(),
        UserAPI : UserAPI(token)
    }
  return (
    <globalState.Provider value={state}>
        {children}
    </globalState.Provider>
  )
}

export default GlobalStateProvider