import React, { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import TravelPreferences from "./components/TravelPreferences";
import HealthSafety from "./components/HealthSafety";
import Summary from "./components/Summary";
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    email: "",
    phone: "",
    departureDate: "",
    returnDate: "",
    accommodation: "",
    specialRequests: "",
    healthDeclaration: "",
    emergencyContact: "",
    medicalConditions: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};

    // Step 1 - Personal Info validation
    if (step === 1) {
      if (!formData.fullName) errors.fullName = "Full Name is required.";
      if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid Email is required.";
      if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errors.phone = "Valid Phone number is required.";
    }

    // Step 2 - Travel Preferences validation
    if (step === 2) {
      if (!formData.departureDate) errors.departureDate = "Departure Date is required.";
      if (!formData.returnDate) errors.returnDate = "Return Date is required.";
      if (!formData.accommodation) errors.accommodation = "Accommodation selection is required.";
    }

    // Step 3 - Health & Safety validation
    if (step === 3) {
      if (formData.healthDeclaration === "") errors.healthDeclaration = "Health Declaration is required.";
      if (formData.healthDeclaration === "Yes" && !formData.emergencyContact) errors.emergencyContact = "Emergency Contact is required if Health Declaration is 'Yes'.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateForm()) {
      setFormSubmitted(true); // Set form as submitted
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1146/1146292.png" 
          alt="Mars" 
          className="inline-block" 
          style={{ width: '40px', height: '40px', marginRight: '10px' }} 
        />
        Mars Visit Application Form
      </h1>

      {formSubmitted ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Form Submitted Successfully!</h2>
          <p className="text-green-600">Your application has been submitted. We will contact you soon!</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          {step === 1 && (
            <PersonalInfo 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors}
            />
          )}
          {step === 2 && (
            <TravelPreferences 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors}
            />
          )}
          {step === 3 && (
            <HealthSafety 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors}
            />
          )}
          {step === 4 && (
            <Summary formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} setFormSubmitted={setFormSubmitted}/>
            
          )}
        </div>
      )}
    </div>
  );
};

export default App;
