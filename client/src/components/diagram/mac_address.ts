import type { DiagramDefinition } from "./types";

export const macAddressDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "pc-a",
			type: "custom",
			position: {
				x: 70,
				y: 170,
			},
			data: {
				label: "PC A",
				type: "pc",
				mac: "00:1A:2B:3C:4D:5E",
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
				label: "Switch",
				type: "switch",
			},
		},
		{
			id: "pc-b",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "PC B",
				type: "pc",
				mac: "AA:BB:CC:DD:EE:FF",
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
				label: "Src 00...5E",
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
				label: "Dst AA...FF",
			},
		},
	],
	steps: [
		{
			label: "Address the frame",
			description:
				"PC A sets its own MAC as source and PC B's MAC as destination.",
			activeNodes: ["pc-a"],
			activeEdges: [],
		},
		{
			label: "Learn source",
			description: "The switch learns that 00...5E lives on the incoming port.",
			activeNodes: ["switch"],
			activeEdges: ["e-a-sw"],
		},
		{
			label: "Lookup destination",
			description: "The switch finds AA...FF in its MAC table.",
			activeNodes: ["switch"],
			activeEdges: [],
		},
		{
			label: "Forward locally",
			description: "The frame is forwarded to PC B on the same LAN.",
			activeNodes: ["pc-b"],
			activeEdges: ["e-sw-b"],
		},
	],
};
