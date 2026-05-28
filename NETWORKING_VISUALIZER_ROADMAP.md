# Networking Visualizer Project Roadmap

## 1. Product Vision

Build an interactive networking learning platform for developers that explains core networking concepts through visual, node-based communication flows. The primary learning experience is a React Flow diagram for each concept, paired with concise explanations that connect the visual model to how real networks work.

The long-term goal is to evolve from guided concept visualizations into a customizable network lab where users can assemble PCs, switches, routers, IP addresses, ports, DNS services, firewalls, VPNs, load balancers, and routes to simulate how data moves across a network.

## 2. Target Users

- Developers who know application code but want stronger networking fundamentals.
- Backend, DevOps, platform, and cloud engineers who need practical mental models.
- Students or junior engineers learning network layers, routing, protocols, and security.
- Teams that want visual explanations for onboarding or internal training.

## 3. Core Learning Model

Each networking concept should include:

- A dedicated concept page.
- A React Flow visualization showing the key components and communication path.
- A short plain-language explanation.
- A step-by-step packet/message flow.
- Important terms and gotchas.
- Optional developer-focused examples, such as curl, ping, dig, browser requests, TCP ports, TLS handshakes, or routing tables.

Example: MAC Address

- Initial chart: two PCs connected through a switch.
- Nodes: PC A, PC B, Switch, MAC Address labels.
- Edges: Ethernet frame path from PC A to switch, then switch to PC B.
- Explanation: MAC addresses identify network interfaces on the local network segment. Switches learn which MAC address is reachable through which port and forward Ethernet frames accordingly.

## 4. Concept Catalog

The first version should support 28 ordered concepts:

| #   | Concept         | Initial Visualization Goal                                                 |
| --- | --------------- | -------------------------------------------------------------------------- |
| 1   | Ethernet        | Show frames moving between devices on a wired LAN.                         |
| 2   | Wi-Fi           | Show a wireless client communicating through an access point.              |
| 3   | MAC Address     | Show two PCs with MAC addresses communicating through a switch.            |
| 4   | Switch          | Show MAC learning and frame forwarding inside a LAN.                       |
| 5   | IP Address      | Show devices using IP addresses to identify source and destination hosts.  |
| 6   | Static IP       | Show a device manually configured with fixed IP settings.                  |
| 7   | DHCP            | Show Discover, Offer, Request, Acknowledge between client and DHCP server. |
| 8   | Subnet          | Show which devices are inside or outside the same network range.           |
| 9   | Router          | Show traffic crossing from one subnet to another.                          |
| 10  | Default Gateway | Show a host sending non-local traffic to its gateway.                      |
| 11  | Routes          | Show route table decision-making for multiple destinations.                |
| 12  | Static Routing  | Show manually configured routes between routers.                           |
| 13  | OSPF            | Show routers sharing link-state information and choosing shortest paths.   |
| 14  | BGP             | Show autonomous systems exchanging routes across the internet.             |
| 15  | Ping            | Show request and reply flow between two hosts.                             |
| 16  | ICMP            | Show ICMP messages used for diagnostics and network control.               |
| 17  | TCP             | Show connection setup, reliable delivery, and teardown.                    |
| 18  | UDP             | Show connectionless datagrams between client and server.                   |
| 19  | Ports           | Show one IP address hosting multiple services through different ports.     |
| 20  | Firewall        | Show allowed and blocked flows based on rules.                             |
| 21  | TLS             | Show encrypted session establishment over an existing transport.           |
| 22  | SSL             | Explain SSL as legacy terminology and contrast it with modern TLS.         |
| 23  | VPN             | Show encrypted tunnel traffic between client and private network.          |
| 24  | DNS             | Show domain name lookup through resolver and authoritative servers.        |
| 25  | HTTP            | Show request and response between browser/client and server.               |
| 26  | HTTPS           | Show HTTP over TLS, including encrypted request/response.                  |
| 27  | Load Balancer   | Show traffic distributed from one entry point to multiple backend servers. |
| 28  | Review Path     | Connect all concepts into an end-to-end request journey.                   |

Note: The supplied list contains 27 named concepts from Ethernet through Load Balancer. This roadmap reserves item 28 as a review path that connects all concepts together. If the product must have exactly 28 named standalone concepts, split Load Balancer into Layer 4 Load Balancer and Layer 7 Load Balancer, or add NAT before DNS.

## 5. Application Structure

Recommended primary routes:

- `/` - authenticated dashboard and learning progress.
- `/login` - GitHub and Google authentication.
- `/concepts` - ordered concept list.
- `/concepts/:slug` - concept detail page with React Flow visualization and explanation.
- `/playground` - future custom network builder.
- `/profile` - account, saved progress, and preferences.

Core UI areas:

