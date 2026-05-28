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
				"flex min-w-[120px] flex-col items-center rounded-lg border bg-card px-5 py-3 shadow-level-2 transition-all duration-300",
				selected && "border-ring ring-1 ring-ring/30",
				data.active && "scale-105 border-primary ring-2 ring-ring/30",
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
					"mb-2.5 size-7 transition-colors",
					data.active ? "text-primary" : "text-muted-foreground",
				)}
			/>
			<div
				className={cn(
					"text-body-sm font-medium transition-colors",
					data.active ? "text-foreground" : "text-muted-foreground",
				)}
			>
				{data.label}
			</div>

			{(data.ip || data.mac) && (
				<div className="mt-3 flex w-full flex-col gap-1.5 border-t pt-3 text-caption-mono text-muted-foreground">
					{data.ip && (
						<div className="flex justify-between gap-2">
							<span className="text-muted-foreground/70">IP</span>
							<span>{data.ip}</span>
						</div>
					)}
					{data.mac && (
						<div className="flex justify-between gap-2">
							<span className="text-muted-foreground/70">MAC</span>
							<span>{data.mac}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
