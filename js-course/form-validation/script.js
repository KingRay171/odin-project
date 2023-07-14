const email = document.getElementById("email");
const emailError = document.querySelector(".email-error");
const country = document.getElementById("country");
const countryError = document.querySelector(".country-error");
const zipCode = document.getElementById("zip");
const zipCodeError = document.querySelector(".zip-error");
const password = document.getElementById("password");
const passwordError = document.querySelector(".pw-error");
const confirm = document.getElementById("passconf");
const confirmError = document.querySelector(".conf-error");
const submit = document.getElementById("submit");

const showEmailError = () => {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = "error active";
};

const showCountryError = () => {
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to enter a country";
  } else if (email.validity.typeMismatch) {
    countryError.textContent = "Entered value needs to be a country";
  }
  countryError.className = "error active";
};

const showZipError = () => {
  if (zipCode.validity.valueMissing) {
    zipCodeError.textContent = "You need to enter a zip code";
  } else if (zipCode.validity.typeMismatch) {
    zipCodeError.textContent = "Entered value must be a zip code";
  } else if (zipCode.validity.tooShort || zipCode.validity.tooLong) {
    zipCodeError.textContent = "Zip code must be 5 digits";
  } else if (
    zipCode.validity.rangeOverflow ||
    zipCode.validity.rangeUnderflow
  ) {
    zipCodeError.textContent = `Zip code must be between ${zipCode.min} and ${zipCode.max}`;
  }
  zipCodeError.className = "error active";
};

const showPasswordError = () => {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password";
  } else if (password.validity.tooShort) {
    passwordError.textContent = "Password must be greater than 8 characters";
  }

  passwordError.className = "error active";
};

const showConfirmError = () => {
  confirmError.textContent = "";
  if (confirm.validity.valueMissing) {
    confirmError.textContent = "You need to confirm your password";
  } else if (confirm.value !== password.value) {
    confirmError.textContent = "Passwords need to match";
  } else if (confirm.validity.tooShort) {
    confirmError.textContent = "Confirmation is too short";
  }

  confirmError.className = "error active";
};

email.addEventListener("input", () => {
  if (!email.validity.valid) {
    showEmailError();
  } else {
    email.setCustomValidity("");
    emailError.textContent = "";
    emailError.className = "error";
  }
});

country.addEventListener("input", () => {
  if (!country.validity.valid) {
    showCountryError();
  } else {
    country.setCustomValidity("");
    countryError.textContent = "";
    countryError.className = "error";
  }
});

zipCode.addEventListener("input", () => {
  if (!zipCode.validity.valid) {
    showZipError();
  } else {
    zipCode.setCustomValidity("");
    zipCodeError.textContent = "";
    zipCodeError.className = "error";
  }
});

password.addEventListener("input", () => {
  if (!password.validity.valid) {
    showPasswordError();
  } else {
    password.setCustomValidity("");
    passwordError.textContent = "";
    passwordError.className = "error";
  }

  showConfirmError();

  if (confirmError.textContent == "") {
    confirm.setCustomValidity("");
    confirmError.className = "error";
  }
});

confirm.addEventListener("input", () => {
  showConfirmError();

  if (confirmError.textContent == "") {
    confirm.setCustomValidity("");
    confirmError.className = "error";
  }
});
