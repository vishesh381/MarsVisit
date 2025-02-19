import React from "react";
import './PersonalInfo.css';

const PersonalInfo = ({ formData, setFormData, nextStep, formErrors, setFormErrors }) => {

  const validateAge = () => {
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      return age - 1;
    }

    return age;
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    const age = validateAge();
    if (age < 18) {
      setFormErrors({
        ...formErrors,
        dateOfBirth: "You must be at least 18 years old to visit Mars."
      });
      console.log("Age is under 18, setting error:", formErrors.dateOfBirth); 
    } else {
      setFormErrors({
        ...formErrors,
        dateOfBirth: "" 
      });
      nextStep(); 
    }
  };

  
  console.log("formErrors state:", formErrors);

  return (
    <div className="personal-info-container">
      <div className="form-container">
        <h2 className="title">Stage 1 - Personal Information</h2>
        
        <div className="form-group">
          <label htmlFor="fullName" className="label">Full Name</label>
          <input 
            id="fullName"
            className={`input ${formErrors.fullName ? 'input-error' : ''}`} 
            type="text" 
            placeholder="Enter your full name" 
            value={formData.fullName} 
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
          />
          {formErrors.fullName && <p className="error-text">{formErrors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
          <input 
            id="dateOfBirth"
            className={`input ${formErrors.dateOfBirth ? 'input-error' : ''}`} 
            type="date" 
            value={formData.dateOfBirth} 
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} 
          />
          {formErrors.dateOfBirth && <p className="error-text">{formErrors.dateOfBirth}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">Email</label>
          <input 
            id="email"
            className={`input ${formErrors.email ? 'input-error' : ''}`} 
            type="email" 
            placeholder="Enter your email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
          {formErrors.email && <p className="error-text">{formErrors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="label">Phone</label>
          <input 
            id="phone"
            className={`input ${formErrors.phone ? 'input-error' : ''}`} 
            type="tel" 
            placeholder="Enter your phone number" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          />
          {formErrors.phone && <p className="error-text">{formErrors.phone}</p>}
        </div>

        <button 
          className="submit-button"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
