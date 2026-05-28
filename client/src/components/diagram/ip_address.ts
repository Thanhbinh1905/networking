import type { DiagramDefinition } from "./types";

export const ipAddressDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "Host A",
				type: "pc",
				ip: "192.168.1.10",
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
			id: "server",
			type: "custom",
			position: {
				x: 600,
				y: 170,
			},
			data: {
				label: "Server B",
				type: "server",
				ip: "10.0.0.50",
			},
		},
	],
	edges: [
		{
			id: "e-host-router",
			type: "custom",
			source: "host",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "IP packet",
			},
		},
		{
			id: "e-router-server",
			type: "custom",
			source: "router",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Routed packet",
			},
		},
	],
	steps: [
		{
			label: "Choose destination",
			description: "Host A builds an IP packet for destination 10.0.0.50.",
			activeNodes: ["host"],
			activeEdges: [],
		},
		{
			label: "Use gateway",
			description:
				"Because 10.0.0.50 is outside 192.168.1.0/24, Host A sends it to the router.",
			activeNodes: ["host", "router"],
			activeEdges: ["e-host-router"],
		},
		{
			label: "Route packet",
			description:
				"The router forwards the packet toward the destination network.",
			activeNodes: ["router", "server"],
			activeEdges: ["e-router-server"],
		},
	],
};
