import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LogOut, User, Shield, Home, Menu, X, Settings, HelpCircle } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()


  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors group">
            <div className="w-10 h-10 mr-3 relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-xl rotate-6 group-hover:rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-blue-600/20 rounded-xl -rotate-6 group-hover:-rotate-12 transition-transform"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-lg transform group-hover:scale-105 transition-all">
                <svg className="w-10 h-10 p-2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M12 12L20 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            Auth System
          </Link>

          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${isActive("/")
                ? "text-blue-700 bg-blue-50 font-medium"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
            >
              <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Accueil
            </Link>

            {user ? (
              <>
               
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${isActive("/admin")
                      ? "text-gray-900 bg-gray-100 font-medium"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <Shield className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${isActive("/profile")
                    ? "text-blue-700 bg-blue-50 font-medium"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  <Settings className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Profil
                </Link>

                {/* User info */}
                <span className="text-gray-700 flex items-center bg-gray-50/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/80 shadow-sm">
                  {user.role === "admin" ? (
                    <Shield className="h-5 w-5 mr-2 text-gray-900" />
                  ) : (
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                  )}
                  <span className="font-medium">{user.name || user.email}</span>
                </span>

             
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-red-600 transition-all duration-200 px-4 py-2 rounded-xl hover:bg-red-50 group"
                >
                  <LogOut className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
              
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${isActive("/login")
                    ? "text-blue-700 bg-blue-50 font-medium"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  <User className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 flex items-center group"
                >
                  <User className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Inscription
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 p-2 hover:text-blue-600 transition-colors rounded-xl hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

  
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50 py-4 px-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center group ${isActive("/")
                ? "text-blue-700 bg-blue-50 font-medium"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Accueil
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center group ${isActive("/admin")
                      ? "text-gray-900 bg-gray-100 font-medium"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center group ${isActive("/profile")
                    ? "text-blue-700 bg-blue-50 font-medium"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Profil
                </Link>

                <div className="border-t border-gray-200/50 my-3 pt-3">
                  <div className="flex items-center px-4 py-3 bg-gray-50/80 backdrop-blur-sm rounded-xl">
                    {user.role === "admin" ? (
                      <Shield className="h-5 w-5 mr-3 text-gray-900" />
                    ) : (
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                    )}
                    <span className="font-medium">{user.name || user.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center text-gray-700 hover:text-red-600 transition-all duration-200 px-4 py-3 rounded-xl hover:bg-red-50 group"
                >
                  <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center group ${isActive("/login")
                    ? "text-blue-700 bg-blue-50 font-medium"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
