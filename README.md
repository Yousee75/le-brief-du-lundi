# Le Brief du Lundi 📨

> La newsletter qui structure ta progression - Site web officiel

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://votre-username.github.io/le-brief-du-lundi/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) 

## 📋 Description

Site web moderne et responsive pour "Le Brief du Lundi", une newsletter hebdomadaire axée sur la productivité, l'IA et les méthodes pour mieux penser et travailler. Le site offre une expérience utilisateur immersive avec des animations fluides et une navigation intuitive.

## 🚀 Fonctionnalités

- **Design Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Mode Sombre/Clair** : Thème adaptatif avec sauvegarde des préférences
- **Animations Fluides** : Utilisation d'AOS (Animate On Scroll) et animations CSS personnalisées
- **Navigation Intuitive** : Menu mobile, scroll smooth, et navigation par sections
- **Performance Optimisée** : Code modulaire et chargement optimisé
- **Accessibilité** : Support des lecteurs d'écran et navigation au clavier

## 📁 Structure du Projet

```
le-brief-du-lundi/
│
├── index.html          # Page principale
├── README.md          # Ce fichier
├── .gitignore         # Fichiers ignorés par Git
│
├── css/
│   ├── styles.css     # Styles principaux
│   └── responsive.css # Styles responsive
│
├── js/
│   ├── main.js        # JavaScript principal
│   └── animations.js  # Animations et interactions
│
└── assets/           # Ressources (si nécessaire)
    ├── fonts/        # Polices locales
    └── images/       # Images
```

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **JavaScript** : Vanilla JS pour les interactions
- **AOS** : Bibliothèque d'animations au scroll
- **Google Fonts** : Inter & Poppins

## 📦 Installation

### Prérequis

- Git installé sur votre machine
- Un compte GitHub
- Un éditeur de code (VS Code recommandé)

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/le-brief-du-lundi.git
   cd le-brief-du-lundi
   ```

2. **Ouvrir le projet**
   ```bash
   # Avec VS Code
   code .
   
   # Ou ouvrir index.html dans votre navigateur
   open index.html  # macOS
   start index.html  # Windows
   ```

## 🌐 Déploiement sur GitHub Pages

1. **Créer un nouveau repository sur GitHub**
   - Nom : `le-brief-du-lundi`
   - Public
   - Sans README (nous en avons déjà un)

2. **Pousser le code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/le-brief-du-lundi.git
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source : Deploy from a branch
   - Branch : main
   - Folder : / (root)
   - Save

4. **Accéder au site**
   - URL : `https://votre-username.github.io/le-brief-du-lundi/`

## 🔧 Configuration

### Personnalisation du contenu

1. **Modifier les textes** : Éditer directement dans `index.html`
2. **Changer les couleurs** : Modifier les variables CSS dans `css/styles.css`
3. **Ajouter des sections** : Suivre la structure existante dans `index.html`

### Variables CSS principales

```css
:root {
    --primary: #3b82f6;        /* Couleur principale */
    --primary-dark: #2563eb;   /* Couleur principale foncée */
    --accent: #10b981;         /* Couleur d'accent */
    --text: #1f2937;           /* Couleur du texte */
    --background: #ffffff;     /* Couleur de fond */
}
```

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px
- **Large Desktop** : > 1440px

## ⚡ Performance

- **Optimisation des images** : Utiliser des formats modernes (WebP, AVIF)
- **Minification** : Minifier CSS et JS en production
- **Lazy Loading** : Pour les images hors viewport
- **Cache** : Configurer les headers de cache appropriés

## 🐛 Dépannage

### Problèmes courants

1. **Les animations ne fonctionnent pas**
   - Vérifier que AOS est bien chargé
   - Désactiver les bloqueurs de publicité

2. **Le thème sombre ne se sauvegarde pas**
   - Vérifier que localStorage est activé
   - Tester en navigation normale (pas privée)

3. **Le menu mobile ne s'ouvre pas**
   - Vérifier la console pour les erreurs JS
   - S'assurer que les IDs correspondent

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Contact

- **Email** : contact@lebriefdulundi.fr
- **Website** : [Le Brief du Lundi](https://votre-username.github.io/le-brief-du-lundi/)

## 🙏 Remerciements

- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll Library
- [Google Fonts](https://fonts.google.com/) - Inter & Poppins
- Tous les contributeurs et lecteurs du Brief du Lundi

---

Fait avec ❤️ pour la communauté du Brief du Lundi
