import { useEffect, useState } from "react";
import styles from './RegisterPage2.module.scss';
import passwordIcon from "../../../public/assets/images/Register/PasswordIcon.svg";
import passwordIcon2 from "../../../public/assets/images/Register/PasswordIcon2.svg";
import { useNavigate } from "react-router-dom";
import "../../components/css/Button.scss";
import UserAgreement from "../../components/TermsBox/UserAgreement";

export default function RegisterPage2() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    acceptTerms: ""
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showTerms) {
        setShowTerms(false);
      }
    };

    if (showTerms) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener when component unmounts or showTerms changes
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTerms]);

  const handleTerms = (e) => {
    e.stopPropagation(); // Prevent closing when clicking on the terms menu itself
    setShowTerms(!showTerms);
  };

  const handleChangeChecked = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    setFormData((prevFormData) =>({
      ...prevFormData,
      acceptTerms: isChecked
    }));
    setErrors((prevErrors) => ({...prevErrors, acceptTerms: ""}));
  };

  const validatePassword = (password) => {
    const passwordErrors = [];

    if (password.length < 8) {
      passwordErrors.push("Şifrə ən azı 8 simvoldan ibarət olmalıdır.");
    }
    if (!/[A-Za-z]/.test(password)) {
      passwordErrors.push("Şifrə ən azı bir hərfdən ibarət olmalıdır.");
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("Şifrə ən azı bir rəqəmdən ibarət olmalıdır.");
    }

    return passwordErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      acceptTerms: ""
    });

    // Password validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordErrors.join("\n"),
      }));
      return;
    }

    // Confirm password matching
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Şifrələr uyğun gəlmir",
      }));
      return;
    }

    // Terms validation
    if (!isChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        acceptTerms: "İstifadəçi şərtləri qəbul olunmayıb.",
      }));
      return;
    }

    const email = localStorage.getItem("email");
    console.log(formData, email);

    try {
      const response = await fetch(
        "https://ff82f4df-f72b-4dec-84ca-487132aff620.mock.pstmn.io/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, email }),
        }
      );

      if (response.ok) {
        navigate("/login");
        console.log('success');
      } else {
        const { firstName, lastName, password, confirmPassword, acceptTerms } = errorData.errors || {};
        setErrors({
          firstName: firstName || "",
          lastName: lastName || "",
          password: password || "",
          confirmPassword: confirmPassword || "",
          acceptTerms: acceptTerms || "",
        });
        console.log(errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  // const handleTerms = () => {
  //   setShowTerms(true);
  // }

  return (
    <>
      <div className={styles.innerCont}>
      <div className={styles.topText}>Qeydiyyat</div>
      <div className={styles.infoText}>
        Daxil olmaq üçün aşağıdakı xanaları doldurun.
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.register2Container}>
          {/* First Name Field */}
          <div>
            <div className={styles.subHeader}>Ad</div>
            <div className={styles.inputContainer}>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.innerInput}
                type="text"
                placeholder="Ad"
              />
            </div>
            {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
          </div>

          {/* Last Name Field */}
          <div>
            <div className={styles.subHeader}>Soyad</div>
            <div className={styles.inputContainer}>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.innerInput}
                type="text"
                placeholder="Soyad"
              />
            </div>
            {errors.lastName && (
              <p className={styles.errorMessage}>{errors.lastName}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className={styles.subHeader}>Şifrə</div>
            <div className={styles.inputContainer}>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.innerInput}
                type={showPassword ? "text" : "password"}
                placeholder="Şifrənizi daxil edin"
              />
              <div className={styles.icon}>
                <img
                  onClick={handlePassword}
                  className={styles.iconImage}
                  src={showPassword ? passwordIcon2 : passwordIcon}
                  alt="ClosedEyeIcon"
                />
              </div>
            </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className={styles.subHeader}>Şifrəni təkrarla</div>
            <div className={styles.inputContainer}>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={styles.innerInput}
                type={showRepeatedPassword ? "text" : "password"}
                placeholder="Şifrənizi daxil edin"
              />
              <div className={styles.icon}>
                <img
                  onClick={handleRepeatedPassword}
                  className={styles.iconImage}
                  src={showRepeatedPassword ? passwordIcon2 : passwordIcon}
                  alt="ClosedEyeIcon"
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Agreement Field */}
        <div className={styles.agreementBox}>
          <div className={styles.checkBoxContainer}>
            <input
              onChange={handleChangeChecked}
              className={styles.checkBoxInput}
              type="checkbox"
              checked={isChecked}
            />
            <span className={styles.customCheckmark}></span>
          </div>
          <div
            className={styles.termsText}
            onClick={handleTerms}>
            İstifadəçi şərtləri ilə razıyam
          </div>
        </div>
        {errors.acceptTerms && <p className={styles.errorMessage}>{errors.acceptTerms}</p>}

        {/* Submit Button */}
        <button type="submit" className={`${styles.btnResponsive} Btn`}>
          Qeydiyyatdan keç
        </button>
      </form>
    </div>
    {showTerms ? <UserAgreement /> : null} 
    </>
  );
}
