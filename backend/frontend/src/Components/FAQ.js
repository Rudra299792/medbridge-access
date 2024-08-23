import React, { useState } from 'react';
import '../CSS/FAQ.css'; // Include your CSS file for styling

const FAQ = () => {
  // Define the questions and answers
  const faqs = [
    {
      question: "How Much Should I Budget for My Medical Tourism Trip?",
      answer: "The budget for a medical tourism trip varies based on the destination, type of treatment, and personal preferences. It's important to consider all associated costs including travel, accommodation, and medical expenses."
    },
    {
      question: "What Medical Tourism Research does the Medical Tourism Association® conduct?",
      answer: "The Medical Tourism Association® conducts research on market trends, patient experiences, and healthcare providers to provide valuable insights to the industry."
    },
    {
      question: "What are the Cost Savings?",
      answer: "Medical tourism can offer significant cost savings compared to treatments in your home country, often up to 50-70% less depending on the procedure and destination."
    },
    {
        question: "What is a Medical Tourism Facilitator?",
        answer: "Sometimes referred to as medical tourism agencies, or a medical travel facilitator, these are companies that, as their name suggests, act as facilitators or intermediaries for patients seeking treatments in other countries or regions."
      },
    // Add more FAQs as needed
  ];

  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle the visibility of the answer
  const toggleAnswer = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {faq.question}
              <span className="faq-arrow">{openIndex === index ? '▼' : '►'}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            <hr className="faq-divider" />

          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
