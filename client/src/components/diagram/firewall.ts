import type { DiagramDefinition } from "./types";

export const firewallDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "Client",
				type: "pc",
			},
		},
		{
			id: "fw",
			type: "custom",
			position: {
				x: 320,
				y: 170,
			},
			data: {
				label: "Firewall",
				type: "firewall",
			},
		},
		{
			id: "web",
			type: "custom",
			position: {
				x: 590,
				y: 80,
			},
			data: {
				label: "Web Server",
				type: "server",
				ip: "10.0.0.20:443",
			},
		},
		{
			id: "db",
			type: "custom",
			position: {
				x: 590,
				y: 270,
			},
			data: {
				label: "Database",
				type: "database",
				ip: "10.0.0.30:5432",
			},
		},
	],
	edges: [
		{
			id: "e-client-fw",
			type: "custom",
			source: "client",
			target: "fw",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Inbound flow",
			},
		},
		{
			id: "e-fw-web",
			type: "custom",
			source: "fw",
			target: "web",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "ALLOW 443",
			},
		},
		{
			id: "e-fw-db",
			type: "custom",
			source: "fw",
			target: "db",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "DENY 5432",
			},
		},
	],
	steps: [
		{
			label: "Inspect flow",
			description:
				"The firewall checks source, destination, protocol, port, and state.",
			activeNodes: ["fw"],
			activeEdges: ["e-client-fw"],
		},
		{
			label: "Allow web",
			description:
				"HTTPS traffic matches an allow rule and reaches the web server.",
			activeNodes: ["web"],
			activeEdges: ["e-fw-web"],
		},
		{
			label: "Block database",
			description: "Direct database traffic is denied by policy.",
			activeNodes: ["fw", "db"],
			activeEdges: ["e-fw-db"],
		},
	],
};
