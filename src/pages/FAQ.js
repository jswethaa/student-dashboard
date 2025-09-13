"use client"

import { useState, useRef, useEffect } from "react"

const FAQ = ({ language }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: "DBT Support Assistant",
        subtitle: "Get instant answers about DBT, scholarships, and more",
        popularQuestions: "Popular Questions",
        chatAssistant: "Chat Assistant",
        clearChat: "Clear Chat",
        placeholder: "Type your question here...",
        send: "Send",
        listening: "Listening...",
        speaking: "Speaking...",
        botWelcome:
          "Hello! I'm here to help you with DBT and scholarship questions. You can ask me anything or choose from the popular questions below.",
        questions: {
          whatIsDbt: "What is DBT?",
          howToLink: "How do I link DBT?",
          notEnabled: "What if DBT is not enabled?",
          seedingTime: "How long does DBT seeding take?",
        },
        answers: {
          whatIsDbt:
            "DBT (Direct Benefit Transfer) is a government initiative that enables direct transfer of subsidies and benefits to beneficiaries' bank accounts. It ensures transparency and reduces delays in receiving government benefits like scholarships.",
          howToLink:
            "To link DBT: 1) Visit your bank with Aadhaar card and bank passbook, 2) Fill the DBT consent form, 3) Submit required documents, 4) Wait 2-3 working days for activation, 5) Check status on this portal.",
          notEnabled:
            "If DBT is not enabled, you won't receive government scholarships and benefits. Visit your bank immediately with Aadhaar card to complete the DBT seeding process. It's mandatory for all government schemes.",
          seedingTime:
            "DBT seeding typically takes 2-3 working days after submitting documents at the bank. You'll receive SMS confirmation once completed. You can check status on this portal or your bank's mobile app.",
        },
      },
      hi: {
        title: "डीबीटी सहायता सहायक",
        subtitle: "डीबीटी, छात्रवृत्ति और अधिक के बारे में तुरंत उत्तर प्राप्त करें",
        popularQuestions: "लोकप्रिय प्रश्न",
        chatAssistant: "चैट सहायक",
        clearChat: "चैट साफ़ करें",
        placeholder: "यहाँ अपना प्रश्न टाइप करें...",
        send: "भेजें",
        listening: "सुन रहा है...",
        speaking: "बोल रहा है...",
        botWelcome:
          "नमस्ते! मैं डीबीटी और छात्रवृत्ति प्रश्नों में आपकी सहायता के लिए यहाँ हूँ। आप मुझसे कुछ भी पूछ सकते हैं या नीचे दिए गए लोकप्रिय प्रश्नों में से चुन सकते हैं।",
        questions: {
          whatIsDbt: "डीबीटी क्या है?",
          howToLink: "डीबीटी कैसे लिंक करें?",
          notEnabled: "यदि डीबीटी सक्षम नहीं है तो क्या करें?",
          seedingTime: "डीबीटी सीडिंग में कितना समय लगता है?",
        },
        answers: {
          whatIsDbt:
            "डीबीटी (प्रत्यक्ष लाभ हस्तांतरण) एक सरकारी पहल है जो लाभार्थियों के बैंक खातों में सब्सिडी और लाभों के प्रत्यक्ष हस्तांतरण को सक्षम बनाती है। यह पारदर्शिता सुनिश्चित करती है और छात्रवृत्ति जैसे सरकारी लाभ प्राप्त करने में देरी को कम करती है।",
          howToLink:
            "डीबीटी लिंक करने के लिए: 1) आधार कार्ड और बैंक पासबुक के साथ अपने बैंक जाएं, 2) डीबीटी सहमति फॉर्म भरें, 3) आवश्यक दस्तावेज जमा करें, 4) सक्रियण के लिए 2-3 कार्य दिवस प्रतीक्षा करें, 5) इस पोर्टल पर स्थिति जांचें।",
          notEnabled:
            "यदि डीबीटी सक्षम नहीं है, तो आपको सरकारी छात्रवृत्ति और लाभ नहीं मिलेंगे। डीबीटी सीडिंग प्रक्रिया पूरी करने के लिए तुरंत आधार कार्ड के साथ अपने बैंक जाएं। यह सभी सरकारी योजनाओं के लिए अनिवार्य है।",
          seedingTime:
            "बैंक में दस्तावेज जमा करने के बाद डीबीटी सीडिंग में आमतौर पर 2-3 कार्य दिवस लगते हैं। पूरा होने पर आपको एसएमएस पुष्टि मिलेगी। आप इस पोर्टल या अपने बैंक के मोबाइल ऐप पर स्थिति जांच सकते हैं।",
        },
      },
      ta: {
        title: "DBT ஆதரவு உதவியாளர்",
        subtitle: "DBT, உதவித்தொகை மற்றும் பலவற்றைப் பற்றி உடனடி பதில்களைப் பெறுங்கள்",
        popularQuestions: "பிரபலமான கேள்விகள்",
        chatAssistant: "அரட்டை உதவியாளர்",
        clearChat: "அரட்டையை அழிக்கவும்",
        placeholder: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யுங்கள்...",
        send: "அனுப்பு",
        listening: "கேட்கிறது...",
        speaking: "பேசுகிறது...",
        botWelcome:
          "வணக்கம்! DBT மற்றும் உதவித்தொகை கேள்விகளில் உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன். நீங்கள் என்னிடம் எதையும் கேட்கலாம் அல்லது கீழே உள்ள பிரபலமான கேள்விகளில் இருந்து தேர்வு செய்யலாம்.",
        questions: {
          whatIsDbt: "DBT என்றால் என்ன?",
          howToLink: "DBT ஐ எவ்வாறு இணைப்பது?",
          notEnabled: "DBT இயக்கப்படவில்லை என்றால் என்ன செய்வது?",
          seedingTime: "DBT விதைப்பு எவ்வளவு நேரம் எடுக்கும்?",
        },
        answers: {
          whatIsDbt:
            "DBT (நேரடி நன்மை பரிமாற்றம்) என்பது பயனாளிகளின் வங்கி கணக்குகளுக்கு மானியங்கள் மற்றும் நன்மைகளின் நேரடி பரிமாற்றத்தை செயல்படுத்தும் அரசாங்க முன்முயற்சியாகும். இது வெளிப்படைத்தன்மையை உறுதி செய்கிறது மற்றும் உதவித்தொகை போன்ற அரசாங்க நன்மைகளைப் பெறுவதில் தாமதங்களைக் குறைக்கிறது.",
          howToLink:
            "DBT இணைக்க: 1) ஆதார் அட்டை மற்றும் வங்கி பாஸ்புக்குடன் உங்கள் வங்கிக்குச் செல்லுங்கள், 2) DBT ஒப்புதல் படிவத்தை நிரப்புங்கள், 3) தேவையான ஆவணங்களைச் சமர்ப்பிக்கவும், 4) செயல்படுத்துவதற்கு 2-3 வேலை நாட்கள் காத்திருங்கள், 5) இந்த போர்ட்டலில் நிலையைச் சரிபார்க்கவும்.",
          notEnabled:
            "DBT இயக்கப்படவில்லை என்றால், உங்களுக்கு அரசாங்க உதவித்தொகை மற்றும் நன்மைகள் கிடைக்காது. DBT விதைப்பு செயல்முறையை முடிக்க ஆதார் அட்டையுடன் உடனடியாக உங்கள் வங்கிக்குச் செல்லுங்கள். இது அனைத்து அரசாங்க திட்டங்களுக்கும் கட்டாயமாகும்.",
          seedingTime:
            "வங்கியில் ஆவணங்களைச் சமர்ப்பித்த பிறகு DBT விதைப்பு பொதுவாக 2-3 வேலை நாட்கள் எடுக்கும். முடிந்ததும் உங்களுக்கு SMS உறுதிப்படுத்தல் கிடைக்கும். இந்த போர்ட்டலில் அல்லது உங்கள் வங்கியின் மொபைல் ஆப்பில் நிலையைச் சரிபார்க்கலாம்.",
        },
      },
    }
    return translations[language] || translations.en
  }

  const t = getTranslation()

  const speakText = (text, lang = language) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)

      // Set language based on current language
      switch (lang) {
        case "hi":
          utterance.lang = "hi-IN"
          break
        case "ta":
          utterance.lang = "ta-IN"
          break
        default:
          utterance.lang = "en-US"
      }

      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      // Set language for recognition
      switch (language) {
        case "hi":
          recognitionRef.current.lang = "hi-IN"
          break
        case "ta":
          recognitionRef.current.lang = "ta-IN"
          break
        default:
          recognitionRef.current.lang = "en-US"
      }

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.start()
    }
  }

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes("dbt") &&
      (lowerMessage.includes("what") || lowerMessage.includes("क्या") || lowerMessage.includes("என்ன"))
    ) {
      return t.answers.whatIsDbt
    } else if (lowerMessage.includes("link") || lowerMessage.includes("लिंक") || lowerMessage.includes("இணை")) {
      return t.answers.howToLink
    } else if (
      lowerMessage.includes("not enabled") ||
      lowerMessage.includes("सक्षम नहीं") ||
      lowerMessage.includes("இயக்கப்படவில்லை")
    ) {
      return t.answers.notEnabled
    } else if (lowerMessage.includes("time") || lowerMessage.includes("समय") || lowerMessage.includes("நேரம்")) {
      return t.answers.seedingTime
    } else {
      return language === "en"
        ? "I understand you're asking about DBT or scholarships. Could you please be more specific? You can ask about DBT linking, seeding time, eligibility, or choose from the popular questions above."
        : language === "hi"
          ? "मैं समझता हूं कि आप डीबीटी या छात्रवृत्ति के बारे में पूछ रहे हैं। कृपया अधिक विशिष्ट हो सकते हैं? आप डीबीटी लिंकिंग, सीडिंग समय, योग्यता के बारे में पूछ सकते हैं, या ऊपर दिए गए लोकप्रिय प्रश्नों में से चुन सकते हैं।"
          : "நீங்கள் DBT அல்லது உதவித்தொகையைப் பற்றி கேட்கிறீர்கள் என்று நான் புரிந்துகொள்கிறேன். தயவுசெய்து இன்னும் குறிப்பிட்டதாக இருக்க முடியுமா? நீங்கள் DBT இணைப்பு, விதைப்பு நேரம், தகுதி பற்றி கேட்கலாம் அல்லது மேலே உள்ள பிரபலமான கேள்விகளில் இருந்து தேர்வு செய்யலாம்."
    }
  }

  const sendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = { type: "user", text: messageText, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(messageText)
      const botMessage = { type: "bot", text: botResponse, timestamp: new Date() }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handlePopularQuestion = (questionKey) => {
    const questionText = t.questions[questionKey]
    sendMessage(questionText)
  }

  const clearChat = () => {
    setMessages([])
  }

  useEffect(() => {
    // Add welcome message on component mount
    if (messages.length === 0) {
      const welcomeMessage = { type: "bot", text: t.botWelcome, timestamp: new Date() }
      setMessages([welcomeMessage])
    }
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      {/* Popular Questions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">{t.popularQuestions}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(t.questions).map(([key, question]) => (
            <button
              key={key}
              onClick={() => handlePopularQuestion(key)}
              className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-gray-700">{question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{t.chatAssistant}</h3>
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            {t.clearChat}
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${message.type === "user" ? "text-blue-200" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {message.type === "bot" && (
                    <div className="flex items-center gap-1">
                      {!isSpeaking ? (
                        <button
                          onClick={() => speakText(message.text)}
                          className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
                          title="Read aloud"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={stopSpeaking}
                          className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
                          title="Stop speaking"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t.placeholder}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isListening}
              />
              <button
                onClick={startListening}
                disabled={isListening}
                className={`absolute right-2 top-2 p-1 rounded ${
                  isListening ? "text-red-600" : "text-gray-400 hover:text-gray-600"
                } transition-colors`}
                title="Voice input"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isListening}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.send}
            </button>
          </div>
          {isListening && (
            <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
              <span className="animate-pulse">🎤</span>
              {t.listening}
            </p>
          )}
          {isSpeaking && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
              <span className="animate-pulse">🔊</span>
              {t.speaking}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQ
