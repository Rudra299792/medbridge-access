import React from 'react'
import '../CSS/Countries.css'

const countries = [
  { name: "United States", role: "Expert Team", imageUrl: "/countries/america.png" },
  { name: "Canada", role: "Expert Team", imageUrl: "/countries/canada.png" },
  { name: "Germany", role: "Expert Team", imageUrl: "/countries/germany.png" },
  { name: "France", role: "Expert Team", imageUrl: "/countries/france.png" },
  { name: "Italy", role: "Expert Team", imageUrl: "/countries/italy.png" },
  { name: "Spain", role: "Expert Team", imageUrl: "/countries/spain.png" }
];




function Countries() {
  return (
    <div className="country-container">
    <p>Meet Our Beloved Countries</p>
    <h1>Always Here For You & Them</h1>
    <div style={{ backgroundImage: `url(countries/canada.png)`}} ></div>
    <div className="country-grid">
  {countries.map((country, index) => (
    <div key={index} className="country-card">
      <div
        className="country-image-placeholder"
        style={{ backgroundImage: `url(${country.imageUrl})`}}
      >
        
      </div>
      <div className="country-info">
        <h4>{country.name}</h4>
        <p>{country.role}</p>
      </div>
    </div>
  ))}
</div>
  </div>
  )
}

export default Countries