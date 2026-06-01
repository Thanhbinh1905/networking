import { MarkerType } from "@xyflow/react";
import type { DiagramDefinition } from "@/data/diagrams";

export type DependencyGroup = {
	label: string;
	conceptSlugs: string[];
};

const markerEnd = {
	type: MarkerType.ArrowClosed,
	color: "var(--border)",
};

const dependencyEdges = [
	["ethernet", "mac-address"],
	["wi-fi", "mac-address"],
	["mac-address", "switch"],
	["switch", "ip-address"],
	["ip-address", "static-ip"],
	["ip-address", "dhcp"],
	["ip-address", "subnet"],
	["subnet", "router"],
	["router", "default-gateway"],
	["default-gateway", "routes"],
	["routes", "static-routing"],
	["routes", "ospf"],
	["routes", "bgp"],
	["ip-address", "icmp"],
	["icmp", "ping"],
	["ip-address", "tcp"],
	["ip-address", "udp"],
	["tcp", "ports"],
	["udp", "ports"],
	["ports", "firewall"],
	["tcp", "tls"],
	["tls", "ssl"],
	["tls", "https"],
	["dns", "http"],
	["http", "https"],
	["https", "load-balancer"],
	["routes", "vpn"],
	["vpn", "firewall"],
	["load-balancer", "review-path"],
	["vpn", "review-path"],
	["ping", "review-path"],
	["dhcp", "review-path"],
	["dns", "review-path"],
] as const;

export const dependencyGroups: DependencyGroup[] = [
	{
		label: "Local network",
		conceptSlugs: ["ethernet", "wi-fi", "mac-address", "switch"],
	},
	{
		label: "IP and routing",
		conceptSlugs: [
			"ip-address",
			"static-ip",
			"dhcp",
			"subnet",
			"router",
			"default-gateway",
			"routes",
			"static-routing",
			"ospf",
			"bgp",
		],
	},
	{
		label: "Diagnostics and transport",
		conceptSlugs: ["icmp", "ping", "tcp", "udp", "ports"],
	},
	{
		label: "Security and web",
		conceptSlugs: [
			"firewall",
			"tls",
			"ssl",
			"vpn",
			"dns",
			"http",
			"https",
			"load-balancer",
		],
	},
	{
		label: "Synthesis",
		conceptSlugs: ["review-path"],
	},
];

