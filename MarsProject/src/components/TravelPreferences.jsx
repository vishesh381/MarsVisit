import React, { useState } from "react";
import './TravelPreferences.css';  

const TravelPreferences = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    
    if (!formData.departureDate) formErrors.departureDate = "Departure date is required";
    if (!formData.returnDate) formErrors.returnDate = "Return date is required";
    if (!formData.accommodation) formErrors.accommodation = "Accommodation is required";

    if (formData.departureDate && formData.returnDate) {
      const departureDate = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);

      if (returnDate < departureDate) {
        formErrors.returnDate = "Return date cannot be earlier than departure date";
      }
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
    <div className="travel-preferences-container">
      <div className="form-container">
        <h2 className="title">Travel Preferences</h2>

        <div className="form-group">
          <label htmlFor="departureDate" className="label">Departure Date</label>
          <input
            className={`input ${errors.departureDate ? 'input-error' : ''}`}
            type="date"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
          />
          {errors.departureDate && <p className="error-text">{errors.departureDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="returnDate" className="label">Return Date</label>
          <input
            className={`input ${errors.returnDate ? 'input-error' : ''}`}
            type="date"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
          />
          {errors.returnDate && <p className="error-text">{errors.returnDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="accommodation" className="label">Accommodation</label>
          <select
            className={`input ${errors.accommodation ? 'input-error' : ''}`}
            value={formData.accommodation}
            onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
          >
            <option value="">Select Accommodation</option>
            <option value="Space Hotel">Space Hotel</option>
            <option value="Martian Base">Martian Base</option>
          </select>
          {errors.accommodation && <p className="error-text">{errors.accommodation}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests" className="label">Special Requests or Preferences</label>
          <textarea
            className="input"
            placeholder="Special Requests or Preferences"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
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

export default TravelPreferences;
