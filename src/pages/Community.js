"use client"

import { useState } from "react"

const Community = ({ language }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("Chennai")

  const overallStats = {
    totalStudents: 5000,
    dbtEnabled: 60,
    collegesActive: 90,
    yourDistrict: "Chennai",
  }

  const districtPerformance = [
    { name: "Chennai", percentage: 75, color: "bg-green-500" },
    { name: "Coimbatore", percentage: 68, color: "bg-yellow-500" },
    { name: "Madurai", percentage: 62, color: "bg-red-500" },
    { name: "Trichy", percentage: 70, color: "bg-blue-500" },
    { name: "Salem", percentage: 58, color: "bg-purple-500" },
  ]

  const monthlyTrends = [
    { month: "Jan", dbtEnabled: 120, withoutDbt: 80 },
    { month: "Feb", dbtEnabled: 150, withoutDbt: 100 },
    { month: "Mar", dbtEnabled: 180, withoutDbt: 140 },
    { month: "Apr", dbtEnabled: 210, withoutDbt: 170 },
    { month: "May", dbtEnabled: 190, withoutDbt: 160 },
    { month: "Jun", dbtEnabled: 230, withoutDbt: 180 },
  ]

  const collegeAdoption = [
    { name: "SRM University", percentage: 85 },
    { name: "Anna University", percentage: 78 },
    { name: "VIT Chennai", percentage: 92 },
    { name: "Loyola College", percentage: 70 },
    { name: "Others", percentage: 65 },
  ]

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: "Community Insights",
        subtitle: "DBT adoption statistics for Chennai district",
        updated: "Updated: Today",
        totalStudents: "Total Students",
        dbtEnabled: "DBT Enabled",
        collegesActive: "Colleges Active",
        yourDistrict: "Your District",
        dbtStatusDistribution: "DBT Status Distribution",
        collegeWiseAdoption: "College-wise DBT Adoption",
        monthlyTrends: "Monthly DBT Registration Trends",
        districtWisePerformance: "District-wise Performance",
        communityAlert: "Community Alert",
        alertMessage:
          "Your district (Chennai) has 40% students without DBT seeding. This means many students might miss out on scholarship opportunities.",
        helpSpread: "Help spread awareness",
        shareResources: "Share resources",
        withoutDbt: "Without DBT",
        enabled: "Enabled",
      },
      hi: {
        title: "सामुदायिक अंतर्दृष्टि",
        subtitle: "चेन्नई जिले के लिए डीबीटी अपनाने के आंकड़े",
        updated: "अपडेट: आज",
        totalStudents: "कुल छात्र",
        dbtEnabled: "डीबीटी सक्षम",
        collegesActive: "सक्रिय कॉलेज",
        yourDistrict: "आपका जिला",
        dbtStatusDistribution: "डीबीटी स्थिति वितरण",
        collegeWiseAdoption: "कॉलेज-वार डीबीटी अपनाना",
        monthlyTrends: "मासिक डीबीटी पंजीकरण रुझान",
        districtWisePerformance: "जिला-वार प्रदर्शन",
        communityAlert: "सामुदायिक चेतावनी",
        alertMessage:
          "आपके जिले (चेन्नई) में 40% छात्रों के पास डीबीटी सीडिंग नहीं है। इसका मतलब है कि कई छात्र छात्रवृत्ति के अवसरों से चूक सकते हैं।",
        helpSpread: "जागरूकता फैलाने में मदद करें",
        shareResources: "संसाधन साझा करें",
        withoutDbt: "डीबीटी के बिना",
        enabled: "सक्षम",
      },
      ta: {
        title: "சமூக நுண்ணறிவு",
        subtitle: "சென்னை மாவட்டத்திற்கான DBT ஏற்றுக்கொள்ளல் புள்ளிவிவரங்கள்",
        updated: "புதுப்பிக்கப்பட்டது: இன்று",
        totalStudents: "மொத்த மாணவர்கள்",
        dbtEnabled: "DBT இயக்கப்பட்டது",
        collegesActive: "செயலில் உள்ள கல்லூரிகள்",
        yourDistrict: "உங்கள் மாவட்டம்",
        dbtStatusDistribution: "DBT நிலை விநியோகம்",
        collegeWiseAdoption: "கல்லூரி வாரியாக DBT ஏற்றுக்கொள்ளல்",
        monthlyTrends: "மாதாந்திர DBT பதிவு போக்குகள்",
        districtWisePerformance: "மாவட்ட வாரியான செயல்திறன்",
        communityAlert: "சமூக எச்சரிக்கை",
        alertMessage:
          "உங்கள் மாவட்டத்தில் (சென்னை) 40% மாணவர்களுக்கு DBT விதைப்பு இல்லை. இதன் பொருள் பல மாணவர்கள் உதவித்தொகை வாய்ப்புகளை இழக்க நேரிடும்.",
        helpSpread: "விழிப்புணர்வை பரப்ப உதவுங்கள்",
        shareResources: "வளங்களை பகிரவும்",
        withoutDbt: "DBT இல்லாமல்",
        enabled: "இயக்கப்பட்டது",
      },
    }
    return translations[language] || translations.en
  }

  const t = getTranslation()

  const StatCard = ({ icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
      </div>
    </div>
  )

  const BarChart = ({ data, height = 200 }) => {
    const maxValue = Math.max(...data.map((d) => Math.max(d.dbtEnabled, d.withoutDbt)))

    return (
      <div className="flex items-end justify-between gap-4" style={{ height }}>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className="flex flex-col items-center gap-1 w-full">
              <div
                className="bg-green-500 rounded-t w-full"
                style={{ height: `${(item.dbtEnabled / maxValue) * (height - 40)}px` }}
              />
              <div
                className="bg-orange-500 rounded-b w-full"
                style={{ height: `${(item.withoutDbt / maxValue) * (height - 40)}px` }}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    )
  }

  const DonutChart = ({ percentage }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#10b981"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-blue-600 font-medium">{t.updated}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title={t.totalStudents}
          value="5,000"
          color="blue"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          }
          title={t.dbtEnabled}
          value="60%"
          color="green"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          }
          title={t.collegesActive}
          value="90%"
          color="purple"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          }
          title={t.yourDistrict}
          value="Chennai"
          color="indigo"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DBT Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.dbtStatusDistribution}</h3>
          <div className="flex items-center justify-between">
            <DonutChart percentage={60} />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t.enabled} (60%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t.withoutDbt} (40%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* College-wise Adoption */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.collegeWiseAdoption}</h3>
          <div className="space-y-4">
            {collegeAdoption.map((college, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{college.name}</span>
                  <span className="text-sm text-gray-600">{college.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${college.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.monthlyTrends}</h3>
        <BarChart data={monthlyTrends} />
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">DBT {t.enabled} (60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">{t.withoutDbt} (40%)</span>
          </div>
        </div>
      </div>

      {/* District Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.districtWisePerformance}</h3>
        <div className="space-y-4">
          {districtPerformance.map((district, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${district.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{district.name}</span>
                {district.name === "Chennai" && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{t.yourDistrict}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${district.color}`} style={{ width: `${district.percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-10 text-right">{district.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h4 className="font-semibold text-yellow-800 mb-2">{t.communityAlert}</h4>
            <p className="text-yellow-700 text-sm mb-4">{t.alertMessage}</p>
            <div className="flex gap-3">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                {t.helpSpread}
              </button>
              <button className="bg-white text-yellow-600 border border-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors">
                {t.shareResources}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
