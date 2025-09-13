import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Info,
  ExternalLink,
  Calendar,
  User,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Scholarships = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [expandedScholarship, setExpandedScholarship] = useState(null);

  const scholarships = [
    {
      id: 1,
      name: "National Merit Scholarship",
      provider: "Ministry of Education",
      amount: "₹50,000",
      deadline: "2024-03-15",
      eligible: true,
      category: "merit",
      description: "For students with academic excellence in 12th grade",
      requirements: ["Minimum 85% in 12th", "DBT enabled", "Family income < ₹8 lakhs"],
      benefits: [
        "Full tuition coverage for undergraduate studies",
        "Monthly stipend of ₹2,000",
        "Priority access to government internships"
      ],
      applicationSteps: [
        "Submit online application form",
        "Upload academic transcripts",
        "Provide income certificate",
        "Complete DBT verification"
      ]
    },
    {
      id: 2,
      name: "State Education Grant",
      provider: "State Government",
      amount: "₹25,000",
      deadline: "2024-04-01",
      eligible: false,
      category: "need-based",
      description: "Financial assistance for economically disadvantaged students",
      requirements: ["Family income < ₹3 lakhs", "DBT enabled", "Domicile certificate"],
      reason: "DBT not enabled",
      benefits: [
        "One-time financial assistance",
        "Book and stationery allowance",
        "Transportation support"
      ],
      applicationSteps: [
        "Visit nearest education office",
        "Submit income certificate",
        "Complete DBT seeding process",
        "Submit domicile certificate"
      ]
    },
    {
      id: 3,
      name: "Technical Education Scholarship",
      provider: "AICTE",
      amount: "₹75,000",
      deadline: "2024-05-15",
      eligible: true,
      category: "technical",
      description: "For students pursuing engineering or technical courses",
      requirements: ["Enrolled in technical course", "Minimum 75% marks", "DBT enabled"],
      benefits: [
        "Annual scholarship for 4 years",
        "Industry mentorship program",
        "Job placement assistance"
      ],
      applicationSteps: [
        "Register on AICTE portal",
        "Upload course enrollment proof",
        "Submit academic records",
        "Complete DBT verification"
      ]
    },
    {
      id: 4,
      name: "Minority Community Scholarship",
      provider: "Ministry of Minority Affairs",
      amount: "₹30,000",
      deadline: "2024-04-30",
      eligible: false,
      category: "minority",
      description: "Support for students from minority communities",
      requirements: ["Minority community certificate", "Family income < ₹6 lakhs", "DBT enabled"],
      reason: "Missing community certificate",
      benefits: [
        "Annual financial support",
        "Cultural exchange programs",
        "Community development projects"
      ],
      applicationSteps: [
        "Obtain minority community certificate",
        "Submit income verification",
        "Complete DBT seeding",
        "Upload required documents"
      ]
    },
  ];

  const filteredScholarships = scholarships.filter((scholarship) => {
    if (filter === "all") return true;
    if (filter === "eligible") return scholarship.eligible;
    if (filter === "not-eligible") return !scholarship.eligible;
    return scholarship.category === filter;
  });

  const totalAmount = scholarships
    .filter((s) => s.eligible)
    .reduce((sum, s) => sum + Number.parseInt(s.amount.replace(/[₹,]/g, "")), 0);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'merit': return Award;
      case 'need-based': return DollarSign;
      case 'technical': return FileText;
      case 'minority': return User;
      default: return Award;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'merit': return 'bg-blue-100 text-blue-800';
      case 'need-based': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'minority': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">
          {language === "en" ? "Scholarship Opportunities" : "छात्रवृत्ति अवसर"}
        </h1>
        <p className="text-green-100">
          {language === "en" 
            ? "Discover and apply for scholarships that match your profile"
            : "अपनी प्रोफ़ाइल से मेल खाने वाली छात्रवृत्ति खोजें और आवेदन करें"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {scholarships.filter((s) => s.eligible).length}
          </div>
          <div className="text-gray-600">
            {language === "en" ? "Eligible Scholarships" : "पात्र छात्रवृत्ति"}
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            ₹{totalAmount.toLocaleString()}
          </div>
          <div className="text-gray-600">
            {language === "en" ? "Potential Earnings" : "संभावित कमाई"}
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {scholarships.filter((s) => !s.eligible).length}
          </div>
          <div className="text-gray-600">
            {language === "en" ? "Missing Requirements" : "गुम दस्तावेज"}
          </div>
        </Card>
      </div>

      {/* Missing Alert */}
      {scholarships.some((s) => !s.eligible && s.reason === "DBT not enabled") && (
        <Card className="bg-red-50 border-red-200">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-medium text-red-800">
                  {language === "en" ? "You're missing ₹25,000 in scholarships!" : "आप ₹25,000 की छात्रवृत्ति गंवा रहे हैं!"}
                </h3>
                <p className="text-sm text-red-700">
                  {language === "en" 
                    ? "Enable DBT to unlock additional scholarship opportunities."
                    : "अतिरिक्त छात्रवृत्ति अवसरों को अनलॉक करने के लिए DBT सक्षम करें।"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {language === "en" ? "Filter Scholarships" : "छात्रवृत्ति फ़िल्टर करें"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: language === "en" ? "All Scholarships" : "सभी छात्रवृत्ति" },
              { key: "eligible", label: language === "en" ? "Eligible" : "पात्र" },
              { key: "not-eligible", label: language === "en" ? "Not Eligible" : "अपात्र" },
              { key: "merit", label: language === "en" ? "Merit-based" : "योग्यता आधारित" },
              { key: "need-based", label: language === "en" ? "Need-based" : "आवश्यकता आधारित" },
              { key: "technical", label: language === "en" ? "Technical" : "तकनीकी" },
              { key: "minority", label: language === "en" ? "Minority" : "अल्पसंख्यक" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Scholarship List */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => {
          const CategoryIcon = getCategoryIcon(scholarship.category);
          const isExpanded = expandedScholarship === scholarship.id;
          
          return (
            <Card 
              key={scholarship.id} 
              className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                isExpanded ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => {
                console.log('Scholarship clicked:', scholarship.id);
                setExpandedScholarship(isExpanded ? null : scholarship.id);
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CategoryIcon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{scholarship.name}</h3>
                      <Badge className={getCategoryColor(scholarship.category)}>
                        {scholarship.category}
                      </Badge>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          scholarship.eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {scholarship.eligible 
                          ? (language === "en" ? "Eligible" : "पात्र") 
                          : (language === "en" ? "Not Eligible" : "अपात्र")
                        }
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{scholarship.provider}</p>
                    <p className="text-gray-700">{scholarship.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{scholarship.amount}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {language === "en" ? "Deadline:" : "अंतिम तिथि:"} {scholarship.deadline}
                    </div>
                  </div>
                </div>

                {!scholarship.eligible && scholarship.reason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      ⚠️ {scholarship.reason}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedScholarship(isExpanded ? null : scholarship.id);
                    }}
                    className="flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        {language === "en" ? "Hide Details" : "विवरण छुपाएं"}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        {language === "en" ? "Show Details" : "विवरण दिखाएं"}
                      </>
                    )}
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        scholarship.eligible
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!scholarship.eligible}
                    >
                      {scholarship.eligible 
                        ? (language === "en" ? "Apply Now" : "अभी आवेदन करें") 
                        : (language === "en" ? "Cannot Apply" : "आवेदन नहीं कर सकते")
                      }
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {language === "en" ? "Learn More" : "और जानें"}
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 border-t pt-6 space-y-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                        <Award className="w-5 h-5" />
                        {language === "en" ? "Benefits" : "लाभ"}
                      </h4>
                      <ul className="space-y-2">
                        {scholarship.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
                        <FileText className="w-5 h-5" />
                        {language === "en" ? "Requirements" : "आवश्यकताएं"}
                      </h4>
                      <ul className="space-y-2">
                        {scholarship.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Steps */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-700">
                        <Clock className="w-5 h-5" />
                        {language === "en" ? "Application Steps" : "आवेदन चरण"}
                      </h4>
                      <div className="space-y-3">
                        {scholarship.applicationSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Scholarships;