- Concept sidebar with ordered learning path.
- Main React Flow canvas.
- Explanation panel.
- Step controls for animated flows.
- Glossary or term drawer.
- Save/bookmark progress controls.

## 6. Technical Architecture

Recommended stack:

- Frontend: React, TypeScript, Vite or Next.js.
- Visualization: React Flow.
- Styling: Tailwind CSS or existing design system.
- Auth: NextAuth/Auth.js, Supabase Auth, Clerk, or Firebase Auth with GitHub and Google providers.
- Database: PostgreSQL through Supabase, Neon, or managed Postgres.
- ORM: Prisma or Drizzle.
- State: Zustand or React context for diagram interaction state.
- Content: Markdown/MDX, JSON, or database-backed concept definitions.

Suggested data model:

- `User`: account identity and auth provider links.
- `Concept`: title, slug, order, summary, explanation, difficulty.
- `DiagramDefinition`: nodes, edges, layout metadata, animation steps.
- `Progress`: user, concept, completion state, last viewed step.
- `SavedNetwork`: future user-created custom diagrams.
- `NetworkNodeTemplate`: reusable components such as PC, switch, router, IP, port, firewall, DNS, load balancer.

## 7. Roadmap Phases

### Phase 0: Product Definition

Goals:

- Finalize concept list and ordering.
- Define visual language for networking components.
- Decide whether the app is content-first, simulator-first, or hybrid.
- Choose auth, database, deployment, and styling stack.

Deliverables:

- Product requirements document.
- Concept taxonomy.
- Initial diagram style guide.
- MVP scope lock.

### Phase 1: MVP Foundation

Goals:

- Create app shell.
- Add authentication with GitHub and Google. (Add this lated after the MVP)
- Build concept listing and detail page structure.
- Integrate React Flow with static diagrams.
- Add the list of concepts to a collapsible sidebar when in the `/concepts/:slug` page

Deliverables:

- Login/logout flow.
- Protected dashboard.
- `/concepts` page with the ordered concept catalog.
- `/concepts/:slug` page.
- Reusable diagram renderer.
- Seed data for the first 5 concepts.

Recommended MVP concepts:

- Ethernet
- MAC Address
- Switch
- IP Address
- DHCP

### Phase 2: Concept Visualization Library

Goals:

- Build reusable networking node components.
- Create reusable edge styles for packet flow, encrypted tunnel, blocked traffic, and routing paths.
- Add step-by-step flow playback.
- Expand concept content from 5 concepts to all initial concepts.

Deliverables:

- Node components: PC, laptop, switch, router, server, DNS server, firewall, load balancer, internet/cloud, VPN gateway.
- Label components: MAC address, IP address, subnet, port, route, protocol.
- Edge types: Ethernet frame, IP packet, TCP connection, UDP datagram, encrypted TLS/VPN tunnel, blocked connection.
- Step controls: previous, next, restart, autoplay.
- Completed concept pages for all 27 named concepts.

### Phase 3: Learning Experience Improvements

Goals:

- Make explanations more useful for developers.
- Add progressive disclosure so users are not overwhelmed.
- Track concept completion.

Deliverables:

- Beginner and developer-detail explanation modes.
- "What happens next?" step explanations synced with the React Flow diagram.
- Completion tracking.
- Bookmarks.
- Search and filtering by topic: LAN, routing, transport, security, web.
- Quizzes or checkpoints for key concepts.

### Phase 4: End-to-End Request Journey

Goals:

- Connect individual concepts into larger real-world flows.
- Help users understand how concepts interact during common developer tasks.

Deliverables:

- "Open a website" journey: DNS -> TCP -> TLS -> HTTPS -> Load Balancer -> Backend.
- "Ping another machine" journey: IP -> Route -> Gateway -> ICMP.
- "Join a network" journey: Wi-Fi/Ethernet -> DHCP -> IP -> Gateway -> DNS.
- "Private service through VPN" journey: VPN -> Routes -> Firewall -> TCP/HTTPS.
- Interactive concept dependency map.

### Phase 5: Custom Network Builder

Goals:

- Let users build their own network diagrams from predefined components.
- Support editable nodes, addresses, ports, and routing rules.

Deliverables:

- `/playground` page.
- Drag-and-drop node palette.
- Configurable nodes: PC, switch, router, server, DNS, firewall, load balancer, VPN gateway.
- Configurable fields: MAC address, IP address, subnet mask, gateway, DNS server, port, protocol.
- Connectable edges with validation.
- Save/load custom diagrams.
- Export as image or JSON.

### Phase 6: Simulation Layer

Goals:

- Move from static visualization to lightweight network simulation.
- Validate whether a packet can reach a target and explain why.

Deliverables:

