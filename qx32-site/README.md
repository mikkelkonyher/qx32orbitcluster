# qx32 Orbit Cluster

> A vintage supercomputer meets cyberpunk oracle. Ask it anything, and it will calculate the probability of YES or NO.

## Overview

The **qx32 Orbit Cluster** is a playful, single-page React application that simulates a high-tech, retro-futuristic supercomputer. It features:
- **Staged Loading Sequence**: A dramatic, "typewriter" style telemetry log.
- **Deterministic Answers**: The same question always yields the same result (based on a hash of the input).
- **Visuals**: Neon green aesthetics, CRT scanlines, glitch effects, and a responsive layout.
- **Sound**: Procedural beep effects using the Web Audio API.

## Tech Stack

- **Vite**: Fast build tool and dev server.
- **React**: UI library.
- **Tailwind CSS**: Utility-first styling.
- **TypeScript**: Type safety.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository (or navigate to the project folder):
   ```bash
   cd qx32-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. Type a YES/NO question into the input field.
2. Press **ENTER** or click **ASK THE CLUSTER**.
3. Watch the sequence as the qx32 processes your request.
4. Receive your definitive answer with a calculated probability.
5. Click **RERUN PROTOCOL** to ask another question.

## Easter Eggs

- Try asking about "antigravity" to see what happens...

## License

MIT
