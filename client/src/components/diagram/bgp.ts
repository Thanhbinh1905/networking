import type { DiagramDefinition } from "./types";

export const bgpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "as1",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "AS 64510",
				type: "cloud",
				ip: "203.0.113.0/24",
			},
		},
		{
			id: "edge1",
			type: "custom",
			position: {
				x: 280,
				y: 170,
			},
			data: {
				label: "Edge Router",
				type: "router",
			},
		},
		{
			id: "edge2",
			type: "custom",
			position: {
				x: 510,
				y: 170,
			},
			data: {
				label: "ISP Router",
				type: "router",
			},
		},
		{
			id: "as2",
			type: "custom",
			position: {
				x: 730,
				y: 170,
			},
			data: {
				label: "AS 64520",
				type: "cloud",
				ip: "198.51.100.0/24",
			},
		},
	],
	edges: [
		{
			id: "e-as1-edge",
			type: "custom",
			source: "as1",
			target: "edge1",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Local prefix",
			},
		},
		{
			id: "e-edge-peer",
			type: "custom",
			source: "edge1",
			target: "edge2",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "BGP update",
			},
		},
		{
			id: "e-edge-as2",
			type: "custom",
			source: "edge2",
			target: "as2",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Advertised route",
			},
		},
	],
	steps: [
		{
			label: "Advertise prefix",
			description: "AS 64510 announces that it can reach 203.0.113.0/24.",
			activeNodes: ["as1", "edge1"],
			activeEdges: ["e-as1-edge"],
		},
		{
			label: "Exchange policy",
			description:
				"BGP peers exchange routes with AS path and policy attributes.",
			activeNodes: ["edge1", "edge2"],
			activeEdges: ["e-edge-peer"],
		},
		{
			label: "Select path",
			description: "The ISP chooses and propagates the best permitted path.",
			activeNodes: ["edge2", "as2"],
			activeEdges: ["e-edge-as2"],
		},
	],
};
