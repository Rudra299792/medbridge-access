import React from 'react'
import '../CSS/Form.css'
function Form() {
  return (
    <div className='form-container'>
        <div className="steps">
    <h2>How It Work ?</h2>
    <h3>The Amazing Steps Of Our Treatment</h3>
    <div className="step">
      <div className="step-number">1</div>
      <div className="step-description">
        <h4>Primary Medical Opinion</h4>
        <p> Get expert evaluations and accurate diagnoses from top healthcare professionals to guide your treatment decisions.</p>
      </div>
    </div>
    <div className="step">
      <div className="step-number">2</div>
      <div className="step-description">
        <h4>Second Opinion</h4>
        <p>Receive a thorough review and confirmation of your diagnosis and treatment plan from a second expert for added assurance.</p>
      </div>
    </div>
    <div className="step">
      <div className="step-number">3</div>
      <div className="step-description">
        <h4>Medical Tourism</h4>
        <p>Access world-class medical care abroad, tailored to your needs and budget, with full support and coordination services.</p>
      </div>
    </div>
  </div>
  <div className="form">
    <h3>Fill The Form</h3>
    <h1>Get In Touch</h1>
    <form>
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <input type="text" placeholder="Your Number" />
      <textarea placeholder="Your Message"></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div></div>
  )
}

export default Form