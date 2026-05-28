<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Contributor Guide

This project is a Next.js App Router learning product for networking fundamentals. Contributors should optimize for clarity, consistency, and small focused changes. The main user experience is a concept detail page: a React Flow diagram, step playback, beginner/developer explanations, terminal examples, and practical tips.

## Product Concept

The UI should feel like a technical learning lab, not a marketing site. It should be calm, readable, and dense enough for repeated study. The app teaches concepts by showing how data moves between devices, then pairing that visual with concise explanations and developer-focused commands.

Core experience:

- `/concepts` shows the ordered learning path and progress.
- `/concepts/[slug]` shows one networking concept with an interactive diagram.
- The left sidebar is the persistent learning path.
- Diagram steps are the primary interaction.
- Explanations should help developers debug real systems, not only define terms.

## Source Of Truth

- Design principles: `DESIGN.md`
- Global theme tokens: `src/app/globals.css`
- shadcn project config: `components.json`
- Concept catalog: `src/data/concepts.ts`
- Concept explanation/toolbox content: `src/data/conceptContent.ts`
- Diagram registry: `src/data/diagrams.ts`
- Per-concept diagrams: `src/components/diagram/*.ts`

Do not introduce one-off color systems. If a color, radius, typography style, or shadow needs to be reused, add or use a token in `src/app/globals.css`.

## UI Design Rules

Use the existing theme tokens and shadcn primitives. Prefer semantic Tailwind classes:

- Good: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`
- Avoid: raw palette utilities like `bg-blue-500`, `text-gray-700`, `border-zinc-200`
- Avoid: inline hex values in components

Layout rules:

- Use `flex`/`grid` with `gap-*`; do not use `space-x-*` or `space-y-*`.
- Use `size-*` when width and height are equal.
- Use `truncate` for single-line overflow.
- Keep cards to real content containers, repeated items, panels, and tool surfaces.
- Do not nest cards inside cards unless a shadcn component requires it.
- Keep UI text inside containers at mobile and desktop widths.
- Use responsive constraints (`min-h`, `max-w`, `grid-cols`, `aspect-*`) for diagram and card surfaces.

Typography rules:

- Use the global typography utilities where possible: `text-display-xl`, `text-display-lg`, `text-display-md`, `text-display-sm`, `text-body-lg`, `text-body-md`, `text-body-sm`, `text-caption-mono`, `text-code`.
- Use mono type only for technical labels, terminal commands, code, and small metadata.
- Keep headings sentence-case. Do not use all-caps headings.
- Keep body text concise and practical.

Elevation and shape rules:

- Use existing stacked shadow utilities: `shadow-hairline`, `shadow-level-2`, `shadow-level-3`, `shadow-level-4`, `shadow-level-5`.
- Prefer subtle borders and hairlines over heavy shadows.
- Use global radius utilities; do not invent arbitrary rounded values unless there is a specific layout need.

## shadcn Rules

This project uses shadcn `base-nova`, Base UI primitives, Tailwind v4, and lucide icons.

Before adding or updating shadcn components:

1. Run `npx shadcn@latest info --json` from `client/`.
2. Check `src/components/ui/` to see what is already installed.
3. Run `npx shadcn@latest docs <component>` before using unfamiliar components.
4. Add components with `npx shadcn@latest add <component>`.
5. Review generated files before committing.

Composition rules:

- Use `Button`, `Card`, `Badge`, `Progress`, `ScrollArea`, `Separator`, and `Tabs` from `src/components/ui/` instead of custom styled markup when they fit.
- Use full card composition: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` as appropriate.
- Use `Separator` instead of manual border divider elements when it represents a divider.
- For links rendered as shadcn buttons, use the Base UI `render` prop pattern used in this repo.
- Icons inside `Button` should use `data-icon="inline-start"` or `data-icon="inline-end"`.
- Do not add manual icon sizing inside shadcn buttons; the component handles icon sizing.

## App Structure

Important folders:

