import React from 'react'

const hospitals = [
    { name: "Sarvodaya Hospital", role: "Expert Team", imageUrl: "/hospitals/sarvodaya.png" },
    { name: "AIIMS", role: "Expert Team", imageUrl: "/hospitals/aiims.png" },
    { name: "Apollo Hospitals", role: "Expert Team", imageUrl: "/hospitals/apollo.png" },
    { name: "Fortis Healthcare", role: "Expert Team", imageUrl: "/hospitals/fortis.png" },
    { name: "Manipal Hospitals", role: "Expert Team", imageUrl: "/hospitals/manipal.png" },
    { name: "Narayana Health", role: "Expert Team", imageUrl: "/hospitals/narayana.png" },
    { name: "Max Healthcare", role: "Expert Team", imageUrl: "/hospitals/max.png" },
    { name: "Amrita Hospital", role: "Expert Team", imageUrl: "/hospitals/amrita.png" }
];


function Hospital() {
  return (
    <div className="country-container">
    <p>Meet Our Beloved Hospitals</p>
    <h1>Always Here For You & Them</h1>
    <div className="country-grid">
  {hospitals.map((country, index) => (
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

export default Hospital