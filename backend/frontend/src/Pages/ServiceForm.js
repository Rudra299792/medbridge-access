import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../slices/serviceSlice';
import '../CSS/ServiceForm.css';

const HealthcareServiceForm = () => {
  const [heading, setHeading] = useState('');
  const [oneLineDescription, setOneLineDescription] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [details, setDetails] = useState([{ content: '' }]);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const serviceStatus = useSelector((state) => state.service.status);
  const serviceError = useSelector((state) => state.service.error);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        alert('File size exceeds the limit of 20MB.');
        return;
      }

      setFrontImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDetailChange = (index, event) => {
    const newDetails = [...details];
    newDetails[index].content = event.target.value;
    setDetails(newDetails);
  };

  const addDetailField = () => {
    setDetails([...details, { content: '' }]);
  };

  const removeDetailField = (index) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!frontImage) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('one_line_description', oneLineDescription);
    formData.append('front_image', frontImage);
    details.forEach((detail, index) => {
      formData.append(`details[${index}][content]`, detail.content);
    });
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
          dispatch(addService(formData));
  };

  return (
    <form onSubmit={handleSubmit} className='service-form'>
      <h1>Service Detail's Form</h1>
      <div className='heading-field'>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder='Write The Name Of The Service'
        />
      </div>
      <div className='image-upload'>
        {imagePreview && (
          <div style={{ width: '300px', height: '200px', border: '1px solid #ddd', marginBottom: '10px' }}>
            <img src={imagePreview} alt="Front" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button type="button" onClick={() => fileInputRef.current.click()}>
          Upload Front Image
        </button>
      </div>
      <div className='description-field'>
        <input
          type="text"
          value={oneLineDescription}
          onChange={(e) => setOneLineDescription(e.target.value)}
          placeholder='Write a One Line Description of the Service'
        />
      </div>
      <div className='text-inputs'>
      {details.map((detail, index) => {
  console.log(typeof detail.content); // Should always log 'string'
  console.log(detail.content); // Should log the actual string content

  return (
    <div key={index} className='detail-field'>
      <input
        type="text"
        value={detail.content}
        onChange={(e) => handleDetailChange(index, e)}
        placeholder={`Enter Detail`}
      />
      {details.length > 1 && (
        <button type="button" onClick={() => removeDetailField(index)}>×</button>
      )}
      {index === details.length - 1 && (
        <button type="button" onClick={addDetailField}>+ Add Detail</button>
      )}
    </div>
  );
})}

</div>

      <button type="submit">Submit</button>
      {serviceStatus === 'loading' && <p>Loading...</p>}
      {serviceStatus === 'succeeded' && <p>Service added successfully</p>}
      {serviceStatus === 'failed' && <p>Error: {serviceError}</p>}
    </form>
  );
};

export default HealthcareServiceForm;
