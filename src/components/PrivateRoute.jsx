import {Navigate, Outlet, } from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'


//-----------redirect to sign-in page if a user is not logged in------//
function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus()
    if(checkingStatus){
        return <Spinner/>
    }

    return (
        loggedIn ? <Outlet/> : <Navigate to='/sign-in' />
    )
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute