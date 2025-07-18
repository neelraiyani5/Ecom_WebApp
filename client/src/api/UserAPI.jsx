import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserAPI = (token) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get("/user/getUser",{
                        headers : {Authorization : token}
                    })
                    setLoggedIn(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    alert(err)
                }
            }
            getUser();
        }
    }, [token])


  return {
    loggedIn:[loggedIn, setLoggedIn],
    isAdmin:[isAdmin, setIsAdmin]
  }
}

export default UserAPI