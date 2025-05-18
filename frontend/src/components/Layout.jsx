import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useAuth } from "../context/AuthContext"

const Layout = () => {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-violet-50 relative overflow-hidden">
        <div className="bg-shapes">
          <div className="bg-shape bg-violet-400/30 w-[500px] h-[500px] -top-32 -left-32"></div>
          <div className="bg-shape bg-fuchsia-400/30 w-[600px] h-[600px] -bottom-32 -right-32" style={{ animationDelay: '2s' }}></div>
          <div className="bg-shape bg-purple-400/30 w-[600px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="card p-10 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative mb-6">
              <div className="absolute inset-0 bg-violet-600/20 rounded-3xl rotate-6 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 bg-fuchsia-600/20 rounded-3xl -rotate-6 animate-spin" style={{ animationDuration: '3s', animationDelay: '0.2s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl shadow-lg flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-xl">Chargement...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-violet-50 flex flex-col relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="bg-shapes">
          <div className="bg-shape bg-violet-400/20 w-[500px] h-[500px] -top-32 -left-32"></div>
          <div className="bg-shape bg-fuchsia-400/20 w-[600px] h-[600px] -bottom-32 -right-32" style={{ animationDelay: '2s' }}></div>
          <div className="bg-shape bg-purple-400/20 w-[600px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <Outlet />
        </main>
        <footer className="bg-white/80 backdrop-blur-sm border-t border-violet-200/50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-xl rotate-6"></div>
                  <div className="absolute inset-0 bg-fuchsia-600/20 rounded-xl -rotate-6"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 12L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 12L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <span className="text-xl font-bold text-gradient">Auth System</span>
              </div>
              <p className="text-gray-600 font-medium">
                © {new Date().getFullYear()} Auth System. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout
