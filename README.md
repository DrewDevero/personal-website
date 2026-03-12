# Drew Devero — 4D Creative Technologist Portfolio

An interactive 4D portfolio website for **Alston Drew Devero-Belfon** — full-stack engineer, AI researcher, and creative technologist.

## ✦ Portfolio Showreel

<video src="Drew-Devero-Portfolio-Showreel-Mar-12-07-05-10.mp4" poster="public/DrewDevero_website_screenshot.png" controls width="100%"></video>

## ✦ About

A classically trained opera singer turned software engineer, Drew brings storytelling, voice, physicality, and code together to build immersive experiences. This site showcases that intersection through a real-time 4D particle swarm visualization layered beneath a navigable portfolio.

## ✦ Features

- **4D Particle Swarm** — 12,000 instanced tetrahedra rendered via stereographic projection with per-section color palettes
- **Section-Based Navigation** — five sections (Origin, About, Works, Stack, Ping) with scroll-boundary detection, keyboard, mouse wheel, and touch swipe support
- **Post-Processing** — Bloom and Chromatic Aberration via `@react-three/postprocessing`
- **Resume Modal** — inline PDF viewer triggered from the contact section
- **Responsive & Accessible** — glassmorphic UI with high-contrast text tuned for readability

## ✦ Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | React Router 7, React 19, TypeScript |
| 3D | Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Styling | Tailwind CSS 4 |
| Build | Vite 7 |
| Fonts | Inter, JetBrains Mono |

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`.

## ✦ Building for Production

```bash
npm run build
```

## ✦ Deployment

### Docker

```bash
docker build -t drew-devero-4d .
docker run -p 3000:3000 drew-devero-4d
```

### Node

```bash
npm run build
npx react-router-serve ./build/server/index.js
```

## ✦ Project Structure

```
app/
├── components/
│   ├── FourDScene.tsx        # 4D particle swarm, rings, camera, post-processing
│   └── PortfolioOverlay.tsx  # All UI sections, navigation, resume modal
├── routes/
│   └── home.tsx              # Main route — ties scene + overlay together
├── root.tsx                  # Root layout, fonts, favicon
├── app.css                   # Global styles, dark theme
└── routes.ts                 # Route config
public/
├── favicon.ico
└── Alston Drew Devero-Belfon_Resume.pdf
```

## ✦ Connect

- [GitHub](https://github.com/DrewDevero)
- [LinkedIn](https://www.linkedin.com/in/alston-devero-belfon/)
- [X / Twitter](https://x.com/DrewDevero)
- [Portfolio](https://drewdevero.com)
