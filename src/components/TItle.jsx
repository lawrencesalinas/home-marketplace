import React from 'react'
import homeIcon from '../assets/svg/homeIcon.svg'
import {Link} from 'react-router-dom'


function TItle() {
  return (
    <div>
      <Link to ='/'>
        <h1 className='appTitle'> <img src={homeIcon} alt="home" className='homeTitle' />Honey Comb Homes</h1>
        </Link>
    </div>

  )
}

export default TItle