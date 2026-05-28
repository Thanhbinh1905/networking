import type { DiagramDefinition } from "./types";

export const dnsDiagram: DiagramDefinition = {
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
			id: "resolver",
			type: "custom",
			position: {
				x: 260,
				y: 170,
			},
			data: {
				label: "Recursive Resolver",
				type: "dns",
				ip: "1.1.1.1",
			},
		},
		{
			id: "root",
			type: "custom",
			position: {
				x: 500,
				y: 70,
			},
			data: {
				label: "Root/TLD",
				type: "dns",
			},
		},
		{
			id: "auth",
			type: "custom",
			position: {
				x: 500,
				y: 270,
			},
			data: {
				label: "Authoritative DNS",
				type: "dns",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 730,
				y: 170,
			},
			data: {
				label: "Web Server",
				type: "server",
				ip: "203.0.113.20",
			},
		},
	],
	edges: [
		{
			id: "e-client-res",
			type: "custom",
			source: "client",
			target: "resolver",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Query name",
			},
		},
		{
			id: "e-res-root",
			type: "custom",
			source: "resolver",
			target: "root",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Ask hierarchy",
			},
		},
		{
			id: "e-res-auth",
			type: "custom",
			source: "resolver",
			target: "auth",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Ask zone",
			},
		},
		{
			id: "e-res-client",
			type: "custom",
			source: "resolver",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "A/AAAA answer",
			},
		},
		{
			id: "e-client-server",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Connect to IP",
			},
		},
	],
	steps: [
		{
			label: "Ask resolver",
			description: "The client asks a recursive resolver for example.com.",
			activeNodes: ["client", "resolver"],
			activeEdges: ["e-client-res"],
		},
		{
			label: "Walk hierarchy",
			description:
				"The resolver follows root and TLD referrals to find the authoritative server.",
			activeNodes: ["resolver", "root", "auth"],
			activeEdges: ["e-res-root", "e-res-auth"],
		},
		{
			label: "Return records",
			description:
				"The resolver returns IP records and caches them for the TTL.",
			activeNodes: ["resolver", "client"],
			activeEdges: ["e-res-client"],
		},
		{
			label: "Use the IP",
			description: "The client connects to the returned address.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-client-server"],
		},
	],
};
