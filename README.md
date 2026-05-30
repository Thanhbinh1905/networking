# Networking Visualizer

Interactive networking learning app for developers. The app teaches core networking concepts through React Flow diagrams, step-by-step packet/message playback, clear explanations, terminal examples, and practical debugging tips.

## What Is Included

- 28 ordered networking concepts from Ethernet through an end-to-end review path
- Per-concept React Flow diagrams in `client/src/components/diagram/`
- Beginner and developer explanation modes
- Step controls for visual packet/message flow
- Developer terminal examples for each concept
- Bookmark and completion tracking with local Zustand state

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- React Flow
- Tailwind CSS
- Biome
- Zustand

## Getting Started

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000` and go to `/concepts`.

## Docker Compose

Run the app in a containerized development environment from the repository root:

```bash
docker compose up --build
```

If port `3000` is already in use, choose another host port:

```bash
APP_PORT=3001 docker compose up --build
```

The compose setup mounts `client/` into the container for hot reload and keeps `node_modules` plus `.next` in Docker volumes.

## Scripts

```bash
cd client
npm run dev
npm run build
npm run lint
npm run format
```

## Project Structure

```text
client/src/app/                  Next.js app routes
client/src/app/concepts/         Concept list and detail pages
client/src/components/diagram/   Diagram renderer, custom nodes, and concept diagrams
client/src/data/                 Concept catalog, diagram registry, and concept content
client/src/store/                Local progress/bookmark state
```

## Roadmap Notes

The current build focuses on the learning visualizer and concept library. Auth, custom network builder, simulation, collaboration, and sharing are intentionally not implemented yet.
