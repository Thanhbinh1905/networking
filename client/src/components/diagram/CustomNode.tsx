"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import {
	Cloud,
	Database,
	Monitor,
	Network,
	Router,
	Server,
	Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NetworkNodeType =
	| "pc"
	| "laptop"
	| "switch"
	| "router"
	| "server"
	| "dns"
	| "database"
	| "cloud"
	| "firewall"
	| "accessPoint"
	| "vpnGateway"
	| "loadBalancer";

export type CustomNodeData = {
	label: string;
	type: NetworkNodeType;
	ip?: string;
	mac?: string;
	active?: boolean;
};

const iconMap = {
	pc: Monitor,
	laptop: Monitor,
	switch: Network,
	router: Router,
	server: Server,
	dns: Server,
	database: Database,
	cloud: Cloud,
	firewall: Shield,
	accessPoint: Network,
	vpnGateway: Shield,
	loadBalancer: Network,
};

export function CustomNode({
	data,
	selected,
}: NodeProps<Node<CustomNodeData, "custom">>) {
	const Icon = iconMap[data.type] || Monitor;

	return (
		<div
			className={cn(
				"px-5 py-3 rounded-xl bg-cream border border-border-subtle flex flex-col items-center min-w-[120px] transition-all duration-300",
				selected
					? "border-charcoal/40 ring-1 ring-charcoal/5 shadow-focus"
					: "",
				data.active && "border-charcoal ring-2 ring-charcoal/5 scale-105 z-10",
			)}
		>
			<Handle
				type="target"
				position={Position.Top}
				className="w-2 h-2 opacity-0"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				className="w-2 h-2 opacity-0"
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="left"
				className="w-2 h-2 opacity-0"
			/>
			<Handle
				type="source"
				position={Position.Right}
				id="right"
				className="w-2 h-2 opacity-0"
			/>

			<Icon
				className={cn(
					"w-7 h-7 mb-2.5 transition-colors",
					data.active ? "text-charcoal" : "text-charcoal/40",
				)}
			/>
			<div
				className={cn(
					"text-xs font-semibold tracking-tight transition-colors",
					data.active ? "text-charcoal" : "text-charcoal/83",
				)}
			>
				{data.label}
			</div>

			{(data.ip || data.mac) && (
				<div className="mt-3 w-full text-[9px] text-muted flex flex-col gap-1.5 border-t border-border-subtle pt-3 font-mono leading-none">
					{data.ip && (
						<div className="flex justify-between gap-2">
							<span className="opacity-40 uppercase tracking-tighter font-bold">
								IP
							</span>
							<span className="text-charcoal/60">{data.ip}</span>
						</div>
					)}
					{data.mac && (
						<div className="flex justify-between gap-2">
							<span className="opacity-40 uppercase tracking-tighter font-bold">
								MAC
							</span>
							<span className="text-charcoal/60">{data.mac}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
