import React from 'react'
import Bannersmall from '../Components/Bannersmall'
import Service from '../Components/Service';
function Services() {
    const imageUrl = '/banner/services.jpeg';
  const altText = 'Your Banner Description';
  return (
    <div className='Service-page'>
         <Bannersmall imageUrl={imageUrl} altText={altText} />
         <Service />
         
    </div>
  )
}

export default Services