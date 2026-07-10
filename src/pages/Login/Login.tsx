import "./Login.css";
import { FaTimes } from "react-icons/fa";

type LoginProps = {
  open: boolean;
  onClose: () => void;
};

export default function Login({ open, onClose }: LoginProps) {
  if (!open) return null;

  return (
    <div className="login-overlay">

      <div className="login-popup">

        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Logo */}

        <div className="login-header">

          <h2>VALLUVAN</h2>

          <p>MATRIMONY</p>

        </div>

        {/* Horizontal Line */}

        <div className="login-divider"></div>

        {/* Heading */}

        <h3>Welcome Back!</h3>

        <span className="login-subtitle">
          Login to continue your partner search
        </span>

        <form>

          <div className="form-group">

            <label>Email / Mobile Number</label>

            <input
              type="text"
              placeholder="Enter Email or Mobile Number"
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
            />

          </div>

          <div className="login-options">

            <label className="remember-me">

              <input type="checkbox" />

              <span>Remember Me</span>

            </label>

            <a href="/">Forgot Password?</a>

          </div>

          <button
            type="submit"
            className="login-btn-popup"
          >
            Login
          </button>

          <button
            type="button"
            className="otp-btn"
          >
            Login with OTP
          </button>

          <p className="register-text">

            New to Valluvan Matrimony?

            <a href="/"> Register Free</a>

          </p>

        </form>

      </div>

    </div>
  );
}