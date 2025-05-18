"use client"

import { useFormik } from "formik"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { User, Mail, Lock, UserPlus, Phone, Eye, EyeOff, Info, AlertCircle, ArrowRight } from "lucide-react"
import { useState } from "react"
import { registerSchema } from "../utils/validation"

const Register = () => {
  const { register, user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Prepare data for API by removing confirmPassword and acceptTerms
      const { confirmPassword, acceptTerms, ...userData } = values

      try {
        const success = await register(userData)
        if (!success) {
          // Reset form if registration fails
          formik.resetForm()
        }
      } catch (error) {
        console.error("Registration failed:", error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  // Check password strength
  const checkPasswordStrength = (password) => {
    let score = 0

    // Length check
    if (password.length >= 8) score += 1

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    setPasswordStrength(score)
  }

  // Update password strength when password changes
  const handlePasswordChange = (e) => {
    const { value } = e.target
    formik.handleChange(e)
    checkPasswordStrength(value)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-rose-500"
    if (passwordStrength <= 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Faible"
    if (passwordStrength <= 3) return "Moyen"
    return "Fort"
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="bg-shapes">
        <div className="bg-shape bg-violet-400/30 w-[500px] h-[500px] -top-32 -right-32"></div>
        <div className="bg-shape bg-fuchsia-400/30 w-[600px] h-[600px] -bottom-32 -left-32" style={{ animationDelay: '2s' }}></div>
        <div className="bg-shape bg-purple-400/30 w-[600px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-2xl w-full space-y-10 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gradient mb-4">Créer un compte</h1>
          <p className="text-xl text-gray-600">Rejoignez-nous pour une expérience personnalisée</p>
        </div>

        <div className="card p-10">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 relative">
              <div className="absolute inset-0 bg-violet-600/20 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-fuchsia-600/20 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl shadow-lg flex items-center justify-center">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-6 w-6 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-input pl-12 text-lg ${formik.touched.name && formik.errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="John Doe"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="form-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formik.errors.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input pl-12 text-lg ${formik.touched.email && formik.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="exemple@email.com"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="form-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formik.errors.email}</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  Vous recevrez un email de confirmation
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-6 w-6 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-input pl-12 text-lg ${formik.touched.phone && formik.errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="+33 6 12 34 56 78"
                    {...formik.getFieldProps("phone")}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="form-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formik.errors.phone}</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  Format: +33612345678
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-input pl-12 text-lg ${formik.touched.password && formik.errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="••••••••"
                    {...formik.getFieldProps("password")}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-violet-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="form-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formik.errors.password}</span>
                  </div>
                )}
                {formik.values.password && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-700">Force du mot de passe:</div>
                      <div className="text-sm font-medium" style={{ color: getPasswordStrengthColor().replace('bg-', 'text-') }}>
                        {getPasswordStrengthText()}
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-input pl-12 text-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="••••••••"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-violet-600 transition-colors"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="form-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formik.errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded transition-colors"
                {...formik.getFieldProps("acceptTerms")}
              />
              <label htmlFor="acceptTerms" className="ml-3 block text-base text-gray-700">
                J'accepte les{" "}
                <a href="#" className="text-violet-600 hover:text-violet-700 font-medium transition-colors hover:underline">
                  conditions d'utilisation
                </a>
              </label>
            </div>
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
              <div className="form-error">
                <AlertCircle className="h-5 w-5" />
                <span>{formik.errors.acceptTerms}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center group text-lg"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  S'inscrire
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium transition-colors hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register