- Packet path tracing.
- Route lookup simulation.
- Firewall allow/deny checks.
- DNS resolution simulation.
- TCP/UDP flow differences.
- TLS/HTTPS overlay.
- Error explanations such as "no route", "wrong subnet", "blocked by firewall", "DNS failed", or "port closed".

### Phase 7: Collaboration and Sharing

Goals:

- Make diagrams useful for teams, classrooms, and documentation.

Deliverables:

- Public share links.
- Forkable diagrams.
- Read-only presentation mode.
- Comments or annotations.
- Embed support for docs.
- Team workspace support if needed.

## 8. MVP Scope

MVP should include:

- Authentication with GitHub and Google.
- Concept list with ordered learning path.
- Detail pages for the first 5 concepts.
- Static React Flow diagrams with custom networking nodes.
- Explanation panel.
- Step-by-step diagram flow for at least MAC Address, DHCP, and IP Address.
- Basic progress tracking.

MVP should not include:

- Full custom network builder.
- Real packet simulation.
- Team collaboration.
- Complex quizzes.
- Full 28-concept completion unless timeline allows.

## 9. Recommended Milestones

### Milestone 1: App Skeleton

- Set up project.
- Add routing and layout.
- Add auth providers.
- Add database schema.
- Add seed data for concepts.

### Milestone 2: React Flow Foundation

- Install and configure React Flow.
- Build diagram renderer.
- Build reusable node and edge components.
- Implement responsive canvas layout.

### Milestone 3: First Concept Pages

- Create Ethernet, MAC Address, Switch, IP Address, and DHCP pages.
- Add diagrams and explanations.
- Add basic step playback.

### Milestone 4: Progress and Polish

- Track completed concepts.
- Add search/filtering.
- Improve mobile and desktop layouts.
- Add loading, empty, and error states.

### Milestone 5: Expand Content

- Add remaining concept pages.
- Add end-to-end review paths.
- Add developer examples and common debugging notes.

### Milestone 6: Playground Prototype

- Add drag-and-drop node palette.
- Add editable node properties.
- Save and reload custom diagrams.
- Add basic packet path trace.

## 10. Diagram Design Principles

- Keep each concept diagram small and focused.
- Prefer 3 to 7 nodes for beginner explanations.
- Use animation only to clarify flow direction, not as decoration.
- Use consistent node icons and colors across concepts.
- Label every important address, port, protocol, and decision point.
- Show failures visually, especially firewall blocks, missing routes, DNS failures, and wrong gateway configuration.
- Include layered views where useful: Link Layer, Network Layer, Transport Layer, Application Layer.

## 11. Content Template Per Concept

Each concept should follow this structure:

```md
# Concept Name

## Summary

One or two sentences explaining the concept.

## Visual Model

Description of what the React Flow chart shows.

## Step-by-Step Flow

1. Step one.
2. Step two.
3. Step three.

## How It Works

Practical explanation of the mechanism.

## Developer Notes

Commands, debugging examples, common mistakes, and real-world relevance.

## Related Concepts

Links to prerequisite and next concepts.
```

## 12. Initial React Flow Diagram Requirements

Every diagram definition should support:

- Stable node IDs.
- Node type.
- Position.
- Display label.
- Metadata, such as MAC address, IP address, subnet, protocol, or port.
- Edge source and target.
- Edge type.
- Edge label.
- Optional animation steps.

Example diagram definition shape:

```ts
type DiagramDefinition = {
  id: string;
  conceptSlug: string;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  steps: DiagramStep[];
};
```

## 13. Risks and Mitigations

| Risk                                             | Mitigation                                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| Diagrams become too complex                      | Use progressive disclosure and step playback.                                   |
| Content accuracy is inconsistent                 | Create a review checklist and cite reliable references during content creation. |
| Users confuse visualization with full simulation | Clearly label MVP diagrams as visual models until simulation exists.            |
| Custom builder scope grows too large             | Ship static concept diagrams first, then add playground features incrementally. |
| Auth and persistence delay learning features     | Use a managed auth/database provider to reduce infrastructure work.             |

## 14. Success Metrics

- Users complete at least 5 concepts in one session.
- Users interact with diagram steps on concept pages.
- Users return to continue the learning path.
- Users can correctly explain MAC, IP, DHCP, DNS, TCP, TLS, and HTTP after completing core paths.
- Future: users create and save custom network diagrams.

## 15. Suggested Build Order

1. Project setup and UI shell.
2. Authentication with GitHub and Google.
3. Concept data model and ordered concept list.
4. React Flow renderer.
5. Custom networking nodes and edges.
6. First 5 concept pages.
7. Step-by-step diagram animation.
8. Progress tracking.
9. Remaining concept content.
10. End-to-end journeys.
11. Custom network builder.
12. Simulation and validation engine.
