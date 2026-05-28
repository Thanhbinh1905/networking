import type { DiagramDefinition } from "./types";

export const portsDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "Client",
				type: "pc",
			},
		},
		{
			id: "ip",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Server IP",
				type: "server",
				ip: "203.0.113.10",
			},
		},
		{
			id: "web",
			type: "custom",
			position: {
				x: 610,
				y: 70,
			},
			data: {
				label: "HTTP :80",
				type: "server",
			},
		},
		{
			id: "ssh",
			type: "custom",
			position: {
				x: 610,
				y: 170,
			},
			data: {
				label: "SSH :22",
				type: "server",
			},
		},
		{
			id: "api",
			type: "custom",
			position: {
				x: 610,
				y: 270,
			},
			data: {
				label: "API :443",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-client-ip",
			type: "custom",
			source: "client",
			target: "ip",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "TCP packet",
			},
		},
		{
			id: "e-ip-web",
			type: "custom",
			source: "ip",
			target: "web",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "port 80",
			},
		},
		{
			id: "e-ip-ssh",
			type: "custom",
			source: "ip",
			target: "ssh",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "port 22",
			},
		},
		{
			id: "e-ip-api",
			type: "custom",
			source: "ip",
			target: "api",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "port 443",
			},
		},
	],
	steps: [
		{
			label: "Same IP",
			description: "A packet reaches the server IP address first.",
			activeNodes: ["client", "ip"],
			activeEdges: ["e-client-ip"],
		},
		{
			label: "Port selects process",
			description:
				"The destination port tells the OS which listening socket should receive it.",
			activeNodes: ["ip", "api"],
			activeEdges: ["e-ip-api"],
		},
		{
			label: "Closed ports fail",
			description:
				"If no process listens, the connection is refused or dropped.",
			activeNodes: ["ip"],
			activeEdges: [],
		},
	],
};
