import type { DiagramDefinition } from "./types";

export const loadBalancerDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 50,
				y: 170,
			},
			data: {
				label: "Client",
				type: "pc",
			},
		},
		{
			id: "lb",
			type: "custom",
			position: {
				x: 280,
				y: 170,
			},
			data: {
				label: "Load Balancer",
				type: "loadBalancer",
				ip: "203.0.113.10",
			},
		},
		{
			id: "app1",
			type: "custom",
			position: {
				x: 540,
				y: 70,
			},
			data: {
				label: "App A",
				type: "server",
			},
		},
		{
			id: "app2",
			type: "custom",
			position: {
				x: 540,
				y: 170,
			},
			data: {
				label: "App B",
				type: "server",
			},
		},
		{
			id: "app3",
			type: "custom",
			position: {
				x: 540,
				y: 270,
			},
			data: {
				label: "App C",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-client-lb",
			type: "custom",
			source: "client",
			target: "lb",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Request",
			},
		},
		{
			id: "e-lb-a",
			type: "custom",
			source: "lb",
			target: "app1",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Healthy",
			},
		},
		{
			id: "e-lb-b",
			type: "custom",
			source: "lb",
			target: "app2",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Selected",
			},
		},
		{
			id: "e-lb-c",
			type: "custom",
			source: "lb",
			target: "app3",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Healthy",
			},
		},
	],
	steps: [
		{
			label: "Single entry",
			description:
				"Clients connect to one stable address owned by the load balancer.",
			activeNodes: ["client", "lb"],
			activeEdges: ["e-client-lb"],
		},
		{
			label: "Health and policy",
			description:
				"The balancer checks healthy backends and applies an algorithm.",
			activeNodes: ["lb", "app1", "app2", "app3"],
			activeEdges: [],
		},
		{
			label: "Forward request",
			description:
				"This request is sent to App B; the next one may go elsewhere.",
			activeNodes: ["lb", "app2"],
			activeEdges: ["e-lb-b"],
		},
	],
};
