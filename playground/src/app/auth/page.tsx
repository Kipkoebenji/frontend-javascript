"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";

type FormField = "fullName" | "email" | "password" | "confirmPassword";
type FormData = Record<FormField, string>;
type FormErrors = Partial<Record<FormField, string>>;
type FormTouched = Partial<Record<FormField, boolean>>;

const isFormField = (name: string): name is FormField =>
  ["fullName", "email", "password", "confirmPassword"].includes(name);

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const shellClasses =
    "relative min-h-screen overflow-hidden px-4 py-8 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(116,200,255,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,170,120,0.14),_transparent_32%),linear-gradient(160deg,_#08111d_0%,_#0d1524_48%,_#111827_100%)]";

  const cardClasses =
    "relative z-10 w-full max-w-[460px] rounded-[28px] border border-white/15 bg-slate-950/75 p-6 text-slate-50 shadow-[0_30px_80px_rgba(6,10,18,0.45)] backdrop-blur-xl sm:p-9";

  const fieldClasses =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 outline-none transition duration-200 placeholder:text-slate-400 focus:border-sky-300/70 focus:ring-4 focus:ring-sky-300/15";

  const labelClasses = "text-sm font-semibold text-slate-100/90";
  const actionButtonClasses =
    "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-slate-50 transition duration-200 hover:-translate-y-0.5 hover:bg-white/14 focus:outline-none focus:ring-4 focus:ring-sky-300/20";
  const submitButtonClasses =
    "inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-300 via-cyan-300 to-indigo-300 px-5 py-4 font-semibold text-slate-950 shadow-[0_16px_30px_rgba(116,200,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(116,200,255,0.3)] focus:outline-none focus:ring-4 focus:ring-sky-300/30 disabled:cursor-wait disabled:opacity-75";

  const validateField = (name: FormField, value: string) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";

      case "confirmPassword":
        if (!value) return "Confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (success) setSuccess("");
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!isFormField(name)) return;

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
    const newErrors: FormErrors = {};

    (Object.keys(formData) as FormField[]).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
    <div className={shellClasses}>
      <div className="pointer-events-none absolute left-20 top-22.5 h-80 w-[320px] rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-27.5 right-17.5 h-65 w-65 rounded-full bg-orange-300/15 blur-3xl" />

      <form className={cardClasses} onSubmit={handleSubmit}>
        <div className="mb-8 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-200/80">
            Sign up
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Create Account
          </h1>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Build your profile in a form that keeps validation, feedback, and
            password visibility all in one place.
          </p>
        </div>

        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            {success}
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2.5">
            <label htmlFor="fullName" className={labelClasses}>
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
              aria-describedby="fullName-error"
              className={fieldClasses}
            />

            {touched.fullName && errors.fullName && (
              <p id="fullName-error" className="text-sm text-rose-300">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
              className={fieldClasses}
            />

            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-rose-300">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby="password-error"
                className={`${fieldClasses} sm:flex-1`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
                className={`${actionButtonClasses} sm:min-w-24`}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {touched.password && errors.password && (
              <p id="password-error" className="text-sm text-rose-300">
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <label htmlFor="confirmPassword" className={labelClasses}>
              Confirm Password
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                aria-invalid={Boolean(
                  touched.confirmPassword && errors.confirmPassword,
                )}
                aria-describedby="confirmPassword-error"
                className={`${fieldClasses} sm:flex-1`}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-pressed={showConfirm}
                className={`${actionButtonClasses} sm:min-w-24`}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {touched.confirmPassword && errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-rose-300">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`${submitButtonClasses} mt-8`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950" />
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
