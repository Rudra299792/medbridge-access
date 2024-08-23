import React from 'react'
import Bannersmall from '../Components/Bannersmall'
import Countries from '../Components/Countries';

function CountryPage() {
    const imageUrl = 'https://via.placeholder.com/500x200';
    const altText = 'Your Banner Description';
  return (
    <div>
          <Bannersmall imageUrl={imageUrl} altText={altText} />
          <Countries />
    </div>
  )
}

export default CountryPage