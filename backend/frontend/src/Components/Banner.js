// src/Banner.js
import React from 'react';
import '../CSS/Banner.css';

const Banner = () => {
  return (

        <div class="slider-container">
       <div class="boxes-container">
    <div class="box box1">
        <div class="icon-container">
        <img src="icons/doctor.png" alt="Slide 1" class="" />
        </div>
        <div class="text-container">
            <h4>Our Services</h4>
            <h2>Professional & Expert Doctors</h2>
        </div>
    </div>
    <div class="box box2">
        <div class="icon-container">
        <img src="icons/hospital.png" alt="Slide 1" class="" />
        </div>
        <div class="text-container">
            <h4>Our Facilities</h4>
            <h2>State-of-the-Art Hospital</h2>
        </div>
    </div>
    <div class="box box3">
        <div class="icon-container">
        <img src="icons/sethoscope.png" alt="Slide 1" class="" />
        </div>
        <div class="text-container">
            <h4>Our Tools</h4>
            <h2>Modern Medical Equipment</h2>
        </div>
    </div>
</div>
            <div class="slide">
                <img src="banner/banner1.jpeg" alt="Slide 1" class="slide-image" />
            </div>
           
    </div>
    
    );
}

export default Banner;
