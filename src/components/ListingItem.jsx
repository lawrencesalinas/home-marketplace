import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import formatMoney from '../utils/formatMoney'

//---------------------- Listing item on expolore page ---------------------------------------------//

function ListingItem({ listing, id, onEdit, onDelete }) {
    return (
        <li className="categoryListing">
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' />
                <div className="categoryListingDetails" data-aos='fade-left'>
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">
                        {listing.name}
                    </p>

                    {/* -----if there is an offer(discounted price)show the discounted price with commas)----- */}
                    <p className="categoryListingPrice">
                        {listing.offer
                            ? formatMoney(listing.discountedPrice)
                            : formatMoney(listing.regularPrice)}

                        {listing.type === 'rent' && '/ Month'}
                    </p>
                    {/* -------------------------------------------------------------------------------------- */}


                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt='bed' />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                        </p>
                        <img src={bathtubIcon} alt="bath" />
                        <p className="categoryListingInfoText">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                        </p>
                    </div>

                </div>
            </Link>

            {/* -------------------------Delete lisitng ----------------------------------------*/}
            {
                onDelete && (
                    <DeleteIcon className='removeIcon'
                        fill='rgb(231,76,60)'
                        onClick={() => onDelete(listing.id, listing.name)}
                    />
                )
            }

            {/* -------------------------Edit lisitng ----------------------------------------*/}
            {
                onEdit && (
                    <EditIcon className='editIcon'
                        onClick={() => onEdit(listing.id)}
                    />
                )
            }
        </li >
    )
}

export default ListingItem