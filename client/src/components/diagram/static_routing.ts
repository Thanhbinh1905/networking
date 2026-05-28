import type { DiagramDefinition } from "./types";

export const staticRoutingDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "lan-a",
			type: "custom",
			position: {
				x: 40,
				y: 170,
			},
			data: {
				label: "LAN A",
				type: "switch",
				ip: "10.1.0.0/24",
			},
		},
		{
			id: "r1",
			type: "custom",
			position: {
				x: 260,
				y: 170,
			},
			data: {
				label: "Router 1",
				type: "router",
				ip: "172.16.0.1",
			},
		},
		{
			id: "r2",
			type: "custom",
			position: {
				x: 500,
				y: 170,
			},
			data: {
				label: "Router 2",
				type: "router",
				ip: "172.16.0.2",
			},
		},
		{
			id: "lan-b",
			type: "custom",
			position: {
				x: 720,
				y: 170,
			},
			data: {
				label: "LAN B",
				type: "switch",
				ip: "10.2.0.0/24",
			},
		},
	],
	edges: [
		{
			id: "e-lan-r1",
			type: "custom",
			source: "lan-a",
			target: "r1",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Local",
			},
		},
		{
			id: "e-r1-r2",
			type: "custom",
			source: "r1",
			target: "r2",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Static next hop",
			},
		},
		{
			id: "e-r2-lan",
			type: "custom",
			source: "r2",
			target: "lan-b",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Remote LAN",
			},
		},
	],
	steps: [
		{
			label: "Manual route",
			description: "Admin adds route 10.2.0.0/24 via 172.16.0.2 on Router 1.",
			activeNodes: ["r1"],
			activeEdges: [],
		},
		{
			label: "Forward to next hop",
			description: "Router 1 sends matching traffic to Router 2.",
			activeNodes: ["r1", "r2"],
			activeEdges: ["e-r1-r2"],
		},
		{
			label: "Return path",
			description: "Router 2 also needs a route back to 10.1.0.0/24.",
			activeNodes: ["r2", "lan-a"],
			activeEdges: ["e-r2-lan", "e-r1-r2"],
		},
	],
};
