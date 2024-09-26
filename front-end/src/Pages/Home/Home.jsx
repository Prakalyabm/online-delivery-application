import React from 'react'

import './home.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import Navbar from '../../components/Navbar/Navbar'

const Home = ({slideIn, handleSlidein}) => {

  return (
    <div className='home-container-1'>
     <Navbar handleSlidein={handleSlidein}/>
     <LeftSidebar slideIn={slideIn} handleSlidein={handleSlidein} />
     <div className='home-container-2'>
      <HomeMainbar />
     </div>
    </div>
  )
}

export default Home