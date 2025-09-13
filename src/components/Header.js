"use client"

import { useState, useRef, useEffect } from "react"

const Header = ({ currentUser, language, onLogout, onThemeToggle, isDarkMode }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  const getTranslation = () => {
    const translations = {
      en: {
        portal: "DBT Portal",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        notifications: "Notifications",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        welcome: "Welcome back",
        noNotifications: "No new notifications",
        viewProfile: "View Profile",
        editProfile: "Edit Profile",
      },
      hi: {
        portal: "डीबीटी पोर्टल",
        profile: "प्रोफ़ाइल",
        settings: "सेटिंग्स",
        logout: "लॉग आउट",
        notifications: "सूचनाएं",
        darkMode: "डार्क मोड",
        lightMode: "लाइट मोड",
        welcome: "वापसी पर स्वागत",
        noNotifications: "कोई नई सूचना नहीं",
        viewProfile: "प्रोफ़ाइल देखें",
        editProfile: "प्रोफ़ाइल संपादित करें",
      },
      ta: {
        portal: "டிபிடி போர்ட்டல்",
        profile: "சுயவிவரம்",
        settings: "அமைப்புகள்",
        logout: "வெளியேறு",
        notifications: "அறிவிப்புகள்",
        darkMode: "இருண்ட பயன்முறை",
        lightMode: "ஒளி பயன்முறை",
        welcome: "மீண்டும் வரவேற்கிறோம்",
        noNotifications: "புதிய அறிவிப்புகள் இல்லை",
        viewProfile: "சுயவிவரத்தைப் பார்க்கவும்",
        editProfile: "சுயவிவரத்தைத் திருத்தவும்",
      },
    }
    return translations[language] || translations.en
  }

  const t = getTranslation()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const mockNotifications = [
    {
      id: 1,
      title: "New Scholarship Available",
      message: "Engineering Excellence Award is now open for applications",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Profile Update Required",
      message: "Please update your bank details for DBT",
      time: "1 day ago",
      unread: true,
    },
  ]

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-b border-blue-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-blue-600 font-bold text-xl">DBT</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.portal}</h1>
            <p className="text-blue-100 text-sm">
              {currentUser ? `Welcome, ${currentUser.name}` : "Student Scholarship Portal"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Welcome message */}
          <div className="hidden md:block text-right">
            <p className="text-sm text-blue-100">{t.welcome}</p>
            <p className="text-sm font-medium text-white">{currentUser?.name || "Student"}</p>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
              </svg>
              {mockNotifications.filter((n) => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs text-secondary-foreground font-bold">
                    {mockNotifications.filter((n) => n.unread).length}
                  </span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">{t.notifications}</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-secondary" : "bg-muted-foreground"}`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-popover-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <p className="text-sm">{t.noNotifications}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
            title={isDarkMode ? t.lightMode : t.darkMode}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <img
                src={currentUser?.avatar || "/placeholder.svg?height=40&width=40&query=student profile"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{currentUser?.name || "Student User"}</p>
                <p className="text-xs text-blue-100">{currentUser?.studentId || "STU001"}</p>
              </div>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser?.avatar || "/placeholder.svg?height=48&width=48&query=student profile"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <p className="font-medium text-popover-foreground">{currentUser?.name || "Student User"}</p>
                      <p className="text-sm text-muted-foreground">{currentUser?.email || "student@example.com"}</p>
                      <p className="text-xs text-muted-foreground">{currentUser?.university || "University"}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-popover-foreground">{t.viewProfile}</span>
                  </button>

                  <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-popover-foreground">{t.settings}</span>
                  </button>

                  <div className="border-t border-border my-2"></div>

                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-3 text-destructive"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>{t.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
