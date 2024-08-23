import React from 'react'
import Banner from '../Components/Banner';
import AboutUs from '../Components/AboutUs';
import OurService from '../Components/OurService';
import CompassionateCare from '../Components/CompassionateCare';
import Form from '../Components/Form';

function Index() {

  console.log('Index component is rendered');
  return (
    <div>
        <Banner />
      <AboutUs />
      <OurService />
      <CompassionateCare />
      <Form />
    </div>
  )
}

export default Index