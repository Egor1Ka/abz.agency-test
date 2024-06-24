export const validateEmail = (email: string): string => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? "" : "Invalid email address";
};

export const validatePhone = (phone: string): string => {
  const re = /^[\d\s()+-]+$/;
  const cleaned = phone.replace(/\D/g, "");
  if (!re.test(phone)) {
    return "Phone number can only contain digits, spaces, and special characters";
  }
  if (cleaned.length !== 12) {
    return "Phone number must be +38 (XXX) XXX - XX - XX";
  }
  return "";
};
