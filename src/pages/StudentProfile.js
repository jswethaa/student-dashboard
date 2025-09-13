import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Banknote,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import apiService from '../services/api';

const StudentProfile = ({ currentUser, updateUserData, language }) => {
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    gender: currentUser?.gender || 'Male',
    category: currentUser?.category || 'General',
    father_name: currentUser?.father_name || '',
    mother_name: currentUser?.mother_name || '',
    dob: currentUser?.dob || '',
    address: currentUser?.address || '',
    district: currentUser?.district || '',
    state: currentUser?.state || '',
    college_name: currentUser?.college_name || '',
    course: currentUser?.course || '',
    year_of_study: currentUser?.year_of_study || '',
    cgpa: currentUser?.cgpa || '',
    family_income: currentUser?.family_income || '',
    bank_account: currentUser?.bank_account || '',
    ifsc_code: currentUser?.ifsc_code || '',
    dbt_status: currentUser?.dbt_status || 'Not Active',
    aadhaar: currentUser?.aadhaar || '',
    disabilities: currentUser?.disabilities || [],
    achievements: currentUser?.achievements || [],
    extracurricular: currentUser?.extracurricular || []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: "Student Profile",
        subtitle: "View and update your personal information",
        personalInfo: "Personal Information",
        academicInfo: "Academic Information", 
        financialInfo: "Financial Information",
        saveProfile: "Save Profile",
        editProfile: "Edit Profile",
        cancel: "Cancel",
        saving: "Saving...",
        saved: "Profile saved successfully!",
        error: "Error saving profile. Please try again.",
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        gender: "Gender",
        category: "Category",
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        dob: "Date of Birth",
        address: "Address",
        district: "District",
        state: "State",
        collegeName: "College Name",
        course: "Course",
        yearOfStudy: "Year of Study",
        cgpa: "CGPA",
        familyIncome: "Family Income (Annual)",
        bankAccount: "Bank Account",
        ifscCode: "IFSC Code",
        dbtStatus: "DBT Status",
        aadhaar: "Aadhaar Number",
        required: "This field is required",
        invalidEmail: "Please enter a valid email",
        invalidPhone: "Please enter a valid phone number",
        invalidCGPA: "CGPA must be between 0 and 10",
        invalidIncome: "Please enter a valid income amount"
      },
      hi: {
        title: "छात्र प्रोफ़ाइल",
        subtitle: "अपनी व्यक्तिगत जानकारी देखें और अपडेट करें",
        personalInfo: "व्यक्तिगत जानकारी",
        academicInfo: "शैक्षणिक जानकारी",
        financialInfo: "वित्तीय जानकारी",
        saveProfile: "प्रोफ़ाइल सेव करें",
        editProfile: "प्रोफ़ाइल संपादित करें",
        cancel: "रद्द करें",
        saving: "सेव हो रहा है...",
        saved: "प्रोफ़ाइल सफलतापूर्वक सेव हो गई!",
        error: "प्रोफ़ाइल सेव करने में त्रुटि। कृपया पुनः प्रयास करें।",
        name: "पूरा नाम",
        email: "ईमेल",
        phone: "फोन",
        gender: "लिंग",
        category: "श्रेणी",
        fatherName: "पिता का नाम",
        motherName: "माता का नाम",
        dob: "जन्म तिथि",
        address: "पता",
        district: "जिला",
        state: "राज्य",
        collegeName: "कॉलेज का नाम",
        course: "कोर्स",
        yearOfStudy: "अध्ययन का वर्ष",
        cgpa: "सीजीपीए",
        familyIncome: "पारिवारिक आय (वार्षिक)",
        bankAccount: "बैंक खाता",
        ifscCode: "आईएफएससी कोड",
        dbtStatus: "डीबीटी स्थिति",
        aadhaar: "आधार नंबर",
        required: "यह फ़ील्ड आवश्यक है",
        invalidEmail: "कृपया एक वैध ईमेल दर्ज करें",
        invalidPhone: "कृपया एक वैध फोन नंबर दर्ज करें",
        invalidCGPA: "सीजीपीए 0 और 10 के बीच होना चाहिए",
        invalidIncome: "कृपया एक वैध आय राशि दर्ज करें"
      }
    };
    return translations[language]?.[key] || translations.en[key];
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = getTranslation('invalidEmail');
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) {
          newErrors.phone = getTranslation('invalidPhone');
        } else {
          delete newErrors.phone;
        }
        break;
      case 'cgpa':
        if (value && (isNaN(value) || value < 0 || value > 10)) {
          newErrors.cgpa = getTranslation('invalidCGPA');
        } else {
          delete newErrors.cgpa;
        }
        break;
      case 'family_income':
        if (value && (isNaN(value) || value < 0)) {
          newErrors.family_income = getTranslation('invalidIncome');
        } else {
          delete newErrors.family_income;
        }
        break;
      default:
        if (value === '' && ['name', 'email', 'phone', 'college_name', 'course', 'cgpa', 'family_income', 'bank_account', 'ifsc_code'].includes(name)) {
          newErrors[name] = getTranslation('required');
        } else {
          delete newErrors[name];
        }
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSave = async () => {
    // Check for required fields
    const requiredFields = ['name', 'email', 'phone', 'college_name', 'course', 'cgpa', 'family_income', 'bank_account', 'ifsc_code'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!profileData[field]) {
        newErrors[field] = getTranslation('required');
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Update user data through API service
      const updatedUser = apiService.updateUserData(profileData);
      
      if (updatedUser) {
        updateUserData(updatedUser);
        setSaveStatus('success');
        setIsEditing(false);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      gender: currentUser?.gender || 'Male',
      category: currentUser?.category || 'General',
      father_name: currentUser?.father_name || '',
      mother_name: currentUser?.mother_name || '',
      dob: currentUser?.dob || '',
      address: currentUser?.address || '',
      district: currentUser?.district || '',
      state: currentUser?.state || '',
      college_name: currentUser?.college_name || '',
      course: currentUser?.course || '',
      year_of_study: currentUser?.year_of_study || '',
      cgpa: currentUser?.cgpa || '',
      family_income: currentUser?.family_income || '',
      bank_account: currentUser?.bank_account || '',
      ifsc_code: currentUser?.ifsc_code || '',
      dbt_status: currentUser?.dbt_status || 'Not Active',
      aadhaar: currentUser?.aadhaar || '',
      disabilities: currentUser?.disabilities || [],
      achievements: currentUser?.achievements || [],
      extracurricular: currentUser?.extracurricular || []
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getTranslation('title')}
            </h1>
            <p className="text-blue-100">
              {getTranslation('subtitle')}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {getTranslation('editProfile')}
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white text-blue-600 border-white hover:bg-blue-50"
                >
                  {getTranslation('cancel')}
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || Object.keys(errors).length > 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? getTranslation('saving') : getTranslation('saveProfile')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`p-4 rounded-lg flex items-center ${
          saveStatus === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {saveStatus === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          {saveStatus === 'success' ? getTranslation('saved') : getTranslation('error')}
        </div>
      )}

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
            <User className="w-5 h-5 mr-2" />
            {getTranslation('personalInfo')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('name')} *
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('email')} *
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslation('gender')}
                </label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.gender ? 'border-red-300' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslation('category')}
                </label>
                <select
                  name="category"
                  value={profileData.category}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('aadhaar')}
              </label>
              <input
                type="text"
                name="aadhaar"
                value={profileData.aadhaar}
                onChange={handleInputChange}
                disabled={!isEditing}
                maxLength="12"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.aadhaar ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
            <GraduationCap className="w-5 h-5 mr-2" />
            {getTranslation('academicInfo')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('collegeName')} *
              </label>
              <input
                type="text"
                name="college_name"
                value={profileData.college_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.college_name ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.college_name && <p className="text-red-500 text-xs mt-1">{errors.college_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('course')} *
              </label>
              <input
                type="text"
                name="course"
                value={profileData.course}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.course ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('yearOfStudy')}
              </label>
              <select
                name="year_of_study"
                value={profileData.year_of_study}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.year_of_study ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('cgpa')} *
              </label>
              <input
                type="number"
                name="cgpa"
                value={profileData.cgpa}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="0"
                max="10"
                step="0.1"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.cgpa ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cgpa && <p className="text-red-500 text-xs mt-1">{errors.cgpa}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('dbtStatus')}
              </label>
              <select
                name="dbt_status"
                value={profileData.dbt_status}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.dbt_status ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Not Active">Not Active</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Financial Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-600">
            <DollarSign className="w-5 h-5 mr-2" />
            {getTranslation('financialInfo')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('familyIncome')} *
              </label>
              <input
                type="number"
                name="family_income"
                value={profileData.family_income}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="0"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.family_income ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.family_income && <p className="text-red-500 text-xs mt-1">{errors.family_income}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('bankAccount')} *
              </label>
              <input
                type="text"
                name="bank_account"
                value={profileData.bank_account}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.bank_account ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.bank_account && <p className="text-red-500 text-xs mt-1">{errors.bank_account}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('ifscCode')} *
              </label>
              <input
                type="text"
                name="ifsc_code"
                value={profileData.ifsc_code}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.ifsc_code ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.ifsc_code && <p className="text-red-500 text-xs mt-1">{errors.ifsc_code}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('district')}
              </label>
              <input
                type="text"
                name="district"
                value={profileData.district}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.district ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation('state')}
              </label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
