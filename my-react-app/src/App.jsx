import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Please enter a valid email";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8)
          return "Password must be at least 8 characters";
        return "";

      case "confirmPassword":
        if (!value) return "Confirm your password";
        if (value !== formData.password)
          return "Passwords do not match";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (success) setSuccess("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      setSuccess("Account created successfully!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
      setTouched({});
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form
        className="card"
        onSubmit={handleSubmit}
      >
        <h1>Create Account</h1>

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        {/* Full Name */}
        <div className="field">
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
          />

          {touched.fullName &&
            errors.fullName && (
              <span className="error">
                {errors.fullName}
              </span>
            )}
        </div>

        {/* Email */}
        <div className="field">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
          />

          {touched.email &&
            errors.email && (
              <span className="error">
                {errors.email}
              </span>
            )}
        </div>

        {/* Password */}
        <div className="field">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          {touched.password &&
            errors.password && (
              <span className="error">
                {errors.password}
              </span>
            )}
        </div>

        {/* Confirm Password */}
        <div className="field">
          <label>
            Confirm Password
          </label>

          <div className="password-wrapper">
            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
            >
              {showConfirm
                ? "Hide"
                : "Show"}
            </button>
          </div>

          {touched.confirmPassword &&
            errors.confirmPassword && (
              <span className="error">
                {errors.confirmPassword}
              </span>
            )}
        </div>

        <button
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}