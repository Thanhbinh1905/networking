import type { DiagramDefinition } from "./types";

export const cdnDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "user",
			type: "custom",
			position: { x: 50, y: 170 },
			data: { label: "User", type: "laptop" },
		},
		{
			id: "edge",
			type: "custom",
			position: { x: 300, y: 170 },
			data: { label: "CDN Edge", type: "cloud" },
		},
		{
			id: "cache",
			type: "custom",
			position: { x: 550, y: 90 },
			data: { label: "Fresh Cache", type: "database" },
		},
		{
			id: "origin",
			type: "custom",
			position: { x: 550, y: 250 },
			data: { label: "Origin Server", type: "server" },
		},
	],
	edges: [
		{
			id: "e-user-edge",
			type: "custom",
			source: "user",
			target: "edge",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Nearest edge" },
		},
		{
			id: "e-edge-cache",
			type: "custom",
			source: "edge",
			target: "cache",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Cache hit" },
		},
		{
			id: "e-edge-origin",
			type: "custom",
			source: "edge",
			target: "origin",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Cache miss" },
		},
		{
			id: "e-origin-edge",
			type: "custom",
			source: "origin",
			target: "edge",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Fill cache" },
		},
		{
			id: "e-edge-user",
			type: "custom",
			source: "edge",
			target: "user",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Serve user" },
		},
	],
	steps: [
		{
			label: "Reach edge",
			description:
				"DNS or routing sends the user to a CDN edge location near them.",
			activeNodes: ["user", "edge"],
			activeEdges: ["e-user-edge"],
		},
		{
			label: "Check cache",
			description:
				"The edge checks whether it has a fresh response for this URL and cache key.",
			activeNodes: ["edge", "cache"],
			activeEdges: ["e-edge-cache"],
		},
		{
			label: "Fetch origin",
			description:
				"On a cache miss, the edge asks the origin server for the content.",
			activeNodes: ["edge", "origin"],
			activeEdges: ["e-edge-origin"],
		},
		{
			label: "Serve and store",
			description:
				"The edge returns the response to the user and can store it until the TTL expires.",
			activeNodes: ["origin", "edge", "cache", "user"],
			activeEdges: ["e-origin-edge", "e-edge-cache", "e-edge-user"],
		},
	],
};
