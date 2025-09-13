"use client"

const Sidebar = ({ currentPage, setCurrentPage, language }) => {
  const menuItems = [
    {
      id: "dashboard",
      icon: "🏠",
      label: language === "en" ? "Dashboard" : language === "hi" ? "डैशबोर्ड" : "முகப்பு",
    },
    {
      id: "guidance",
      icon: "📋",
      label: language === "en" ? "Guidance" : language === "hi" ? "मार्गदर्शन" : "வழிகாட்டுதல்",
    },
    {
      id: "scholarships",
      icon: "🎓",
      label: language === "en" ? "Scholarships" : language === "hi" ? "छात्रवृत्ति" : "உதவித்தொகை",
    },
    {
      id: "recommendations",
      icon: "🎯",
      label: language === "en" ? "Recommendations" : language === "hi" ? "सिफारिशें" : "பரிந்துரைகள்",
    },
    {
      id: "profile",
      icon: "👤",
      label: language === "en" ? "Profile" : language === "hi" ? "प्रोफ़ाइल" : "சுயவிவரம்",
    },
    {
      id: "community",
      icon: "👥",
      label: language === "en" ? "Community" : language === "hi" ? "समुदाय" : "சமூகம்",
    },
    {
      id: "faq",
      icon: "❓",
      label: language === "en" ? "FAQ" : language === "hi" ? "सामान्य प्रश्न" : "கேள்விகள்",
    },
  ]

  const getPortalTitle = () => {
    switch (language) {
      case "hi":
        return "डीबीटी पोर्टल"
      case "ta":
        return "டிபிடி போர்ட்டல்"
      default:
        return "DBT Portal"
    }
  }

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">{getPortalTitle()}</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
              currentPage === item.id ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700" : "text-gray-600"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
