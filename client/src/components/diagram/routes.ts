import type { DiagramDefinition } from "./types";

export const routesDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "Host",
				type: "pc",
				ip: "10.1.1.20",
			},
		},
		{
			id: "router",
			type: "custom",
			position: {
				x: 320,
				y: 170,
			},
			data: {
				label: "Router table",
				type: "router",
			},
		},
		{
			id: "private",
			type: "custom",
			position: {
				x: 590,
				y: 60,
			},
			data: {
				label: "Private DC",
				type: "server",
				ip: "10.20.0.0/16",
			},
		},
		{
			id: "internet",
			type: "custom",
			position: {
				x: 590,
				y: 280,
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
			id: "e-host-router",
			type: "custom",
			source: "host",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Destination",
			},
		},
		{
			id: "e-router-private",
			type: "custom",
			source: "router",
			target: "private",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "10.20.0.0/16",
			},
		},
		{
			id: "e-router-internet",
			type: "custom",
			source: "router",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Default",
			},
		},
	],
	steps: [
		{
			label: "Read destination",
			description:
				"The router compares the packet destination against route prefixes.",
			activeNodes: ["router"],
			activeEdges: ["e-host-router"],
		},
		{
			label: "Longest match wins",
			description: "A specific 10.20.0.0/16 route beats the default route.",
			activeNodes: ["router", "private"],
			activeEdges: ["e-router-private"],
		},
		{
			label: "Fallback default",
			description: "If no specific route matches, traffic follows 0.0.0.0/0.",
			activeNodes: ["router", "internet"],
			activeEdges: ["e-router-internet"],
		},
	],
};
