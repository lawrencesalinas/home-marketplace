import {Navigate, Outlet, } from 'react-router-dom'


function PrivateRoute() {
    const loggedIn = false

    return (
        loggedIn ? <Outlet/> : <Navigate to='sign-in' />
    )
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute