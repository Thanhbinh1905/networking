import type { DiagramDefinition } from "./types";

export const ospfDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "r1",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "R1",
				type: "router",
			},
		},
		{
			id: "r2",
			type: "custom",
			position: {
				x: 320,
				y: 60,
			},
			data: {
				label: "R2",
				type: "router",
			},
		},
		{
			id: "r3",
			type: "custom",
			position: {
				x: 320,
				y: 280,
			},
			data: {
				label: "R3",
				type: "router",
			},
		},
		{
			id: "r4",
			type: "custom",
			position: {
				x: 600,
				y: 170,
			},
			data: {
				label: "R4",
				type: "router",
			},
		},
	],
	edges: [
		{
			id: "e-r1-r2",
			type: "custom",
			source: "r1",
			target: "r2",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "cost 10",
			},
		},
		{
			id: "e-r1-r3",
			type: "custom",
			source: "r1",
			target: "r3",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "cost 5",
			},
		},
		{
			id: "e-r3-r4",
			type: "custom",
			source: "r3",
			target: "r4",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "cost 5",
			},
		},
		{
			id: "e-r2-r4",
			type: "custom",
			source: "r2",
			target: "r4",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "cost 20",
			},
		},
	],
	steps: [
		{
			label: "Discover neighbors",
			description: "Routers send OSPF hello messages to form adjacencies.",
			activeNodes: ["r1", "r2", "r3"],
			activeEdges: ["e-r1-r2", "e-r1-r3"],
		},
		{
			label: "Share link state",
			description: "Each router floods what links it knows and their costs.",
			activeNodes: ["r1", "r2", "r3", "r4"],
			activeEdges: ["e-r1-r2", "e-r1-r3", "e-r3-r4", "e-r2-r4"],
		},
		{
			label: "Pick shortest path",
			description: "R1 prefers R3 to R4 because total cost 10 beats cost 30.",
			activeNodes: ["r1", "r3", "r4"],
			activeEdges: ["e-r1-r3", "e-r3-r4"],
		},
	],
};
