import type { DiagramDefinition } from "./types";

export const proxyDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: { x: 50, y: 170 },
			data: { label: "Client", type: "laptop" },
		},
		{
			id: "proxy",
			type: "custom",
			position: { x: 285, y: 170 },
			data: { label: "Forward Proxy", type: "server", ip: "10.0.0.10:8080" },
		},
		{
			id: "internet",
			type: "custom",
			position: { x: 520, y: 170 },
			data: { label: "Internet", type: "cloud" },
		},
		{
			id: "website",
			type: "custom",
			position: { x: 750, y: 170 },
			data: { label: "Website", type: "server" },
		},
	],
	edges: [
		{
			id: "e-client-proxy",
			type: "custom",
			source: "client",
			target: "proxy",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Proxy request" },
		},
		{
			id: "e-proxy-internet",
			type: "custom",
			source: "proxy",
			target: "internet",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Outbound" },
		},
		{
			id: "e-internet-website",
			type: "custom",
			source: "internet",
			target: "website",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Destination" },
		},
		{
			id: "e-website-internet",
			type: "custom",
			source: "website",
			target: "internet",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Response" },
		},
		{
			id: "e-internet-proxy",
			type: "custom",
			source: "internet",
			target: "proxy",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Back to proxy" },
		},
		{
			id: "e-proxy-client",
			type: "custom",
			source: "proxy",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: { label: "Back to client" },
		},
	],
	steps: [
		{
			label: "Use proxy setting",
			description:
				"The client is configured to send outbound web traffic to the forward proxy.",
			activeNodes: ["client", "proxy"],
			activeEdges: ["e-client-proxy"],
		},
		{
			label: "Apply policy",
			description:
				"The proxy can authenticate, log, filter, or serve cached content before going out.",
			activeNodes: ["proxy"],
			activeEdges: [],
		},
		{
			label: "Connect outward",
			description:
				"The destination website sees the proxy as the connecting client.",
			activeNodes: ["proxy", "internet", "website"],
			activeEdges: ["e-proxy-internet", "e-internet-website"],
		},
		{
			label: "Return through proxy",
			description:
				"The response flows back through the same forward proxy to the original client.",
			activeNodes: ["website", "internet", "proxy", "client"],
			activeEdges: ["e-website-internet", "e-internet-proxy", "e-proxy-client"],
		},
	],
};
