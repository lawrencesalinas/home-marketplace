import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

//------------------------------------------------------User Profile page-----------------------------------------------------------------//

function Profile() {
    const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData

    const navigate = useNavigate()

    //-------fetch the listings that matches the userref with the login user --------//
    useEffect(() => {
        const fetchUserListings = async () => {
            const listingRef = collection(db, 'listings')
            const q = query(listingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
            // Execute query
            const querySnap = await getDocs(q)

            let listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchUserListings()
    }, [auth.currentUser.uid])
    //-------------------------------------------------------------------------------//


    //--------logut user-----------//
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    //-------------------------------------//


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

    // --------set input values-------------//
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    //--------------------------------------//

    //-------------Delete a listing---------------------------//
    const onDelete = async (listingId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteDoc(doc(db, 'listings', listingId))
            const updateListings = listings.filter(
                (listing) => listing.id !== listingId
                )
            setListings(updateListings)
            toast.success('Successfully deleted listing')
        }
    }
    //-----------------------------------------------------//

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
                    {/* ----------------------------------------------------------------------------------------------------------- */}

                </div>



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

                {/* -----------------List of user listings ---------------------*/}
                {!loading && listings?.length > 0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <ul className="listingsList">
                            {listings.map((listing => (
                                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} />
                            )))}
                        </ul>
                    </>
                )}
                {/* ----------------------------------------------------------- */}

            </main>
        </div>
    )
}


export default Profile