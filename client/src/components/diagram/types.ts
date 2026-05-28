import type { Edge, Node } from "@xyflow/react";
import type { CustomNodeData } from "./CustomNode";

export type DiagramStep = {
	label: string;
	description: string;
	activeNodes?: string[];
	activeEdges?: string[];
};

export type DiagramDefinition = {
	nodes: Node<CustomNodeData>[];
	edges: Edge[];
	steps: DiagramStep[];
};
