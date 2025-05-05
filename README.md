# Système de Gestion de Produits - Frontend React

Une application complète de gestion de produits construite avec React qui inclut une authentification complète, une interface utilisateur avec changement de thème, des opérations CRUD pour les produits.

## Fonctionnalités

### 🔒 Authentification Sécurisée
- Connexion avec nom d'utilisateur/email et mot de passe
- Inscription avec des informations utilisateur complètes
- Fonctionnalité de réinitialisation de mot de passe
- Authentification basée sur des jetons (tokens)
- Gestion des sessions utilisateur avec l'API Context

### 💻 Interface Moderne avec Thème Clair/Sombre
- Design responsive fonctionnant sur tous les appareils
- Fonctionnalité de changement de thème avec préférences persistantes
- Interface élégante à thème sombre avec arrière-plan de particules
- Éléments interactifs avec effets au survol
- États de chargement avec spinners animés

### 📱 Disposition de l'Application
- Mise en page de tableau de bord moderne avec barre latérale rétractable
- Navigation responsive avec support mobile
- Affichage du profil utilisateur dans la barre latérale
- Accès aux notifications et aux paramètres dans la barre de navigation

### 📋 Gestion des Produits
- Opérations CRUD complètes pour les produits
- Modales pour ajouter, éditer, visualiser et supprimer des produits
- Validation de formulaire avec gestion des erreurs
- Boîtes de dialogue de confirmation pour les actions critiques
- Système de pagination responsive avec affichage personnalisable

### 🛠️ Caractéristiques Techniques
- Validation de formulaire et gestion des erreurs
- Gestion sécurisée des mots de passe
- Boutons pour afficher/masquer le mot de passe
- Gestion d'état complète avec l'API Context
- Persistance de connexion avec l'option "Se souvenir de moi"
- Composants UI adaptés au thème
- Authentification basée sur des jetons

## Mise en Route

### Prérequis
- Node.js (v14.0.0 ou ultérieur)
- npm ou yarn

### Installation

1. **Cloner le dépôt**
   ```
   git clone https://github.com/hadiyatouba0909/mon-react.git
   cd mon-react
   ```

2. **Installer les dépendances**
   ```
   npm install
   # ou
   yarn install
   ```

3. **Démarrer le serveur de développement**
   ```
   npm start
   # ou
   yarn start
   ```

4. **Ouvrir votre navigateur et accéder à http://localhost:3000**

## Structure du Projet

```
src/
├── components/
│   ├── auth/
│   │   ├── ForgotPassword.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ResetPassword.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── ThemeToggleButton.js
│   ├── layout/
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   └── Sidebar.js
│   ├── modal/
│   │   ├── DeleteProductModal.js
│   │   ├── EditProductModal.js
│   │   ├── LogoutButton.js
│   │   ├── ProductDetailsModal.js
│   │   └── ProductModal.js
│   └── paginations/
│       └── Pagination.js
├── pages/
│   └── Dashboard.js
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── profileService.js
│   └── productService.js
├── App.js
└── ...
```

## Flux d'Authentification

### Inscription
1. L'utilisateur remplit le formulaire d'inscription
2. Les données du formulaire sont validées côté client
3. Les données sont envoyées au service d'authentification
4. L'utilisateur est redirigé vers la page de connexion avec un message de succès

### Connexion
1. L'utilisateur saisit ses identifiants
2. Les identifiants sont validés et envoyés au service d'authentification
3. En cas de succès, l'utilisateur est redirigé vers le tableau de bord
4. L'utilisateur peut sélectionner "Se souvenir de moi" pour une connexion persistante
5. Le jeton d'authentification est stocké dans le localStorage

### Gestion des Sessions
- AuthContext maintient l'état d'authentification
- Vérification automatique de l'authentification au démarrage de l'application
- Les routes protégées redirigent les utilisateurs non authentifiés
- Les informations de l'utilisateur actuel sont accessibles dans toute l'application

### Gestion des Thèmes
- La préférence de thème de l'utilisateur est stockée dans le localStorage
- ThemeContext fournit l'état du thème à travers l'application
- Bouton de basculement pour passer entre les modes clair et sombre
- Style cohérent basé sur le thème sélectionné

### Réinitialisation du Mot de Passe
1. L'utilisateur saisit son email sur la page de mot de passe oublié
2. Un lien de réinitialisation est envoyé à l'email de l'utilisateur
3. L'utilisateur clique sur le lien et est conduit à la page de réinitialisation de mot de passe
4. L'utilisateur saisit et confirme son nouveau mot de passe
5. En cas de succès, l'utilisateur est redirigé vers la page de connexion

### Déconnexion
1. L'utilisateur peut se déconnecter via le bouton de déconnexion de la barre latérale
2. Le jeton d'authentification est supprimé du localStorage
3. La session utilisateur est terminée
4. L'utilisateur est redirigé vers la page de connexion

## Technologies Utilisées

### Frontend
- React.js (v18.3)
- React Router (v7.5)
- API Context pour la gestion d'état (contextes Auth & Theme)
- Tailwind CSS pour le style
- Design responsive avec support mobile
- PropTypes pour la vérification de type des composants

### Fonctionnalités UI
- Basculement thème Clair/Sombre avec persistance localStorage
- Composants adaptés au thème qui s'adaptent aux changements de thème
- Barre latérale rétractable pour une meilleure utilisation de l'espace
- Système de modales pour les formulaires et confirmations
- Pagination accessible avec navigation au clavier
- Icônes SVG interactives
- Transitions animées et micro-interactions

### Services Backend
- Intégration API RESTful avec Axios
- Authentification basée sur des jetons
- localStorage pour l'authentification persistante
- Prise en charge des ID de document de style MongoDB

## Intégration API
- **api.js**: Configure Axios avec l'URL de base et l'intercepteur de jeton JWT pour les requêtes authentifiées
- **authService.js**: Gère les appels API liés à l'authentification (inscription, connexion, déconnexion, informations utilisateur, réinitialisation de mot de passe)
- **profileService.js**: Gère les mises à jour de profil utilisateur, les changements de mot de passe et les téléchargements d'images de profil
- **productService.js**: Implémente les opérations CRUD pour la gestion des produits

## Fonctionnalités du Tableau de Bord
- Affiche une liste paginée de produits avec une fonctionnalité de recherche
- Prend en charge les opérations CRUD via des interfaces modales
- Implémente un design responsive avec un style adapté au thème
- Inclut des transitions animées et des états de chargement
- Gère les états d'erreur et les résultats de recherche vides

## Gestion de Profil
- Permet aux utilisateurs de mettre à jour leurs informations de profil (nom, téléphone, adresse)
- Fournit un retour succès/erreur pour les mises à jour de profil
- S'intègre avec AuthContext pour les mises à jour de données utilisateur en temps réel
- Prend en charge le style adapté au thème

## Routage
- Implémente des routes protégées et publiques à l'aide de React Router
- Redirige automatiquement les utilisateurs authentifiés vers le tableau de bord
- Redirige les utilisateurs non authentifiés vers la page de connexion
- Gère les routes inconnues en redirigeant vers la connexion
- Inclut des états de chargement pendant les vérifications d'authentification

## Contribution
1. Forker le dépôt
2. Créer votre branche de fonctionnalité (`git checkout -b fonctionnalite/super-fonctionnalite`)
3. Committer vos changements (`git commit -m 'Ajouter une super fonctionnalité'`)
4. Pousser vers la branche (`git push origin fonctionnalite/super-fonctionnalite`)
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Remerciements
- React
- Tailwind CSS
- React Router