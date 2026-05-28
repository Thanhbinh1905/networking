import type { DiagramDefinition } from "./types";

export const subnetDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "host-a",
			type: "custom",
			position: {
				x: 50,
				y: 100,
			},
			data: {
				label: "Host A",
				type: "pc",
				ip: "192.168.1.10/24",
			},
		},
		{
			id: "host-b",
			type: "custom",
			position: {
				x: 330,
				y: 100,
			},
			data: {
				label: "Host B",
				type: "pc",
				ip: "192.168.1.40/24",
			},
		},
		{
			id: "router",
			type: "custom",
			position: {
				x: 330,
				y: 280,
			},
			data: {
				label: "Router",
				type: "router",
				ip: "192.168.1.1",
			},
		},
		{
			id: "host-c",
			type: "custom",
			position: {
				x: 610,
				y: 280,
			},
			data: {
				label: "Host C",
				type: "server",
				ip: "10.0.0.20/24",
			},
		},
	],
	edges: [
		{
			id: "e-a-b",
			type: "custom",
			source: "host-a",
			target: "host-b",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Local subnet",
			},
		},
		{
			id: "e-a-r",
			type: "custom",
			source: "host-a",
			target: "router",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Non-local",
			},
		},
		{
			id: "e-r-c",
			type: "custom",
			source: "router",
			target: "host-c",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Other subnet",
			},
		},
	],
	steps: [
		{
			label: "Mask comparison",
			description: "Host A applies /24 and sees Host B is in 192.168.1.0/24.",
			activeNodes: ["host-a", "host-b"],
			activeEdges: ["e-a-b"],
		},
		{
			label: "Local delivery",
			description: "Host A can ARP for Host B directly.",
			activeNodes: ["host-a", "host-b"],
			activeEdges: ["e-a-b"],
		},
		{
			label: "Remote subnet",
			description: "Host C is in 10.0.0.0/24, so Host A uses the router.",
			activeNodes: ["host-a", "router", "host-c"],
			activeEdges: ["e-a-r", "e-r-c"],
		},
	],
};
