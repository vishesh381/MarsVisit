import React, { useState } from "react";
import './HealthSafety.css';

const HealthSafety = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!formData.healthDeclaration) {
      formErrors.healthDeclaration = "Health declaration is required";
    }

    if (!formData.emergencyContact) {
      formErrors.emergencyContact = "Emergency contact is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(formData.emergencyContact) && !/^\+?[1-9]\d{1,14}$/i.test(formData.emergencyContact)) {
      formErrors.emergencyContact = "Please enter a valid phone number or email address";
    }

    return formErrors;
  };

  const handleNext = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      nextStep();
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="health-safety-container">
      <div className="form-container">
        <h2 className="text-xl font-semibold mb-4">Health & Safety</h2>

        <div className="form-group">
          <label htmlFor="healthDeclaration" className="label">Health Declaration</label>
          <select
            className={`input ${errors.healthDeclaration ? 'input-error' : ''}`}
            value={formData.healthDeclaration}
            onChange={(e) => setFormData({ ...formData, healthDeclaration: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.healthDeclaration && <p className="error-text">{errors.healthDeclaration}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact" className="label">Emergency Contact</label>
          <input
            className={`input ${errors.emergencyContact ? 'input-error' : ''}`}
            type="text"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          />
          {errors.emergencyContact && <p className="error-text">{errors.emergencyContact}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="medicalConditions" className="label">Any Medical Conditions (if applicable)</label>
          <textarea
            className="input"
            placeholder="Any Medical Conditions (if applicable)"
            value={formData.medicalConditions}
            onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
          ></textarea>
        </div>

        <div className="button-container">
          <button
            className="button back-button"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className="button next-button"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthSafety;
