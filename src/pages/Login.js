import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = ({ onLogin, language }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let userCredential;

      if (isRegisterMode) {
        // ✅ Register new user
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.username,
          formData.password
        );

        // Save default profile in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.username.split("@")[0], // default name before editing
          email: formData.username,
          createdAt: new Date(),
        });
      } else {
        // ✅ Login existing user
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.username,
          formData.password
        );
      }

      // ✅ Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        onLogin(userDoc.data()); // pass profile data to parent
      } else {
        // fallback if profile missing
        onLogin({ email: userCredential.user.email });
      }
    }catch (err) {
  console.error("Firebase Auth error:", err.code, err.message);
  setError(err.message); // Show real Firebase error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isRegisterMode
              ? language === "en"
                ? "Create Account"
                : "खाता बनाएं"
              : language === "en"
              ? "DBT Student Portal"
              : "डीबीटी छात्र पोर्टल"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === "en"
              ? "Access scholarships, guidance, and community resources"
              : "छात्रवृत्ति, मार्गदर्शन और सामुदायिक संसाधनों तक पहुंचें"}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                {language === "en" ? "Email" : "ईमेल"}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={
                    language === "en" ? "Enter your email" : "अपना ईमेल दर्ज करें"
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {language === "en" ? "Password" : "पासवर्ड"}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={
                    language === "en"
                      ? "Enter your password"
                      : "अपना पासवर्ड दर्ज करें"
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {language === "en" ? "Remember me" : "मुझे याद रखें"}
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {language === "en"
                    ? "Forgot your password?"
                    : "पासवर्ड भूल गए?"}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isRegisterMode
                      ? language === "en"
                        ? "Creating account..."
                        : "खाता बनाया जा रहा है..."
                      : language === "en"
                      ? "Signing in..."
                      : "साइन इन हो रहे हैं..."}
                  </div>
                ) : isRegisterMode ? (
                  language === "en" ? "Create Account" : "खाता बनाएं"
                ) : language === "en" ? (
                  "Sign in"
                ) : (
                  "साइन इन करें"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === "en"
                    ? "New to DBT Portal?"
                    : "डीबीटी पोर्टल में नए हैं?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isRegisterMode
                  ? language === "en"
                    ? "Already have an account? Sign in"
                    : "पहले से खाता है? साइन इन करें"
                  : language === "en"
                  ? "Create new account"
                  : "नया खाता बनाएं"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
