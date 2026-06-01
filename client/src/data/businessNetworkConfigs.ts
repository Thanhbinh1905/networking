import { MarkerType } from "@xyflow/react";
import type { DiagramDefinition } from "@/data/diagrams";

export type BusinessNetworkConfig = {
	id: string;
	label: string;
	title: string;
	summary: string;
	operatingModel: string;
	ipPlan: string[];
	infrastructure: string[];
	wifi: string[];
	vpn: string[];
	security: string[];
	operations: string[];
	configExamples: string[];
	diagram: DiagramDefinition;
};

const markerEnd = {
	type: MarkerType.ArrowClosed,
	color: "var(--border)",
};

export const businessNetworkConfigs: BusinessNetworkConfig[] = [
	{
		id: "tiny",
		label: "1 - 10 employees",
		title: "Small office starter network",
		summary:
			"A simple single-site setup where one ISP router, one Wi-Fi network, and a few security defaults are enough to operate reliably.",
		operatingModel:
			"Keep the network flat, documented, and easy to recover. The priority is stable internet access, secure Wi-Fi, cloud app access, and a backup path if the ISP fails.",
		ipPlan: [
			"LAN: 192.168.10.0/24 for all trusted devices.",
			"DHCP pool: 192.168.10.50 - 192.168.10.200.",
			"Static reservations: printer, NAS, and router management addresses.",
			"Guest Wi-Fi: isolated by the router guest network feature if available.",
		],
		infrastructure: [
			"Business ISP modem or router with firewall enabled.",
			"One managed or smart switch if wired desks, printer, or NAS are needed.",
			"One to two Wi-Fi access points depending on office layout.",
			"Cloud-first services: email, storage, identity, password manager, and device backup.",
		],
		wifi: [
			"Company SSID with WPA2/WPA3-Personal using a long shared password.",
			"Guest SSID isolated from LAN devices.",
			"Disable WPS and rotate the shared password when employees leave.",
			"Use 5 GHz or 6 GHz where possible for laptops; keep 2.4 GHz for legacy devices.",
		],
		vpn: [
			"Prefer no inbound VPN if all apps are SaaS.",
			"If remote access is needed, use a router VPN or zero-trust tunnel for one internal resource.",
			"Require MFA on any remote access account.",
		],
		security: [
			"Change default router credentials and update firmware quarterly.",
			"Block inbound traffic from the internet by default.",
			"Enable DNS filtering or safe browsing protection at the router or endpoint.",
			"Use endpoint disk encryption and automatic OS updates.",
		],
		operations: [
			"Keep a one-page network inventory: ISP, router login, SSID names, static IPs, and support contacts.",
			"Export router configuration after changes.",
			"Test internet failover manually if a cellular backup is available.",
			"Review connected devices monthly and remove unknown clients.",
		],
		configExamples: [
			"router dhcp pool office-lan 192.168.10.50 192.168.10.200",
			"firewall default inbound deny",
			"wifi ssid Company secure wpa3-personal guest-isolation off",
			"wifi ssid Guest secure wpa2-personal guest-isolation on",
		],
		diagram: {
			nodes: [
				{
					id: "internet",
					type: "custom",
					position: { x: 0, y: 160 },
					data: { label: "ISP Internet", type: "cloud" },
				},
				{
					id: "router",
					type: "custom",
					position: { x: 230, y: 160 },
					data: {
						label: "Firewall Router",
						type: "router",
						ip: "192.168.10.1",
					},
				},
				{
					id: "ap",
					type: "custom",
					position: { x: 470, y: 60 },
					data: { label: "Wi-Fi AP", type: "accessPoint" },
				},
				{
					id: "switch",
					type: "custom",
					position: { x: 470, y: 260 },
					data: { label: "Small Switch", type: "switch" },
				},
				{
					id: "staff",
					type: "custom",
					position: { x: 730, y: 60 },
					data: { label: "Staff Devices", type: "laptop" },
				},
				{
					id: "shared",
					type: "custom",
					position: { x: 730, y: 260 },
					data: { label: "Printer / NAS", type: "server", ip: "192.168.10.20" },
				},
			],
			edges: [
				{
					id: "edge-wan",
					type: "custom",
					source: "internet",
					target: "router",
					data: { label: "WAN" },
					markerEnd,
				},
				{
					id: "edge-wifi",
					type: "custom",
					source: "router",
					target: "ap",
					data: { label: "LAN trunk" },
					markerEnd,
				},
				{
					id: "edge-wired",
					type: "custom",
					source: "router",
					target: "switch",
					data: { label: "LAN" },
					markerEnd,
				},
				{
					id: "edge-client",
					type: "custom",
					source: "ap",
					target: "staff",
					data: { label: "company SSID" },
					markerEnd,
				},
				{
					id: "edge-shared",
					type: "custom",
					source: "switch",
					target: "shared",
					data: { label: "wired LAN" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Enter through ISP",
					description:
						"The router is the only edge device and blocks unsolicited inbound traffic.",
					activeNodes: ["internet", "router"],
					activeEdges: ["edge-wan"],
				},
				{
					label: "Serve office clients",
					description:
						"Wi-Fi and wired devices share one trusted LAN with DHCP from the router.",
					activeNodes: ["router", "ap", "switch", "staff", "shared"],
					activeEdges: [
						"edge-wifi",
						"edge-wired",
						"edge-client",
						"edge-shared",
					],
				},
				{
					label: "Isolate guests",
					description:
						"Guest devices should use a separate SSID that can reach the internet but not office devices.",
					activeNodes: ["router", "ap", "staff"],
					activeEdges: ["edge-wifi", "edge-client"],
				},
			],
		},
	},
	{
		id: "small",
		label: "10 - 100 employees",
		title: "Segmented office network",
		summary:
			"A growing company needs VLAN separation, managed switching, centralized Wi-Fi, identity-backed VPN, and basic monitoring.",
		operatingModel:
			"Move from a flat LAN to segmented networks. The core operating idea is least privilege between staff, guests, servers, printers, and network management.",
		ipPlan: [
			"VLAN 10 Staff: 10.10.10.0/24.",
			"VLAN 20 Guest: 10.10.20.0/24 with internet-only access.",
			"VLAN 30 Servers: 10.10.30.0/24 for NAS, local apps, and management tools.",
			"VLAN 99 Network management: 10.10.99.0/24 for switches, APs, and firewall admin.",
		],
		infrastructure: [
			"Dual-WAN firewall or UTM appliance.",
			"Layer 2 managed switches with VLAN trunks to APs.",
			"Cloud-managed or controller-managed Wi-Fi access points.",
			"Small server segment for NAS, print, monitoring, and optional directory services.",
		],
		wifi: [
			"Company SSID maps to Staff VLAN with WPA2/WPA3 Enterprise where possible.",
			"Guest SSID maps to Guest VLAN with client isolation and bandwidth limits.",
			"Separate IoT or printer SSID only if devices cannot use wired Ethernet.",
			"Use controller channel planning instead of leaving every AP on auto defaults.",
		],
		vpn: [
			"Remote access VPN for employees with MFA and per-user groups.",
			"Restrict VPN routes to required private subnets instead of full network access.",
			"Log VPN sessions and review stale accounts.",
		],
		security: [
			"Default deny between VLANs, then allow only required flows.",
			"Allow Staff to Servers on specific ports, block Guest to all internal networks.",
			"Centralize DNS filtering and malware blocking.",
			"Use admin accounts only from the management VLAN.",
		],
		operations: [
			"Monitor firewall, switches, APs, DHCP usage, and internet uptime.",
			"Back up firewall and switch configs after each change.",
			"Document VLAN IDs, subnets, SSIDs, and firewall rules.",
			"Patch network firmware during a scheduled maintenance window.",
		],
		configExamples: [
			"vlan 10 name Staff subnet 10.10.10.0/24",
			"vlan 20 name Guest subnet 10.10.20.0/24",
			"firewall allow Staff Servers tcp/443,tcp/22",
			"firewall deny Guest RFC1918 any",
			"vpn group Employees route 10.10.10.0/24 10.10.30.0/24",
		],
		diagram: {
			nodes: [
				{
					id: "internet",
					type: "custom",
					position: { x: 0, y: 210 },
					data: { label: "Internet", type: "cloud" },
				},
				{
					id: "firewall",
					type: "custom",
					position: { x: 230, y: 210 },
					data: { label: "UTM Firewall", type: "firewall", ip: "10.10.99.1" },
				},
				{
					id: "core",
					type: "custom",
					position: { x: 480, y: 210 },
					data: { label: "Managed Switch", type: "switch" },
				},
				{
					id: "wifi",
					type: "custom",
					position: { x: 730, y: 40 },
					data: { label: "Wi-Fi Controller", type: "accessPoint" },
				},
				{
					id: "staff",
					type: "custom",
					position: { x: 980, y: 40 },
					data: { label: "Staff VLAN", type: "laptop", ip: "10.10.10.0/24" },
				},
				{
					id: "guest",
					type: "custom",
					position: { x: 980, y: 210 },
					data: { label: "Guest VLAN", type: "laptop", ip: "10.10.20.0/24" },
				},
				{
					id: "servers",
					type: "custom",
					position: { x: 730, y: 380 },
					data: { label: "Server VLAN", type: "server", ip: "10.10.30.0/24" },
				},
				{
					id: "vpn",
					type: "custom",
					position: { x: 230, y: 420 },
					data: { label: "Remote VPN", type: "vpnGateway" },
				},
			],
			edges: [
				{
					id: "edge-wan",
					type: "custom",
					source: "internet",
					target: "firewall",
					data: { label: "WAN" },
					markerEnd,
				},
				{
					id: "edge-trunk",
					type: "custom",
					source: "firewall",
					target: "core",
					data: { label: "VLAN trunk" },
					markerEnd,
				},
				{
					id: "edge-ap-trunk",
					type: "custom",
					source: "core",
					target: "wifi",
					data: { label: "SSID VLANs" },
					markerEnd,
				},
				{
					id: "edge-staff-ssid",
					type: "custom",
					source: "wifi",
					target: "staff",
					data: { label: "staff SSID" },
					markerEnd,
				},
				{
					id: "edge-guest-ssid",
					type: "custom",
					source: "wifi",
					target: "guest",
					data: { label: "guest SSID" },
					markerEnd,
				},
				{
					id: "edge-server-link",
					type: "custom",
					source: "core",
					target: "servers",
					data: { label: "server access" },
					markerEnd,
				},
				{
					id: "edge-vpn-link",
					type: "custom",
					source: "vpn",
					target: "firewall",
					data: { label: "MFA VPN" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Segment the LAN",
					description:
						"Staff, guest, server, and management traffic live in separate VLANs.",
					activeNodes: ["firewall", "core", "staff", "guest", "servers"],
					activeEdges: ["edge-trunk", "edge-server-link"],
				},
				{
					label: "Map SSIDs to VLANs",
					description:
						"Wi-Fi broadcasts multiple SSIDs, but each SSID lands in a different network policy zone.",
					activeNodes: ["core", "wifi", "staff", "guest"],
					activeEdges: ["edge-ap-trunk", "edge-staff-ssid", "edge-guest-ssid"],
				},
				{
					label: "Control remote access",
					description:
						"VPN users enter through the firewall and receive only the private routes their role needs.",
					activeNodes: ["vpn", "firewall", "servers"],
					activeEdges: ["edge-vpn-link", "edge-trunk", "edge-server-link"],
				},
			],
		},
	},
	{
		id: "medium",
		label: "100 - 500 employees",
		title: "Multi-site enterprise network",
		summary:
			"A mid-sized company needs redundant edge links, core/distribution switching, NAC, SSO-integrated VPN, observability, and site-to-site connectivity.",
		operatingModel:
			"Treat the network as a managed platform. Standardize site templates, route summarization, identity-based access, change control, and monitoring alerts.",
		ipPlan: [
			"Site A summary: 10.20.0.0/16, Site B summary: 10.21.0.0/16.",
			"Per site VLANs: Staff, Voice, Guest, Servers, IoT, Security Cameras, Management.",
			"Use DHCP scopes per VLAN with reserved ranges for infrastructure.",
			"Advertise site summaries over VPN or SD-WAN to simplify routing.",
		],
		infrastructure: [
			"Two ISP circuits and redundant firewalls at headquarters.",
			"Core switch pair with distribution/access switch layers.",
			"Site-to-site VPN or SD-WAN between offices.",
			"Central identity, RADIUS/NAC, monitoring, logging, and backup services.",
		],
		wifi: [
			"WPA2/WPA3 Enterprise with RADIUS and device posture policies.",
			"Separate SSIDs for corporate, guest, IoT, and voice where required.",
			"Use AP groups, RF profiles, roaming support, and capacity planning.",
			"Guest access should use captive portal or sponsored access with rate limits.",
		],
		vpn: [
			"SSO and MFA enforced for remote users.",
			"Role-based split tunnel policies for engineering, finance, and support.",
			"Site-to-site tunnels use route-based VPN or SD-WAN overlays.",
			"Maintain break-glass admin access with strict logging.",
		],
		security: [
			"Use NAC for wired and wireless access control.",
			"Inspect internet egress with firewall, DNS filtering, IDS/IPS, and log forwarding.",
			"Separate production servers from user VLANs and require firewall rules for east-west access.",
			"Feed firewall, VPN, DNS, and endpoint logs into a SIEM or central log platform.",
		],
		operations: [
			"Use change requests for firewall, routing, and VLAN updates.",
			"Track device configs in backups and compare drift.",
			"Alert on ISP loss, firewall failover, AP down, high DHCP utilization, and route changes.",
			"Run quarterly access reviews for VPN groups, admin roles, and firewall exceptions.",
		],
		configExamples: [
			"router ospf area 0 advertise 10.20.0.0/16",
			"sdwan policy prefer fiber1 fallback fiber2 for business-apps",
			"radius wlan Corporate group Employees vlan dynamic",
			"firewall allow Staff AppServers tcp/443 log",
			"syslog forward firewall,vpn,dns to siem.company.local",
		],
		diagram: {
			nodes: [
				{
					id: "internet",
					type: "custom",
					position: { x: 0, y: 220 },
					data: { label: "Dual ISP", type: "cloud" },
				},
				{
					id: "edge",
					type: "custom",
					position: { x: 230, y: 220 },
					data: { label: "HA Firewalls", type: "firewall" },
				},
				{
					id: "core",
					type: "custom",
					position: { x: 500, y: 220 },
					data: { label: "Core Switch Pair", type: "switch" },
				},
				{
					id: "access",
					type: "custom",
					position: { x: 760, y: 70 },
					data: { label: "Access Layer", type: "switch" },
				},
				{
					id: "apps",
					type: "custom",
					position: { x: 760, y: 360 },
					data: {
						label: "App / Data VLANs",
						type: "server",
						ip: "10.20.30.0/24",
					},
				},
				{
					id: "identity",
					type: "custom",
					position: { x: 1010, y: 70 },
					data: { label: "Identity / NAC", type: "server" },
				},
				{
					id: "wifi",
					type: "custom",
					position: { x: 1010, y: 220 },
					data: { label: "Enterprise Wi-Fi", type: "accessPoint" },
				},
				{
					id: "branch",
					type: "custom",
					position: { x: 1010, y: 500 },
					data: { label: "Branch Site", type: "router", ip: "10.21.0.0/16" },
				},
				{
					id: "monitoring",
					type: "custom",
					position: { x: 1260, y: 360 },
					data: { label: "SIEM / Monitoring", type: "database" },
				},
			],
			edges: [
				{
					id: "edge-wan",
					type: "custom",
					source: "internet",
					target: "edge",
					data: { label: "redundant WAN" },
					markerEnd,
				},
				{
					id: "edge-inside",
					type: "custom",
					source: "edge",
					target: "core",
					data: { label: "inside routing" },
					markerEnd,
				},
				{
					id: "edge-access",
					type: "custom",
					source: "core",
					target: "access",
					data: { label: "distribution" },
					markerEnd,
				},
				{
					id: "edge-apps",
					type: "custom",
					source: "core",
					target: "apps",
					data: { label: "server VLANs" },
					markerEnd,
				},
				{
					id: "edge-nac",
					type: "custom",
					source: "access",
					target: "identity",
					data: { label: "RADIUS/NAC" },
					markerEnd,
				},
				{
					id: "edge-wifi",
					type: "custom",
					source: "access",
					target: "wifi",
					data: { label: "AP trunk" },
					markerEnd,
				},
				{
					id: "edge-sdwan",
					type: "custom",
					source: "edge",
					target: "branch",
					data: { label: "SD-WAN / VPN" },
					markerEnd,
				},
				{
					id: "edge-logs",
					type: "custom",
					source: "edge",
					target: "monitoring",
					data: { label: "logs/metrics" },
					markerEnd,
				},
				{
					id: "edge-app-logs",
					type: "custom",
					source: "apps",
					target: "monitoring",
					data: { label: "telemetry" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Build redundant edge",
					description:
						"Two ISP links and high-availability firewalls reduce single points of failure.",
					activeNodes: ["internet", "edge", "core"],
					activeEdges: ["edge-wan", "edge-inside"],
				},
				{
					label: "Control access by identity",
					description:
						"Wired and wireless users authenticate through identity and NAC before receiving network access.",
					activeNodes: ["access", "identity", "wifi"],
					activeEdges: ["edge-nac", "edge-wifi"],
				},
				{
					label: "Connect sites",
					description:
						"Branch routes are summarized over VPN or SD-WAN so applications remain reachable between offices.",
					activeNodes: ["edge", "branch", "apps"],
					activeEdges: ["edge-sdwan", "edge-inside", "edge-apps"],
				},
				{
					label: "Operate with telemetry",
					description:
						"Firewalls and servers forward logs and metrics so network issues are visible before users report them.",
					activeNodes: ["edge", "apps", "monitoring"],
					activeEdges: ["edge-logs", "edge-app-logs"],
				},
			],
		},
	},
	{
		id: "large",
		label: "500+ employees",
		title: "Large enterprise network platform",
		summary:
			"A large company operates networking as a platform across campus, branches, cloud, remote users, production environments, and security operations.",
		operatingModel:
			"Use standardized architecture, automation, zero-trust controls, observability, and formal governance. Network changes are versioned, reviewed, tested, and rolled out progressively.",
		ipPlan: [
			"Global private addressing split by region, site, environment, and function.",
			"Example: 10.region.site.vlan/24 with route summaries per campus and cloud region.",
			"Separate corp, production, management, security, voice, IoT, OT, and guest zones.",
			"Use IPAM as the source of truth for prefixes, DHCP scopes, DNS records, and reservations.",
		],
		infrastructure: [
			"Redundant internet edges, DDoS protection, SD-WAN, and direct cloud connectivity.",
			"Campus core/distribution/access, data center fabric, and cloud networking hub.",
			"Centralized network source of truth, automation, config backups, and compliance checks.",
			"Dedicated observability stack for flow logs, packet capture, DNS, firewall, and route events.",
		],
		wifi: [
			"Enterprise WLAN with controller redundancy, RADIUS, certificate auth, and dynamic VLAN assignment.",
			"Location-based AP design for capacity, roaming, meeting rooms, and high-density areas.",
			"Guest access integrated with captive portal, sponsor flow, or visitor management.",
			"Separate IoT onboarding flow using MPSK, certificates, or NAC profiling.",
		],
		vpn: [
			"Zero-trust network access for user apps, plus VPN for admin and legacy network use cases.",
			"Per-app access policies based on identity, device posture, location, and risk.",
			"Site and cloud connectivity through SD-WAN, transit gateways, and direct connects.",
			"Privileged admin paths require just-in-time access and session logging.",
		],
		security: [
			"Network segmentation enforced across campus, data center, cloud, and remote access.",
			"North-south and east-west inspection with firewalls, IDS/IPS, WAF, DNS security, and DLP where needed.",
			"Central SIEM/SOAR consumes firewall, VPN, DNS, cloud flow, proxy, and endpoint logs.",
			"Continuous compliance checks for exposed services, risky routes, and stale firewall rules.",
		],
		operations: [
			"Manage network intent in Git and deploy changes with automation pipelines.",
			"Use staged rollout rings: lab, pilot site, region, global.",
			"Run incident response playbooks for ISP failure, BGP leak, DNS outage, certificate expiry, and ransomware containment.",
			"Measure SLOs for internet availability, Wi-Fi health, VPN success rate, DNS latency, and application reachability.",
		],
		configExamples: [
			"ipam reserve prefix region=apac site=sgp01 zone=corp size=/20",
			"terraform apply network-hub transit-gateway peering cloud-firewall",
			"ansible-playbook deploy_firewall_policy.yml --limit pilot-sites",
			"ztna policy allow Engineering GitHubEnterprise posture=healthy mfa=required",
			"bgp monitor alert prefix-leak route-change critical",
		],
		diagram: {
			nodes: [
				{
					id: "users",
					type: "custom",
					position: { x: 0, y: 140 },
					data: { label: "Users / Devices", type: "laptop" },
				},
				{
					id: "ztna",
					type: "custom",
					position: { x: 250, y: 140 },
					data: { label: "ZTNA / SASE", type: "vpnGateway" },
				},
				{
					id: "edge",
					type: "custom",
					position: { x: 500, y: 140 },
					data: { label: "Global Edge", type: "firewall" },
				},
				{
					id: "campus",
					type: "custom",
					position: { x: 760, y: 20 },
					data: { label: "Campus Fabric", type: "switch" },
				},
				{
					id: "cloud",
					type: "custom",
					position: { x: 760, y: 260 },
					data: { label: "Cloud Hub", type: "cloud" },
				},
				{
					id: "prod",
					type: "custom",
					position: { x: 1020, y: 260 },
					data: { label: "Production Apps", type: "server" },
				},
				{
					id: "soc",
					type: "custom",
					position: { x: 1020, y: 20 },
					data: { label: "SOC / SIEM", type: "database" },
				},
				{
					id: "automation",
					type: "custom",
					position: { x: 1280, y: 140 },
					data: { label: "NetOps Automation", type: "server" },
				},
			],
			edges: [
				{
					id: "edge-identity-access",
					type: "custom",
					source: "users",
					target: "ztna",
					data: { label: "identity + posture" },
					markerEnd,
				},
				{
					id: "edge-secure-edge",
					type: "custom",
					source: "ztna",
					target: "edge",
					data: { label: "policy tunnel" },
					markerEnd,
				},
				{
					id: "edge-campus-route",
					type: "custom",
					source: "edge",
					target: "campus",
					data: { label: "campus routes" },
					markerEnd,
				},
				{
					id: "edge-cloud-route",
					type: "custom",
					source: "edge",
					target: "cloud",
					data: { label: "cloud routes" },
					markerEnd,
				},
				{
					id: "edge-prod-access",
					type: "custom",
					source: "cloud",
					target: "prod",
					data: { label: "app segmentation" },
					markerEnd,
				},
				{
					id: "edge-security-logs",
					type: "custom",
					source: "edge",
					target: "soc",
					data: { label: "security logs" },
					markerEnd,
				},
				{
					id: "edge-campus-logs",
					type: "custom",
					source: "campus",
					target: "soc",
					data: { label: "flow logs" },
					markerEnd,
				},
				{
					id: "edge-automation",
					type: "custom",
					source: "automation",
					target: "edge",
					data: { label: "policy as code" },
					markerEnd,
				},
				{
					id: "edge-cloud-automation",
					type: "custom",
					source: "automation",
					target: "cloud",
					data: { label: "IaC" },
					markerEnd,
				},
			],
			steps: [
				{
					label: "Verify every user",
					description:
						"Identity, MFA, and device posture decide which apps and networks a user can reach.",
					activeNodes: ["users", "ztna", "edge"],
					activeEdges: ["edge-identity-access", "edge-secure-edge"],
				},
				{
					label: "Route across domains",
					description:
						"Campus, cloud, and production environments connect through controlled global edge policies.",
					activeNodes: ["edge", "campus", "cloud", "prod"],
					activeEdges: [
						"edge-campus-route",
						"edge-cloud-route",
						"edge-prod-access",
					],
				},
				{
					label: "Centralize security telemetry",
					description:
						"Network, cloud, and access events flow to the SOC so investigations have shared context.",
					activeNodes: ["edge", "campus", "soc"],
					activeEdges: ["edge-security-logs", "edge-campus-logs"],
				},
				{
					label: "Automate controlled changes",
					description:
						"Network policy and cloud routing changes are deployed from reviewed automation workflows.",
					activeNodes: ["automation", "edge", "cloud"],
					activeEdges: ["edge-automation", "edge-cloud-automation"],
				},
			],
		},
	},
];
