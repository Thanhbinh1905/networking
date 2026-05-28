import type { DiagramDefinition } from "./types";

export const icmpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "Host",
				type: "pc",
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
			id: "dest",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "Destination",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-forward",
			type: "custom",
			source: "host",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Packet",
			},
		},
		{
			id: "e-error",
			type: "custom",
			source: "router",
			target: "host",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "ICMP error",
			},
		},
		{
			id: "e-dest",
			type: "custom",
			source: "router",
			target: "dest",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Forwarded",
			},
		},
	],
	steps: [
		{
			label: "Control message",
			description: "ICMP carries diagnostics and control messages next to IP.",
			activeNodes: ["host", "router"],
			activeEdges: ["e-forward"],
		},
		{
			label: "Error generated",
			description:
				"A router can return Destination Unreachable or Time Exceeded.",
			activeNodes: ["router"],
			activeEdges: ["e-error"],
		},
		{
			label: "Not app data",
			description:
				"ICMP helps explain delivery problems; it is not TCP or UDP payload.",
			activeNodes: ["host"],
			activeEdges: ["e-error"],
		},
	],
};
