export type Concept = {
	id: string;
	slug: string;
	title: string;
	summary: string;
	layer?: string;
	order: number;
};

export const concepts: Concept[] = [
	{
		order: 1,
		id: "ethernet",
		slug: "ethernet",
		title: "Ethernet",
		summary: "Show frames moving between devices on a wired LAN.",
	},
	{
		order: 2,
		id: "wi-fi",
		slug: "wi-fi",
		title: "Wi-Fi",
		summary: "Show a wireless client communicating through an access point.",
	},
	{
		order: 3,
		id: "mac-address",
		slug: "mac-address",
		title: "MAC Address",
		summary: "Show two PCs with MAC addresses communicating through a switch.",
	},
	{
		order: 4,
		id: "switch",
		slug: "switch",
		title: "Switch",
		summary: "Show MAC learning and frame forwarding inside a LAN.",
	},
	{
		order: 5,
		id: "ip-address",
		slug: "ip-address",
		title: "IP Address",
		summary:
			"Show devices using IP addresses to identify source and destination hosts.",
	},
	{
		order: 6,
		id: "static-ip",
		slug: "static-ip",
		title: "Static IP",
		summary: "Show a device manually configured with fixed IP settings.",
	},
	{
		order: 7,
		id: "dhcp",
		slug: "dhcp",
		title: "DHCP",
		summary:
			"Show Discover, Offer, Request, Acknowledge between client and DHCP server.",
	},
	{
		order: 8,
		id: "subnet",
		slug: "subnet",
		title: "Subnet",
		summary: "Show which devices are inside or outside the same network range.",
	},
	{
		order: 9,
		id: "router",
		slug: "router",
		title: "Router",
		summary: "Show traffic crossing from one subnet to another.",
	},
	{
		order: 10,
		id: "default-gateway",
		slug: "default-gateway",
		title: "Default Gateway",
		summary: "Show a host sending non-local traffic to its gateway.",
	},
	{
		order: 11,
		id: "routes",
		slug: "routes",
		title: "Routes",
		summary: "Show route table decision-making for multiple destinations.",
	},
	{
		order: 12,
		id: "static-routing",
		slug: "static-routing",
		title: "Static Routing",
		summary: "Show manually configured routes between routers.",
	},
	{
		order: 13,
		id: "ospf",
		slug: "ospf",
		title: "OSPF",
		summary:
			"Show routers sharing link-state information and choosing shortest paths.",
	},
	{
		order: 14,
		id: "bgp",
		slug: "bgp",
		title: "BGP",
		summary: "Show autonomous systems exchanging routes across the internet.",
	},
	{
		order: 15,
		id: "ping",
		slug: "ping",
		title: "Ping",
		summary: "Show request and reply flow between two hosts.",
	},
	{
		order: 16,
		id: "icmp",
		slug: "icmp",
		title: "ICMP",
		summary: "Show ICMP messages used for diagnostics and network control.",
	},
	{
		order: 17,
		id: "tcp",
		slug: "tcp",
		title: "TCP",
		summary: "Show connection setup, reliable delivery, and teardown.",
	},
	{
		order: 18,
		id: "udp",
		slug: "udp",
		title: "UDP",
		summary: "Show connectionless datagrams between client and server.",
	},
	{
		order: 19,
		id: "ports",
		slug: "ports",
		title: "Ports",
		summary:
			"Show one IP address hosting multiple services through different ports.",
	},
	{
		order: 20,
		id: "firewall",
		slug: "firewall",
		title: "Firewall",
		summary: "Show allowed and blocked flows based on rules.",
	},
	{
		order: 21,
		id: "tls",
		slug: "tls",
		title: "TLS",
		summary: "Show encrypted session establishment over an existing transport.",
	},
	{
		order: 22,
		id: "ssl",
		slug: "ssl",
		title: "SSL",
		summary:
			"Explain SSL as legacy terminology and contrast it with modern TLS.",
	},
	{
		order: 23,
		id: "vpn",
		slug: "vpn",
		title: "VPN",
		summary:
			"Show encrypted tunnel traffic between client and private network.",
	},
	{
		order: 24,
		id: "dns",
		slug: "dns",
		title: "DNS",
		summary:
			"Show domain name lookup through resolver and authoritative servers.",
	},
	{
		order: 25,
		id: "http",
		slug: "http",
		title: "HTTP",
		summary: "Show request and response between browser/client and server.",
	},
	{
		order: 26,
		id: "https",
		slug: "https",
		title: "HTTPS",
		summary: "Show HTTP over TLS, including encrypted request/response.",
	},
	{
		order: 27,
		id: "load-balancer",
		slug: "load-balancer",
		title: "Load Balancer",
		summary:
			"Show traffic distributed from one entry point to multiple backend servers.",
	},
	{
		order: 28,
		id: "nat",
		slug: "nat",
		title: "NAT",
		summary:
			"Show private addresses translated to a public address for internet access.",
		layer: "Network/Transport Boundary",
	},
	{
		order: 29,
		id: "proxy",
		slug: "proxy",
		title: "Proxy",
		summary:
			"Show a forward proxy making outbound requests on behalf of a client.",
		layer: "Application Layer",
	},
	{
		order: 30,
		id: "reverse-proxy",
		slug: "reverse-proxy",
		title: "Reverse Proxy",
		summary:
			"Show a public entry point routing HTTP requests to internal backends.",
		layer: "Application/Edge",
	},
	{
		order: 31,
		id: "cdn",
		slug: "cdn",
		title: "CDN",
		summary:
			"Show edge cache serving users near them and fetching from origin on misses.",
		layer: "Edge Delivery",
	},
	{
		order: 32,
		id: "review-path",
		slug: "review-path",
		title: "Review Path",
		summary: "Connect all concepts into an end-to-end request journey.",
	},
];
