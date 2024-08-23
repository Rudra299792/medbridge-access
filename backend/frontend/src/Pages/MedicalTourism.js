import React from 'react'
import MedicalTourismBanner from '../Components/MedicalTourismBanner'
import MedicalProcess from '../Components/MedicalProcess'
import MedicalTourismOptions from '../Components/MedicalTourismOptions'
import FAQ from '../Components/FAQ'
function MedicalTourism() {
   
  return (
    <div className='medical-tourism-page'>
      <MedicalTourismBanner />
      <section className="patient-survey">
      <h2>Medical Tourism Patient Survey</h2>
      <p>The Medical Tourism Association, in collaboration with the International Healthcare Research Center, has gathered critical insights into why patients are increasingly choosing to travel for medical care. This comprehensive 31-page report sheds light on the decision-making process, motivations, and concerns of medical tourists, focusing on aspects like the search for superior medical expertise, trust in healthcare providers, cost-effectiveness, and the appeal of innovative treatments. These findings are crucial for healthcare providers looking to tailor their services to meet the evolving needs and expectations of patients globally, ensuring not only the highest standards of care but also building the essential trust and confidence that underpins the decision to seek medical treatment abroad.</p>
    </section>
      <MedicalProcess />
      <MedicalTourismOptions />
      <FAQ />

    </div>
  )
}

export default MedicalTourism