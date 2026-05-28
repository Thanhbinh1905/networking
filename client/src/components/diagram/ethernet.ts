import type { DiagramDefinition } from "./types";

export const ethernetDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "pc-a",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "PC A",
				type: "pc",
				mac: "02:00:00:00:00:0A",
			},
		},
		{
			id: "switch",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Access Switch",
				type: "switch",
			},
		},
		{
			id: "pc-b",
			type: "custom",
			position: {
				x: 580,
				y: 170,
			},
			data: {
				label: "PC B",
				type: "pc",
				mac: "02:00:00:00:00:0B",
			},
		},
	],
	edges: [
		{
			id: "e-a-sw",
			type: "custom",
			source: "pc-a",
			target: "switch",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Frame",
			},
		},
		{
			id: "e-sw-b",
			type: "custom",
			source: "switch",
			target: "pc-b",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Forwarded frame",
			},
		},
	],
	steps: [
		{
			label: "Encode bits",
			description:
				"PC A wraps payload in an Ethernet frame and turns bits into signals on the cable.",
			activeNodes: ["pc-a"],
			activeEdges: ["e-a-sw"],
		},
		{
			label: "Switch receives",
			description:
				"The switch reads the destination MAC address without changing the frame payload.",
			activeNodes: ["switch"],
			activeEdges: ["e-a-sw"],
		},
		{
			label: "Frame delivered",
			description: "The frame exits only the port that leads to PC B.",
			activeNodes: ["pc-b"],
			activeEdges: ["e-sw-b"],
		},
	],
};
