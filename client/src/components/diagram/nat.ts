import type { DiagramDefinition } from "./types";

export const natDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: { x: 40, y: 170 },
			data: { label: "Private Host", type: "laptop", ip: "192.168.1.20" },
		},
		{
			id: "nat",
			type: "custom",
			position: { x: 270, y: 170 },
			data: { label: "NAT Gateway", type: "router", ip: "203.0.113.5" },
		},
		{
			id: "internet",
			type: "custom",
			position: { x: 500, y: 170 },
			data: { label: "Internet", type: "cloud" },
		},
		{
			id: "server",
			type: "custom",
			position: { x: 730, y: 170 },
			data: { label: "Public Server", type: "server", ip: "93.184.216.34" },
		},
	],
	edges: [
		{
			id: "e-client-nat",
			type: "custom",
			source: "client",
			target: "nat",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Private source" },
		},
		{
			id: "e-nat-internet",
			type: "custom",
			source: "nat",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Translated source" },
		},
		{
			id: "e-internet-server",
			type: "custom",
			source: "internet",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Public flow" },
		},
		{
			id: "e-server-internet",
			type: "custom",
			source: "server",
			target: "internet",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Reply" },
		},
		{
			id: "e-internet-nat",
			type: "custom",
			source: "internet",
			target: "nat",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "To public IP" },
		},
		{
			id: "e-nat-client",
			type: "custom",
			source: "nat",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Private reply" },
		},
	],
	steps: [
		{
			label: "Private request",
			description:
				"The private host sends a packet using its internal source address.",
			activeNodes: ["client", "nat"],
			activeEdges: ["e-client-nat"],
		},
		{
			label: "Translate source",
			description:
				"The NAT gateway rewrites the source to its public address and records the mapping.",
			activeNodes: ["nat", "internet"],
			activeEdges: ["e-nat-internet"],
		},
		{
			label: "Reach server",
			description:
				"The public server sees a request from the NAT gateway, not the private host.",
			activeNodes: ["internet", "server"],
			activeEdges: ["e-internet-server"],
		},
		{
			label: "Map reply",
			description:
				"Return traffic lands on the public address, then the NAT table maps it back to the private host.",
			activeNodes: ["server", "internet", "nat", "client"],
			activeEdges: ["e-server-internet", "e-internet-nat", "e-nat-client"],
		},
	],
};
