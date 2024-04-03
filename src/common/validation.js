export const validateEmail = email => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = phone => {
  // Regular expression for basic phone number validation
  const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
  return phoneRegex.test(phone);
};

export const validateOtp = otp => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(otp);
};