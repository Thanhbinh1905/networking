import type { DiagramDefinition } from "./types";

export const httpsDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "browser",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "Browser",
				type: "pc",
			},
		},
		{
			id: "tls",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "TLS Session",
				type: "firewall",
				ip: ":443",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 610,
				y: 170,
			},
			data: {
				label: "Web Server",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-handshake",
			type: "custom",
			source: "browser",
			target: "tls",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "TLS handshake",
			},
		},
		{
			id: "e-http",
			type: "custom",
			source: "browser",
			target: "tls",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted HTTP",
			},
		},
		{
			id: "e-server",
			type: "custom",
			source: "tls",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Decrypted at server",
			},
		},
	],
	steps: [
		{
			label: "TCP then TLS",
			description: "The client opens TCP and negotiates TLS on port 443.",
			activeNodes: ["browser", "tls"],
			activeEdges: ["e-handshake"],
		},
		{
			label: "HTTP inside TLS",
			description:
				"HTTP headers and body are encrypted before crossing the network.",
			activeNodes: ["browser", "tls"],
			activeEdges: ["e-http"],
		},
		{
			label: "Server processes",
			description:
				"The server decrypts, handles the HTTP request, and encrypts the response.",
			activeNodes: ["tls", "server"],
			activeEdges: ["e-server"],
		},
	],
};
