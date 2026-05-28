"use client";

import {
	Background,
	Controls,
	type Edge,
	type Node,
	Panel,
	ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DiagramStep } from "@/data/diagrams";
import { CustomEdge } from "./CustomEdge";
import { CustomNode, type CustomNodeData } from "./CustomNode";

const nodeTypes = {
	custom: CustomNode,
};

const edgeTypes = {
	custom: CustomEdge,
};

interface DiagramRendererProps {
	initialNodes: Node<CustomNodeData>[];
	initialEdges: Edge[];
	steps?: DiagramStep[];
	currentStep: number;
	onStepChange: (step: number) => void;
}

export function DiagramRenderer({
	initialNodes,
	initialEdges,
	steps = [],
	currentStep,
	onStepChange,
}: DiagramRendererProps) {
	const step = steps[currentStep];

	const nodes = useMemo(
		() =>
			initialNodes.map((node) => ({
				...node,
				data: {
					...node.data,
					active: step?.activeNodes?.includes(node.id) || false,
				},
			})),
		[initialNodes, step],
	);

	const edges = useMemo(
		() =>
			initialEdges.map((edge) => ({
				...edge,
				animated: step?.activeEdges?.includes(edge.id) || false,
				style: {
					...edge.style,
					stroke: step?.activeEdges?.includes(edge.id)
						? "var(--primary)"
						: "var(--border)",
					strokeWidth: step?.activeEdges?.includes(edge.id) ? 3 : 2,
				},
			})),
		[initialEdges, step],
	);

	return (
		<div className="h-full w-full bg-card">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				fitView
				colorMode="light"
			>
				<Background color="var(--border)" gap={20} />
				<Controls className="border bg-card shadow-level-2" />

				{steps.length > 0 && (
					<Panel
						position="bottom-center"
						className="mb-8 flex min-w-[360px] flex-col gap-3 rounded-lg border bg-card p-5 shadow-level-5"
					>
						<div className="flex items-center justify-between">
							<Badge variant="secondary" className="font-mono">
								Step {currentStep + 1} of {steps.length}
							</Badge>
							<span className="text-body-sm font-medium text-foreground">
								{steps[currentStep].label}
							</span>
						</div>

						<p className="min-h-[40px] text-body-sm text-muted-foreground">
							{steps[currentStep].description}
						</p>

						<div className="flex items-center justify-center gap-4 pt-2">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => onStepChange(0)}
								disabled={currentStep === 0}
								title="Restart"
							>
								<RotateCcw />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => onStepChange(Math.max(0, currentStep - 1))}
								disabled={currentStep === 0}
							>
								<SkipBack />
							</Button>
							<Button
								type="button"
								size="icon-lg"
								onClick={() => onStepChange((currentStep + 1) % steps.length)}
							>
								<Play className="fill-current" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() =>
									onStepChange(Math.min(steps.length - 1, currentStep + 1))
								}
								disabled={currentStep === steps.length - 1}
							>
								<SkipForward />
							</Button>
						</div>
					</Panel>
				)}
			</ReactFlow>
		</div>
	);
}