export const dependencyMapDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "ethernet",
			type: "custom",
			position: { x: 0, y: 40 },
			data: { label: "Ethernet", type: "switch" },
		},
		{
			id: "wi-fi",
			type: "custom",
			position: { x: 0, y: 180 },
			data: { label: "Wi-Fi", type: "accessPoint" },
		},
		{
			id: "mac-address",
			type: "custom",
			position: { x: 220, y: 110 },
			data: { label: "MAC Address", type: "pc" },
		},
		{
			id: "switch",
			type: "custom",
			position: { x: 440, y: 110 },
			data: { label: "Switch", type: "switch" },
		},
		{
			id: "ip-address",
			type: "custom",
			position: { x: 660, y: 110 },
			data: { label: "IP Address", type: "router" },
		},
		{
			id: "static-ip",
			type: "custom",
			position: { x: 880, y: 0 },
			data: { label: "Static IP", type: "pc" },
		},
		{
			id: "dhcp",
			type: "custom",
			position: { x: 880, y: 120 },
			data: { label: "DHCP", type: "server" },
		},
		{
			id: "subnet",
			type: "custom",
			position: { x: 880, y: 240 },
			data: { label: "Subnet", type: "cloud" },
		},
		{
			id: "router",
			type: "custom",
			position: { x: 1100, y: 240 },
			data: { label: "Router", type: "router" },
		},
		{
			id: "default-gateway",
			type: "custom",
			position: { x: 1320, y: 240 },
			data: { label: "Default Gateway", type: "router" },
		},
		{
			id: "routes",
			type: "custom",
			position: { x: 1540, y: 240 },
			data: { label: "Routes", type: "router" },
		},
		{
			id: "static-routing",
			type: "custom",
			position: { x: 1760, y: 90 },
			data: { label: "Static Routing", type: "router" },
		},
		{
			id: "ospf",
			type: "custom",
			position: { x: 1760, y: 230 },
			data: { label: "OSPF", type: "router" },
		},
		{
			id: "bgp",
			type: "custom",
			position: { x: 1760, y: 370 },
			data: { label: "BGP", type: "cloud" },
		},
		{
			id: "icmp",
			type: "custom",
			position: { x: 880, y: 440 },
			data: { label: "ICMP", type: "server" },
		},
		{
			id: "ping",
			type: "custom",
			position: { x: 1100, y: 440 },
			data: { label: "Ping", type: "pc" },
		},
		{
			id: "tcp",
			type: "custom",
			position: { x: 880, y: 620 },
			data: { label: "TCP", type: "server" },
		},
		{
			id: "udp",
			type: "custom",
			position: { x: 880, y: 760 },
			data: { label: "UDP", type: "server" },
		},
		{
			id: "ports",
			type: "custom",
			position: { x: 1100, y: 690 },
			data: { label: "Ports", type: "server" },
		},
		{
			id: "firewall",
			type: "custom",
			position: { x: 1320, y: 690 },
			data: { label: "Firewall", type: "firewall" },
		},
		{
			id: "tls",
			type: "custom",
			position: { x: 1100, y: 860 },
			data: { label: "TLS", type: "firewall" },
		},
		{
			id: "ssl",
			type: "custom",
			position: { x: 1320, y: 840 },
			data: { label: "SSL", type: "firewall" },
		},
		{
			id: "vpn",
			type: "custom",
			position: { x: 1760, y: 560 },
			data: { label: "VPN", type: "vpnGateway" },
		},
		{
			id: "dns",
			type: "custom",
			position: { x: 1320, y: 1040 },
			data: { label: "DNS", type: "dns" },
		},
		{
			id: "http",
			type: "custom",
			position: { x: 1540, y: 1040 },
			data: { label: "HTTP", type: "server" },
		},
		{
			id: "https",
			type: "custom",
			position: { x: 1760, y: 930 },
			data: { label: "HTTPS", type: "server" },
		},
		{
			id: "load-balancer",
			type: "custom",
			position: { x: 1980, y: 930 },
			data: { label: "Load Balancer", type: "loadBalancer" },
		},
		{
			id: "review-path",
			type: "custom",
			position: { x: 2200, y: 620 },
			data: { label: "Review Path", type: "cloud" },
		},
	],
	edges: dependencyEdges.map(([source, target]) => ({
		id: `${source}-to-${target}`,
		type: "custom",
		source,
		target,
		data: { label: "requires" },
		markerEnd,
	})),
	steps: [
		{
			label: "Start with local links",
			description:
				"Ethernet, Wi-Fi, MAC addresses, and switches explain how nearby devices exchange frames.",
			activeNodes: ["ethernet", "wi-fi", "mac-address", "switch"],
			activeEdges: [
				"ethernet-to-mac-address",
				"wi-fi-to-mac-address",
				"mac-address-to-switch",
			],
		},
		{
			label: "Add IP addressing",
			description:
				"IP addresses, DHCP, static IPs, and subnets define logical host identity and network boundaries.",
			activeNodes: ["switch", "ip-address", "static-ip", "dhcp", "subnet"],
			activeEdges: [
				"switch-to-ip-address",
				"ip-address-to-static-ip",
				"ip-address-to-dhcp",
				"ip-address-to-subnet",
			],
		},
		{
			label: "Route between networks",
			description:
				"Routers, gateways, route tables, and routing protocols move packets beyond the local subnet.",
			activeNodes: [
				"subnet",
				"router",
				"default-gateway",
				"routes",
				"static-routing",
				"ospf",
				"bgp",
			],
			activeEdges: [
				"subnet-to-router",
				"router-to-default-gateway",
				"default-gateway-to-routes",
				"routes-to-static-routing",
				"routes-to-ospf",
				"routes-to-bgp",
			],
		},
		{
			label: "Debug and transport",
			description:
				"ICMP and ping diagnose reachability, while TCP, UDP, and ports connect packets to applications.",
			activeNodes: ["ip-address", "icmp", "ping", "tcp", "udp", "ports"],
			activeEdges: [
				"ip-address-to-icmp",
				"icmp-to-ping",
				"ip-address-to-tcp",
				"ip-address-to-udp",
				"tcp-to-ports",
				"udp-to-ports",
			],
		},
		{
			label: "Secure and serve apps",
			description:
				"Firewalls, TLS, DNS, HTTPS, VPNs, and load balancers create real production request paths.",
			activeNodes: [
				"ports",
				"firewall",
				"tls",
				"ssl",
				"vpn",
				"dns",
				"http",
				"https",
				"load-balancer",
				"review-path",
			],
			activeEdges: [
				"ports-to-firewall",
				"tcp-to-tls",
				"tls-to-ssl",
				"tls-to-https",
				"dns-to-http",
				"http-to-https",
				"https-to-load-balancer",
				"routes-to-vpn",
				"vpn-to-firewall",
				"load-balancer-to-review-path",
			],
		},
	],
};
