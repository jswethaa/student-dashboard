"use client"

import { useState, useEffect } from "react"
import { TTSProvider } from "./contexts/TTSContext"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Guidance from "./pages/Guidance"
import Scholarships from "./pages/Scholarships"
import Community from "./pages/Community"
import FAQ from "./pages/FAQ"
import Recommendations from "./pages/Recommendations"
import StudentProfile from "./pages/StudentProfile"
import Login from "./pages/Login"
import Chatbot from "./components/Chatbot"
import LanguageToggle from "./components/LanguageToggle"
import TTSToggle from "./components/TTSToggle"
import apiService from "./services/api"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [language, setLanguage] = useState("en")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    const checkAuthStatus = () => {
      if (apiService.isAuthenticated()) {
        const user = apiService.getCurrentUser()
        if (user) {
          setIsLoggedIn(true)
          setCurrentUser(user)
        }
      }
    }

    checkAuthStatus()

    const handleSessionExpired = (event) => {
      setSessionExpired(true)
      setIsLoggedIn(false)
      setCurrentUser(null)
      setCurrentPage("dashboard")
    }

    window.addEventListener("sessionExpired", handleSessionExpired)

    const resetActivity = () => {
      apiService.resetSessionActivity()
    }

    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    activityEvents.forEach((event) => {
      document.addEventListener(event, resetActivity, true)
    })

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired)
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetActivity, true)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    setSessionExpired(false)
  }

  const handleLogout = () => {
    apiService.logout()
    setIsLoggedIn(false)
    setCurrentUser(null)
    setCurrentPage("dashboard")
    setSessionExpired(false)
  }

  const updateUserData = (userData) => {
    const updatedUser = apiService.updateUserData(userData)
    if (updatedUser) {
      setCurrentUser(updatedUser)
    }
  }

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard language={language} currentUser={currentUser} />
      case "guidance":
        return <Guidance language={language} />
      case "scholarships":
        return <Scholarships language={language} />
      case "recommendations":
        return <Recommendations language={language} currentUser={currentUser} updateUserData={updateUserData} />
      case "profile":
        return <StudentProfile language={language} currentUser={currentUser} updateUserData={updateUserData} />
      case "community":
        return <Community language={language} />
      case "faq":
        return <FAQ language={language} />
      default:
        return <Dashboard language={language} currentUser={currentUser} />
    }
  }

  if (!isLoggedIn) {
    return (
      <TTSProvider>
        <Login onLogin={handleLogin} language={language} sessionExpired={sessionExpired} />
      </TTSProvider>
    )
  }

  return (
    <TTSProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} language={language} />
        <div className="flex-1 flex flex-col">
          <Header
            currentUser={currentUser}
            language={language}
            onLogout={handleLogout}
            onLanguageChange={setLanguage}
            onThemeToggle={handleThemeToggle}
            isDarkMode={isDarkMode}
            setCurrentPage={setCurrentPage} 
          />
          <main className="flex-1 p-6">{renderPage()}</main>

          <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
            <TTSToggle language={language} />
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </div>
        <Chatbot language={language} />
      </div>
    </TTSProvider>
  )
}

export default App
