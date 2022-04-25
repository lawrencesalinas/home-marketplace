import React from 'react'
import homeIcon from '../assets/svg/homeIcon.svg'


function TItle() {
  return (
    <div>
        <h1 className='appTitle'> <img src={homeIcon} alt="home" className='homeTitle' />Honey Comb Homes</h1>
    </div>
  )
}

export default TItle