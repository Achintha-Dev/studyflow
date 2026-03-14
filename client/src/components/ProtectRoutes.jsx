import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function ProtectRoutes() {

    const { user } = useContext(AuthContext);

    // If there is no user in context, send them back to login
    if (!user){
        return <Navigate to='/login' replace/>
    }
    return <Outlet/>

}

export default ProtectRoutes