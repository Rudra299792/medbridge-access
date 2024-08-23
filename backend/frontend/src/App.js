import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './Components/Header';
import Index from './Pages/Index';
import Services from './Pages/Services';
import CountryPage from './Pages/Countries';
import Footer from './Components/Footer';
import AboutUS from './Pages/AboutUs';
import HospitalPage from './Pages/Hospitals';
import SignUp from './Pages/BookAnAppointment';
import ChatApp from './Pages/ChatApp';
import HealthcareServiceForm from './Pages/ServiceForm';
import ServicesDetails from './Pages/ServicesDetails';
import MedicalTourism from './Pages/MedicalTourism';
import Dashboard from './Pages/UserDashboard';
import FounderMess from './Pages/FounderMess';
import DoctorDashboard from './Pages/DoctorDashboard';
import DoctorChatApp from './Pages/DoctorChat';
import DoctorRegistrationForm from './Pages/DoctorRegistrationForm';
import LoginPage from './Pages/DoctorLogin';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/services/:serviceId" element={<ServicesDetails />} />
              <Route exact path="/countries" element={<CountryPage />} />
              <Route exact path="/aboutus" element={<AboutUS />} />
              <Route exact path="/bookappointment" element={<SignUp />} />
              <Route exact path="/hospitals" element={<HospitalPage />} />
              <Route exact path="/medicaltourism" element={<MedicalTourism />} />
              <Route exact path="/admin/serviceform" element={<HealthcareServiceForm />} />
              <Route exact path="/userdashboard" element={<Dashboard />} />
              <Route exact path="/foundermessage" element={<FounderMess />} />
              <Route exact path="/doctors/doctordashboard" element={<DoctorDashboard />} />
              <Route exact path="/doctors/chat/:patientId" element={<DoctorChatApp />} />
              <Route exact path="/doctors/registration" element={<DoctorRegistrationForm />} />
              <Route exact path="/doctors/login" element={<LoginPage />} />


              <Route exact path="/chat" element={<ChatApp />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </Provider>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    '/userdashboard',
    '/doctors/doctordashboard',
    '/chat',
    '/doctors/registration',
    '/doctors/login',
  ];

  // Check if the current path matches any of the noHeaderFooterRoutes or dynamic routes
  const isHeaderFooterHidden = noHeaderFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/doctors/chat/');

  return (
    <>
      {!isHeaderFooterHidden && <Header />}
      <main>
        {children}
      </main>
      {!isHeaderFooterHidden && <Footer />}
    </>
  );
}


export default App;
