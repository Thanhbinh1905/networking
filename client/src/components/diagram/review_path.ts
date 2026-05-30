import type { DiagramDefinition } from "./types";

export const reviewPathDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 20,
				y: 170,
			},
			data: {
				label: "Client",
				type: "laptop",
			},
		},
		{
			id: "dns",
			type: "custom",
			position: {
				x: 190,
				y: 60,
			},
			data: {
				label: "DNS",
				type: "dns",
			},
		},
		{
			id: "gateway",
			type: "custom",
			position: {
				x: 190,
				y: 280,
			},
			data: {
				label: "Gateway",
				type: "router",
			},
		},
		{
			id: "internet",
			type: "custom",
			position: {
				x: 370,
				y: 170,
			},
			data: {
				label: "Internet",
				type: "cloud",
			},
		},
		{
			id: "tls",
			type: "custom",
			position: {
				x: 550,
				y: 170,
			},
			data: {
				label: "TLS/HTTPS",
				type: "firewall",
			},
		},
		{
			id: "lb",
			type: "custom",
			position: {
				x: 730,
				y: 170,
			},
			data: {
				label: "Load Balancer",
				type: "loadBalancer",
			},
		},
		{
			id: "app",
			type: "custom",
			position: {
				x: 910,
				y: 170,
			},
			data: {
				label: "Backend",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-dns",
			type: "custom",
			source: "client",
			target: "dns",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Resolve name",
			},
		},
		{
			id: "e-gw",
			type: "custom",
			source: "client",
			target: "gateway",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Default route",
			},
		},
		{
			id: "e-net",
			type: "custom",
			source: "gateway",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Routed packets",
			},
		},
		{
			id: "e-tls",
			type: "custom",
			source: "internet",
			target: "tls",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "TCP + TLS",
			},
		},
		{
			id: "e-lb",
			type: "custom",
			source: "tls",
			target: "lb",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "HTTPS request",
			},
		},
		{
			id: "e-app",
			type: "custom",
			source: "lb",
			target: "app",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Backend call",
			},
		},
	],
	steps: [
		{
			label: "L7–L5: Data & Session",
			description: "The user issues an HTTPS request (L7). The browser formats the payload, encrypts it via TLS (L6), and establishes a session (L5) at the Client.",
			activeNodes: ["client"],
			activeEdges: [],
		},
		{
			label: "L4–L2: Encapsulation",
			description: "The payload is encapsulated into TCP segments (L4), wrapped in IP packets (L3) with source/destination IPs, and placed into Ethernet frames (L2) with MACs.",
			activeNodes: ["client"],
			activeEdges: [],
		},
		{
			label: "L1: Physical Transmission",
			description: "The L2 frame is serialized into physical bits (electrical currents or radio waves at L1) and transmitted across the cable to the Default Gateway.",
			activeNodes: ["client", "gateway"],
			activeEdges: ["e-gw"],
		},
		{
			label: "L1–L3: L3 Gateway Routing",
			description: "The Gateway reads L1 bits, validates L2 MAC headers, decapsulates to the L3 IP layer to make a routing decision, and forwards the packet out to the Internet.",
			activeNodes: ["gateway", "internet"],
			activeEdges: ["e-net"],
		},
		{
			label: "L4–L6: Secure Session Handover",
			description: "Packets traverse the Internet to the Firewall/Load Balancer. The Load Balancer processes TCP ports (L4) and terminates TLS (L5/L6) to decrypt the HTTPS flow.",
			activeNodes: ["internet", "tls", "lb"],
			activeEdges: ["e-tls", "e-lb"],
		},
		{
			label: "L7: Backend App Processing",
			description: "The decrypted, raw application request (L7 HTTP payload) is dispatched to the backend web server for application processing and business logic execution.",
			activeNodes: ["lb", "app"],
			activeEdges: ["e-app"],
		},
	],
};
