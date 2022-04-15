import {getAuth} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


function Profile() {
    const auth = getAuth()
    const [formData, setFormData] = useState({
        name: auth.updateCurrentUser.displayName,
        email: auth.updateCurrentUser.email
    })

    const {name, email} = formData

    const navigate = useNavigate()
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    } 

  return (<div className="profile">
      <header className="profileHeader">
          <p className="pageHeader">
              My Profile
          </p>
          <button className="logOut" onClick={onLogout}>Logout</button>
      </header>
  </div>
  )
}


export default Profile