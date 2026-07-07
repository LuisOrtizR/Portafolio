<div align="center">

# 🚀 Luis Ortiz — Developer Portfolio

### Modern Web Architecture · Clean Code · Scalable Systems

<br/>

[![Vue](https://img.shields.io/badge/Vue-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=for-the-badge&logo=vite&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)]()

<br/>

![GitHub last commit](https://img.shields.io/github/last-commit/LuisOrtizR/portfolio?style=flat-square&color=42b883)
![GitHub repo size](https://img.shields.io/github/repo-size/LuisOrtizR/portfolio?style=flat-square&color=646cff)
![License](https://img.shields.io/badge/license-MIT-38bdf8?style=flat-square)

</div>

---

## ✨ About This Project

This is not just a portfolio. It is a **strategically designed, scalable front-end architecture** built with modern technologies and clean engineering principles — crafted to reflect professional standards, technical clarity, and long-term maintainability.

> *"Build a high-performance digital presence that represents your engineering mindset as much as your projects do."*

---

## 🎯 Purpose

- 📁 Showcase professional projects with real context
- ⚙️ Present technical stack and engineering capabilities
- 🏗️ Demonstrate architectural thinking and scalability awareness
- 🌌 Integrate real NASA API data to display valuable space information
- 🤖 Serve as a foundation for future integrations (AI, APIs, automation)

---

## 🧠 Architecture Philosophy

This project is built following professional front-end engineering principles:

- ✅ **Modular component structure** — every piece is isolated and reusable
- ✅ **Separation of concerns** — views, logic, and styles are cleanly decoupled
- ✅ **Strong typing with TypeScript** — fewer bugs, better developer experience
- ✅ **Scalable folder architecture** — built to grow without becoming spaghetti
- ✅ **Performance-first build system** — powered by Vite for instant feedback
- ✅ **Internationalization (i18n)** — full EN / ES / PT multilingual support
- ✅ **External API consumption** — NASA APOD integration via environment variables

### Application Flow

```
main.ts
└── App.vue
    └── Router (index.ts)
        ├── HomeView.vue
        │   └── AppLayout.vue
        │       ├── Navbar.vue
        │       ├── HeroSection.vue
        │       ├── AboutSection.vue
        │       ├── SkillsSection.vue
        │       ├── ProjectsSection.vue
        │       ├── CertificationsSection.vue
        │       ├── NasaApodSection.vue
        │       ├── ContactSection.vue
        │       └── AppFooter.vue
        └── NotFoundView.vue (404)
```

Each section is **fully modular and independently maintainable** — no coupling, no side effects.

---

## 🧱 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Vue 3 (Composition API) | 3.x | Reactive UI Architecture |
| TypeScript | 5.x | Type Safety & Maintainability |
| Vite | Latest | Lightning-fast bundling & HMR |
| TailwindCSS | 3.x | Utility-first styling system |
| Vue Router | 4.x | SPA Navigation |
| Vue i18n | Latest | Multilingual support (EN / ES / PT) |
| NASA APOD API | REST | Real-time space imagery & data |
| ESLint + oxlint | Latest | Code Quality & Consistency |

---

## 🌌 NASA API Integration

This portfolio integrates NASA's **Astronomy Picture of the Day (APOD)** API, displaying real-time space data directly in the portfolio.

### Setup

Create a `.env` file at the root of the project with the following variable:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

You can obtain a free API key at [https://api.nasa.gov](https://api.nasa.gov).

The `NasaApodSection.vue` component consumes this key at runtime via `import.meta.env.VITE_NASA_API_KEY` and fetches the Astronomy Picture of the Day, including title, date, explanation, and HD image or video.

---

## 🌍 Internationalization (i18n)

The portfolio supports three languages out of the box:

| Language | File |
|---|---|
| 🇺🇸 English | `src/i18n/locales/en.ts` |
| 🇪🇸 Spanish | `src/i18n/locales/es.ts` |
| 🇧🇷 Portuguese | `src/i18n/locales/pt.ts` |

The i18n instance is configured in `src/i18n/index.ts` and registered globally in `main.ts`.

---

## 📂 Project Structure

```
portfolio/
├── public/                        # Static public assets
├── src/
│   ├── assets/
│   │   └── main.css               # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.vue      # Main page wrapper
│   │   │   ├── Navbar.vue         # Top navigation bar
│   │   │   └── AppFooter.vue      # Footer component
│   │   ├── sections/
│   │   │   ├── HeroSection.vue         # Landing / intro section
│   │   │   ├── AboutSection.vue        # About me section
│   │   │   ├── SkillsSection.vue       # Tech skills section
│   │   │   ├── ProjectsSection.vue     # Projects showcase
│   │   │   ├── CertificationsSection.vue  # Certifications section
│   │   │   ├── NasaApodSection.vue     # NASA APOD API integration
│   │   │   └── ContactSection.vue      # Contact form / links
│   │   └── ui/                    # Reusable UI primitives
│   ├── config/
│   │   └── site.config.ts         # App-wide configuration
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.ts              # English translations
│   │   │   ├── es.ts              # Spanish translations
│   │   │   └── pt.ts              # Portuguese translations
│   │   └── index.ts               # i18n instance & configuration
│   ├── router/
│   │   └── index.ts               # Route definitions
│   ├── stores/                    # Pinia state management (ready to scale)
│   ├── types/
│   │   └── project.ts             # TypeScript interfaces & types
│   ├── views/
│   │   ├── HomeView.vue           # Main page view
│   │   └── NotFoundView.vue       # 404 page
│   ├── App.vue                    # Root component
│   └── main.ts                    # Application entry point
├── env.d.ts                       # Environment type declarations
├── index.html                     # HTML entry point
├── .env                           # Environment variables (not committed)
├── .gitignore
├── .gitattributes
├── .editorconfig
├── .oxlintrc.json                 # oxlint configuration
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript base config
├── tsconfig.app.json              # App-specific TS config
├── tsconfig.node.json             # Node-specific TS config
├── eslint.config.ts               # ESLint rules
├── postcss.config.js              # PostCSS / Tailwind pipeline
└── package.json                   # Dependencies & scripts
```

> The structure is intentionally designed to scale into API integrations, authentication systems, headless CMS, AI-driven features, and full-stack expansion without refactoring.

---

## ⚡ Performance Highlights

| Feature | Detail |
|---|---|
| ⚡ Hot Module Replacement | Instant feedback during development |
| 📦 Optimized production builds | Tree-shaking + code splitting |
| 🌍 Static deployment ready | Works on any CDN out of the box |
| 🧹 Minimal dependency footprint | Only what's necessary, nothing bloated |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/LuisOrtizR/portfolio.git
cd portfolio
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file at the root of the project:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

> Get your free API key at [https://api.nasa.gov](https://api.nasa.gov)

### 4️⃣ Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🏗️ Production Build

```bash
npm run build
```

Output will be generated inside the `dist/` folder, ready for deployment.

---

## 🔎 Type Checking

```bash
npm run type-check
```

---

## 🧹 Linting

```bash
npm run lint
```

---

## 🌍 Deployment

Recommended platforms for static hosting:

| Platform | Speed | Free Tier |
|---|---|---|
| **Vercel** | ⚡ Instant | ✅ Yes |
| **Netlify** | ⚡ Fast | ✅ Yes |
| **Cloudflare Pages** | 🌍 Global CDN | ✅ Yes |

All platforms support automatic deployments from GitHub on every push to `main`.

> ⚠️ Remember to add your `VITE_NASA_API_KEY` as an environment variable in your hosting provider's dashboard — do **not** commit your `.env` file.

---

## 📈 Roadmap

- [x] Multilingual support (EN / ES / PT)
- [x] NASA APOD API integration
- [x] Certifications section
- [ ] Dynamic project loading from external API
- [ ] AI-powered recruiter assistant chatbot
- [ ] Interactive project live demos
- [ ] Admin panel for content management
- [ ] Full-stack expansion with backend integration
- [ ] Dark / Light mode toggle

---

## 🤝 Contributing

Contributions are welcome. If you find a bug or want to suggest an improvement:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it as inspiration for your own portfolio.

---

## 🧑‍💻 Author

<div align="center">

**Luis Ortiz**
Full Stack Developer

*Focused on scalable architecture, clean engineering, and intelligent systems.*

[![GitHub](https://img.shields.io/badge/GitHub-LuisOrtizR-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuisOrtizR)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-luis--romero--dev-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luis-romero-dev/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://luis-ortiz-portfolio.vercel.app/)

</div>

---

<div align="center">

### Built with precision. Designed for impact.

*— Luis Ortiz*

</div>