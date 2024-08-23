import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor } from "../slices/doctorSlice";
import "../CSS/DoctorRegistrationForm.css"; // Import your CSS
import { Link, useNavigate } from "react-router-dom";
import TestimonialSection from "../Components/TestimonialSection";
const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    user: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    country: "",
    phone: "",
    degree: "",
    specialization: "",
    years_of_experience: "",
    branch: "",
    profile_photo: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this line
  const { loading, error, doctor } = useSelector((state) => state.doctor);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "profile_photo") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profile_photo: file,
        profile_photo_preview: URL.createObjectURL(file),
      });
    } else if (name.startsWith("user.")) {
      const userKey = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: {
          ...prevFormData.user,
          [userKey]: value,
          // Set username equal to email when email is changed
          ...(userKey === "email" ? { username: value } : {}),
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Serialize the user data to JSON and append it
    data.append("user", JSON.stringify(formData.user));

    // Append other form data
    Object.keys(formData).forEach((key) => {
      if (key !== "user") {
        data.append(key, formData[key]);
      }
    });

    try {
      const resultAction = await dispatch(createDoctor(data));
      if (createDoctor.fulfilled.match(resultAction)) {
        // Registration was successful
        navigate("/doctors/doctordashboard"); // Navigate to doctor dashboard
      }
    } catch (err) {
      // Handle any errors here
      console.error("Failed to register doctor:", err);
    }
  };

  const renderErrorMessages = (error) => {
    if (!error) return null;

    if (typeof error === "string") {
      return <p>{error}</p>;
    } else if (typeof error === "object") {
      return (
        <ul>
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>
              {key}:{" "}
              {Array.isArray(value) ? value.join(", ") : value.toString()}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="registration-container">
      <TestimonialSection />
      <form className="form-section" onSubmit={handleSubmit}>
        <h3>Create Account</h3>
        <p className="form-subheading">
          Join us and start making a difference in the world.
        </p>

        {/* Handle and display error messages */}
        {error && renderErrorMessages(error)}

        <div className="profile-photo-container">
          <label className="profile-photo-placeholder">
            {formData.profile_photo_preview ? (
              <img
                src={formData.profile_photo_preview}
                alt="Profile"
                className="profile-photo-preview"
              />
            ) : (
              <img
                src="/icons/medical-assistance.png"
                alt="Default profile icon"
              />
            )}
            <input
              type="file"
              name="profile_photo"
              onChange={handleChange}
              className="profile-photo-input"
            />
          </label>
        </div>

        <input
          type="text"
          name="user.first_name"
          placeholder="First Name"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="user.last_name"
          placeholder="Last Name"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="user.email"
          placeholder="Email"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="user.password"
          placeholder="Password"
          onChange={handleChange}
          className="form-input"
        />

        {/* Doctor profile fields */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="years_of_experience"
          placeholder="Years of Experience"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Create Account"}
        </button>

        {doctor && <p>Doctor registered successfully!</p>}
        <p className="form-end">
          Already have an account?<Link to="/doctors/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
