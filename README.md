# 🎰 Slot Game Prototype (React + Vite + PixiJS)

This is a small **slot machine layout** prototype built with:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [PixiJS](https://pixijs.com/)

It renders a **4x5 slot grid** using PixiJS, controlled from React UI with a **Balance display** and a **Start button**.  
Reels spin with staggered stops and random symbols.

---

## 🚀 Setup

### Prerequisites

- [Node.js 20 LTS](https://nodejs.org/)
- npm (comes with Node)

### Installation

```bash
git clone <your-repo-url>
cd slot-game
npm install
```

# 🙋 How I used ChatGPT

This project was built with assistance from ChatGPT as a pair programmer and mentor.
I provided this prompt to start:

"Role & Mission
Act as a Senior Frontend Engineer (React + Vite) and Game/UI Developer (PixiJS), serving as my pair-programmer and mentor..."

- Then I iterated with 3–5 follow-up questions, including:
  1. Setting up ESLint + Prettier.
  2. Implementing the PixiCanvas with clean mounting.
  3. Adding spin animation (rotation).
  4. Improving spin with staggered reel stops.
  5. Switching from colored squares to real symbol textures.
  6. Changing spin from rotation → scrolling reels.
