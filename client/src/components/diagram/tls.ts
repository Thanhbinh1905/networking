import type { DiagramDefinition } from "./types";

export const tlsDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "browser",
			type: "custom",
			position: {
				x: 70,
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
				label: "HTTPS Server",
				type: "server",
				ip: ":443",
			},
		},
		{
			id: "ca",
			type: "custom",
			position: {
				x: 330,
				y: 40,
			},
			data: {
				label: "Certificate Authority",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-clienthello",
			type: "custom",
			source: "browser",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "ClientHello",
			},
		},
		{
			id: "e-cert",
			type: "custom",
			source: "server",
			target: "browser",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Certificate",
			},
		},
		{
			id: "e-ca",
			type: "custom",
			source: "browser",
			target: "ca",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Trust check",
			},
		},
		{
			id: "e-encrypted",
			type: "custom",
			source: "browser",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted data",
			},
		},
	],
	steps: [
		{
			label: "ClientHello",
			description:
				"The client proposes TLS versions, cipher suites, and random data.",
			activeNodes: ["browser"],
			activeEdges: ["e-clienthello"],
		},
		{
			label: "Certificate",
			description: "The server proves its identity with a certificate chain.",
			activeNodes: ["server", "ca"],
			activeEdges: ["e-cert", "e-ca"],
		},
		{
			label: "Session keys",
			description:
				"Both sides derive shared keys without sending the final secret.",
			activeNodes: ["browser", "server"],
			activeEdges: [],
		},
		{
			label: "Encrypted HTTP",
			description:
				"Application bytes now travel encrypted over the connection.",
			activeNodes: ["browser", "server"],
			activeEdges: ["e-encrypted"],
		},
	],
};
