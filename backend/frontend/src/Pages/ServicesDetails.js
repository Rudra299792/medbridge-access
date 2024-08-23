import React from 'react'
import Bannersmall from '../Components/Bannersmall'
import ServiceDetails from '../Components/ServiceDetails';
function ServicesDetails() {
    const imageUrl = '/banner/services.jpeg';
  const altText = 'Your Banner Description';
  return (
    <div className='Service-page'>
         <Bannersmall imageUrl={imageUrl} altText={altText} />
         <ServiceDetails />
         
    </div>
  )
}

export default ServicesDetails