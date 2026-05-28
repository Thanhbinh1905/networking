import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
	"Networking Visualizer interactive networking learning platform";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				overflow: "hidden",
				background: "#fafafa",
				color: "#171717",
				fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					background:
						"radial-gradient(circle at 18% 24%, #007cf0 0, transparent 28%), radial-gradient(circle at 38% 20%, #00dfd8 0, transparent 28%), radial-gradient(circle at 62% 28%, #7928ca 0, transparent 28%), radial-gradient(circle at 76% 34%, #ff0080 0, transparent 26%), radial-gradient(circle at 84% 54%, #ff4d4d 0, transparent 24%), radial-gradient(circle at 92% 42%, #f9cb28 0, transparent 24%)",
					opacity: 0.28,
				}}
			/>
			<div
				style={{
					position: "absolute",
					inset: 48,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					border: "1px solid #ebebeb",
					borderRadius: 24,
					background: "rgba(255, 255, 255, 0.78)",
					padding: 56,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
						fontSize: 24,
						color: "#4d4d4d",
					}}
				>
					<div
						style={{
							width: 40,
							height: 40,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: "1px solid #ebebeb",
							borderRadius: 8,
							background: "#ffffff",
							color: "#171717",
						}}
					>
						↔
					</div>
					<span>Networking Visualizer</span>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<h1
						style={{
							margin: 0,
							maxWidth: 820,
							fontSize: 76,
							fontWeight: 600,
							lineHeight: 0.94,
							letterSpacing: "-3.8px",
						}}
					>
						Learn networking through diagrams.
					</h1>
					<p
						style={{
							margin: 0,
							maxWidth: 850,
							fontSize: 30,
							lineHeight: 1.35,
							color: "#4d4d4d",
						}}
					>
						Ethernet, IP, DNS, TCP, TLS, HTTP, routing, firewalls, VPNs, and
						load balancers explained visually for developers.
					</p>
				</div>
				<div
					style={{
						display: "flex",
						gap: 12,
						fontSize: 22,
						color: "#4d4d4d",
					}}
				>
					<span>28 concepts</span>
					<span>•</span>
					<span>Step-by-step packet flows</span>
					<span>•</span>
					<span>Terminal examples</span>
				</div>
			</div>
		</div>,
		size,
	);
}
