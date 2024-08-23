import React from 'react'
import Bannersmall from '../Components/Bannersmall'
import Hospital from '../Components/Hospital';

function HospitalPage() {
    const imageUrl = 'https://via.placeholder.com/500x200';
    const altText = 'Your Banner Description';
  return (
    <div>
          <Bannersmall imageUrl={imageUrl} altText={altText} />
          <Hospital />
    </div>
  )
}

export default HospitalPage