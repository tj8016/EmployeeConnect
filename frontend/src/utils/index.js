export const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
};

export const ValidateMobile = (mobile) => {
  let re = /^\d{10,13}$/;
  return re.test(mobile);
};
