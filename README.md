# Poke-Trunfo Modern

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)

> **"Gotta Trump 'Em All!"**  
> A sleek, mobile-first Super Trumps battle arena featuring Pokémon.

## 📋 Overview

Poke-Trunfo Modern is a web application that revives the nostalgia of card battle games with a modern, dark aesthetic. Players compete against the computer by selecting stats (HP, Attack, Defense, Speed). The interface is optimized for mobile devices, featuring smooth 3D flip animations and dynamic color theming based on Pokémon types.

---

## 🏛️ Architecture (MVC)

The application strictly follows the Separation of Concerns principle:

1.  **Model (`types.ts`, `services/`)**:
    *   Defines data structures (`Pokemon`, `Score`).
    *   Fetches data from PokéAPI.
    *   Ensures type safety.

2.  **View (`components/`, `App.tsx`)**:
    *   **Mobile First UI**: Opponent card on top, Player card anchored bottom.
    *   **Theming**: Black/White/Vibrant Green palette + Type-specific card colors.
    *   **Animations**: 0.4s 3D CSS Flip effect for opponent card reveals.

3.  **Controller (`hooks/useGameLogic.ts`)**:
    *   Manages the Game Loop (Start -> Turn -> Reveal -> Result).
    *   Handles Score updates and Win/Loss logic.

---

## 🛠️ Tech Stack

*   **Runtime:** React 18+
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (with custom 3D transform utilities)
*   **Icons:** Lucide React
*   **Data:** PokéAPI

---

## 🚀 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/igorsfugiwara/poke-trunfo.git
    cd poke-trunfo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm start
    ```

---

## 📖 Features

*   **Smart Layout**: Optimized for thumb-reach on mobile devices.
*   **Visual Feedback**: 
    *   Cards flip to reveal stats.
    *   Cards glow green (Win) or dim red (Loss).
    *   Background elements pulse with the game state.
*   **Monetization Ready**: Dedicated Sticky Footer Ad slot.
*   **Accessibility**: High contrast text, ARIA labels, and focus management.

---

## 🤝 Contribution

Contributions are welcome! Fork, branch, and submit a PR.
