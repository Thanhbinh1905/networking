import { MarkerType } from "@xyflow/react";
import type { DiagramDefinition } from "@/data/diagrams";

export type Journey = {
	id: string;
	title: string;
	summary: string;
	conceptSlugs: string[];
	terminal: string[];
	tips: string[];
	diagram: DiagramDefinition;
};

const markerEnd = {
	type: MarkerType.ArrowClosed,
	color: "var(--border)",
};

export const journeys: Journey[] = [
	{
		id: "open-website",
		title: "Open a website",
		summary:
			"Follow a browser request from domain lookup through TCP, TLS, HTTPS, load balancing, and backend response.",
		conceptSlugs: ["dns", "tcp", "tls", "https", "load-balancer", "http"],
		terminal: [
			"dig example.com",
			"curl -Iv https://example.com",
			"openssl s_client -connect example.com:443 -servername example.com",
		],
		tips: [
			"Start debugging web failures by separating DNS, TCP reachability, TLS certificate health, and HTTP status.",
			"A 200 response proves the application answered; it does not prove every backend behind the load balancer is healthy.",
			"TLS problems often look like website problems, but the failure happens before the HTTP request is readable.",
		],
		diagram: {
			nodes: [
				{
					id: "browser",
					type: "custom",
					position: { x: 0, y: 160 },
					data: { label: "Browser", type: "laptop", ip: "10.0.1.25" },
				},
				{
					id: "resolver",
					type: "custom",
					position: { x: 220, y: 20 },
					data: { label: "DNS Resolver", type: "dns", ip: "1.1.1.1" },
				},
				{
					id: "internet",
					type: "custom",
					position: { x: 240, y: 300 },
					data: { label: "Internet Route", type: "cloud" },
				},
				{
					id: "edge",
					type: "custom",
					position: { x: 500, y: 160 },
					data: {
						label: "HTTPS Edge",
						type: "loadBalancer",
						ip: "203.0.113.10",
					},
				},
				{
					id: "api-a",
					type: "custom",
					position: { x: 760, y: 70 },
					data: { label: "Backend A", type: "server", ip: "10.2.0.11" },
				},
				{
					id: "api-b",
					type: "custom",
					position: { x: 760, y: 250 },
					data: { label: "Backend B", type: "server", ip: "10.2.0.12" },
				},
			],
			edges: [
				{
					id: "dns-query",
					type: "custom",
					source: "browser",
					target: "resolver",
					data: { label: "DNS query" },
					markerEnd,
				},
				{
					id: "dns-answer",
					type: "custom",
					source: "resolver",
					target: "browser",
					data: { label: "A/AAAA record" },
					markerEnd,
				},
				{
					id: "tcp-route",
					type: "custom",
					source: "browser",
					target: "internet",
					data: { label: "TCP SYN :443" },
					markerEnd,
				},
				{
					id: "route-edge",
					type: "custom",
					source: "internet",
					target: "edge",
					data: { label: "routed packet" },
					markerEnd,
				},
				{
					id: "edge-backend-a",
					type: "custom",
					source: "edge",
					target: "api-a",
					data: { label: "selected backend" },
					markerEnd,
				},
				{
					id: "edge-backend-b",
					type: "custom",
					source: "edge",
					target: "api-b",
					data: { label: "alternate pool" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Resolve the name",
					description:
						"The browser asks DNS for the IP address behind the domain before it can open a connection.",
					activeNodes: ["browser", "resolver"],
					activeEdges: ["dns-query", "dns-answer"],
				},
				{
					label: "Open transport",
					description:
						"The client starts a TCP connection to port 443 and routers carry the packet toward the edge address.",
					activeNodes: ["browser", "internet", "edge"],
					activeEdges: ["tcp-route", "route-edge"],
				},
				{
					label: "Secure the session",
					description:
						"TLS negotiates keys over the TCP connection so the HTTP request can travel encrypted.",
					activeNodes: ["browser", "edge"],
					activeEdges: ["tcp-route", "route-edge"],
				},
				{
					label: "Forward application traffic",
					description:
						"The load balancer accepts HTTPS traffic and forwards the request to a healthy backend.",
					activeNodes: ["edge", "api-a"],
					activeEdges: ["edge-backend-a"],
				},
				{
					label: "Return the response",
					description:
						"The backend response travels back through the same logical path and the browser renders the result.",
					activeNodes: ["browser", "edge", "api-a"],
					activeEdges: ["edge-backend-a", "route-edge", "tcp-route"],
				},
			],
		},
	},
	{
		id: "ping-machine",
		title: "Ping another machine",
		summary:
			"Trace how a host decides whether a target is local or remote, then sends ICMP echo request and reply traffic.",
		conceptSlugs: [
			"ip-address",
			"subnet",
			"default-gateway",
			"routes",
			"icmp",
			"ping",
		],
		terminal: [
			"ip route get 8.8.8.8",
			"ping -c 4 8.8.8.8",
			"traceroute 8.8.8.8",
		],
		tips: [
			"If ping fails, test the gateway first; it tells you whether the local network path works.",
			"A blocked ping does not always mean the service is down because many networks filter ICMP.",
			"Traceroute helps reveal where ICMP or TTL-expired messages stop coming back.",
		],
		diagram: {
			nodes: [
				{
					id: "host",
					type: "custom",
					position: { x: 0, y: 180 },
					data: { label: "Your Host", type: "pc", ip: "192.168.1.20" },
				},
				{
					id: "gateway",
					type: "custom",
					position: { x: 260, y: 180 },
					data: { label: "Default Gateway", type: "router", ip: "192.168.1.1" },
				},
				{
					id: "route",
					type: "custom",
					position: { x: 500, y: 180 },
					data: { label: "Route Decision", type: "router" },
				},
				{
					id: "target",
					type: "custom",
					position: { x: 760, y: 180 },
					data: { label: "Remote Host", type: "server", ip: "8.8.8.8" },
				},
			],
			edges: [
				{
					id: "local-check",
					type: "custom",
					source: "host",
					target: "gateway",
					data: { label: "non-local target" },
					markerEnd,
				},
				{
					id: "forward-route",
					type: "custom",
					source: "gateway",
					target: "route",
					data: { label: "route lookup" },
					markerEnd,
				},
				{
					id: "echo-request",
					type: "custom",
					source: "route",
					target: "target",
					data: { label: "ICMP echo request" },
					markerEnd,
				},
				{
					id: "echo-reply",
					type: "custom",
					source: "target",
					target: "host",
					data: { label: "ICMP echo reply" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Check the subnet",
					description:
						"The host compares its subnet with the destination and sees that the target is remote.",
					activeNodes: ["host", "gateway"],
					activeEdges: ["local-check"],
				},
				{
					label: "Use the gateway",
					description:
						"The packet goes to the default gateway because the host has no direct local path to the target.",
					activeNodes: ["gateway", "route"],
					activeEdges: ["forward-route"],
				},
				{
					label: "Send echo request",
					description:
						"Routers forward the ICMP echo request toward the target IP address.",
					activeNodes: ["route", "target"],
					activeEdges: ["echo-request"],
				},
				{
					label: "Receive echo reply",
					description:
						"The target returns an ICMP echo reply, which lets ping calculate reachability and latency.",
					activeNodes: ["target", "host"],
					activeEdges: ["echo-reply"],
				},
			],
		},
	},
	{
		id: "join-network",
		title: "Join a network",
		summary:
			"See how a device gets link access, receives DHCP configuration, and becomes ready for gateway and DNS traffic.",
		conceptSlugs: [
			"wi-fi",
			"ethernet",
			"dhcp",
			"ip-address",
			"default-gateway",
			"dns",
		],
		terminal: ["ip addr show", "ip route", "scutil --dns"],
		tips: [
			"DHCP gives more than an IP address; it usually includes subnet mask, gateway, DNS, and lease time.",
			"If the IP starts with 169.254, the host likely failed to get a DHCP lease.",
			"DNS can be broken even when the gateway and raw IP connectivity work.",
		],
		diagram: {
			nodes: [
				{
					id: "device",
					type: "custom",
					position: { x: 0, y: 170 },
					data: {
						label: "New Device",
						type: "laptop",
						mac: "AA:BB:CC:10:20:30",
					},
				},
				{
					id: "access",
					type: "custom",
					position: { x: 230, y: 170 },
					data: { label: "AP / Switch", type: "accessPoint" },
				},
				{
					id: "dhcp",
					type: "custom",
					position: { x: 480, y: 60 },
					data: { label: "DHCP Server", type: "server", ip: "192.168.1.1" },
				},
				{
					id: "gateway",
					type: "custom",
					position: { x: 480, y: 280 },
					data: { label: "Gateway", type: "router", ip: "192.168.1.1" },
				},
				{
					id: "dns",
					type: "custom",
					position: { x: 730, y: 170 },
					data: { label: "DNS Ready", type: "dns", ip: "192.168.1.1" },
				},
			],
			edges: [
				{
					id: "link-up",
					type: "custom",
					source: "device",
					target: "access",
					data: { label: "link association" },
					markerEnd,
				},
				{
					id: "dhcp-flow",
					type: "custom",
					source: "access",
					target: "dhcp",
					data: { label: "DORA lease" },
					markerEnd,
				},
				{
					id: "gateway-ready",
					type: "custom",
					source: "device",
					target: "gateway",
					data: { label: "default route" },
					markerEnd,
				},
				{
					id: "dns-ready",
					type: "custom",
					source: "device",
					target: "dns",
					data: { label: "resolver config" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Attach to the link",
					description:
						"The device joins Wi-Fi or plugs into Ethernet so it can send local frames.",
					activeNodes: ["device", "access"],
					activeEdges: ["link-up"],
				},
				{
					label: "Ask DHCP",
					description:
						"DHCP Discover, Offer, Request, and Acknowledge assign network configuration.",
					activeNodes: ["device", "access", "dhcp"],
					activeEdges: ["dhcp-flow"],
				},
				{
					label: "Install gateway",
					description:
						"The host stores a default route so non-local traffic has an exit path.",
					activeNodes: ["device", "gateway"],
					activeEdges: ["gateway-ready"],
				},
				{
					label: "Use DNS",
					description:
						"The host can now resolve names and start normal application traffic.",
					activeNodes: ["device", "dns"],
					activeEdges: ["dns-ready"],
				},
			],
		},
	},
	{
		id: "private-service-vpn",
		title: "Private service through VPN",
		summary:
			"Connect a remote developer to a private app using a VPN tunnel, route injection, firewall rules, TCP, TLS, and HTTPS.",
		conceptSlugs: ["vpn", "routes", "firewall", "tcp", "tls", "https"],
		terminal: [
			"ip route | grep tun",
			"nc -vz internal-api.company.test 443",
			"curl -Iv https://internal-api.company.test",
		],
		tips: [
			"VPN connection success only proves the tunnel is up; routes and firewall rules can still block the app.",
			"Check whether the private DNS name resolves to a private IP after connecting.",
			"Port checks are faster than full HTTP checks when you only need to know whether TCP can connect.",
		],
		diagram: {
			nodes: [
				{
					id: "developer",
					type: "custom",
					position: { x: 0, y: 180 },
					data: {
						label: "Developer Laptop",
						type: "laptop",
						ip: "100.64.2.10",
					},
				},
				{
					id: "vpn",
					type: "custom",
					position: { x: 250, y: 180 },
					data: {
						label: "VPN Gateway",
						type: "vpnGateway",
						ip: "198.51.100.8",
					},
				},
				{
					id: "firewall",
					type: "custom",
					position: { x: 500, y: 180 },
					data: { label: "Firewall", type: "firewall" },
				},
				{
					id: "private-dns",
					type: "custom",
					position: { x: 500, y: 20 },
					data: { label: "Private DNS", type: "dns", ip: "10.0.0.53" },
				},
				{
					id: "service",
					type: "custom",
					position: { x: 760, y: 180 },
					data: { label: "Internal API", type: "server", ip: "10.0.8.20" },
				},
			],
			edges: [
				{
					id: "tunnel",
					type: "custom",
					source: "developer",
					target: "vpn",
					data: { label: "encrypted tunnel" },
					markerEnd,
				},
				{
					id: "private-dns",
					type: "custom",
					source: "vpn",
					target: "private-dns",
					data: { label: "private lookup" },
					markerEnd,
				},
				{
					id: "route-private",
					type: "custom",
					source: "vpn",
					target: "firewall",
					data: { label: "private route" },
					markerEnd,
				},
				{
					id: "allow-443",
					type: "custom",
					source: "firewall",
					target: "service",
					data: { label: "allow tcp/443" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Build the tunnel",
					description:
						"The client creates an encrypted VPN tunnel and receives private routes.",
					activeNodes: ["developer", "vpn"],
					activeEdges: ["tunnel"],
				},
				{
					label: "Resolve private name",
					description:
						"The VPN path can send internal DNS requests to resolve private service names.",
					activeNodes: ["vpn", "private-dns"],
					activeEdges: ["private-dns"],
				},
				{
					label: "Route privately",
					description:
						"Traffic to the internal subnet follows the VPN route instead of the public internet route.",
					activeNodes: ["vpn", "firewall"],
					activeEdges: ["route-private"],
				},
				{
					label: "Pass policy",
					description:
						"The firewall checks source, destination, protocol, and port before allowing the API connection.",
					activeNodes: ["firewall", "service"],
					activeEdges: ["allow-443"],
				},
				{
					label: "Use HTTPS",
					description:
						"TCP and TLS complete on port 443, then the developer can send the HTTPS request.",
					activeNodes: ["developer", "vpn", "firewall", "service"],
					activeEdges: ["tunnel", "route-private", "allow-443"],
				},
			],
		},
	},
];
