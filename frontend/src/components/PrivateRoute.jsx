import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStatus } from '../hooks/UseAuthStatus';

import Spinner from '../components/Spinner';

const PrivateRoute = () => {

  const { loggedIn, loading } = useAuthStatus();

  if(loading) {
    return <Spinner />
  }

  return (
    (
      loggedIn ? 
          <Outlet /> : 
          <Navigate to='/login'/>
    )
  )
}

export default PrivateRoute
