import type { DiagramDefinition } from "./types";

export const reverseProxyDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "browser",
			type: "custom",
			position: { x: 50, y: 170 },
			data: { label: "Browser", type: "pc" },
		},
		{
			id: "proxy",
			type: "custom",
			position: { x: 300, y: 170 },
			data: {
				label: "Reverse Proxy",
				type: "loadBalancer",
				ip: "203.0.113.10",
			},
		},
		{
			id: "web",
			type: "custom",
			position: { x: 575, y: 90 },
			data: { label: "Web App", type: "server", ip: "10.0.1.20" },
		},
		{
			id: "api",
			type: "custom",
			position: { x: 575, y: 250 },
			data: { label: "API", type: "server", ip: "10.0.1.30" },
		},
	],
	edges: [
		{
			id: "e-browser-proxy",
			type: "custom",
			source: "browser",
			target: "proxy",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "HTTPS" },
		},
		{
			id: "e-proxy-web",
			type: "custom",
			source: "proxy",
			target: "web",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "Host route" },
		},
		{
			id: "e-proxy-api",
			type: "custom",
			source: "proxy",
			target: "api",
			sourceHandle: "right",
			targetHandle: "left",
			data: { label: "/api route" },
		},
	],
	steps: [
		{
			label: "Public entry",
			description:
				"The browser connects to one public hostname owned by the reverse proxy.",
			activeNodes: ["browser", "proxy"],
			activeEdges: ["e-browser-proxy"],
		},
		{
			label: "Inspect HTTP",
			description:
				"After TLS termination, the proxy can read host, path, and headers; passthrough usually limits routing to connection metadata such as SNI.",
			activeNodes: ["proxy"],
			activeEdges: [],
		},
		{
			label: "Route to app",
			description:
				"A normal page request is forwarded to the internal web application.",
			activeNodes: ["proxy", "web"],
			activeEdges: ["e-proxy-web"],
		},
		{
			label: "Route API path",
			description:
				"A request under /api can be sent to a different backend service.",
			activeNodes: ["proxy", "api"],
			activeEdges: ["e-proxy-api"],
		},
	],
};
