import React from 'react';
import '../CSS/CompassionateCare.css'

const CompassionateCare = () => {
    return (
      <div className="compassionate-care">
        <div className="banner">
          <div className="overlay">
            <div className="play-button-1">
              <i className="fas fa-play"></i>
            </div>
            <h1>We Care With Compassion</h1>
            <p>
            Access ethical, cost-effective medical opinions and medical tourism services with top doctors worldwide. We offer trusted medical advice and seamless travel arrangements for high-quality care, ensuring your health and well-being are prioritized every step of the way.
            </p>
          </div>
        </div>
        <div className="testimonial">
          <div className="testimonial-content">
            <h2>What They Say ?</h2>
            <h3>Love To Serve You, With Compassionate Care</h3>
            <p>
              Sed congue mollis orci id tempus. Etiam semper elit et turpis ornare posuere et at erat elit. Nulla facilisi.
              Nullam augue lectus, lobortis et risus id, ornare porttitor arcu. Pellentesque habitant morbi tristique senectus et netus.
            </p>
            <button className="contact-button">Contact Us</button>
          </div>
          <div className="testimonial-review">
          <div className="rating">
                ★★★★★
              </div>
            <div className="review">
              <p>
                Nulla mollis tincidunt lorem. Nam at accumsan felis, vitae pharetra nunc. Morbi imperdiet dui eu facilisis vestibulum. 
                Sed dignissim non nibh auctor finibus. Integer mollis varius maximus.
              </p>
              </div>
              <div className="reviewer">
                <img src="/banner/reviews.jpg" alt="Reviewer" />
                <div className="reviewer-info">
                  <strong>Kumto Warming</strong>
                  <span>Designation</span>
                </div>
             
             
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CompassionateCare;