"use client"

import { useFormik } from "formik"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useState } from "react"
import { loginSchema } from "../utils/validation"

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)

  // Get the return path from location state or default to dashboard
  const from = location.state?.from || "/dashboard"

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const success = await login(values)
        if (success) {
          // If login was successful, redirect to the original destination
          navigate(from, { replace: true })
        }
      } catch (error) {
        console.error("Login error:", error)
      }
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="bg-shapes">
        <div className="bg-shape bg-violet-400/30 w-[500px] h-[500px] -top-32 -left-32"></div>
        <div className="bg-shape bg-fuchsia-400/30 w-[600px] h-[600px] -bottom-32 -right-32" style={{ animationDelay: '2s' }}></div>
        <div className="bg-shape bg-purple-400/30 w-[600px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-lg w-full space-y-10 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gradient mb-4">Bienvenue</h1>
          <p className="text-xl text-gray-600">Connectez-vous pour accéder à votre espace personnel</p>
        </div>

        <div className="card p-10">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 relative">
              <div className="absolute inset-0 bg-violet-600/20 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-fuchsia-600/20 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl shadow-lg flex items-center justify-center">
                <LogIn className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div className="space-y-6">
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>{formik.errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-base font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <Link to="/forgot-password" className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>{formik.errors.password}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded transition-colors"
                {...formik.getFieldProps("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-3 block text-base text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center group text-lg"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Vous n'avez pas de compte?{" "}
                <Link to="/register" className="text-violet-600 hover:text-violet-700 font-medium transition-colors hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
