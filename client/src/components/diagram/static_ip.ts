import type { DiagramDefinition } from "./types";

export const staticIpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "admin",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "Admin config",
				type: "server",
			},
		},
		{
			id: "host",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Server",
				type: "server",
				ip: "192.168.10.20/24",
			},
		},
		{
			id: "gateway",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Gateway",
				type: "router",
				ip: "192.168.10.1",
			},
		},
	],
	edges: [
		{
			id: "e-admin-host",
			type: "custom",
			source: "admin",
			target: "host",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Manual settings",
			},
		},
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
	],
	steps: [
		{
			label: "Set address",
			description:
				"An operator assigns IP, subnet mask, gateway, and DNS by configuration.",
			activeNodes: ["admin", "host"],
			activeEdges: ["e-admin-host"],
		},
		{
			label: "No lease needed",
			description: "The server keeps the same address without asking DHCP.",
			activeNodes: ["host"],
			activeEdges: [],
		},
		{
			label: "Use gateway",
			description:
				"Traffic outside the subnet still goes to the configured default gateway.",
			activeNodes: ["host", "gateway"],
			activeEdges: ["e-host-gw"],
		},
	],
};
