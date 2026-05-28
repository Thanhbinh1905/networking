import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://networking-indol.vercel.app"),
	title: {
		default: "Networking Visualizer",
		template: "%s | Networking Visualizer",
	},
	description:
		"Learn Ethernet, IP, DNS, TCP, TLS, HTTP, routing, firewalls, VPNs, and load balancers through interactive networking diagrams.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: "/",
		siteName: "Networking Visualizer",
		title: "Networking Visualizer",
		description:
			"Interactive networking diagrams for developers learning how packets, routes, protocols, and web requests move across networks.",
		locale: "en_US",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Networking Visualizer interactive networking learning platform",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex h-screen overflow-hidden bg-background text-foreground antialiased`}
			>
				<Sidebar />
				<main className="flex-1 h-full overflow-y-auto">{children}</main>
			</body>
		</html>
	);
}
