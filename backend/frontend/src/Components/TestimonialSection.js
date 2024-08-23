import React from 'react'

function TestimonialSection() {
    const backgroundStyle = {
        backgroundImage: `url(/banner/doctor-reg.jfif)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        textAlign: 'center',
        width: '60%',
      };
  return (
    <div className="testimonial-section" style={backgroundStyle}>
    <div className="logo-placeholder">
    <div className='logo-box' >
  <img src='/icons/logo.png' alt='Medbridge-access-logo' className="Medbridge-access-logo" />
  <div className="logo">
    <h1><span className="title-we">Med</span>
    <div className="title-2"><span>Bridge</span> <span>Access</span></div>
    </h1>
  </div>
  </div>
    </div>
    <h2 className="testimonial-quote">"Wherever the art of medicine is loved, there is also a love of humanity."</h2>
    <p className="testimonial-author">- Hippocrates</p>
  </div>
  )
}

export default TestimonialSection