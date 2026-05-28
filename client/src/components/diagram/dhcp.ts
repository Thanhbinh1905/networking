import type { DiagramDefinition } from "./types";

export const dhcpDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "New Client",
				type: "pc",
				ip: "0.0.0.0",
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
				label: "LAN",
				type: "switch",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "DHCP Server",
				type: "server",
				ip: "192.168.1.1",
			},
		},
	],
	edges: [
		{
			id: "e-client-lan",
			type: "custom",
			source: "client",
			target: "switch",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Broadcast",
			},
		},
		{
			id: "e-lan-server",
			type: "custom",
			source: "switch",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "DHCP",
			},
		},
		{
			id: "e-server-lan",
			type: "custom",
			source: "server",
			target: "switch",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Offer/Ack",
			},
		},
		{
			id: "e-lan-client",
			type: "custom",
			source: "switch",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Lease",
			},
		},
	],
	steps: [
		{
			label: "Discover",
			description:
				"The client broadcasts DHCPDISCOVER because it has no address yet.",
			activeNodes: ["client"],
			activeEdges: ["e-client-lan", "e-lan-server"],
		},
		{
			label: "Offer",
			description:
				"The DHCP server offers an available address and network settings.",
			activeNodes: ["server"],
			activeEdges: ["e-server-lan", "e-lan-client"],
		},
		{
			label: "Request",
			description:
				"The client requests the offered lease so the server can reserve it.",
			activeNodes: ["client"],
			activeEdges: ["e-client-lan", "e-lan-server"],
		},
		{
			label: "Acknowledge",
			description:
				"The server confirms the lease, gateway, DNS, and lease time.",
			activeNodes: ["server", "client"],
			activeEdges: ["e-server-lan", "e-lan-client"],
		},
	],
};
