import React from "react";
import "../CSS/About.css";

const About = () => {
  return (
    <div className="about-us">
      <div className="about-us-box">
        <h1>About Us</h1>
        <p className="subtitle">Expert Care, Global Medical Solutions</p>

        <div className="section">
          <div className="content">
            <div className="text">
              <h2>Our Vision</h2>
              <p>
                To be the leading global provider of seamless, high-quality
                medical tourism and virtual consultation services, bridging the
                gap between exceptional healthcare and accessible expertise.
              </p>

              <p>
                We envision a world where every individual has the opportunity
                to access the best medical care, regardless of geographical
                boundaries. By leveraging innovative technologies and fostering
                international collaborations, we aim to redefine the healthcare
                experience, making it more inclusive, efficient, and
                patient-centered.
              </p>

              <p>
                Our ultimate goal is to create a global health network that
                empowers individuals to make informed health decisions and
                receive the care they deserve, whenever and wherever they need
                it.
              </p>
            </div>
            <div className="image">
              <img src="banner/vision.jpeg" alt="Vision" />
            </div>
          </div>
        </div>
      </div>

      <div className="about-us-box">
        <div className="section">
          <div className="content">
            <div className="image">
              <img src="banner/mission.jpeg" alt="Approach" />
            </div>
            <div className="text">
              <h2>Our Mission</h2>
              <p>
                At MedBridge Access, we believe in transcending borders to bring
                you the finest medical care and expertise. Our mission is to
                make exceptional healthcare not just a necessity, but an
                experience—one that combines the wonders of travel with the
                assurance of world-class medical treatment. We are committed to:
              </p>

              <p>
                <strong>Patient-Centered Care:</strong> Prioritizing the unique
                needs and preferences of each patient to provide personalized,
                compassionate care.
              </p>

              <p>
                <strong>Global Accessibility:</strong> Connecting patients with
                leading healthcare providers across the globe, ensuring access
                to the best medical treatments and specialists.
              </p>

              <p>
                <strong>Innovative Solutions:</strong> Utilizing cutting-edge
                technologies and innovative practices to enhance the efficiency,
                quality, and accessibility of our services.
              </p>

              <p>
                <strong>Seamless Coordination:</strong> Managing all aspects of
                the medical travel experience, from initial consultations to
                post-treatment follow-ups, to ensure a smooth and stress-free
                journey.
              </p>

              <p>
                <strong>Empowerment Through Information:</strong> Providing
                patients with comprehensive, transparent information to help
                them make informed healthcare decisions with confidence.
              </p>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className="text">
              <h2>Our Core Values</h2>

              <p>
                <strong>Excellence:</strong> We strive for the highest standards
                in medical care and customer service.
              </p>

              <p>
                <strong>Compassion:</strong> We care deeply about our patients
                and their well-being.
              </p>

              <p>
                <strong>Integrity:</strong> We operate with honesty,
                transparency, and respect.
              </p>

              <p>
                <strong>Innovation:</strong> We embrace technology and new ideas
                to provide superior healthcare solutions.
              </p>

              <p>
                <strong>Collaboration:</strong> We work together with global
                healthcare providers to deliver the best outcomes for our
                patients.
              </p>
            </div>

            <div className="image">
              <img src="banner/corevalue.jpeg" alt="Approach" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
