import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check if user already exist in the firestore

      // get the user from the google sign in and get the user id to see if we have referenc eform that document
      const docRef = doc(db, 'users', user.uid)
      // get the snapshot and await getDoc the docref reference
      const docSnap = await getDoc(docRef)

      // check if the user exist in the database if it doesnt exist, create user
      if (!docSnap.exists()) {
        // doc takes in the db, name of the collection, and userid
        // setDoc takes in the doc and the data we want to add to the database
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with google')
    }

  }


  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth