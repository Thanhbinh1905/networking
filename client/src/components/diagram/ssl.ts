import type { DiagramDefinition } from "./types";

export const sslDiagram: DiagramDefinition = {
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
			id: "legacy",
			type: "custom",
			position: {
				x: 330,
				y: 70,
			},
			data: {
				label: "SSL 3.0",
				type: "firewall",
			},
		},
		{
			id: "tls",
			type: "custom",
			position: {
				x: 330,
				y: 270,
			},
			data: {
				label: "Modern TLS",
				type: "server",
			},
		},
		{
			id: "site",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Secure Site",
				type: "server",
				ip: ":443",
			},
		},
	],
	edges: [
		{
			id: "e-old",
			type: "custom",
			source: "client",
			target: "legacy",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Legacy term",
			},
		},
		{
			id: "e-modern",
			type: "custom",
			source: "client",
			target: "tls",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "TLS handshake",
			},
		},
		{
			id: "e-site",
			type: "custom",
			source: "tls",
			target: "site",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted",
			},
		},
	],
	steps: [
		{
			label: "Name confusion",
			description:
				"People often say SSL certificate, but production HTTPS should use TLS.",
			activeNodes: ["client", "legacy"],
			activeEdges: ["e-old"],
		},
		{
			label: "Avoid legacy SSL",
			description: "SSL protocols are obsolete and should be disabled.",
			activeNodes: ["legacy"],
			activeEdges: [],
		},
		{
			label: "Use TLS",
			description: "Modern clients negotiate TLS 1.2 or TLS 1.3 for HTTPS.",
			activeNodes: ["tls", "site"],
			activeEdges: ["e-modern", "e-site"],
		},
	],
};
