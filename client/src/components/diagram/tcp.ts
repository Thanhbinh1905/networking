import type { DiagramDefinition } from "./types";

export const tcpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Client",
				type: "pc",
				ip: "10.0.0.10",
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
				label: "Server",
				type: "server",
				ip: "10.0.0.20",
			},
		},
	],
	edges: [
		{
			id: "e-syn",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "SYN",
			},
		},
		{
			id: "e-synack",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "SYN-ACK",
			},
		},
		{
			id: "e-ack",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "ACK + data",
			},
		},
	],
	steps: [
		{
			label: "SYN",
			description:
				"Client asks to open a connection with an initial sequence number.",
			activeNodes: ["client"],
			activeEdges: ["e-syn"],
		},
		{
			label: "SYN-ACK",
			description: "Server acknowledges and sends its own sequence number.",
			activeNodes: ["server"],
			activeEdges: ["e-synack"],
		},
		{
			label: "ACK and data",
			description:
				"Client acknowledges; reliable ordered byte stream can now flow.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-ack"],
		},
	],
};
