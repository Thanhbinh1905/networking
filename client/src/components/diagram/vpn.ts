import type { DiagramDefinition } from "./types";

export const vpnDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "remote",
			type: "custom",
			position: {
				x: 60,
				y: 170,
			},
			data: {
				label: "Remote Laptop",
				type: "laptop",
				ip: "10.8.0.10",
			},
		},
		{
			id: "internet",
			type: "custom",
			position: {
				x: 280,
				y: 170,
			},
			data: {
				label: "Internet",
				type: "cloud",
			},
		},
		{
			id: "vpn",
			type: "custom",
			position: {
				x: 500,
				y: 170,
			},
			data: {
				label: "VPN Gateway",
				type: "vpnGateway",
				ip: "198.51.100.5",
			},
		},
		{
			id: "private",
			type: "custom",
			position: {
				x: 730,
				y: 170,
			},
			data: {
				label: "Private Service",
				type: "server",
				ip: "10.0.2.15",
			},
		},
	],
	edges: [
		{
			id: "e-tunnel-1",
			type: "custom",
			source: "remote",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted tunnel",
			},
		},
		{
			id: "e-tunnel-2",
			type: "custom",
			source: "internet",
			target: "vpn",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted tunnel",
			},
		},
		{
			id: "e-private",
			type: "custom",
			source: "vpn",
			target: "private",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Private route",
			},
		},
	],
	steps: [
		{
			label: "Tunnel up",
			description:
				"The client authenticates and creates an encrypted tunnel to the VPN gateway.",
			activeNodes: ["remote", "vpn"],
			activeEdges: ["e-tunnel-1", "e-tunnel-2"],
		},
		{
			label: "Route installed",
			description: "Private prefixes are routed through the tunnel interface.",
			activeNodes: ["remote"],
			activeEdges: [],
		},
		{
			label: "Access private IP",
			description:
				"The gateway forwards decrypted packets into the private network.",
			activeNodes: ["vpn", "private"],
			activeEdges: ["e-private"],
		},
	],
};
