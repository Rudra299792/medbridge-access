import React from 'react'
import About from '../Components/About'
import AboutUs from '../Components/AboutUs'
import Bannersmall from '../Components/Bannersmall'
function AboutUS () {
  const imageUrl = 'banner/aboutus.jpeg';
    const altText = 'Your Banner Description';
  return (
    <div>
      <Bannersmall imageUrl={imageUrl} altText={altText} />
         <About />
    </div>
  )
}

export default AboutUS
