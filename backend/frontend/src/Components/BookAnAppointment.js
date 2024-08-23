import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
  'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the',
  'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
  'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
  'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

function SignupForm() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [dragging, setDragging] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage modal visibility



  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (userState.userData) {
      navigate('/userdashboard');
    }
  }, [userState.userData, navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    const userData = {
      username: email,
      first_name: name,
      last_name: '', // Adjust if needed
      email: email,
      password: password,
    };

    formData.append('user', JSON.stringify(userData));
    formData.append('phone', phoneNumber);
    formData.append('medical_history', message);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('country', selectedCountry);

    selectedFiles.forEach((file, index) => {
      formData.append('medical_reports', file);
    });

    dispatch(createAppointment(formData))
    .unwrap()
    .then((userData) => {
      console.log('User registered successfully:', userData);
      navigate('/userdashboard');
    })
    .catch((error) => {
      console.error('Registration failed:', error);
    });

  };

  return (
    <div className='form-container'>
      <div className="steps">
        <h2>How It Work?</h2>
        <h3>The Amazing Steps Of Our Treatment</h3>
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-description">
            <h4>Book Your Appointment</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-description">
            <h4>In Person Counselling</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-description">
            <h4>Weekly Followup</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
      </div>
      <div className="form">
        <h3>Sign Up</h3>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <select id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="" disabled style={{ color: 'grey', fontStyle: 'italic' }} className="placeholder-option">Choose Your Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Your Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          
            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
          
        
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled style={{ color: 'grey', fontStyle: 'italic' }} className="placeholder-option">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          
          <div className={`upload-box ${dragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById('fileInput').click()}>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />
            <div className="upload-content">
              <img src="icons/upload-file.png" alt="Upload Icon" className="upload-icon" />
              <p>Drag & Drop your file(s) here or click to upload</p>
              <p className="upload-instructions">Only JPEG, PNG, GIF, and PDF files with a max size of 15 MB.</p>
            </div>
          </div>
          <div className="file-preview">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-thumbnail">
                  <img src="/icons/document.png" alt="File Thumbnail" />
                </div>
                <div className="file-details">
                  <p>{file.name}</p>
                  <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button type="button" className="remove-file" onClick={() => handleRemoveFile(index)}>✖</button>
              </div>
            ))}
          </div>
          <button type="submit" disabled={userState.status === 'loading'}>
            {userState.status === 'loading' ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="form-end">
          Already have an account?
          <span className="login-link" onClick={() => setIsLoginModalOpen(true)}>Log In</span>
        </p>
        </form>
        {userState.status === 'failed' && 
          <p className="error-message">Error: {typeof userState.error === 'string' ? userState.error : JSON.stringify(userState.error)}</p>
        }
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

    </div>
  );
}

export default SignupForm;
