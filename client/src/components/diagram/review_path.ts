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
			label: "Resolve",
			description: "The browser resolves a hostname to an IP address.",
			activeNodes: ["client", "dns"],
			activeEdges: ["e-dns"],
		},
		{
			label: "Route out",
			description:
				"Packets leave the local subnet through the default gateway.",
			activeNodes: ["client", "gateway", "internet"],
			activeEdges: ["e-gw", "e-net"],
		},
		{
			label: "Secure session",
			description: "TCP connects, TLS negotiates keys, and HTTPS begins.",
			activeNodes: ["internet", "tls"],
			activeEdges: ["e-tls"],
		},
		{
			label: "Serve request",
			description:
				"The load balancer selects a healthy backend to handle the request.",
			activeNodes: ["lb", "app"],
			activeEdges: ["e-lb", "e-app"],
		},
	],
};
