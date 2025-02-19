import React, { useState } from "react";
import emailjs from "emailjs-com";
import './Summary.css';

const Summary = ({ formData, prevStep, setFormSubmitted }) => {
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = () => {
    if (isSubmitted) {
      // If email is already submitted, prevent submitting again
      return;
    }

    const emailTemplateParams = {
      to_email: formData.email, 
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      phone: formData.phone,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      accommodation: formData.accommodation,
      specialRequests: formData.specialRequests,
      healthDeclaration: formData.healthDeclaration,
      emergencyContact: formData.emergencyContact,
      medicalConditions: formData.medicalConditions,
    };
    console.log("Email Template Params:", emailTemplateParams);  

    emailjs
      .send(
        'service_a6ppvsg', 
        'template_ivgbx1e', 
        emailTemplateParams,
        '7dY3ZqPswiMZ3i3Fa'
      )
      .then(
        (response) => {
          alert("Form Submitted and Email Sent Successfully!");
          setIsSubmitted(true); 
          setFormSubmitted(true); 
        },
        (error) => {
          alert("An error occurred while sending the email.");
        }
      );
  };

  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-details">
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Departure Date:</strong> {formData.departureDate}</p>
        <p><strong>Return Date:</strong> {formData.returnDate}</p>
        <p><strong>Accommodation:</strong> {formData.accommodation}</p>
        <p><strong>Special Requests:</strong> {formData.specialRequests}</p>
        <p><strong>Health Declaration:</strong> {formData.healthDeclaration}</p>
        <p><strong>Emergency Contact:</strong> {formData.emergencyContact}</p>
        <p><strong>Medical Conditions:</strong> {formData.medicalConditions}</p>
      </div>
      <div className="flex-container">
        <button className="button back-button" onClick={prevStep}>Back</button>
        <button 
          className="button submit-button" 
          onClick={handleSubmit}
          disabled={isSubmitted} 
        >
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Summary;
