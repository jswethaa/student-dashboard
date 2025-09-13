"use client"

import { useState, useEffect } from "react"
import apiService from "../services/api"

const Recommendations = ({ language, currentUser, updateUserData }) => {
  const [studentProfile, setStudentProfile] = useState({
    name: currentUser?.name || "Rahul Kumar",
    email: currentUser?.email || "rahul.kumar@example.com",
    phone: currentUser?.phone || "9876543210",
    aadhaar: currentUser?.aadhaar || "123456789012",
    dob: currentUser?.dob || "2002-05-15",
    gender: currentUser?.gender || "Male",
    category: currentUser?.category || "OBC",
    family_income: currentUser?.family_income || 350000,
    father_name: currentUser?.father_name || "Suresh Kumar",
    mother_name: currentUser?.mother_name || "Priya Devi",
    address: currentUser?.address || "123 Main Street, City",
    district: currentUser?.district || "Mumbai",
    state: currentUser?.state || "Maharashtra",
    college_name: currentUser?.college_name || "Mumbai Institute of Technology",
    course: currentUser?.course || "Computer Science Engineering",
    year_of_study: currentUser?.year_of_study || 3,
    cgpa: currentUser?.cgpa || 8.2,
    bank_account: currentUser?.bank_account || "1234567890",
    ifsc_code: currentUser?.ifsc_code || "SBIN0001234",
    dbt_status: currentUser?.dbt_status || "Active",
    disabilities: currentUser?.disabilities || [],
    achievements: currentUser?.achievements || ["Dean's List 2023", "Coding Competition Winner"],
    extracurricular: currentUser?.extracurricular || ["Programming Club", "Debate Society"],
  })

  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profileErrors, setProfileErrors] = useState({})
  const [apiConnected, setApiConnected] = useState(false)

  // Update profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setStudentProfile({
        name: currentUser.name || "Rahul Kumar",
        email: currentUser.email || "rahul.kumar@example.com",
        phone: currentUser.phone || "9876543210",
        aadhaar: currentUser.aadhaar || "123456789012",
        dob: currentUser.dob || "2002-05-15",
        gender: currentUser.gender || "Male",
        category: currentUser.category || "OBC",
        family_income: currentUser.family_income || 350000,
        father_name: currentUser.father_name || "Suresh Kumar",
        mother_name: currentUser.mother_name || "Priya Devi",
        address: currentUser.address || "123 Main Street, City",
        district: currentUser.district || "Mumbai",
        state: currentUser.state || "Maharashtra",
        college_name: currentUser.college_name || "Mumbai Institute of Technology",
        course: currentUser.course || "Computer Science Engineering",
        year_of_study: currentUser.year_of_study || 3,
        cgpa: currentUser.cgpa || 8.2,
        bank_account: currentUser.bank_account || "1234567890",
        ifsc_code: currentUser.ifsc_code || "SBIN0001234",
        dbt_status: currentUser.dbt_status || "Active",
        disabilities: currentUser.disabilities || [],
        achievements: currentUser.achievements || ["Dean's List 2023", "Coding Competition Winner"],
        extracurricular: currentUser.extracurricular || ["Programming Club", "Debate Society"],
      });
    }
  }, [currentUser]);

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: "Scholarship Recommendations",
        subtitle: "Personalized scholarship matches based on your profile",
        getRecommendations: "Get Recommendations",
        viewProfile: "View/Edit Profile",
        hideProfile: "Hide Profile",
        downloadPDF: "Download PDF Report",
        loading: "Finding scholarships for you...",
        noRecommendations: "No scholarships found matching your profile",
        eligibilityScore: "Eligibility Score",
        amount: "Amount",
        deadline: "Deadline",
        provider: "Provider",
        category: "Category",
        requirements: "Requirements",
        whyMatch: "Why this matches you",
        applyNow: "Apply Now",
        studentProfile: "Student Profile",
        personalInfo: "Personal Information",
        academicInfo: "Academic Information",
        financialInfo: "Financial Information",
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        aadhaar: "Aadhaar Number",
        dob: "Date of Birth",
        gender: "Gender",
        category: "Category",
        familyIncome: "Family Income (Annual)",
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        address: "Address",
        district: "District",
        state: "State",
        collegeName: "College Name",
        course: "Course",
        yearOfStudy: "Year of Study",
        cgpa: "CGPA",
        bankAccount: "Bank Account",
        ifscCode: "IFSC Code",
        dbtStatus: "DBT Status",
        updateProfile: "Update Profile",
        saveProfile: "Save Profile",
        male: "Male",
        female: "Female",
        other: "Other",
        general: "General",
        obc: "OBC",
        sc: "SC",
        st: "ST",
        active: "Active",
        pending: "Pending",
        notLinked: "Not Linked",
      },
      hi: {
        title: "छात्रवृत्ति सिफारिशें",
        subtitle: "आपकी प्रोफ़ाइल के आधार पर व्यक्तिगत छात्रवृत्ति मैच",
        getRecommendations: "सिफारिशें प्राप्त करें",
        viewProfile: "प्रोफ़ाइल देखें/संपादित करें",
        hideProfile: "प्रोफ़ाइल छुपाएं",
        downloadPDF: "पीडीएफ रिपोर्ट डाउनलोड करें",
        loading: "आपके लिए छात्रवृत्ति खोजी जा रही है...",
        noRecommendations: "आपकी प्रोफ़ाइल से मेल खाने वाली कोई छात्रवृत्ति नहीं मिली",
        eligibilityScore: "योग्यता स्कोर",
        amount: "राशि",
        deadline: "अंतिम तिथि",
        provider: "प्रदाता",
        category: "श्रेणी",
        requirements: "आवश्यकताएं",
        whyMatch: "यह आपसे क्यों मेल खाता है",
        applyNow: "अभी आवेदन करें",
        studentProfile: "छात्र प्रोफ़ाइल",
        personalInfo: "व्यक्तिगत जानकारी",
        academicInfo: "शैक्षणिक जानकारी",
        financialInfo: "वित्तीय जानकारी",
        name: "पूरा नाम",
        email: "ईमेल",
        phone: "फोन",
        aadhaar: "आधार संख्या",
        dob: "जन्म तिथि",
        gender: "लिंग",
        category: "श्रेणी",
        familyIncome: "पारिवारिक आय (वार्षिक)",
        fatherName: "पिता का नाम",
        motherName: "माता का नाम",
        address: "पता",
        district: "जिला",
        state: "राज्य",
        collegeName: "कॉलेज का नाम",
        course: "कोर्स",
        yearOfStudy: "अध्ययन का वर्ष",
        cgpa: "सीजीपीए",
        bankAccount: "बैंक खाता",
        ifscCode: "आईएफएससी कोड",
        dbtStatus: "डीबीटी स्थिति",
        updateProfile: "प्रोफ़ाइल अपडेट करें",
        saveProfile: "प्रोफ़ाइल सेव करें",
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        general: "सामान्य",
        obc: "ओबीसी",
        sc: "एससी",
        st: "एसटी",
        active: "सक्रिय",
        pending: "लंबित",
        notLinked: "लिंक नहीं",
      },
      ta: {
        title: "உதவித்தொகை பரிந்துரைகள்",
        subtitle: "உங்கள் சுயவிவரத்தின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட உதவித்தொகை பொருத்தங்கள்",
        getRecommendations: "பரிந்துரைகளைப் பெறுங்கள்",
        viewProfile: "சுயவிவரத்தைப் பார்க்கவும்/திருத்தவும்",
        hideProfile: "சுயவிவரத்தை மறைக்கவும்",
        downloadPDF: "PDF அறிக்கையைப் பதிவிறக்கவும்",
        loading: "உங்களுக்கான உதவித்தொகைகளைத் தேடுகிறது...",
        noRecommendations: "உங்கள் சுயவிவரத்துடன் பொருந்தும் உதவித்தொகைகள் எதுவும் கிடைக்கவில்லை",
        eligibilityScore: "தகுதி மதிப்பெண்",
        amount: "தொகை",
        deadline: "கடைசி தேதி",
        provider: "வழங்குநர்",
        category: "வகை",
        requirements: "தேவைகள்",
        whyMatch: "இது ஏன் உங்களுக்குப் பொருந்துகிறது",
        applyNow: "இப்போது விண்ணப்பிக்கவும்",
        studentProfile: "மாணவர் சுயவிவரம்",
        personalInfo: "தனிப்பட்ட தகவல்",
        academicInfo: "கல்வித் தகவல்",
        financialInfo: "நிதித் தகவல்",
        name: "முழு பெயர்",
        email: "மின்னஞ்சல்",
        phone: "தொலைபேசி",
        aadhaar: "ஆதார் எண்",
        dob: "பிறந்த தேதி",
        gender: "பாலினம்",
        category: "வகை",
        familyIncome: "குடும்ப வருமானம் (ஆண்டு)",
        fatherName: "தந்தையின் பெயர்",
        motherName: "தாயின் பெயர்",
        address: "முகவரி",
        district: "மாவட்டம்",
        state: "மாநிலம்",
        collegeName: "கல்லூரி பெயர்",
        course: "பாடநெறி",
        yearOfStudy: "படிப்பு ஆண்டு",
        cgpa: "சிஜிபிஏ",
        bankAccount: "வங்கி கணக்கு",
        ifscCode: "ஐஎஃப்எஸ்சி குறியீடு",
        dbtStatus: "டிபிடி நிலை",
        updateProfile: "சுயவிவரத்தைப் புதுப்பிக்கவும்",
        saveProfile: "சுயவிவரத்தைச் சேமிக்கவும்",
        male: "ஆண்",
        female: "பெண்",
        other: "மற்றவை",
        general: "பொது",
        obc: "ஓபிசி",
        sc: "எஸ்சி",
        st: "எஸ்டி",
        active: "செயலில்",
        pending: "நிலுவையில்",
        notLinked: "இணைக்கப்படவில்லை",
      },
    }
    return translations[language] || translations.en
  }

  const t = getTranslation()

  const mockRecommendations = [
    {
      scholarship_id: "SCH001",
      name: "National Merit Scholarship",
      provider: "Government of India",
      amount: 50000,
      eligibility_score: 85.5,
      match_reasons: [
        "Your CGPA (8.2) meets the minimum requirement",
        "Your family income qualifies for this scholarship",
        "Available for OBC category students",
        "High compatibility match",
      ],
      deadline: "2024-03-31",
      application_link: "https://scholarships.gov.in/merit",
      requirements: ["CGPA >= 8.0", "Family income < 500000", "DBT enabled"],
      category: "Merit-based",
    },
    {
      scholarship_id: "SCH002",
      name: "Engineering Excellence Award",
      provider: "AICTE",
      amount: 100000,
      eligibility_score: 78.2,
      match_reasons: [
        "Available for Computer Science Engineering students",
        "Your CGPA qualifies for this award",
        "Good compatibility match",
      ],
      deadline: "2024-06-15",
      application_link: "https://aicte-india.org/scholarships",
      requirements: ["Engineering course", "CGPA >= 7.5", "DBT enabled"],
      category: "Course-specific",
    },
    {
      scholarship_id: "SCH003",
      name: "OBC Development Scholarship",
      provider: "Ministry of Social Justice",
      amount: 60000,
      eligibility_score: 72.8,
      match_reasons: ["Specifically for OBC category students", "Your family income qualifies", "DBT status is active"],
      deadline: "2024-04-30",
      application_link: "https://scholarships.gov.in/obc",
      requirements: ["OBC category", "Family income < 400000", "DBT enabled"],
      category: "Category-based",
    },
  ]

  const getRecommendations = async () => {
    setLoading(true)
    try {
      if (apiConnected) {
        // Use real API
        const result = await apiService.getScholarshipRecommendations(studentProfile)
        setRecommendations(result)
      } else {
        // Fallback to mock data
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setRecommendations(mockRecommendations)
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      // Fallback to mock data on error
      setRecommendations(mockRecommendations)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = (field, value) => {
    setStudentProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateProfile = () => {
    const errors = {}

    if (!studentProfile.name || studentProfile.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long"
    }

    if (!studentProfile.email || !studentProfile.email.includes("@")) {
      errors.email = "Valid email address is required"
    }

    if (!studentProfile.aadhaar || studentProfile.aadhaar.length !== 12) {
      errors.aadhaar = "Aadhaar number must be 12 digits"
    }

    if (studentProfile.cgpa < 0 || studentProfile.cgpa > 10) {
      errors.cgpa = "CGPA must be between 0 and 10"
    }

    if (studentProfile.family_income < 0) {
      errors.family_income = "Family income cannot be negative"
    }

    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  const downloadPDF = async () => {
    try {
      let pdfBlob

      if (apiConnected) {
        // Use real API
        pdfBlob = await apiService.generateRecommendationsPDF(studentProfile, recommendations)
      } else {
        // Show message that backend is needed for PDF generation
        alert("Backend server is not running. Please start the FastAPI backend to generate PDF reports.")
        return
      }

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Scholarship_Recommendations_${studentProfile.name.replace(" ", "_")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Error generating PDF. Please ensure the backend server is running and try again.")
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  useEffect(() => {
    const checkAPIConnection = async () => {
      try {
        await apiService.healthCheck()
        setApiConnected(true)
        console.log("✅ Backend API connected successfully")
      } catch (error) {
        setApiConnected(false)
        console.log("⚠️ Backend API not available, using mock data")
      }
    }

    checkAPIConnection()
  }, [])

  return (
    <div className="space-y-6">
      {!apiConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-yellow-800">
              Backend API not connected. Using demo data. Start the FastAPI backend for full functionality including PDF
              generation.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
            {apiConnected && (
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Connected to backend API</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showProfile ? t.hideProfile : t.viewProfile}
            </button>
            <button
              onClick={getRecommendations}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? t.loading : t.getRecommendations}
            </button>
            {recommendations.length > 0 && (
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t.downloadPDF}
              </button>
            )}
          </div>
        </div>
      </div>

      {showProfile && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t.studentProfile}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">{t.personalInfo}</h3>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.name}</label>
                <input
                  type="text"
                  value={studentProfile.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${profileErrors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {profileErrors.name && <p className="text-red-500 text-xs mt-1">{profileErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.email}</label>
                <input
                  type="email"
                  value={studentProfile.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${profileErrors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone}</label>
                <input
                  type="tel"
                  value={studentProfile.phone}
                  onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.gender}</label>
                <select
                  value={studentProfile.gender}
                  onChange={(e) => handleProfileUpdate("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">{t.male}</option>
                  <option value="Female">{t.female}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.category}</label>
                <select
                  value={studentProfile.category}
                  onChange={(e) => handleProfileUpdate("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General">{t.general}</option>
                  <option value="OBC">{t.obc}</option>
                  <option value="SC">{t.sc}</option>
                  <option value="ST">{t.st}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">{t.academicInfo}</h3>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.collegeName}</label>
                <input
                  type="text"
                  value={studentProfile.college_name}
                  onChange={(e) => handleProfileUpdate("college_name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.course}</label>
                <input
                  type="text"
                  value={studentProfile.course}
                  onChange={(e) => handleProfileUpdate("course", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.yearOfStudy}</label>
                <select
                  value={studentProfile.year_of_study}
                  onChange={(e) => handleProfileUpdate("year_of_study", Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.cgpa}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={studentProfile.cgpa}
                  onChange={(e) => handleProfileUpdate("cgpa", Number.parseFloat(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${profileErrors.cgpa ? "border-red-500" : "border-gray-300"}`}
                />
                {profileErrors.cgpa && <p className="text-red-500 text-xs mt-1">{profileErrors.cgpa}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.dbtStatus}</label>
                <select
                  value={studentProfile.dbt_status}
                  onChange={(e) => handleProfileUpdate("dbt_status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">{t.active}</option>
                  <option value="Pending">{t.pending}</option>
                  <option value="Not Linked">{t.notLinked}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">{t.financialInfo}</h3>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.familyIncome}</label>
                <input
                  type="number"
                  value={studentProfile.family_income}
                  onChange={(e) => handleProfileUpdate("family_income", Number.parseFloat(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${profileErrors.family_income ? "border-red-500" : "border-gray-300"}`}
                />
                {profileErrors.family_income && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.family_income}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.bankAccount}</label>
                <input
                  type="text"
                  value={studentProfile.bank_account}
                  onChange={(e) => handleProfileUpdate("bank_account", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.ifscCode}</label>
                <input
                  type="text"
                  value={studentProfile.ifsc_code}
                  onChange={(e) => handleProfileUpdate("ifsc_code", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.district}</label>
                <input
                  type="text"
                  value={studentProfile.district}
                  onChange={(e) => handleProfileUpdate("district", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.state}</label>
                <input
                  type="text"
                  value={studentProfile.state}
                  onChange={(e) => handleProfileUpdate("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={validateProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.saveProfile}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Found {recommendations.length} matching scholarships</h2>

          {recommendations.map((rec, index) => (
            <div key={rec.scholarship_id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{rec.name}</h3>
                  <p className="text-gray-600">{rec.provider}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(rec.eligibility_score)}`}
                  >
                    {t.eligibilityScore}: {rec.eligibility_score}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">{t.amount}</span>
                  <p className="font-semibold text-green-600">₹{rec.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">{t.deadline}</span>
                  <p className="font-semibold">{rec.deadline}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">{t.category}</span>
                  <p className="font-semibold">{rec.category}</p>
                </div>
                <div>
                  <a
                    href={rec.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    {t.applyNow}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t.whyMatch}</h4>
                  <ul className="space-y-1">
                    {rec.match_reasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t.requirements}</h4>
                  <ul className="space-y-1">
                    {rec.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-600">{t.noRecommendations}</p>
          <p className="text-sm text-gray-500 mt-2">
            Click "{t.getRecommendations}" to find scholarships matching your profile
          </p>
        </div>
      )}
    </div>
  )
}

export default Recommendations
