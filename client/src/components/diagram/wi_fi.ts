import type { DiagramDefinition } from "./types";

export const wiFiDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "phone",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Wireless Client",
				type: "laptop",
				ip: "192.168.1.44",
			},
		},
		{
			id: "ap",
			type: "custom",
			position: {
				x: 330,
				y: 170,
			},
			data: {
				label: "Access Point",
				type: "accessPoint",
				mac: "AC:CE:55:00:00:01",
			},
		},
		{
			id: "lan",
			type: "custom",
			position: {
				x: 580,
				y: 170,
			},
			data: {
				label: "Wired LAN",
				type: "switch",
			},
		},
	],
	edges: [
		{
			id: "e-client-ap",
			type: "custom",
			source: "phone",
			target: "ap",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "802.11 frame",
			},
		},
		{
			id: "e-ap-lan",
			type: "custom",
			source: "ap",
			target: "lan",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Ethernet frame",
			},
		},
	],
	steps: [
		{
			label: "Associate",
			description:
				"The client joins the Wi-Fi network and negotiates radio settings with the access point.",
			activeNodes: ["phone", "ap"],
			activeEdges: ["e-client-ap"],
		},
		{
			label: "Transmit over radio",
			description:
				"Data crosses the air as 802.11 frames protected by Wi-Fi security.",
			activeNodes: ["phone", "ap"],
			activeEdges: ["e-client-ap"],
		},
		{
			label: "Bridge to LAN",
			description:
				"The access point bridges wireless traffic onto the wired Ethernet network.",
			activeNodes: ["ap", "lan"],
			activeEdges: ["e-ap-lan"],
		},
	],
};
