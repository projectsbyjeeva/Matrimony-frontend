import { FormEvent, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import "./Register.css";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

type RegisterProps = {
  open: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
};

type SelectOption = {
  value: string;
  label: string;
};

type RegisterFormData = {
  profileFor: string;
  gender: string;
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  religion: string;
  community: string;
  acceptTerms: boolean;
};

const initialFormData: RegisterFormData = {
  profileFor: "",
  gender: "",
  fullName: "",
  dateOfBirth: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "India",
  state: "",
  city: "",
  religion: "",
  community: "",
  acceptTerms: false,
};

const countryOptions: SelectOption[] = [
  { value: "India", label: "India" },
  { value: "Singapore", label: "Singapore" },
  { value: "Malaysia", label: "Malaysia" },
  {
    value: "United Arab Emirates",
    label: "United Arab Emirates",
  },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "United Kingdom", label: "United Kingdom" },
];

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const indianStateOptions: SelectOption[] = indianStates.map(
  (state) => ({
    value: state,
    label: state,
  })
);

export default function Register({
  open,
  onClose,
  onLoginClick,
}: RegisterProps) {
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", closeOnEscape);
    }

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const updateField = (
    field: keyof RegisterFormData,
    value: string | boolean
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleProfileForChange = (profileFor: string) => {
    let gender = "";

    if (profileFor === "son" || profileFor === "brother") {
      gender = "male";
    } else if (
      profileFor === "daughter" ||
      profileFor === "sister"
    ) {
      gender = "female";
    }

    setFormData((previous) => ({
      ...previous,
      profileFor,
      gender,
    }));

    setErrors((previous) => ({
      ...previous,
      profileFor: "",
      gender: "",
    }));
  };


  const handleCountryChange = (country: string) => {
    setFormData((previous) => ({
      ...previous,
      country,
      state: "",
    }));

    setErrors((previous) => ({
      ...previous,
      country: "",
      state: "",
    }));
  };

  const handleStateChange = (state: string) => {
    setFormData((previous) => ({
      ...previous,
      state,
    }));

    setErrors((previous) => ({
      ...previous,
      state: "",
    }));
  };

  const validateStep = () => {
    const newErrors: Partial<
      Record<keyof RegisterFormData, string>
    > = {};

    if (step === 1) {
      if (!formData.profileFor) {
        newErrors.profileFor = "Please select profile type";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select gender";
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = "Please enter the full name";
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Please select date of birth";
      }
    }

    if (step === 2) {
      if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile =
          "Enter a valid 10-digit mobile number";
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email address";
      }

      if (formData.password.length < 8) {
        newErrors.password =
          "Password must contain at least 8 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword =
          "Please confirm your password";
      } else if (
        formData.password !== formData.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 3) {
      if (!formData.country.trim()) {
        newErrors.country =
          "Please select or enter your country";
      }

      if (!formData.state.trim()) {
        newErrors.state =
          formData.country === "India"
            ? "Please select or enter your state"
            : "Please enter your state, province or region";
      }

      if (!formData.city.trim()) {
        newErrors.city = "Please enter your city or district";
      }

      if (!formData.religion) {
        newErrors.religion = "Please select religion";
      }

      if (!formData.community) {
        newErrors.community = "Please select community";
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms =
          "Please accept the terms and privacy policy";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep()) {
      setStep((current) => Math.min(current + 1, 3));
    }
  };

  const goToPreviousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateStep()) return;

    const submissionData = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      country: formData.country.trim(),
      state: formData.state.trim(),
      city: formData.city.trim(),
    };

    console.log("Registration details:", submissionData);

  
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const selectedCountryOption: SelectOption | null =
    formData.country
      ? {
        value: formData.country,
        label: formData.country,
      }
      : null;

  const selectedStateOption: SelectOption | null =
    formData.state
      ? {
        value: formData.state,
        label: formData.state,
      }
      : null;

  const genderIsAutomatic =
    formData.profileFor === "son" ||
    formData.profileFor === "brother" ||
    formData.profileFor === "daughter" ||
    formData.profileFor === "sister";

  return (
    <div
      className="register-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="register-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <button type="button" className="close-btn"
          onClick={onClose}
          aria-label="Close registration form"
        >
          <FaTimes />
        </button>

        <div className="register-layout">
          <aside className="register-side-panel">
            <div>
              <div className="register-brand">
                <h2>VALLUVAN</h2>
                <p>MATRIMONY</p>
              </div>

              <h3>
                Begin your journey to a meaningful match.
              </h3>

              <p className="side-description">
                Create your account securely and complete your
                matrimony profile in a few simple steps.
              </p>
            </div>

            <div className="side-benefits">
              <div className="side-benefit">
                <span>
                  <FaShieldAlt />
                </span>

                <div>
                  <strong>Privacy protected</strong>
                  <small>
                    Your contact details remain secure.
                  </small>
                </div>
              </div>

              <div className="side-benefit">
                <span>
                  <FaUser />
                </span>

                <div>
                  <strong>Genuine profiles</strong>
                  <small>
                    Designed for trusted Tamil families.
                  </small>
                </div>
              </div>

              <div className="side-benefit">
                <span>
                  <FaMapMarkerAlt />
                </span>

                <div>
                  <strong>Relevant matches</strong>
                  <small>
                    Find suitable profiles by preference.
                  </small>
                </div>
              </div>
            </div>
          </aside>

          <main className="register-main">
            <div className="mobile-brand">
              <h2>VALLUVAN</h2>
              <p>MATRIMONY</p>
            </div>

            <div className="register-title-section">
              <span className="step-label">
                STEP {step} OF 3
              </span>

              <h2 id="register-title">
                {step === 1 && "Basic Information"}
                {step === 2 && "Account Security"}
                {step === 3 && "Location & Community"}
              </h2>

              <p>
                {step === 1 &&
                  "Tell us who this matrimony profile is for."}

                {step === 2 &&
                  "Enter your contact and login information."}

                {step === 3 &&
                  "Help us provide more relevant profile matches."}
              </p>
            </div>

            <div className="stepper">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`stepper-item ${step >= item ? "active" : ""
                    }`}
                >
                  <div className="step-circle">
                    {step > item ? <FaCheck /> : item}
                  </div>

                  <span>
                    {item === 1 && "Basic"}
                    {item === 2 && "Account"}
                    {item === 3 && "Details"}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="form-step">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profileFor">
                        Profile created for <span>*</span>
                      </label>

                      <select
                        id="profileFor"
                        value={formData.profileFor}
                        onChange={(event) =>
                          handleProfileForChange(
                            event.target.value
                          )
                        }
                        className={
                          errors.profileFor
                            ? "input-error"
                            : ""
                        }
                      >
                        <option value="">
                          Select profile type
                        </option>
                        <option value="myself">Myself</option>
                        <option value="son">Son</option>
                        <option value="daughter">
                          Daughter
                        </option>
                        <option value="brother">
                          Brother
                        </option>
                        <option value="sister">Sister</option>
                        <option value="relative">
                          Relative
                        </option>
                        <option value="friend">Friend</option>
                      </select>

                      {errors.profileFor && (
                        <small className="error-message">
                          {errors.profileFor}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">
                        Gender <span>*</span>
                      </label>

                      <select
                        id="gender"
                        value={formData.gender}
                        disabled={genderIsAutomatic}
                        onChange={(event) =>
                          updateField(
                            "gender",
                            event.target.value
                          )
                        }
                        className={
                          errors.gender ? "input-error" : ""
                        }
                      >
                        <option value="">
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">
                          Female
                        </option>
                      </select>

                      {errors.gender && (
                        <small className="error-message">
                          {errors.gender}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full name <span>*</span>
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      placeholder="Enter the name as per official records"
                      onChange={(event) =>
                        updateField(
                          "fullName",
                          event.target.value
                        )
                      }
                      className={
                        errors.fullName
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.fullName && (
                      <small className="error-message">
                        {errors.fullName}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">
                      Date of birth <span>*</span>
                    </label>

                    <input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(event) =>
                        updateField(
                          "dateOfBirth",
                          event.target.value
                        )
                      }
                      className={
                        errors.dateOfBirth
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.dateOfBirth && (
                      <small className="error-message">
                        {errors.dateOfBirth}
                      </small>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="form-step">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mobile">
                        Mobile number <span>*</span>
                      </label>

                      <div className="phone-input">
                        <span>+91</span>

                        <input
                          id="mobile"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={formData.mobile}
                          placeholder="Enter 10-digit number"
                          onChange={(event) =>
                            updateField(
                              "mobile",
                              event.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                          className={
                            errors.mobile
                              ? "input-error"
                              : ""
                          }
                        />
                      </div>

                      {errors.mobile && (
                        <small className="error-message">
                          {errors.mobile}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email address <span>*</span>
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        placeholder="example@email.com"
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value
                          )
                        }
                        className={
                          errors.email ? "input-error" : ""
                        }
                      />

                      {errors.email && (
                        <small className="error-message">
                          {errors.email}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">
                        Create password <span>*</span>
                      </label>

                      <div className="password-field">
                        <input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={formData.password}
                          placeholder="Minimum 8 characters"
                          onChange={(event) =>
                            updateField(
                              "password",
                              event.target.value
                            )
                          }
                          className={
                            errors.password
                              ? "input-error"
                              : ""
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (current) => !current
                            )
                          }
                          aria-label="Show or hide password"
                        >
                          {showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <small className="error-message">
                          {errors.password}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Confirm password <span>*</span>
                      </label>

                      <div className="password-field">
                        <input
                          id="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={formData.confirmPassword}
                          placeholder="Re-enter your password"
                          onChange={(event) =>
                            updateField(
                              "confirmPassword",
                              event.target.value
                            )
                          }
                          className={
                            errors.confirmPassword
                              ? "input-error"
                              : ""
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              (current) => !current
                            )
                          }
                          aria-label="Show or hide confirm password"
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>

                      {errors.confirmPassword && (
                        <small className="error-message">
                          {errors.confirmPassword}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="security-note">
                    <FaShieldAlt />

                    <p>
                      Your contact details will not be shown
                      publicly without your permission.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="form-step">
                  <div className="form-row">
                    {/* COUNTRY */}
                    <div className="form-group">
                      <label htmlFor="country">
                        Country <span>*</span>
                      </label>

                      <CreatableSelect<SelectOption, false>
                        inputId="country"
                        options={countryOptions}
                        value={selectedCountryOption}
                        onChange={(selectedOption) =>
                          handleCountryChange(
                            selectedOption?.value ?? ""
                          )
                        }
                        onCreateOption={(enteredCountry) =>
                          handleCountryChange(
                            enteredCountry.trim()
                          )
                        }
                        placeholder="Search or enter country"
                        isClearable
                        isSearchable
                        formatCreateLabel={(enteredValue) =>
                          `Add "${enteredValue}"`
                        }
                        noOptionsMessage={() =>
                          "Country not found. Type it and press Enter."
                        }
                        className={
                          errors.country
                            ? "react-select-error"
                            : ""
                        }
                        classNamePrefix="country-select"
                      />

                      {errors.country && (
                        <small className="error-message">
                          {errors.country}
                        </small>
                      )}
                    </div>

                    {/* STATE */}
                    <div className="form-group">
                      <label htmlFor="state">
                        State / Province <span>*</span>
                      </label>

                      <CreatableSelect<SelectOption, false>
                        inputId="state"
                        options={
                          formData.country === "India"
                            ? indianStateOptions
                            : []
                        }
                        value={selectedStateOption}
                        onChange={(selectedOption) =>
                          handleStateChange(
                            selectedOption?.value ?? ""
                          )
                        }
                        onCreateOption={(enteredState) =>
                          handleStateChange(
                            enteredState.trim()
                          )
                        }
                        placeholder={
                          !formData.country
                            ? "Select country first"
                            : formData.country === "India"
                              ? "Search or enter Indian state"
                              : "Enter state, province or region"
                        }
                        isDisabled={!formData.country}
                        isClearable
                        isSearchable
                        formatCreateLabel={(enteredValue) =>
                          `Add "${enteredValue}"`
                        }
                        noOptionsMessage={({ inputValue }) =>
                          inputValue
                            ? `Press Enter to add "${inputValue}"`
                            : formData.country === "India"
                              ? "Search Indian state"
                              : "Type state or province"
                        }
                        className={
                          errors.state
                            ? "react-select-error"
                            : ""
                        }
                        classNamePrefix="country-select"
                      />

                      {errors.state && (
                        <small className="error-message">
                          {errors.state}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">
                      City or district <span>*</span>
                    </label>

 <input id="city" type="text" value={formData.city} placeholder="Example: Erode" onChange={(event) => updateField("city", event.target.value)}
                      className={
                        errors.city ? "input-error" : ""
                      }
                    />

                    {errors.city && (
                      <small className="error-message">
                        {errors.city}
                      </small>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="religion">
                        Religion <span>*</span>
                      </label>

                      <select id="religion" value={formData.religion} onChange={(event) => updateField("religion", event.target.value)}
                        className={errors.religion ? "input-error" : ""} >
                        <option value=""> Select religion  </option>
                        <option value="Hindu">Hindu</option>
                        <option value="Christian"> Christian</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Jain">Jain</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Other">Other</option>
                      </select>

                      {errors.religion && (
                        <small className="error-message">
                          {errors.religion}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="community">
                        Community <span>*</span>
                      </label>

                      <select id="community" value={formData.community} onChange={(event) => updateField("community", event.target.value)} className={errors.community ? "input-error" : ""} >
                        <option value="">
                          Select community
                        </option>
                        <option value="Valluvan">
                          Valluvan
                        </option>

                        <option value="Other">Other</option>
                      </select>

                      {errors.community && (
                        <small className="error-message">
                          {errors.community}
                        </small>
                      )}
                    </div>
                  </div>

                  <label className="terms-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(event) =>
                        updateField(
                          "acceptTerms",
                          event.target.checked
                        )
                      }
                    />

                    <span>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  {errors.acceptTerms && (
                    <small className="error-message terms-error">
                      {errors.acceptTerms}
                    </small>
                  )}
                </div>
              )}

              <div className="form-actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="previous-btn"
                    onClick={goToPreviousStep}
                  >
                    <FaArrowLeft />
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    className="next-btn"
                    onClick={goToNextStep}
                  >
                    Continue
                    <FaArrowRight />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="register-submit"
                  >
                    Create Free Profile
                    <FaArrowRight />
                  </button>
                )}
              </div>

              <p className="login-text">
                Already registered?

                <button type="button" onClick={() => { onClose(); onLoginClick?.(); }}>
                  Login to your account
                </button>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}