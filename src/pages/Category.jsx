import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'


function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async() => {
            try {
                // get reference to the collection
                const listingsRef = collection(db,'listings')

                // create query
                // takes in reference to the listing, where the type from the params
                // orderBy the timestamp descending, limit of 10 per page
                const q =query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10)
                )
                // Execute query
                // getDocs from the query created
                const querySnap = await getDocs(q)
                
                let listings = []
                querySnap.forEach((doc) => {
                    console.log('doc',doc.data());
                    return listings.push({
                        id: doc.id,
                        data: doc.data
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch listings')
            }
        }
        fetchListings()
    },[params.categoryName])
  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                {params.categoryName === 'rent' ? 'Places for rent': 'Places for sale'}
            </p>
        </header>
        {/* {loading ? <Spinner/> : listings && listings.length > 0 ? <></> : <p>No listings for {params.categoryName}</p>} */}
    </div>
  )
}

export default Category