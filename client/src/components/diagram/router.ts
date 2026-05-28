import type { DiagramDefinition } from "./types";

export const routerDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "lan-a",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "LAN A",
				type: "switch",
				ip: "192.168.1.0/24",
			},
		},
		{
			id: "router",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Router",
				type: "router",
				ip: "192.168.1.1 / 10.0.0.1",
			},
		},
		{
			id: "lan-b",
			type: "custom",
			position: {
				x: 600,
				y: 170,
			},
			data: {
				label: "LAN B",
				type: "switch",
				ip: "10.0.0.0/24",
			},
		},
	],
	edges: [
		{
			id: "e-a-r",
			type: "custom",
			source: "lan-a",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Packet in",
			},
		},
		{
			id: "e-r-b",
			type: "custom",
			source: "router",
			target: "lan-b",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Packet out",
			},
		},
	],
	steps: [
		{
			label: "Receive packet",
			description:
				"The router receives an IP packet whose destination is not on the source LAN.",
			activeNodes: ["router"],
			activeEdges: ["e-a-r"],
		},
		{
			label: "Consult table",
			description:
				"It chooses an outgoing interface using the longest matching route.",
			activeNodes: ["router"],
			activeEdges: [],
		},
		{
			label: "Forward",
			description:
				"The packet is re-encapsulated in a new L2 frame for the next network.",
			activeNodes: ["router", "lan-b"],
			activeEdges: ["e-r-b"],
		},
	],
};
