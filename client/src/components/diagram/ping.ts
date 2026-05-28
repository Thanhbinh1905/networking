import type { DiagramDefinition } from "./types";

export const pingDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Host",
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
			},
		},
		{
			id: "target",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Target",
				type: "server",
				ip: "8.8.8.8",
			},
		},
	],
	edges: [
		{
			id: "e-req-1",
			type: "custom",
			source: "host",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Echo request",
			},
		},
		{
			id: "e-req-2",
			type: "custom",
			source: "router",
			target: "target",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "ICMP",
			},
		},
		{
			id: "e-reply-1",
			type: "custom",
			source: "target",
			target: "router",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Echo reply",
			},
		},
		{
			id: "e-reply-2",
			type: "custom",
			source: "router",
			target: "host",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "ICMP",
			},
		},
	],
	steps: [
		{
			label: "Send echo request",
			description: "Ping sends an ICMP Echo Request to the target IP.",
			activeNodes: ["host"],
			activeEdges: ["e-req-1", "e-req-2"],
		},
		{
			label: "Target replies",
			description:
				"If reachable and allowed, the target sends ICMP Echo Reply.",
			activeNodes: ["target"],
			activeEdges: ["e-reply-1", "e-reply-2"],
		},
		{
			label: "Measure RTT",
			description: "The host reports round-trip time and packet loss.",
			activeNodes: ["host"],
			activeEdges: ["e-reply-2"],
		},
	],
};
