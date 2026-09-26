import { FormEvent, useEffect, useState } from "react";
import "./Login.css";
import { useDemoAuth } from "../../context/DemoAuthContext";
import { demoProfiles } from "../../data/profileData";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaLock,
  FaMobileAlt,
  FaShieldAlt,
  FaTimes,
  FaUserCheck,
} from "react-icons/fa";

type LoginProps = {
  open: boolean;
  onClose: () => void;
  onRegisterClick?: () => void;
};

export default function Login({
  open,
  onClose,
  onRegisterClick,
}: LoginProps) {
  const { login } = useDemoAuth();
  const [demoAccount, setDemoAccount] = useState("arun");
  const [demoError, setDemoError] = useState("");
  const [loginType, setLoginType] = useState<"password" | "otp">("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
    otp?: string;
  }>({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const validateIdentifier = () => {
    const value = identifier.trim();

    if (!value) {
      return "Enter your email address or mobile number";
    }

    const isMobile = /^[6-9]\d{9}$/.test(value);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isMobile && !isEmail) {
      return "Enter a valid email address or 10-digit mobile number";
    }

    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: {
      identifier?: string;
      password?: string;
      otp?: string;
    } = {};

    const identifierError = validateIdentifier();

    if (identifierError) {
      newErrors.identifier = identifierError;
    }

    if (loginType === "password" && !password.trim()) {
      newErrors.password = "Enter your password";
    }

    if (loginType === "otp" && !/^\d{6}$/.test(otp)) {
      newErrors.otp = "Enter a valid 6-digit OTP";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setDemoError("Real account login is not connected. Choose a sample account above to try the demo.");
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const switchLoginType = (type: "password" | "otp") => {
    setLoginType(type);
    setErrors({});
  };

  return (
    <div
      className="login-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="login-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          type="button"
          className="login-close-btn"
          onClick={onClose}
          aria-label="Close login"
        >
          <FaTimes />
        </button>

        <div className="login-layout">
          <aside className="login-side-panel">
            <div>
              <div className="login-brand">
                <h2>VALLUVAN</h2>
                <p>MATRIMONY</p>
              </div>

              <span className="login-side-badge">
                <FaHeart />
                Trusted Tamil Matrimony
              </span>

              <h3>
                Welcome back to your journey of finding the right partner.
              </h3>

              <p className="login-side-description">
                Access your matches, interests, saved profiles and
                conversations securely.
              </p>
            </div>

            <div className="login-benefits">
              <div className="login-benefit">
                <span>
                  <FaShieldAlt />
                </span>

                <div>
                  <strong>Secure login</strong>
                  <small>Your account information is protected.</small>
                </div>
              </div>

              <div className="login-benefit">
                <span>
                  <FaUserCheck />
                </span>

                <div>
                  <strong>Verified profiles</strong>
                  <small>Connect with genuine matrimony profiles.</small>
                </div>
              </div>

              <div className="login-benefit">
                <span>
                  <FaHeart />
                </span>

                <div>
                  <strong>Meaningful matches</strong>
                  <small>Continue discovering suitable partners.</small>
                </div>
              </div>
            </div>
          </aside>

          <main className="login-main">
            <div className="login-mobile-brand">
              <h2>VALLUVAN</h2>
              <p>MATRIMONY</p>
            </div>

            <div className="login-heading">
              <span className="login-small-label">WELCOME BACK</span>

              <h2 id="login-title">Login to your account</h2>

              <p>
                Continue your partner search and manage your profile.
              </p>
            </div>

            <section className="demo-login-panel" aria-label="Demo login">
              <strong>Try with a sample account</strong>
              <p>Browser-only demo. Use two different accounts to send and approve a favourite request.</p>
              <label htmlFor="demo-account">Demo account</label>
              <select id="demo-account" value={demoAccount} onChange={(event) => setDemoAccount(event.target.value)}>
                {demoProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name} · {profile.lookingFor}</option>)}
              </select>
              <button type="button" onClick={() => {
                try { login(demoAccount); onClose(); }
                catch { setDemoError("Please enable browser storage to use demo accounts."); }
              }}>Continue with demo account</button>
              {demoError && <p role="alert">{demoError}</p>}
            </section>

            <div className="login-type-tabs">
              <button
                type="button"
                className={loginType === "password" ? "active" : ""}
                onClick={() => switchLoginType("password")}
              >
                <FaLock />
                Password
              </button>

              <button
                type="button"
                className={loginType === "otp" ? "active" : ""}
                onClick={() => switchLoginType("otp")}
              >
                <FaMobileAlt />
                Login with OTP
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="login-form-group">
                <label htmlFor="identifier">
                  Email or mobile number <span>*</span>
                </label>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    <FaEnvelope />
                  </span>

                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    placeholder="Enter email or 10-digit mobile number"
                    onChange={(event) => {
                      setIdentifier(event.target.value);

                      setErrors((previous) => ({
                        ...previous,
                        identifier: "",
                      }));
                    }}
                    className={errors.identifier ? "input-error" : ""}
                  />
                </div>

                {errors.identifier && (
                  <small className="login-error-message">
                    {errors.identifier}
                  </small>
                )}
              </div>

              {loginType === "password" && (
                <div className="login-form-group">
                  <div className="login-label-row">
                    <label htmlFor="password">
                      Password <span>*</span>
                    </label>

                    <button
                      type="button"
                      className="forgot-password-btn"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="login-input-wrapper password-wrapper">
                    <span className="login-input-icon">
                      <FaLock />
                    </span>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Enter your password"
                      onChange={(event) => {
                        setPassword(event.target.value);

                        setErrors((previous) => ({
                          ...previous,
                          password: "",
                        }));
                      }}
                      className={errors.password ? "input-error" : ""}
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label="Show or hide password"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.password && (
                    <small className="login-error-message">
                      {errors.password}
                    </small>
                  )}
                </div>
              )}

              {loginType === "otp" && (
                <div className="login-form-group">
                  <div className="login-label-row">
                    <label htmlFor="otp">
                      One-time password <span>*</span>
                    </label>

                    <button
                      type="button"
                      className="send-otp-btn"
                      onClick={() => {
                        const identifierError = validateIdentifier();

                        if (identifierError) {
                          setErrors({
                            identifier: identifierError,
                          });
                          return;
                        }

                        console.log("Send OTP to:", identifier);
                      }}
                    >
                      Send OTP
                    </button>
                  </div>

                  <div className="login-input-wrapper">
                    <span className="login-input-icon">
                      <FaMobileAlt />
                    </span>

                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      placeholder="Enter 6-digit OTP"
                      onChange={(event) => {
                        setOtp(event.target.value.replace(/\D/g, ""));

                        setErrors((previous) => ({
                          ...previous,
                          otp: "",
                        }));
                      }}
                      className={errors.otp ? "input-error" : ""}
                    />
                  </div>

                  {errors.otp && (
                    <small className="login-error-message">
                      {errors.otp}
                    </small>
                  )}
                </div>
              )}

              {loginType === "password" && (
                <div className="login-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                    />

                    <span>Keep me logged in</span>
                  </label>

                  <span className="secure-login-text">
                    <FaShieldAlt />
                    Secure login
                  </span>
                </div>
              )}

              <button type="submit" className="login-submit-btn">
                {loginType === "password"
                  ? "Login to Account"
                  : "Verify OTP & Login"}

                <FaArrowRight />
              </button>

              <div className="login-divider-text">
                <span>New to Valluvan Matrimony?</span>
              </div>

              <button
                type="button"
                className="create-account-btn"
                onClick={() => {
                  onClose();
                  onRegisterClick?.();
                }}
              >
                Create Free Profile
                <FaArrowRight />
              </button>

              <p className="login-privacy-text">
                By continuing, you agree to our{" "}
                <a href="/terms" target="_blank">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" target="_blank">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
