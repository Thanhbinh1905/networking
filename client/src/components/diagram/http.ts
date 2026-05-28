import type { DiagramDefinition } from "./types";

export const httpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "browser",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Browser",
				type: "pc",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Web Server",
				type: "server",
				ip: ":80 or :8080",
			},
		},
	],
	edges: [
		{
			id: "e-request",
			type: "custom",
			source: "browser",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "HTTP request",
			},
		},
		{
			id: "e-response",
			type: "custom",
			source: "server",
			target: "browser",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "HTTP response",
			},
		},
	],
	steps: [
		{
			label: "Request",
			description: "The client sends method, path, headers, and optional body.",
			activeNodes: ["browser"],
			activeEdges: ["e-request"],
		},
		{
			label: "Application handles",
			description: "The server routes the request to application code.",
			activeNodes: ["server"],
			activeEdges: ["e-request"],
		},
		{
			label: "Response",
			description: "The server returns status, headers, and body.",
			activeNodes: ["browser", "server"],
			activeEdges: ["e-response"],
		},
	],
};
