import type { DiagramDefinition } from "./types";

export const udpDiagram: DiagramDefinition = {
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
				ip: "10.0.0.53",
			},
		},
	],
	edges: [
		{
			id: "e-udp-1",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "UDP datagram",
			},
		},
		{
			id: "e-udp-2",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Next datagram",
			},
		},
	],
	steps: [
		{
			label: "No handshake",
			description: "The client sends a datagram without opening a connection.",
			activeNodes: ["client"],
			activeEdges: ["e-udp-1"],
		},
		{
			label: "Best effort",
			description:
				"UDP does not guarantee delivery, ordering, or retransmission.",
			activeNodes: ["server"],
			activeEdges: ["e-udp-1"],
		},
		{
			label: "App handles reliability",
			description:
				"Protocols like DNS or QUIC add their own behavior above UDP.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-udp-2"],
		},
	],
};