```text
src/app/                    Next.js App Router pages and metadata
src/app/concepts/           Concept list and concept detail routes
src/components/Sidebar.tsx  Persistent learning path sidebar
src/components/diagram/     React Flow renderer, nodes, edges, and diagrams
src/components/ui/          shadcn-generated primitives
src/data/                   Concept catalog, content, and diagram registry
src/store/                  Local progress/bookmark state
```

Use the `@/` alias for imports. Do not use long relative paths when an alias is clearer.

## Concept Content Rules

Every concept should have:

- A stable `id`, `slug`, `title`, `summary`, and `order` in `src/data/concepts.ts`
- A content entry in `src/data/conceptContent.ts`
- A diagram file in `src/components/diagram/`
- A registry entry in `src/data/diagrams.ts`

Content format:

- `beginner`: plain-language explanation
- `developer`: practical developer/debugging explanation
- `terminal`: commands that help inspect the concept
- `tips`: short practical notes and pitfalls

Writing style:

- Explain what changes at each layer.
- Prefer direct debugging value over academic detail.
- Avoid overclaiming. If a behavior is context-dependent, say so.
- Terminal commands should be realistic and recognizable.
- Keep commands safe; avoid destructive commands.

## Diagram Rules

Diagram definitions live in `src/components/diagram/<concept_name>.ts`.

Naming:

- File names use snake case: `mac_address.ts`, `default_gateway.ts`, `load_balancer.ts`.
- Export names use camel case: `macAddressDiagram`, `defaultGatewayDiagram`.
- Node IDs and edge IDs must be stable.

Diagram shape:

- Use 3 to 7 nodes for most beginner concepts.
- Label important addresses, ports, subnets, protocols, and decision points.
- Use `type: "custom"` for React Flow nodes.
- Use supported node data types from `CustomNode.tsx`.
- Use `type: "custom"` for edges when edge labels are needed.
- Each step should include `label`, `description`, and relevant `activeNodes` / `activeEdges`.

Visualization rules:

- Keep the first view understandable without zooming.
- Show one main communication path per concept.
- Use active steps to explain direction and responsibility.
- Do not turn diagrams into full simulations unless implementing the simulation layer.

## State And Interaction

Progress and bookmarks are local state through Zustand in `src/store/useProgressStore.ts`.

Rules:

- Keep UI state close to the route/component unless it is shared across the app.
- Use Zustand only for cross-page state such as completion and bookmarks.
- Do not add persistence/auth flows unless the task explicitly asks for that phase.
- Do not add network requests for static concept content.

## SEO And Sharing

Global metadata lives in `src/app/layout.tsx`.

Rules:

- Keep Facebook/Messenger sharing support through Open Graph metadata.
- The share image endpoint is `src/app/opengraph-image.tsx`.
- If production domain changes, update `metadataBase`.
- Favicon lives at `src/app/favicon.ico`.
- Verify OG tags by inspecting rendered HTML and `curl -I /opengraph-image`.

## Workflow For Contributions

1. Read the relevant code before editing.
2. Keep changes scoped to the requested feature.
3. Prefer existing patterns over new abstractions.
4. Update content, diagrams, and registry entries together.
5. Run formatting and checks before handing off.

Required checks:

```bash
npm run format
npm run lint
npm run build
```

Run commands from `client/`.

When adding dependencies:

- Prefer npm because `package-lock.json` is used by Vercel.
- If shadcn updates `bun.lock`, also run `npm install` so `package-lock.json` matches `package.json`.
- Do not commit `node_modules`, `.next`, `.vercel`, or environment files.

## Vercel Deployment Notes

The repository root is one level above the Next.js app. Vercel project settings must use:

- Root Directory: `client`
- Framework Preset: `Next.js`
- Build Command: default / `npm run build`
- Output Directory: Next.js default

The production URL currently used in metadata is:

```text
https://networking-indol.vercel.app
```

## Pull Request Checklist

- UI uses semantic tokens from `globals.css`.
- shadcn components are composed instead of duplicated.
- No raw colors were introduced in application components.
- No unrelated refactors or generated cache files are included.
- New concept work includes catalog, content, diagram file, and registry entry.
- Diagram step playback still works.
- `npm run lint` passes.
- `npm run build` passes.

