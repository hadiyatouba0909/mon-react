// src/components/auth/ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const { theme } = useTheme();
  // const isDark = theme === "dark";

  // Dans la fonction handleSubmit du composant ForgotPassword
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await forgotPassword(email);
      setSuccess(
        response.message || "Email de réinitialisation envoyé avec succès"
      );
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setError(
        error.message || "Erreur lors de la demande de réinitialisation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/abstract-realistic-technology-particle-background_23-2148420657.jpg?t=st=1746285610~exp=1746289210~hmac=ef9ee9e37723b6c9308e2f1cabeba34ddaff9226e6ca116710967b1d6907f643&w=996")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-fadeIn bg-opacity-90">
        <div className="px-6 py-8">
          {/* Logo et titre */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-xs text-gray-800">Image du LOGO</span>
            </div>
            <h2 className="text-center text-2xl font-bold text-white">
              Mot de passe oublié
            </h2>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Message de succès */}
          {success && (
            <div
              className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                {isLoading ? (
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
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Vous vous souvenez de votre mot de passe?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
