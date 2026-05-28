import type { DiagramDefinition } from "./types";

export const switchDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "pc-a",
			type: "custom",
			position: {
				x: 80,
				y: 60,
			},
			data: {
				label: "PC A",
				type: "pc",
				mac: "02:00:00:00:00:01",
			},
		},
		{
			id: "pc-b",
			type: "custom",
			position: {
				x: 80,
				y: 280,
			},
			data: {
				label: "PC B",
				type: "pc",
				mac: "02:00:00:00:00:02",
			},
		},
		{
			id: "switch",
			type: "custom",
			position: {
				x: 350,
				y: 170,
			},
			data: {
				label: "Switch",
				type: "switch",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 620,
				y: 170,
			},
			data: {
				label: "Server",
				type: "server",
				mac: "02:00:00:00:00:10",
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
				label: "Port 1",
			},
		},
		{
			id: "e-b-sw",
			type: "custom",
			source: "pc-b",
			target: "switch",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Port 2",
			},
		},
		{
			id: "e-sw-server",
			type: "custom",
			source: "switch",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Port 8",
			},
		},
	],
	steps: [
		{
			label: "Unknown destination",
			description:
				"For an unknown MAC, the switch floods the frame to all ports except the source.",
			activeNodes: ["switch"],
			activeEdges: ["e-a-sw", "e-b-sw", "e-sw-server"],
		},
		{
			label: "Learn source",
			description: "The source MAC is recorded against the incoming port.",
			activeNodes: ["switch"],
			activeEdges: ["e-a-sw"],
		},
		{
			label: "Known unicast",
			description: "Future frames for the server are sent only to Port 8.",
			activeNodes: ["server"],
			activeEdges: ["e-sw-server"],
		},
	],
};
