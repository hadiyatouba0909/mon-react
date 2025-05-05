// src/components/auth/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
import { register as registerService } from "../../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    email: "",
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  // const { theme } = useTheme();
  // const isDark = theme === "dark";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Effacer les erreurs spécifiques lorsque l'utilisateur modifie un champ
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Dans votre composant Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    console.log("Données du formulaire:", formData);

    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
      return;
    }

    // Vérifier si les termes sont acceptés
    if (!termsAccepted) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Envoi des données...");
      // Appeler le service d'inscription
      const result = await registerService({
        ...formData,
        termsAccepted,
      });
      console.log("Résultat de l'inscription:", result);

      // Rediriger vers la page de connexion avec un message de succès
      navigate("/login", {
        state: {
          message:
            "Compte créé avec succès! Vous pouvez maintenant vous connecter.",
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      if (error.errors) {
        // Gérer les erreurs de validation par champ
        console.log("Erreurs de validation:", error.errors);
        setErrors(error.errors);
      } else {
        // Gérer les erreurs générales
        console.log("Message d'erreur:", error.message);
        setError(
          error.message || "Une erreur est survenue lors de l'inscription"
        );
      }
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
      <div className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-fadeIn bg-opacity-90">
        <div className="px-8 py-6">
          {/* Logo et titre */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-xs text-gray-800">Image du LOGO</span>
            </div>
            <h2 className="text-center text-2xl font-bold text-white">
              Créer un compte
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Rangée 1: Nom et Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Nom
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Prénom
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>
            </div>

            {/* Rangée 2: Téléphone et Adresse */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Téléphone
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+221"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="adresse"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Adresse
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    autoComplete="address"
                    required
                    value={formData.adresse}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Mettre votre adresse"
                  />
                </div>
              </div>
            </div>

            {/* Rangée 3: Email et Login */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Votre email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Login
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.login}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Mettre un login"
                  />
                </div>
              </div>
            </div>

            {/* Rangée 4: Mot de passe et Confirmer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Mot de passe
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Entrer un mot de passe"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="text-gray-400 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirmer le mot de passe
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirmer un mot de passe"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={toggleConfirmPassword}
                      className="text-gray-400 hover:text-white focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Acceptation des conditions */}
            <div className="flex items-center my-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              {/* <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-300"
              >
                J'accepte les{" "}
                <a href="#" className="text-indigo-400 hover:text-indigo-300">
                  conditions d'utilisation
                </a>
              </label> */}
            </div>

            {/* Bouton de soumission */}
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
                  "S'inscrire"
                )}
              </button>
            </div>
          </form>

          {/* Lien vers la page de connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Déjà inscrit?{" "}
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

export default Register;
