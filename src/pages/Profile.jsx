import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

//------------------------------------------------------User Profile page-----------------------------------------------------------------//
function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData

    const navigate = useNavigate()

    //--------logut user-----------//
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    //--------update user details-----------------------//
    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // update display name in  fb
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                // update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name,
                })
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not update profile details')
        }
    }
    //----------------------------------------------------//


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">
                    My Profile
                </p>
                <button className="logOut" onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className='profileDetailsHeader'>
                    <p className='profileDetailsText'>Personal Details</p>

                    {/* -------Update user details dynamically, if button is clicked, button toggles between change and done --------*/}
                    <p className="chagePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>
                {/* ----------------------------------------------------------------------------------------------------------- */}


                {/* ---------------Update user form and inputs---------------------------------------- */}
                <div className="profileCard">
                    <form>
                        <input type="text"
                            id="name"
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input type="text"
                            id="email"
                            value={email}
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            onChange={onChange}
                        />
                    </form>
                </div>
                {/* --------------------------------------------------------------------------------- */}

                <Link to='/create-listing' className='createListing'>
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>
            </main>
        </div>
    )
}


export default Profile