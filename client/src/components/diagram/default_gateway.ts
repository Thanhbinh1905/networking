import type { DiagramDefinition } from "./types";

export const defaultGatewayDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "Laptop",
				type: "laptop",
				ip: "192.168.1.25",
			},
		},
		{
			id: "gateway",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Default Gateway",
				type: "router",
				ip: "192.168.1.1",
			},
		},
		{
			id: "internet",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Internet",
				type: "cloud",
				ip: "0.0.0.0/0",
			},
		},
	],
	edges: [
		{
			id: "e-host-gw",
			type: "custom",
			source: "host",
			target: "gateway",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Default route",
			},
		},
		{
			id: "e-gw-net",
			type: "custom",
			source: "gateway",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Next hop",
			},
		},
	],
	steps: [
		{
			label: "Destination check",
			description:
				"The laptop sees the destination is not in its local subnet.",
			activeNodes: ["host"],
			activeEdges: [],
		},
		{
			label: "Send to gateway",
			description: "The default route 0.0.0.0/0 points to 192.168.1.1.",
			activeNodes: ["host", "gateway"],
			activeEdges: ["e-host-gw"],
		},
		{
			label: "Gateway forwards",
			description: "The gateway continues routing toward the internet.",
			activeNodes: ["gateway", "internet"],
			activeEdges: ["e-gw-net"],
		},
	],
};
