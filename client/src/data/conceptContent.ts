export type ConceptContent = {
	beginner: string;
	developer: string;
	terminal: string[];
	tips: string[];
};

export const conceptContent: Record<string, ConceptContent> = {
	ethernet: {
		beginner:
			"Ethernet moves frames across a local wired network. It defines the local frame format, source and destination MAC addresses, and how bits are carried on copper or fiber.",
		developer:
			"Developers see Ethernet indirectly when MTU, VLANs, duplicate MACs, or bad cables cause packet loss before IP troubleshooting even starts.",
		terminal: [
			"ip link show",
			"ethtool eth0",
			"tcpdump -i eth0 -e arp or icmp",
		],
		tips: [
			"Check link state and speed before debugging higher layers.",
			"An Ethernet frame only covers the local segment; routers replace the frame at every hop.",
		],
	},
	"wi-fi": {
		beginner:
			"Wi-Fi is Ethernet-like networking over radio through an access point. The client associates with an AP, then the AP bridges traffic into the LAN.",
		developer:
			"Wireless adds signal strength, channel contention, roaming, and encryption behavior that can look like random latency to applications.",
		terminal: [
			"nmcli dev wifi list",
			"iw dev wlan0 link",
			"ping -c 5 your-gateway-ip",
		],
		tips: [
			"Weak signal often appears as jitter, retransmits, or low throughput.",
			"A Wi-Fi access point is usually a bridge, not necessarily the router.",
		],
	},
	"mac-address": {
		beginner:
			"A MAC address identifies a network interface on the local link. Switches use destination MAC addresses to decide which port should receive a frame.",
		developer:
			"MAC addresses matter when ARP, switching, VLANs, container bridges, or duplicate virtual NIC addresses break local delivery.",
		terminal: ["ip link show", "arp -a", "tcpdump -e -i eth0 arp"],
		tips: [
			"MACs are local-link identifiers, not internet routes.",
			"A switch learns source MACs; it forwards based on destination MACs.",
		],
	},
	switch: {
		beginner:
			"A switch connects devices inside one LAN and forwards frames using a MAC address table. Unknown destinations are flooded until learned.",
		developer:
			"Switch behavior explains why two hosts on the same subnet can talk without a router and why loops require STP or loop prevention.",
		terminal: ["bridge fdb show", "ip neigh show", "tcpdump -i eth0 -e"],
		tips: [
			"Flooding unknown unicast is normal during learning.",
			"Switches separate collision domains, but VLANs separate broadcast domains.",
		],
	},
	"ip-address": {
		beginner:
			"An IP address identifies a host interface at Layer 3 so packets can be routed across networks. Hosts compare the destination against their subnet before choosing direct delivery or a gateway.",
		developer:
			"IP addressing is the first thing to verify when services cannot reach each other across hosts, containers, VPCs, or Kubernetes nodes.",
		terminal: ["ip addr show", "ip route get 8.8.8.8", "curl ifconfig.me"],
		tips: [
			"An IP address without the correct prefix length can put the host in the wrong network.",
			"Private IPs are routable inside private networks, not across the public internet without NAT or routing.",
		],
	},
	"static-ip": {
		beginner:
			"A static IP is manually configured and stays stable until changed. It is common for servers, routers, appliances, and infrastructure endpoints.",
		developer:
			"Static addressing removes DHCP dependency but shifts responsibility to humans or infrastructure code to avoid conflicts and stale DNS.",
		terminal: [
			"ip addr add 192.168.10.20/24 dev eth0",
			"ip route add default via 192.168.10.1",
			"resolvectl dns eth0 1.1.1.1",
		],
		tips: [
			"Document reservations so DHCP does not hand out the same address.",
			"Static IP requires address, prefix, gateway, and DNS to be correct.",
		],
	},
	dhcp: {
		beginner:
			"DHCP automatically leases IP settings to a client: address, mask, gateway, DNS, and lease time. The normal exchange is Discover, Offer, Request, Acknowledge.",
		developer:
			"DHCP issues often show up as 169.254 addresses, missing default routes, wrong DNS servers, or clients renewing old leases.",
		terminal: [
			"sudo dhclient -v eth0",
			"ip addr show",
			'journalctl -u NetworkManager --since "10 min ago"',
		],
		tips: [
			"DHCP works by broadcast before the client has an IP.",
			"The lease may include more than an address, including DNS and search domains.",
		],
	},
	subnet: {
		beginner:
			"A subnet is an IP range described by a network prefix such as 192.168.1.0/24. Hosts use the subnet mask to decide whether a destination is local.",
		developer:
			"Wrong subnet masks create confusing bugs where ARP is attempted for remote hosts or gateway routing is used for local peers.",
		terminal: [
			"ipcalc 192.168.1.10/24",
			"ip route get 192.168.1.40",
			"ip route get 10.0.0.20",
		],
		tips: [
			"Longest prefix length means more specific network.",
			"Two hosts need compatible masks to agree they are local peers.",
		],
	},
	router: {
		beginner:
			"A router forwards IP packets between different networks. It receives a packet on one interface, chooses a route, and sends it out another interface.",
		developer:
			"Routers are where subnet boundaries, NAT, ACLs, route tables, and cloud network policies often meet.",
		terminal: ["ip route", "traceroute 8.8.8.8", "ip route get 10.0.0.50"],
		tips: [
			"Routers decrement TTL at each hop.",
			"Routers do not forward Ethernet frames unchanged; they forward IP packets in new link-layer frames.",
		],
	},
	"default-gateway": {
		beginner:
			"The default gateway is the router a host uses when no more specific local route matches. It is usually the way out of the subnet.",
		developer:
			"Missing or wrong gateways cause local traffic to work while internet or cross-subnet traffic fails.",
		terminal: [
			"ip route show default",
			"ip route get 1.1.1.1",
			"ping -c 3 $(ip route | awk '/default/ {print $3; exit}')",
		],
		tips: [
			"A host can have many routes but usually one preferred default.",
			"The gateway IP must be reachable on the local subnet.",
		],
	},
	routes: {
		beginner:
			"Routes map destination prefixes to next hops or interfaces. Network stacks use the most specific matching route for each packet.",
		developer:
			"Route tables explain split tunnels, private service reachability, container networking, and why traffic exits through an unexpected interface.",
		terminal: ["ip route", "ip route get 10.20.1.10", "netstat -rn"],
		tips: [
			"Longest prefix match beats route order in most cases.",
			"A default route is just 0.0.0.0/0 or ::/0.",
		],
	},
	"static-routing": {
		beginner:
			"Static routing uses manually configured route entries instead of dynamic routing protocols. It is predictable but must be maintained on every required path.",
		developer:
			"Static routes are common in labs, small networks, VPN routes, and cloud route tables, but missing return routes are a frequent failure.",
		terminal: [
			"ip route add 10.2.0.0/24 via 172.16.0.2",
			"ip route get 10.2.0.10",
			"traceroute 10.2.0.10",
		],
		tips: [
			"Always verify the return path, not just the outbound path.",
			"Static routes do not adapt automatically when a next hop fails.",
		],
	},
	ospf: {
		beginner:
			"OSPF is an internal routing protocol where routers share link-state information and compute shortest paths by cost.",
		developer:
			"OSPF appears in enterprise and data center networks where routers need fast automatic convergence inside one administrative domain.",
		terminal: [
			"show ip ospf neighbor",
			"show ip route ospf",
			"show ip ospf database",
		],
		tips: [
			"OSPF neighbors need matching area and network settings.",
			"Lower total cost wins, not necessarily fewer hops.",
		],
	},
	bgp: {
		beginner:
			"BGP exchanges reachability between autonomous systems. It selects paths using policy attributes such as AS path, local preference, and MED.",
		developer:
			"BGP is the routing control plane of the internet and also powers many cloud, edge, and Kubernetes networking integrations.",
		terminal: [
			"show bgp summary",
			"show bgp ipv4 unicast",
			"whois -h whois.radb.net 203.0.113.0/24",
		],
		tips: [
			"BGP is policy-driven, not purely shortest path.",
			"Bad route advertisements can have internet-scale impact.",
		],
	},
	ping: {
		beginner:
			"Ping sends ICMP Echo Request packets and waits for Echo Reply packets. It measures reachability, round-trip time, and packet loss.",
		developer:
			"Ping is a quick Layer 3 signal, but a successful ping does not prove TCP ports, DNS, TLS, or application health.",
		terminal: [
			"ping -c 4 8.8.8.8",
			"ping -c 4 example.com",
			"traceroute 8.8.8.8",
		],
		tips: [
			"Blocked ICMP does not always mean the host is down.",
			"Compare ping by IP and by hostname to separate DNS from reachability.",
		],
	},
	icmp: {
		beginner:
			"ICMP carries IP diagnostics and control messages such as Echo, Destination Unreachable, and Time Exceeded.",
		developer:
			"ICMP explains routing failures, traceroute hops, and path MTU discovery problems that affect application connections.",
		terminal: ["ping -c 4 1.1.1.1", "traceroute 1.1.1.1", "tcpdump -n icmp"],
		tips: [
			"Do not block all ICMP blindly; path MTU discovery can depend on it.",
			"ICMP errors are generated by network devices, not only final hosts.",
		],
	},
	tcp: {
		beginner:
			"TCP provides a reliable ordered byte stream using a handshake, sequence numbers, acknowledgments, retransmission, and flow control.",
		developer:
			"Most app protocols developers use, including HTTP/1.1, HTTP/2, SSH, and PostgreSQL, depend on TCP behavior.",
		terminal: [
			"nc -vz example.com 443",
			"ss -tanp",
			'tcpdump -n "tcp port 443"',
		],
		tips: [
			"Connection refused means the host replied but nothing accepted that port.",
			"Timeouts often point to routing, firewall, or packet loss.",
		],
	},
	udp: {
		beginner:
			"UDP sends independent datagrams without connection setup or built-in retransmission. It is simple, low overhead, and used when apps handle timing or reliability themselves.",
		developer:
			"DNS, VoIP, games, telemetry, and QUIC use UDP because they need different tradeoffs than TCP.",
		terminal: [
			"nc -vzu 1.1.1.1 53",
			"dig @1.1.1.1 example.com",
			"tcpdump -n udp",
		],
		tips: [
			"No connection state means tools can be less definitive for UDP.",
			"Packet size matters; fragmentation can break unreliable paths.",
		],
	},
	ports: {
		beginner:
			"Ports identify a process or service on a host IP. The tuple of protocol, source IP, source port, destination IP, and destination port identifies a flow.",
		developer:
			"Port mistakes are a common reason DNS resolves and ping works but the application still fails.",
		terminal: ["ss -tulpen", "nc -vz host 443", "curl -v http://host:8080"],
		tips: [
			"Listening on 127.0.0.1 is not reachable from other machines.",
			"Firewalls can allow one port and block another on the same IP.",
		],
	},
	firewall: {
		beginner:
			"A firewall allows or blocks traffic based on rules such as source, destination, protocol, port, interface, and connection state.",
		developer:
			"Firewalls exist on laptops, servers, cloud security groups, Kubernetes network policies, and perimeter appliances.",
		terminal: [
			"sudo ufw status verbose",
			"sudo iptables -S",
			"curl -v https://example.com",
		],
		tips: [
			"Check both host firewall and cloud/network firewall.",
			"Stateful firewalls usually allow return traffic for established connections.",
		],
	},
	tls: {
		beginner:
			"TLS authenticates the server and encrypts application data over a transport connection. Modern HTTPS uses TLS, usually on TCP port 443.",
		developer:
			"TLS failures often involve certificate chains, hostname mismatch, expired certificates, protocol versions, or missing SNI.",
		terminal: [
			"openssl s_client -connect example.com:443 -servername example.com",
			"curl -Iv https://example.com",
			"testssl.sh example.com",
		],
		tips: [
			"The certificate name must match the hostname, not just the IP.",
			"TLS encrypts HTTP content but not every metadata field, such as the destination IP.",
		],
	},
	ssl: {
		beginner:
			"SSL is the obsolete predecessor name people still use when they usually mean TLS. Modern systems should disable SSLv2 and SSLv3.",
		developer:
			"When a dashboard says SSL certificate, treat it as certificate/TLS configuration unless it explicitly enables old SSL protocols.",
		terminal: [
			"openssl s_client -connect example.com:443 -tls1_2",
			"curl -Iv https://example.com",
			"nmap --script ssl-enum-ciphers -p 443 example.com",
		],
		tips: [
			"Use TLS 1.2 or TLS 1.3.",
			"SSL terminology is common; SSL protocols are not acceptable for modern security.",
		],
	},
	vpn: {
		beginner:
			"A VPN creates an encrypted tunnel from a client or network into another private network. Routes decide which traffic enters the tunnel.",
		developer:
			"VPN bugs are often route conflicts, DNS split-horizon issues, MTU problems, or firewall rules on the private side.",
		terminal: ["ip route", "wg show", "ping -c 3 private-service.local"],
		tips: [
			"Check whether it is full tunnel or split tunnel.",
			"Overlapping private CIDRs can send traffic to the wrong place.",
		],
	},
	dns: {
		beginner:
			"DNS translates names to records such as A, AAAA, CNAME, MX, and TXT. Recursive resolvers cache answers from authoritative servers.",
		developer:
			"DNS issues can masquerade as app failures; always compare name lookup, returned IP, TTL, and direct connection to the IP.",
		terminal: [
			"dig example.com A",
			"dig +trace example.com",
			"nslookup example.com 1.1.1.1",
		],
		tips: [
			"TTL controls how long resolvers may cache an answer.",
			"A CNAME points to another name, not directly to an IP.",
		],
	},
	http: {
		beginner:
			"HTTP is an application protocol based on requests and responses: method, URL/path, headers, body, status, and response body.",
		developer:
			"HTTP debugging is about what was sent, what status returned, which headers changed behavior, and whether intermediaries modified the request.",
		terminal: [
			"curl -v http://example.com",
			"curl -I http://example.com",
			"python3 -m http.server 8080",
		],
		tips: [
			"Status codes describe server response, not necessarily network reachability.",
			"Headers such as Host, Authorization, Cache-Control, and Content-Type matter.",
		],
	},
	https: {
		beginner:
			"HTTPS is HTTP carried inside TLS. It gives confidentiality, integrity, and server authentication for web traffic.",
		developer:
			"For developers, HTTPS combines DNS, TCP, TLS, certificates, HTTP, proxies, and load balancers into one visible URL.",
		terminal: [
			"curl -v https://example.com",
			"openssl s_client -connect example.com:443 -servername example.com",
			"curl --resolve example.com:443:203.0.113.20 https://example.com",
		],
		tips: [
			"Use SNI when testing shared hosts.",
			"A TLS success can still return an HTTP 404 or 500; those are different layers.",
		],
	},
	"load-balancer": {
		beginner:
			"A load balancer presents one entry point and distributes traffic across healthy backends. It may operate at Layer 4 or Layer 7.",
		developer:
			"Load balancers affect source IP visibility, health checks, TLS termination, sticky sessions, retries, and timeout behavior.",
		terminal: [
			"curl -v https://service.example.com",
			"dig service.example.com",
			"for i in {1..5}; do curl -s https://service.example.com/hostname; done",
		],
		tips: [
			"Health checks determine whether a backend receives traffic.",
			"Preserve client IP with headers or proxy protocol when the app needs it.",
		],
	},
	"review-path": {
		beginner:
			"The review path connects the learning model into a real request: resolve a name, route packets, connect with TCP, secure with TLS, send HTTPS, and reach a backend.",
		developer:
			"When debugging, isolate the failing layer instead of treating the request as one opaque operation.",
		terminal: [
			"dig example.com",
			"ip route get $(dig +short example.com | head -1)",
			"curl -v https://example.com",
		],
		tips: [
			"Test in order: DNS, route, port, TLS, HTTP, application.",
			"Changing one layer can make another layer look broken.",
		],
	},
};
