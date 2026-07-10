import "./Register.css";
import { FaTimes } from "react-icons/fa";

type RegisterProps = {
  open: boolean;
  onClose: () => void;
};

export default function Register({ open, onClose }: RegisterProps) {
  if (!open) return null;

  return (
    <div className="register-overlay">
      <div className="register-popup">

        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="register-header">
          <h2>VALLUVAN</h2>
          <p>MATRIMONY</p>
        </div>

        <hr />

        <h3>Create Your Profile</h3>

        <span className="register-subtitle">
          Join thousands of happy couples
        </span>

        <form>

          {/* Profile For & Gender */}

          <div className="form-row">

            <div className="form-group">
              <label>Profile For</label>
              <select>
                <option>Myself</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Brother</option>
                <option>Sister</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

          </div>

          {/* Name */}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
            />
          </div>

          {/* Email */}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter Email Address"
            />
          </div>

          {/* Mobile */}

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
            />
          </div>

          {/* Country & Location */}

          <div className="form-row">

            <div className="form-group">
              <label>Country</label>
              <select>
                <option>India</option>
                <option>Singapore</option>
                <option>Malaysia</option>
                <option>United Arab Emirates</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter City"
              />
            </div>

          </div>

          {/* Religion & Community */}

          <div className="form-row">

            <div className="form-group">
              <label>Religion</label>
              <select>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Muslim</option>
              </select>
            </div>

            <div className="form-group">
              <label>Community</label>
              <select>
                <option>Select Community</option>
                <option>Vanniyar</option>
                <option>Nadar</option>
                <option>Chettiar</option>
                <option>Gounder</option>
              </select>
            </div>

          </div>

          {/* Password */}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create Password"
            />
          </div>

          <button
            type="submit"
            className="register-submit"
          >
            Register Free
          </button>

          <p className="login-text">
            Already have an account?
            <a href="/"> Login</a>
          </p>

        </form>

      </div>
    </div>
  );
}